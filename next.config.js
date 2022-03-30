const dotenv = require('dotenv');
const fs = require('fs');

if (process.env.ENVIRONMENT) {
  const env = process.env.ENVIRONMENT
  const envFile = `./.env.${env}`
  require('dotenv').config({ path: envFile })

  const envConfig = dotenv.parse(fs.readFileSync(envFile))
  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
