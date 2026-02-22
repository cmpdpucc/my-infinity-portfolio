# **Report Architetturale: Staggered Terminal Showcase**

Questo documento analizza la logica, la struttura e le tecniche di implementazione della variante "Staggered Terminal". È progettato per guidarti nell'estrazione e nell'integrazione di questo componente nel tuo web portfolio.

## **1\. Il Motore delle Animazioni: useScrollReveal**

Il cuore delle performance di questo layout è l'hook custom useScrollReveal. Invece di ascoltare l'evento scroll del browser (che causa continui ricalcoli e lag), utilizziamo le API native del browser IntersectionObserver.

const useScrollReveal \= (options \= { threshold: 0.3 }) \=\> {  
  const \[isVisible, setIsVisible\] \= useState(false);  
  const ref \= useRef(null);

  useEffect(() \=\> {  
    const observer \= new IntersectionObserver((\[entry\]) \=\> {  
      // Triggera l'animazione SOLO quando l'elemento entra nello schermo  
      if (entry.isIntersecting) {  
        setIsVisible(true);  
      }  
    }, options);  
    if (ref.current) observer.observe(ref.current);  
    return () \=\> observer.disconnect();  
  }, \[options.threshold\]);

  return \[ref, isVisible\];  
};

**Come usarlo:** Assegni il ref al contenitore principale della tua "riga" di progetto. Quando la percentuale di elemento visibile supera la threshold (es. 0.4 \= 40%), isVisible diventa true innescando irreversibilmente le animazioni CSS in entrata.

## **2\. Struttura dei Dati (Il Contratto)**

Per alimentare questo componente, i tuoi dati (provenienti da un CMS, un file JSON o costanti) devono rispettare questo schema:

type Feature \= {  
  id: string;  
  category: string;       // es. "Mobile Native", "Backend"  
  title: string;  
  visualDesc: string;     // La descrizione testuale discorsiva  
  terminalTitle: string;  // Il nome del file mostrato nell'header del terminale  
  code: string;           // Il codice sorgente raw (con newline \\n)  
  tech: string;           // Badge tecnologia (es. "Rust \+ gRPC")  
  commands: {             // I comandi interattivi per la CLI  
    name: string;         // Nome sul bottone (es. "Run UI Tests")  
    output: string;       // Testo di output simulato  
  }\[\];  
}

## **3\. La Griglia a Scaletta (Staggered Layout)**

Il layout non usa librerie CSS complesse come Masonry, ma sfrutta Flexbox e classi condizionali Tailwind.

