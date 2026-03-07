Eccellente analisi del componente. Hai ragione nel volerlo rendere agnostico e polimorfo. È un'ottima pratica per creare componenti riutilizzabili e puliti, che si integrano bene in un ecosistema come quello di Antigravity IDE.

### **Piano di implementazione: "Gnomo BlurSlider"**

Ecco come affronteremo la sfida:

1. **Analisi e Decomposizione:** Il componente si basa su Swiper, con una configurazione specifica (slidesPerView: 4, loop, mousewheel). La magia visiva risiede interamente nelle regole CSS, che manipolano transform, scale, filter: blur() e opacity basandosi sulle classi swiper-slide-active, swiper-slide-next e la combinazione con l'operatore \+ per il slide successivo ancora (next+1).  
2. **Architettura Typescript / React:**  
   * Definiremo interfacce Typescript chiare per le Props e per la struttura dei dati di ogni slide.  
   * Utilizzeremo un approccio basato su un tipo generico (T extends BlurSliderItem) per ottenere la **polimorficità**. Questo permette al componente di accettare dati estesi senza rompersi.  
   * Isoleremo l'SVG dell'icona in un componente separato.  
3. **Architettura SCSS BEM:**  
   * Riscriveremo tutto il CSS fornito in SCSS, organizzandolo secondo la metodologia BEM.  
   * Tradurremo le complesse regole CSS in una struttura gerarchica pulita.  
   * Manterremo l'uso delle CSS variables per la configurazione dei valori di blur e scale.  
4. **Agnosticismo dei Dati:** Il componente non deve conoscere "EBuds". I testi, i prezzi, i link e le URL delle immagini saranno passati come Props.  
5. **Gestione Immagini Mancanti:** Implementeremo un generatore di URL per immagini placeholder dinamiche (usando un servizio come placehold.co) per simulare l'aspetto reale e distinguere i vari slide.  
6. **Integrazione con Antigravity IDE:** Il componente finale sarà completo di file per tipi, stili e dati mock, pronto per essere passato a Antigravity.

### ---

**Step 1: Typescript & Interfaces (types.ts)**

Iniziamo definendo i contratti dei dati. Creiamo un file separato per i tipi. Per il concetto di polimorfismo e agnosticismo, definiamo un'interfaccia base per l'item del slider che può essere estesa.

TypeScript

// types.ts  
import { ReactNode } from 'react';

/\*\*  
 \* Interfaccia base per un singolo item del slider.  
 \* Questo componente si basa su questa struttura. Qualsiasi tipo passato  
 \* deve estendere questa interfaccia.  
 \*/  
export interface BlurSliderItem {  
  id: string | number;  
  title: string;  
  description: string;  
  price: string;  
  image: string; // URL dell'immagine  
  actionUrl: string; // URL per il pulsante d'azione  
}

/\*\*  
 \* Props per il componente BlurSlider.  
 \*  
 \* @template T \- Un tipo che estende BlurSliderItem. Questo garantisce che  
 \* qualsiasi dato passato abbia i campi minimi richiesti.  
 \*/  
export interface BlurSliderProps\<T extends BlurSliderItem\> {  
  /\*\* Un array di item del slider che estendono BlurSliderItem. \*/  
  items: T\[\];

  /\*\* URL opzionale per un logo da visualizzare nell'angolo. \*/  
  logoUrl?: string;

  /\*\* Testo opzionale per il pulsante d'azione. Default: "Explore Product". \*/  
  buttonText?: string;

  /\*\* Una classe CSS aggiuntiva opzionale per il container principale. \*/  
  className?: string;

  /\*\*  
   \* Un'opzione per personalizzare come viene renderizzata la descrizione.  
   \* Rende il componente polimorfico.  
   \*/  
  renderDescription?: (item: T) \=\> ReactNode;  
}

**Analisi:** L'uso di T extends BlurSliderItem è fondamentale. Permette all'utente del componente di passare un oggetto con campi extra (ad esempio, category: "headphones" o specifications: {...}) senza che TS si lamenti, purché abbia i campi base. renderDescription è un esempio di render prop per aumentare la polimorficità.

### ---

**Step 2: Componente Icona SVG (ExploreIcon.tsx)**

È buona norma estrarre gli SVG in componenti. Questo mantiene il componente principale pulito.

