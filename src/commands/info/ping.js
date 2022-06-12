const Command = require('../../structures/Command')
const Users = require('../../structures/models/Users')

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      description: 'Mostra o ping do bot.'
    })
  }
  run = async (interaction) => {
    const user = await Users.findOne({
      _id: interaction.member.id
    });
    const lang = await this.client.lang({
      lang: user.lang, cmd: 'ping'
    });
    const text = lang.text.replace("{ping}", this.client.ws.ping)
    this.client.shard.broadcastEval(c => c.guilds.cache.get("699025090943123606").channels.cache).then(info => console.info(info));
    interaction.reply({
      content: `${text}`,
      flags: "EPHEMERAL"
    })
    /*interaction.reply({
            content: `Atual ping de Ayu é \`${this.client.ws.ping}\`ms.`,
            flags: "EPHEMERAL"
        })*/
  }
}