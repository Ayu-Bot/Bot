require('dotenv').config()
const {
  ShardingManager
} = require('discord.js');

const manager = new ShardingManager(`${__dirname}/index.js`, {
  totalShards: 2,
  token: process.env.token,
});

manager.on('shardCreate', shard => {
  console.log(`Launched Shard ${shard.id}`)
});
manager.spawn({
  timeout: -1
});