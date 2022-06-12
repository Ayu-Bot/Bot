const {
  Client
} = require('discord.js')
const {
  REST
} = require('@discordjs/rest');
const {
  Routes
} = require('discord-api-types/v9');


const {
  readdirSync
} = require('fs')
const {
  join
} = require('path')

module.exports = class extends Client {
  constructor(options) {
    super(options)
    this.commands = []
    this.loadCommands()
    this.loadEvents()
  }
  async lang(opt) {
    try {
      const lang = require(`./Lang/${opt.lang}/${opt.cmd}.json`) || require(`./Lang/en-us/${opt.cmd}.json`);
      return lang;
    } catch(e) {
      const lang = require(`./Lang/en-us/${opt.cmd}.json`);
      return lang;
    }
  }
  async registryCommands() {
    this.application.commands.set(this.commands)
    // this.cluster.broadcastEval(`this.guilds.cache.get("${process.env.guild_id}").commands.set(${this.commands})`)
  }
  loadCommands(path = 'src/commands') {
    const categories = readdirSync(path)

    for (const category of categories) {
      const commands = readdirSync(`${path}/${category}`)

      for (const command of commands) {
        const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`))
        const cmd = new (commandClass)(this)

        this.commands.push(cmd)
      }
    }
  }
  loadEvents(path = 'src/events') {
    const categories = readdirSync(path)

    for (const category of categories) {
      const events = readdirSync(`${path}/${category}`)

      for (const event of events) {
        const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`))
        const evt = new (eventClass)(this)

        this.on(evt.name, evt.run)
      }
    }
  }
}