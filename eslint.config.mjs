import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // Vendored third-party components (21st.dev / Motiq). Their mount and
    // hydration guards set state from an effect on purpose; rewriting them
    // would fork upstream for no behavioural gain.
    files: [
      "src/components/ui/animated-gradient.tsx",
      "src/components/ui/border-beam-panel.tsx",
    ],
    rules: { "react-hooks/set-state-in-effect": "off" },
  },
]);

export default eslintConfig;
