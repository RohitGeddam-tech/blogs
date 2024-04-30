module.exports = {
  apps: [
    {
      name: "blogs",
      script: "npm run dev",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
