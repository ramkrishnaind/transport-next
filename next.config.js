module.exports = {
  images: {
    domains: ["whiteglove23.s3.ap-south-1.amazonaws.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      // issuer: {
      //   test: /\.(js|ts)x?$/,
      //  // for webpack 5 use
      //  // { and: [/\.(js|ts)x?$/] }
      // },

      use: ["@svgr/webpack"],
    });

    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
