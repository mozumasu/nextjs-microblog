/** @type {import('next').NextConfig} */
const path = require('path')

/** Next.jsの設定値 */
const nextConfig = {
  reactStrictMode: true,
  /** WebPack の設定を追加 */
  webpack: (config) => {
    // Vue と同じように 「@ = src/」,「~ = src/」に設定する。
    // => モジュールのパス解決とエイリアスを設定している。
    config.resolve.alias['@'] = path.resolve(__dirname, 'src')
    config.resolve.alias['~'] = path.join(__dirname, 'src')
    config.resolve.alias['@lib'] = path.resolve(__dirname, 'lib')
    config.resolve.alias['~lib'] = path.join(__dirname, 'lib')
    config.resolve.alias['@types'] = path.resolve(__dirname, 'types')
    config.resolve.alias['~types'] = path.join(__dirname, 'types')
    config.resolve.alias['@components'] = path.resolve(__dirname, 'components')
    config.resolve.alias['~components'] = path.join(__dirname, 'components')
    return config
  },
}

module.exports = nextConfig

module.exports = {
  images: {
    domains: ['images.microcms-assets.io'], // 使用するホスト名をここに追加
  },
}
