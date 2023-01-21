/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "placeimg.com",
				port: "",
				pathname: "**",
			},
		],
	},
	output: "standalone",
};

module.exports = nextConfig
