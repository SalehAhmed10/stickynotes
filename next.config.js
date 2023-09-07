/** @type {import('next').NextConfig} */
const nextConfig = {
  // allow cross-origin requests from localhost
  async headers() {
    return [
      {
        source: "/api/notes",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, DELETE",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