La logica iterativa (map sull'array dei progetti) controlla se l'indice è pari o dispari (isEven \= idx % 2 \=== 0).

* **Alternanza Destra/Sinistra:** Se isEven, il testo va a sinistra e il terminale a destra (usando flex-row). Se dispari, si inverte la direzione (usando flex-row-reverse).  
* **Lo Sfalsamento Verticale (Staggering):** Il trucco visivo si ottiene applicando un margine superiore pesante **solo a uno dei due blocchi**.  
  * Blocco 1: mt-0  
  * Blocco 2: md:mt-32 (spinge il blocco verso il basso, creando l'effetto obliquo).

**Il Connettore Visivo (Timeline):**

Una linea centrale e dei "nodi" (pallini) collegano gli elementi. Il nodo utilizza il valore isVisible dell'hook per animare la propria comparsa:

\<div className={\`w-3 h-3 rounded-full transition-all duration-500 ease-out   
  ${isVisible ? 'bg-emerald-500 shadow-\[0\_0\_15px\_3px\_rgba(16,185,129,0.5)\] scale-100' : 'bg-zinc-800 scale-50'}\`}\>  
\</div\>

## **4\. La Macchina a Stati del Terminale (AnimatedTerminal)**

Il componente \<AnimatedTerminal /\> non è una semplice UI statica, ma una macchina a stati finiti (FSM) basata su React useState.

La variabile step definisce il ciclo di vita visivo:

* **Step 0 (Idle):** Il terminale è nascosto o in attesa di entrare nel viewport.  
* **Step 1 (Typing):** isVisible diventa true. Scatta un setInterval che "digita" il comando iniziale (\> executing module load...) carattere per carattere.  
* **Step 2 (Loading):** Breve pausa (simulazione I/O di rete).  
* **Step 3 (Code Revealed):** Il blocco di codice appare con un effetto fade-in/scale-up e blur removal (blur-none).  
* **Step 4 (Interactive CLI):** Dopo 800ms, appare la console interattiva in basso, mostrando i bottoni estrapolati dall'array commands.

### **La Gestione dei Comandi (CLI Interattiva)**

Quando l'utente clicca un comando, lo stato interaction gestisce la simulazione asincrona:

1. **typing**: Mostra il nome del comando digitato.  
2. **running**: Mostra uno spinner testuale ("Executing sequence...").  
3. **done**: Mostra l'output finale in un blocco evidenziato e un tasto "\[ Clear Terminal \]".

### **L'Auto-Scroll Dinamico**

Poiché l'aggiunta di testo e dell'output della CLI spingerebbe il contenuto fuori dalla visuale del terminale, utilizziamo l'ancoraggio.

const bottomRef \= useRef(null);

const scrollToBottom \= () \=\> {  
  if (bottomRef.current) {  
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });  
  }  
};

Questo viene chiamato ogni volta che lo stato della CLI cambia (es. quando compare un nuovo output), replicando esattamente l'esperienza utente di un vero emulatore di terminale (es. iTerm2 o VSCode Terminal).

## **5\. CSS Hacks & Dettagli di Stile**

### **Custom Scrollbar Isolato**

Per evitare che la scrollbar del terminale influenzi l'intero sito, gli stili CSS della webkit-scrollbar sono iniettati localmente nel componente e associati a una classe specifica (.custom-terminal-scroll).

### **Highlighting del Codice via Regex (Nessuna libreria esterna)**

Per mantenere il bundle leggero e le performance elevate senza usare librerie pesanti come PrismJS o Highlight.js, il codice utilizza espressioni regolari combinate con dangerouslySetInnerHTML.

\_\_html: feature.code  
  // Cerca keyword di base e le colora di rosa  
  .replace(/(struct|var|const|let|async|fn|return|match|import|from)/g, '\<span class="text-pink-500 font-medium"\>$1\</span\>')  
  // Cerca Componenti/Tipi e li colora di giallo  
  .replace(/(View|String|Result|Error|Request|Response|Float32Array|ScrollView|LazyVStack|ForEach)/g, '\<span class="text-yellow-300"\>$1\</span\>')  
  // Cerca decoratori e li colora di grigio  
  .replace(/(@StateObject)/g, '\<span class="text-zinc-400"\>$1\</span\>')

*Tip d'integrazione: Puoi espandere facilmente queste regex aggiungendo le parole chiave specifiche dei linguaggi che usi più spesso (es. Python, Java, C\#).*

## **6\. Checklist per l'integrazione nel tuo progetto**

1. **Installa Lucide React:** npm install lucide-react (se non l'hai già).  
2. **Copia l'Hook:** Crea un file hooks/useScrollReveal.js e incolla il codice del punto 1\.  
3. **Estrai il Terminale:** Crea un file components/AnimatedTerminal.jsx isolando il componente. Assicurati che riceva feature e isVisible come props.  
4. **Crea la Timeline:** Crea components/StaggeredTimeline.jsx copiando la logica del map e importando il tuo nuovo AnimatedTerminal.  
5. **Verifica i font:** Il design rende al meglio se usi una font mono appropriata per il codice. Assicurati che Tailwind stia caricando un font come *Fira Code*, *JetBrains Mono* o il font di sistema di default (font-mono).