const Command = require('../../structures/Command')
const Users = require('../../structures/models/Users')
const cooldown = new Set();
const cooldownTime = 30000;
module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'work',
      description: 'Work to earn money!'
    })
  }
  run = async function(interaction) {
    const user = await Users.findOne({
      _id: interaction.member.id
    });
    const lang = await this.client.lang({
      lang: user.lang || "pt-br", cmd: 'work'
    });
    var random = Math.floor(Math.random(500) * 50000)
    if (!user) return interaction.reply(lang.error);
    var success = lang.text.replace("{money}", random)
    if (cooldown.has(interaction.user.id)) return interaction.reply({
      content: lang.cooldown, type: 'EPHEMERAL'
    });
    
    user.economy.coins += random;
    user.save();
    interaction.reply(success)
    cooldown.add(interaction.user.id);
    setTimeout(() => {
      cooldown.delete(interaction.user.id);
    }, cooldownTime);
  }
}