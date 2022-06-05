require('dotenv').config()
const Cluster = require('discord-hybrid-sharding');

const manager = new Cluster.Manager(`${__dirname}/index.js`, {
    totalShards: "auto",
    shardsPerClusters: 2,
    token: process.env.token,
});

manager.on('clusterCreate', cluster => console.log(`Launched Cluster ${cluster.id}`));
manager.spawn({ timeout: -1 });