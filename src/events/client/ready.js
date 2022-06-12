const Event = require('../../structures/Event')
const ms = require('ms');
const chalk = require('chalk')
module.exports = class extends Event {
  constructor(client) {
    super(client, {
      name: 'ready'
    })
  }
  run = async () => {
    this.client.user.setStatus("online")
    // console.log(`Bot ${this.client.user.username} logado com sucesso em ${this.client.guilds.cache.size} servidores.`)
    this.client.registryCommands()
    console.log(`Bot ${this.client.user.username} is online in ${this.client.guilds.cache.size} servers, note by coder: ${chalk.green("BURBUR STINKS")}`)
    setInterval(() => {
      this.client.user.setActivity({
        name: `Estou online à ${ms(this.client.uptime)}`
      })
    }, 20000)
  }
}