// next.config.js
const path = require('path');

module.exports = {
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    }
    return config;
  },
};
