import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { dev }) {
    // Only push the MiniCssExtractPlugin in production builds
    if (!dev) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash].css',
          chunkFilename: 'static/css/[id].[contenthash].css',
        })
      ),
      config.externals.push({
        'react-native-config': 'react-native-config',
      })
    }

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',  // Allow all domains for demo purposes
      },
      {
        protocol: 'http', 
        hostname: '**', // Allow all hostnames
      },
    ],
  },
};

export default nextConfig;
