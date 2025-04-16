module.exports = {
  apps: [
    {
      name: "totalconect",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "development",
        PORT: 3000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
}

