module.exports = {
  apps: [
    {
      name: 'NGO',
      port: 3100,
      exec_mode: 'cluster',
      instances: '1',
      script: './.output/server/index.mjs',
      args: 'preview',
    },
  ],
}
