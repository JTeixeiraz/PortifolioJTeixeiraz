"use client";

import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFlutter, SiDart,
  SiNodedotjs, SiExpress, SiPython, SiFastapi, SiDjango, SiFlask,
  SiPostgresql, SiMongodb, SiFirebase, SiSupabase, SiSqlite,
  SiDocker, SiGithubactions, SiGit,
  SiAnthropic, SiGooglegemini, SiNvidia, SiOpenjdk, SiSharp,
} from "react-icons/si";
import { VscAzure, VscAzureDevops } from "react-icons/vsc";
import { LABELS, STACK } from "@/lib/content";
import { useT } from "@/lib/i18n";
import { SectionHeading } from "@/components/section-heading";
import LogoLoop from "@/components/reactbits/logo-loop";
import { Reveal } from "@/components/ui/reveal";

/** Só entra aqui o que ele usou para entregar algo que está no ar. */
const MARKS = [
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiReact />, title: "React" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiTailwindcss />, title: "Tailwind CSS" },
  { node: <SiNodedotjs />, title: "Node.js" },
  { node: <SiExpress />, title: "Express" },
  { node: <SiPython />, title: "Python" },
  { node: <SiFastapi />, title: "FastAPI" },
  { node: <SiDjango />, title: "Django" },
  { node: <SiFlask />, title: "Flask" },
  { node: <SiPostgresql />, title: "PostgreSQL" },
  { node: <SiMongodb />, title: "MongoDB" },
  { node: <SiSqlite />, title: "SQLite" },
  { node: <VscAzure />, title: "Microsoft Azure" },
  { node: <VscAzureDevops />, title: "Azure DevOps" },
  { node: <SiDocker />, title: "Docker" },
  { node: <SiGithubactions />, title: "GitHub Actions" },
  { node: <SiSupabase />, title: "Supabase" },
  { node: <SiFirebase />, title: "Firebase" },
  { node: <SiFlutter />, title: "Flutter" },
  { node: <SiDart />, title: "Dart" },
  { node: <SiOpenjdk />, title: "Java" },
  { node: <SiSharp />, title: "C#" },
  { node: <SiAnthropic />, title: "Anthropic Claude" },
  { node: <SiGooglegemini />, title: "Google Gemini" },
  { node: <SiNvidia />, title: "NVIDIA NIM" },
  { node: <SiGit />, title: "Git" },
];

export function Stack() {
  const t = useT();
  const labels = t(LABELS);
  const groups = t(STACK);

  return (
    <section
      id="stack"
      className="border-y border-line bg-surface py-24 lg:py-32"
      aria-labelledby="stack-heading"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <SectionHeading id="stack-heading" index="009">
          {labels.stack}
        </SectionHeading>
      </div>

      {/* A fita de marcas: reconhecimento imediato, sem virar sopa de logos. */}
      <div className="mt-12 border-y border-line py-8 lg:mt-16">
        <LogoLoop
          logos={MARKS}
          speed={44}
          logoHeight={30}
          gap={52}
          hoverSpeed={0}
          fadeOut
          scaleOnHover
          ariaLabel={t({ pt: "Ferramentas que uso", en: "Tools I use" })}
          className="text-ink-3"
        />
      </div>

      {/* A leitura de verdade: agrupada pelo que cada grupo resolve. */}
      <div className="mx-auto mt-12 grid max-w-[1320px] grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 xl:rounded-[18px]">
        {groups.map((group, i) => (
          <Reveal key={group.group} delay={i * 0.04} className="bg-surface p-6 sm:p-8">
            <p className="type-mono text-[0.6rem] text-signal-lite">
              {group.group}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
              {group.items.map((item) => (
                <li key={item} className="text-[0.9rem] leading-snug text-ink-2">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
