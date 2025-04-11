const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 👈 Add this line
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname)
    return config
  },
}

module.exports = nextConfig