TypeScript

// ExploreIcon.tsx  
import React from 'react';

export const ExploreIcon: React.FC\<React.SVGProps\<SVGSVGElement\>\> \= (props) \=\> (  
  \<svg  
    width="16"  
    height="16"  
    viewBox="0 0 16 16"  
    fill="none"  
    xmlns="http://www.w3.org/2000/svg"  
    {...props}  
  \>  
    \<path  
      d="M3.33334 12.6667L12.6667 3.33333M12.6667 3.33333H4.66667M12.6667 3.33333V11.3333"  
      stroke="currentColor"  
      strokeWidth="1.5"  
      strokeLinecap="round"  
      strokeLinejoin="round"  
    /\>  
  \</svg\>  
);

### ---

**Step 3: Componente BlurSlider in React (BlurSlider.tsx)**

Ecco il componente principale. Utilizziamo swiper/react. **Nota:** Assicurati di aver installato swiper nel tuo progetto (npm install swiper).

TypeScript

// BlurSlider.tsx  
import React, { useMemo } from 'react';  
import { Swiper, SwiperSlide } from 'swiper/react';  
import 'swiper/css'; // Importa gli stili di base di Swiper  
import { BlurSliderItem, BlurSliderProps } from './types';  
import { ExploreIcon } from './ExploreIcon';  
import './BlurSlider.scss'; // Importa gli stili BEM

