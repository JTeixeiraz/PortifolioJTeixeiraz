import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The home directory above this project also carries a lockfile; pin the
  // root so Turbopack does not infer the wrong one.
  turbopack: { root: __dirname },
  // Every route is static and nothing uses next/image or a route handler, so
  // the site ships as plain files — no Node runtime to keep alive on the host.
  output: "export",
};

export default nextConfig;
