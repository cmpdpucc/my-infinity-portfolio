"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import type { Experience } from "@/data/experiences.data";

/**
 * AnimatedTerminal — macOS-style terminal with 5-step FSM animation.
 *
 * Steps: idle → typing → loading → code-revealed → interactive-CLI
 *
 * Props:
 * - feature: Experience data (code, commands, tech, terminalTitle)
 * - isVisible: triggers the animation sequence when true
 */

interface AnimatedTerminalProps {
  feature: Experience;
  isVisible: boolean;
}

interface InteractionState {
  status: "idle" | "typing" | "running" | "done";
  command: string | null;
  output: string | null;
}

const FULL_COMMAND = "> executing module load...";

export default function AnimatedTerminal({ feature, isVisible }: AnimatedTerminalProps) {
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [interaction, setInteraction] = useState<InteractionState>({
    status: "idle",
    command: null,
    output: null,
  });
  const bottomRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Step 1→4 animation sequence triggered by isVisible
  useEffect(() => {
    if (!isVisible || step !== 0) return;

    setStep(1);
    let i = 0;
    const typingInterval = setInterval(() => {
      setTypedText(FULL_COMMAND.slice(0, i + 1));
      i++;
      if (i >= FULL_COMMAND.length) {
        clearInterval(typingInterval);

        const t1 = setTimeout(() => setStep(2), 400);
        const t2 = setTimeout(() => {
          setStep(3);
          const t3 = setTimeout(() => {
            setStep(4);
            scrollToBottom();
          }, 800);
          timeoutsRef.current.push(t3);
        }, 900);
        timeoutsRef.current.push(t1, t2);
      }
    }, 40);

    return () => {
      clearInterval(typingInterval);
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [isVisible, step]);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleCommand = useCallback(
    (cmd: { name: string; output: string }) => {
      setInteraction({ status: "typing", command: cmd.name, output: null });
      scrollToBottom();

      const t1 = setTimeout(() => {
        setInteraction({ status: "running", command: cmd.name, output: null });
        const t2 = setTimeout(() => {
          setInteraction({ status: "done", command: cmd.name, output: cmd.output });
          scrollToBottom();
        }, 800);
        timeoutsRef.current.push(t2);
      }, 400);
      timeoutsRef.current.push(t1);
    },
    [scrollToBottom]
  );

  /** Syntax highlight via regex — no external libs */
  const highlightCode = (raw: string): string =>
    raw
      .replace(
        /(const|let|var|async|await|function|return|import|from|export|interface|type|new)/g,
        '<span class="pf-terminal__kw">$1</span>'
      )
      .replace(
        /(Promise|CartItem|Locale|OrderResult|ThemeProvider|GridLayout|Section|RefObject)/g,
        '<span class="pf-terminal__type">$1</span>'
      )
      .replace(
        /(@\w+)/g,
        '<span class="pf-terminal__decorator">$1</span>'
      );

  const cmdSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "_");

  return (
    <div className="pf-terminal">
      {/* macOS chrome header */}
      <div className="pf-terminal__header">
        <div className="pf-terminal__dots">
          <span className="pf-terminal__dot pf-terminal__dot--red" />
          <span className="pf-terminal__dot pf-terminal__dot--yellow" />
          <span className="pf-terminal__dot pf-terminal__dot--green" />
        </div>
        <div className="pf-terminal__title">
          <span>&gt;_</span> {feature.terminalTitle}
        </div>
      </div>

      {/* Terminal body */}
      <div className="pf-terminal__body">
        {/* Typing line + tech badge */}
        <div className="pf-terminal__prompt-row">
          <div className="pf-terminal__prompt">
            <span className="pf-terminal__cursor-text">
              {typedText}
              {step < 3 && <span className="pf-terminal__cursor" />}
            </span>
          </div>
          <div
            className={`pf-terminal__tech-badge ${step >= 1 ? "pf-terminal__tech-badge--visible" : ""}`}
          >
            {feature.tech}
          </div>
        </div>

        {/* Code block */}
        <div className={`pf-terminal__code ${step >= 3 ? "pf-terminal__code--visible" : ""}`}>
          <pre>
            <code dangerouslySetInnerHTML={{ __html: highlightCode(feature.code) }} />
          </pre>
        </div>

        {/* Interactive CLI */}
        <div className={`pf-terminal__cli ${step >= 4 ? "pf-terminal__cli--visible" : ""}`}>
          {interaction.status === "idle" && (
            <div className="pf-terminal__cli-idle">
              <div className="pf-terminal__cli-ready">
                <span className="pf-terminal__cli-chevron">❯</span> Interactive shell ready.
                <span className="pf-terminal__cursor pf-terminal__cursor--small" />
              </div>
              <div className="pf-terminal__cli-buttons">
                {feature.commands.map((cmd) => (
                  <button
                    key={cmd.name}
                    type="button"
                    className="pf-terminal__cmd-btn"
                    onClick={() => handleCommand(cmd)}
                  >
                    ./{cmdSlug(cmd.name)}.sh
                  </button>
                ))}
              </div>
            </div>
          )}

          {interaction.status === "typing" && (
            <div className="pf-terminal__cli-line">
              <span className="pf-terminal__cli-chevron">❯</span>{" "}
              ./{interaction.command && cmdSlug(interaction.command)}.sh
              <span className="pf-terminal__cursor pf-terminal__cursor--small" />
            </div>
          )}

          {interaction.status === "running" && (
            <div className="pf-terminal__cli-running">
              <div className="pf-terminal__cli-line pf-terminal__cli-line--muted">
                <span className="pf-terminal__cli-chevron">❯</span>{" "}
                ./{interaction.command && cmdSlug(interaction.command)}.sh
              </div>
              <div className="pf-terminal__cli-spinner">
                Executing sequence... <span className="pf-terminal__pulse">⠋</span>
              </div>
            </div>
          )}

          {interaction.status === "done" && (
            <div className="pf-terminal__cli-done">
              <div className="pf-terminal__cli-line pf-terminal__cli-line--muted">
                <span className="pf-terminal__cli-chevron">❯</span>{" "}
                ./{interaction.command && cmdSlug(interaction.command)}.sh
              </div>
              <div className="pf-terminal__cli-output">{interaction.output}</div>
              <button
                type="button"
                className="pf-terminal__cli-clear"
                onClick={() => setInteraction({ status: "idle", command: null, output: null })}
              >
                [ Clear Terminal ]
              </button>
            </div>
          )}
        </div>

        {/* Auto-scroll anchor */}
        <div ref={bottomRef} className="pf-terminal__anchor" />
      </div>
    </div>
  );
}
