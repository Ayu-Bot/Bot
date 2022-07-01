require('dotenv').config()
const {
  ShardingManager
} = require('discord.js');

const manager = new ShardingManager(`${__dirname}/index.js`, {
  totalShards: 'auto',
  token: process.env.token,
});

manager.on('shardCreate', shard => {
  console.log(`Launched Shard ${shard.id}`)
});
manager.spawn({
  timeout: -1
});