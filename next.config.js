const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  reactStrictMode: true,
  env: {
    endpoint: isProd ? '': 'http://127.0.0.1:3000',
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
}