export const BlurSlider \= \<T extends BlurSliderItem\>({  
  items,  
  logoUrl,  
  buttonText \= 'Explore Product',  
  className \= '',  
  renderDescription,  
}: BlurSliderProps\<T\>) \=\> {  
  // Configurazione di Swiper come definita nel JS originale  
  const swiperParams \= useMemo(() \=\> ({  
    loop: true,  
    mousewheel: true,  
    slidesPerView: 4,  
    speed: 1500,  
    spaceBetween: 0,  
  }), \[\]);

  // Container principale con classe BEM  
  const componentClassName \= \`blur-slider ${className}\`.trim();

  return (  
    \<main className={componentClassName}\>  
      {/\* Logo opzionale \*/}  
      {logoUrl && (  
        \<div className="blur-slider\_\_logo"\>  
          \<img src={logoUrl} alt="EBuds Logo" className="blur-slider\_\_logo-image" /\>  
        \</div\>  
      )}

      {/\* Container di Swiper \*/}  
      \<Swiper {...swiperParams} className="blur-slider\_\_swiper"\>  
        {items.map((item) \=\> (  
          \<SwiperSlide key={item.id} className="blur-slider\_\_slide"\>  
              
            {/\* Struttura del contenuto dello slide, agnostico e BEM-compatibile \*/}  
            \<div className="blur-slider\_\_slide-content"\>  
              \<div className="blur-slider\_\_slide-content-info"\>  
                \<h2 className="blur-slider\_\_slide-content-title"\>{item.title}\</h2\>  
                {renderDescription ? (  
                  renderDescription(item)  
                ) : (  
                  \<p className="blur-slider\_\_slide-content-text"\>{item.description}\</p\>  
                )}  
              \</div\>  
              \<div className="blur-slider\_\_price"\>{item.price}\</div\>  
              \<a href={item.actionUrl} className="blur-slider\_\_action-button"\>  
                \<span className="blur-slider\_\_action-text"\>{buttonText}\</span\>  
                \<ExploreIcon className="blur-slider\_\_action-icon" /\>  
              \</a\>  
            \</div\>

            {/\* Container principale dell'immagine. Le classi Swiper faranno la magia visiva \*/}  
            \<div className="blur-slider\_\_slide-image-container"\>  
              \<img src={item.image} alt={item.title} className="blur-slider\_\_slide-image" /\>  
            \</div\>

            {/\* Container per l'effetto blur di sfondo. Usa la stessa immagine. \*/}  
            \<div className="blur-slider\_\_slide-image-blur-container"\>  
              \<img src={item.image} alt={item.title} className="blur-slider\_\_slide-image-blur" /\>  
            \</div\>

          \</SwiperSlide\>  
        ))}  
      \</Swiper\>  
    \</main\>  
  );  
};

**Analisi:** La struttura HTML è stata convertita per usare le classi BEM che definiremo nel file SCSS. Al pulsante "explore" è stato dato un tag \<a\> per renderlo semanticamente corretto per l'integrazione con l'IDE, e l'icona è stata inserita.

### ---

**Step 4: Struttura SCSS BEM (BlurSlider.scss)**

La parte più complessa. Riscriviamo la logica visiva in una struttura SCSS BEM pulita, mantenendo le CSS variables.

SCSS

// BlurSlider.scss  
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900\&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900\&display=swap');

// Definizione delle CSS Variables per configurare l'aspetto  
:root {  
  \--transition-duration: 1.5s;  
  \--transition\-timing: ease;  
  \--base-scale: 0.5;  
  \--active-scale: 2;  
  \--next-scale: 1.6;  
  \--next-plus-scale: 0.9;  
  \--base-blur: 20px;  
  \--next-blur: 0px;  
  \--next-plus-blur: 10px;  
  \--blur-effect: 50px;  
}

// Reset e stili base per il container principale  
.blur-slider {  
  margin: 0;  
  padding: 0;  
  box-sizing: border-box;  
  height: 100vh;  
  width: 100vw;  
  font-family: 'Roboto Condensed', sans-serif;  
  overflow: hidden; // Previene scrollbars indesiderate

  // Logo  
  &\_\_logo {  
    position: absolute;  
    left: 75px; // Posizionamento fisso come da video, può essere reso parametrico  
    top: 50px;  
    z-index: 10; // Sopra Swiper

    &-image {  
      width: 100px;  
      object\-fit: contain;  
    }  
  }

  // Swiper Container  
  &\_\_swiper {  
    height: 100%;  
    width: 100%;  
    overflow: hidden;  
  }

  // Slide Wrapper  
  &\_\_wrapper {  
    // Stili specifici per il wrapper, se necessari  
  }

  // Singolo Slide (Base)  
  &\_\_slide {  
    display: flex;  
    justify-content: center;  
    align-items: center;  
    transition: transform var(--transition-duration) var(--transition-timing);

    // \-- Stili per l'Immagine Principale (Default) \--  
    // Isola la logica visiva dell'immagine in un sotto-selettore BEM  
    &-image-container {  
      width: 300px;  
      aspect-ratio: 1;  
      filter: blur(var(--base-blur)); // Stato iniziale: piccolo e blurred  
      transition: all var(--transition-duration) var(--transition-timing);  
      scale: var(--base-scale);  
      opacity: 1;  
      transform: translateX(50%);  
    }

    &-image {  
      width: 100%;  
      height: 100%;  
      object\-fit: contain;  
    }

    // \-- Stili per l'Immagine di Sfondo (Blur) (Default) \--  
    &-image-blur-container {  
      opacity: 0;  
      position: absolute;  
      z-index: \-1;  
    }

    // \-- Stili per il Contenuto dello Slide (Default) \--  
    &-content {  
      position: absolute;  
      opacity: 0; // Nascosto di default  
      filter: blur(20px);  
      transition: opacity var(--transition-duration) ease-in-out, filter var(--transition-duration) ease-in-out;  
      width: 35vw;

      &-info {  
        // ...  
      }

      &-title {  
        font-size: 36px;  
        margin-bottom: 12px;  
        font-weight: 600;  
      }

      &-text {  
        font-family: 'Poppins', sans-serif;  
        font-size: 14px;  
        color: rgba(0, 0, 0, 0.8);  
      }  
    }

    // \-- Prezzo \--  
    .blur-slider\_\_price {  
      font-size: 30px;  
      margin\-block: 20px;  
      font-weight: 600;  
      color: \#959391;  
    }

    // \-- Pulsante d'Azione \--  
    .blur-slider\_\_action-button {  
      display: inline-flex; // inline-flex per un corretto comportamento del testo  
      background: transparent;  
      border: none;  
      font-family: 'Roboto Condensed', sans-serif;  
      font-weight: 600;  
      font-size: 18px;  
      text-transform: uppercase;  
      color: inherit; // Eredita il colore del testo  
      text-decoration: none; // Rimuove sottolineatura  
      align-items: center;  
    }

    // \-- Icona \--  
    .blur-slider\_\_action-icon {  
      width: 20px;  
      height: 20px;  
      margin-left: 10px;  
    }  
  }  
}

// \========================================================  
// \=== MAGIA VISIVA BASATA SULLE CLASSI SWIPER \===  
// \========================================================

.blur-slider {

  // Stato: Slide Attivo (.swiper-slide-active)  
  // L'immagine è enorme, spostata a sinistra e scompare.  
  &\_\_slide.swiper-slide-active &\_\_slide-image-container {  
    scale: var(--active-scale);  
    transform: translateX(-60%);  
    opacity: 0;  
  }

  // Stato: Slide Successivo (.swiper-slide-next)  
  // Lo slide intero è spostato a destra.  
  &\_\_slide.swiper-slide-next {  
    transform: translateX(50%);  
  }

  // L'immagine principale dello slide successivo: è quella chiara e magnified.  
  &\_\_slide.swiper-slide-next &\_\_slide-image-container {  
    filter: blur(var(--next-blur));  
    scale: var(--next-scale);  
    transform: translateX(20%);  
    opacity: 1;  
  }

  // L'effetto blur di sfondo compare solo nello slide successivo. Magnified e sfocato.  
  &\_\_slide.swiper-slide-next &\_\_slide-image-blur-container {  
    opacity: 0.5;  
    filter: blur(var(--blur-effect));  
    z-index: \-1;  
    transform: translate(100%);  
  }

  &\_\_slide.swiper-slide-next &\_\_slide-image-blur {  
    scale: var(--active-scale); // Scala dell'effetto blur  
  }

  // Il contenuto testuale compare solo nello slide successivo.  
  &\_\_slide.swiper-slide-next &\_\_slide-content {  
    transform: translateX(-80%);  
    opacity: 1;  
    filter: blur(0);  
  }

  // Stato: Slide Successivo \+ 1 (.swiper-slide-next \+ .blur-slider\_\_slide)  
  // È quello piccolo e molto sfocato sulla destra.  
  &\_\_slide.swiper-slide-next \+ &\_\_slide {  
    transform: translateX(30%);  
  }

  &\_\_slide.swiper-slide-next \+ &\_\_slide &\_\_slide-image-container {  
    filter: blur(var(--next-plus-blur));  
    scale: var(--next-plus-scale);  
    opacity: 1;  
  }  
}

**Analisi:** La gerarchia SCSS BEM ha isolato perfettamente la logica. I selettori di Swiper (.swiper-slide-active, etc.) sono stati integrati all'interno della struttura BEM per alterare gli elementi figli (&\_\_slide-image-container). L'uso dell'operatore \+ è rimasto fondamentale per lo slide next+1.

### ---

**Step 5: Dati Mock per Antigravity e Placeholder Immagini (mockData.ts)**

Per testare il componente e passarlo ad Antigravity, creiamo un file con dati di esempio e una logica per generare URL di placeholder. I placeholder useranno un colore basato sull'indice per essere distinguibili.

TypeScript

// mockData.ts  
import { BlurSliderItem } from './types';

// Array di colori per distinguere i placeholder  
const colors \= \['\#e94b3c', '\#2c3e50', '\#8e44ad', '\#27ae60', '\#f1c40f', '\#d35400'\];

/\*\*  
 \* Genera un URL per un'immagine placeholder dinamica.  
 \* Simula l'aspetto di un oggetto agnostico (con un testo).  
 \*/  
const getImageUrl \= (itemId: string | number, index: number) \=\> {  
  const color \= colors\[index % colors.length\].replace('\#', '');  
  return \`https://placehold.co/300x300/${color}/fff.png?text=Item%20${itemId}\`;  
};

/\*\*  
 \* Un esempio agnostico di dati per il slider.  
 \* Può rappresentare qualsiasi cosa: prodotti, servizi, etc.  
 \*/  
export const exampleItems: BlurSliderItem\[\] \= \[  
  {  
    id: 1,  
    title: 'Serenity X100',  
    description: 'Noise cancelling earbuds with spatial audio. Premium build and sound.',  
    price: '$279.00',  
    actionUrl: '\#product-1',  
    image: getImageUrl(1, 0),  
  },  
  {  
    id: 2,  
    title: 'Flowbeats Air',  
    description: 'Totally wireless high-performance earphones with up to 9 hours of listening time.',  
    price: '$249.99',  
    actionUrl: '\#product-2',  
    image: getImageUrl(2, 1),  
  },  
  {  
    id: 3,  
    title: 'FocusBuds Ultra',  
    description: 'World-renowned noise cancellation with up to 8.5 hours of battery life.',  
    price: '$199.00',  
    actionUrl: '\#product-3',  
    image: getImageUrl(3, 2),  
  },  
  {  
    id: 4,  
    title: 'Ambient Open',  
    description: 'Open ear design with spatialized sound. Hear the world around you.',  
    price: '$299.00',  
    actionUrl: '\#product-4',  
    image: getImageUrl(4, 3),  
  },  
  {  
    id: 5,  
    title: 'Adaptive Pro',  
    description: 'Advanced Adaptive Hybrid Noise Cancelling. Dual dynamic driver configuration.',  
    price: '$245.00',  
    actionUrl: '\#product-5',  
    image: getImageUrl(5, 4),  
  },  
  {  
    id: 6,  
    title: 'Hi-Fi Master 24',  
    description: 'Professional Hi-Fi in-ear monitors with 12 BA units per side.',  
    price: '$605.00',  
    actionUrl: '\#product-6',  
    image: getImageUrl(6, 5),  
  },  
\];

// Esempio agnostico di Logo  
export const exampleLogoUrl \= getImageUrl('Logo', 0);

**Analisi:** exampleItems è un array che implementa BlurSliderItem. I testi e i nomi sono agnostici. La funzione getImageUrl crea URL validi per immagini placeholder distinte. L'IDE Antigravity può usare questi dati per renderizzare il componente immediatamente.

### ---

**Step 6: Esempio di Utilizzo (App.tsx)**

Infine, ecco come integri il componente nel tuo progetto.

TypeScript

// App.tsx  
import React from 'react';  
import { BlurSlider } from './BlurSlider';  
import { exampleItems, exampleLogoUrl } from './mockData';  
import { BlurSliderItem } from './types';  
import './App.scss';

// Esempio di un tipo di dato esteso (polimorfismo)  
interface HeadphonesItem extends BlurSliderItem {  
  color: string;  
  category: 'headphones';  
}

// Dati polimorfici  
const customItems: HeadphonesItem\[\] \= exampleItems.map((item, index) \=\> ({  
  ...item,  
  color: index % 2 \=== 0 ? 'Black' : 'White',  
  category: 'headphones',  
}));

export const App: React.FC \= () \=\> {  
  return (  
    \<div className="app"\>  
        
      {/\* Utilizzo base e agnostico del componente \*/}  
      \<BlurSlider  
        items={exampleItems}  
        logoUrl={exampleLogoUrl}  
        buttonText="Explore product"  
        className="my-project-slider"  
      /\>

      {/\* Esempio di polimorfismo: usiamo un tipo di dato esteso (customItems).  
        Grazie a Typescript che estende BlurSliderItem, questo funziona\!  
        Aggiungiamo un renderDescription personalizzato.  
      \*/}  
      {/\*  
      \<BlurSlider  
        items={customItems}  
        logoUrl={exampleLogoUrl}  
        buttonText="Explore headphone"  
        className="my-project-slider--polymorphic"  
        renderDescription={(item: HeadphonesItem) \=\> (  
          \<div\>  
            \<p\>{item.description}\</p\>  
            \<p style={{ fontWeight: 'bold' }}\>Color: {item.color}\</p\>  
            \<p style={{ textTransform: 'uppercase' }}\>Category: {item.category}\</p\>  
          \</div\>  
        )}  
      /\>  
      \*/}  
    \</div\>  
  );  
};

export default App;

### **Riassunto**

Il componente "Gnomo BlurSlider" è stato creato seguendo le tue istruzioni. È pulito, sistematico e BEM-compatibile. La struttura Typescript con il tipo generico lo rende agnostico e polimorfo. È pronto per essere passato a Antigravity IDE per essere ricostruito, utilizzando i dati mock e i placeholder dinamici che simulano l'aspetto finale.

Per utilizzarlo nel tuo progetto, assicurati di aver installato swiper (npm install swiper). Se il tuo progetto non supporta SCSS, dovrai pre-compilare il file SCSS in CSS. Buona integrazione\!