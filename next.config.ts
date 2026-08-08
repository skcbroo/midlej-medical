import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Painel comercial estático (public/dash/index.html). Serve /dash sem
      // barra final apontando para o arquivo estático; os assets usam caminho
      // absoluto /dash/... e são servidos nativamente pelo public/.
      { source: "/dash", destination: "/dash/index.html" },
    ];
  },
};

export default nextConfig;
