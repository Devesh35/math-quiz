import type { NextConfig } from 'next';

const nextEnv = Object.fromEntries(
  Object.entries(process.env).filter(([key]) => key.startsWith('NEXT_ENV_')),
);

const nextConfig: NextConfig = {
  env: nextEnv,
};

export default nextConfig;
