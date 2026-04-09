// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["uiqsapqeamvjotcihlgc.supabase.co"], // <-- Add your Supabase project domain here
  },
};

export default nextConfig;