const Event = require('../../structures/Event')
const Users = require('../../structures/models/Users')
const Guilds = require('../../structures/models/Guilds')
const {
    MessageActionRow,
    MessageButton,
    MessageSelectMenu,
    Modal,
    MessageEmbed,
    TextInputComponent 
} = require('discord.js');
 
module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }
    run = async (interaction) => {
        if (interaction.isSelectMenu()) {

	         if (interaction.customId === '1') {
		          const user = await Users.findOne({
            _id: interaction.member.id
        });
        const guild = await Guilds.findOne({
            _id: interaction.guild.id
        });
        const lang = await this.client.lang({
            lang: user.lang,
            cmd: 'settings'
        })

        const string = JSON.stringify(lang.text)

            .replace("{server.icon}", interaction.guild.icon ? interaction.guild.iconURL({
                dynamic: true,
                size: 4096
            }) : "https://images-ext-2.discordapp.net/external/e1gcFO1q8Kbd5NgJFZipzHfDols2Xnwx5la_wrgePmI/%3Fsize%3D256/https/media.discordapp.net/stickers/976959827559456828.png")

            .replace("{server.name}", interaction.guild.name)
            .replace("{welcome_ch.id}", guild.config.welcome.channel?`<#${guild.config.welcome.channel}>`:":shrug:")
            .replace("\"{welcome.message}\"", JSON.stringify(guild.config.welcome.message))

        const json = JSON.parse(string)

        const embed = json.embeds;
        const embedF = {
                title: embed[0].title,
                description: embed[0].description,
                thumbnail: {
                    url: embed[0].thumbnail.url
                },
                fields: [],
                color: "#0099ff"
            }
         const select = new MessageSelectMenu().setCustomId("1").addOptions([{
                emoji: "<:join:975529668440649778>",
                label: lang.select[0].label,
                value: 'welcomeMsg',
                description: lang.select[0].description
            }]);
          const button = new MessageButton().setCustomId('welcomedit')
					.setLabel(lang.button[0].label)
					.setStyle('SECONDARY');

        const row = new MessageActionRow()
            .addComponents(select);

        const buttons = new MessageActionRow()
            .addComponents(button);
        embedF.description = embed[1].description;
        embedF.fields = embed[1].fields;
        interaction.update({embeds: [embedF], components: [buttons, row]})
	         }
      } else if(interaction.isButton()) {
            if (interaction.customId === 'welcomedit') {
             const user = await Users.findOne({
            _id: interaction.member.id
        });
        const guild = await Guilds.findOne({
            _id: interaction.guild.id
        });
        const lang = await this.client.lang({
            lang: user.lang,
            cmd: 'settings'
        })

        const string = JSON.stringify(lang.text)

            .replace("{server.icon}", interaction.guild.icon ? interaction.guild.iconURL({
                dynamic: true,
                size: 4096
            }) : "https://images-ext-2.discordapp.net/external/e1gcFO1q8Kbd5NgJFZipzHfDols2Xnwx5la_wrgePmI/%3Fsize%3D256/https/media.discordapp.net/stickers/976959827559456828.png")

            .replace("{server.name}", interaction.guild.name)
            .replace("{welcome_ch.id}", guild.config.welcome.channel?`<#${guild.config.welcome.channel}>`:":shrug:")
            .replace("\"{welcome.message}\"", JSON.stringify(guild.config.welcome.message))

        const json = JSON.parse(string)

        const embed = json.embeds;
        const embedF = {
                title: embed[0].title,
                description: embed[0].description,
                thumbnail: {
                    url: embed[0].thumbnail.url
                },
                fields: [],
                color: "#0099ff"
            }
         const select = new MessageSelectMenu().setCustomId("1").addOptions([{
                emoji: "<:join:975529668440649778>",
                label: lang.select[0].label,
                value: 'welcomeMsg',
                description: lang.select[0].description
            }]);
          const button = new MessageButton().setCustomId('welcomedit')
					.setLabel(lang.button[0].label)
					.setStyle('SECONDARY');

        const row = new MessageActionRow()
            .addComponents(select);

        const buttons = new MessageActionRow()
            .addComponents(button); 
             
             const welcomeChInput = new TextInputComponent()
			           .setCustomId('channel')
		            	.setLabel("What's some of your favorite hobbies?")
              .setMinLength(18)
              .setMaxLength(18)
			           .setStyle(1);

             const welcomech = new MessageActionRow().addComponents(welcomeChInput);

             const modal = new Modal()
             .setCustomId('modal')
			          .setTitle(lang.modal[0].title);
             modal.addComponents(welcomech);
             await interaction.showModal(modal) 
            }
          }
    }
}
