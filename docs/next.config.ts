import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  experimental: {
    turbopackUseSystemTlsCerts: true,
    // Every route here is statically prerendered and only changes on deploy, so
    // holding prefetched payloads longer than the 5min default stops a browsing
    // session from re-requesting pages it already has.
    staleTimes: {
      static: 1800,
      dynamic: 30,
    },
  },
  turbopack: {
    root: "..",
    resolveAlias: {
      "react-native": "react-native-web",
    },
    resolveExtensions: [".web.tsx", ".web.ts", ".web.js", ".tsx", ".ts", ".js"],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web",
    };
    config.resolve.extensions = [
      ".web.tsx",
      ".web.ts",
      ".web.js",
      ...(config.resolve.extensions || []),
    ];
    return config;
  },
  transpilePackages: ["react-native-web"],
};

const withMDX = createMDX();

export default withMDX(nextConfig);
