import React from "react";
import Spotlight from "@/components/Spotlight";
import DecryptedText from "@/components/DecryptedText";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0 relative">
      <Spotlight />
      
      <div className="lg:flex lg:justify-between lg:gap-4 relative z-10">
        
        {/* LEFT COLUMN - Fixed Header */}
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl font-serif">
              <a href="/">Developer Name</a>
            </h1>
            <h2 className="mt-3 text-lg font-medium tracking-tight text-ink sm:text-xl">
              <DecryptedText text="Senior Software Engineer & Product Designer" speed={60} />
            </h2>
            <p className="mt-4 max-w-xs leading-normal text-ink-muted">
              I build pixel-perfect, engaging, and accessible digital experiences.
            </p>
            
            {/* Nav Placeholder */}
            <nav className="nav hidden lg:block" aria-label="In-page jump links">
              <ul className="mt-16 w-max">
                <li>
                  <a className="group flex items-center py-3" href="#about">
                    <span className="nav-indicator mr-4 h-px w-8 bg-zinc-600 transition-all group-hover:w-16 group-hover:bg-accent group-focus-visible:w-16 group-focus-visible:bg-accent motion-reduce:transition-none"></span>
                    <span className="nav-text text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-ink group-focus-visible:text-ink">About</span>
                  </a>
                </li>
                <li>
                  <a className="group flex items-center py-3" href="#experience">
                    <span className="nav-indicator mr-4 h-px w-8 bg-zinc-600 transition-all group-hover:w-16 group-hover:bg-accent group-focus-visible:w-16 group-focus-visible:bg-accent motion-reduce:transition-none"></span>
                    <span className="nav-text text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-ink group-focus-visible:text-ink">Experience</span>
                  </a>
                </li>
                <li>
                  <a className="group flex items-center py-3" href="#projects">
                    <span className="nav-indicator mr-4 h-px w-8 bg-zinc-600 transition-all group-hover:w-16 group-hover:bg-accent group-focus-visible:w-16 group-focus-visible:bg-accent motion-reduce:transition-none"></span>
                    <span className="nav-text text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-ink group-focus-visible:text-ink">Projects</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Social Links Placeholder */}
          <ul className="ml-1 mt-8 flex items-center aria-label='Social media'">
            <li className="mr-5 text-xs text-ink-muted hover:text-ink transition-colors cursor-pointer">Github</li>
            <li className="mr-5 text-xs text-ink-muted hover:text-ink transition-colors cursor-pointer">LinkedIn</li>
            <li className="mr-5 text-xs text-ink-muted hover:text-ink transition-colors cursor-pointer">CodePen</li>
          </ul>
        </header>

        {/* RIGHT COLUMN - Scrolling Content */}
        <main className="pt-24 lg:w-1/2 lg:py-24">
          <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
            <h2 className="text-xl font-bold uppercase tracking-widest text-ink lg:hidden mb-4">About</h2>
            <div className="text-ink-muted [&>p]:mb-4">
              <p>
                As a developer who bridges the gap between design and engineering, I specialize in building products that are beautiful, accessible, and performant. My journey started with a fascination for interactive UI, drawing inspiration from top-tier portfolios and implementing complex animations that surprise and delight users.
              </p>
              <p>
                When I'm not pushing pixels or wrangling React components, I'm usually exploring the latest WebGL techniques or contributing to the developer community.
              </p>
            </div>
          </section>

          <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
            <h2 className="text-xl font-bold uppercase tracking-widest text-ink lg:hidden mb-4">Experience</h2>
            <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-zinc-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
              <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 sm:col-span-2">2024 — Present</header>
              <div className="z-10 sm:col-span-6">
                <h3 className="font-medium leading-snug text-ink">
                  <div>
                    <a className="inline-flex items-baseline font-medium leading-tight text-ink hover:text-accent focus-visible:text-accent  group/link text-base" href="#" aria-label="Senior Frontend Engineer at Kimi Inc">
                      <span>Senior Frontend Engineer · Kimi Inc</span>
                    </a>
                  </div>
                </h3>
                <p className="mt-2 text-sm leading-normal text-ink-muted">
                  Built the core architecture for the new visual coding platform. Integrated AI subagents and crafted a resilient UI using Tailwind v4.
                </p>
                <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                  <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium leading-5 text-accent">React</div></li>
                  <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium leading-5 text-accent">Next.js</div></li>
                  <li className="mr-1.5 mt-2"><div className="flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium leading-5 text-accent">Tailwind</div></li>
                </ul>
              </div>
            </div>
          </section>

          <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
            <h2 className="text-xl font-bold uppercase tracking-widest text-ink lg:hidden mb-4">Projects</h2>
            <div className="text-ink-muted">
              <p>Projects showcase section coming next with React Bits integrations.</p>
            </div>
          </section>
        </main>

      </div>
    </div>
  );
}
