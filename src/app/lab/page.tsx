import { AsciiArt } from "@/components/ui/ascii-art";
import { PRESETS } from "@/lib/ascii";

/** Laboratório: os dois presets lado a lado, sobre o campo procedural. */
export default function Lab() {
  return (
    <main className="grid min-h-dvh grid-cols-1 gap-4 bg-well p-4 md:grid-cols-2">
      {(["electricGaze", "vignetteBloom"] as const).map((k) => (
        <div key={k} className="relative h-[92dvh] overflow-hidden rounded-xl bg-well">
          <AsciiArt alt={k} config={PRESETS[k]} className="h-full w-full" />
          <span className="type-mono absolute left-3 top-3 text-[0.6rem] text-signal-lite">
            {k}
          </span>
        </div>
      ))}
    </main>
  );
}
