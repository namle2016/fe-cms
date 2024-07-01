/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'fapi.yalycouture.com',
            },
            {
                protocol: 'https',
                hostname: 'media.yalycouture.click',
            },
        ],
    },
};

export default nextConfig;
