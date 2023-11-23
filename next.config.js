/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com"],
  },
 
};
module.exports = async () => {
  const { i18n } = await import("./i18n");
  nextConfig.i18n = i18n;
  return nextConfig;
};

module.exports = nextConfig;
