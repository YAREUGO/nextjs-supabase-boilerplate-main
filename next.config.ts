import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "img.clerk.com" }],
  },
  // 파일 감시 시스템 파일 제외 (Watchpack 에러 방지)
  // Vercel 배포 시에는 webpack 설정이 무시될 수 있음
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 클라이언트 사이드에서만 적용
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/node_modules/**",
          "**/.next/**",
          "**/pagefile.sys",
          "**/DumpStack.log.tmp",
          "**/hiberfil.sys",
          "**/swapfile.sys",
        ],
      };
    }
    return config;
  },
  // Vercel 배포 최적화
  output: "standalone",
};

export default nextConfig;
