const Command = require('../../structures/Command')
const Users = require('../../structures/models/Users')
const quizApi = require('../../structures/quiz.json')
const { joinVoiceChannel } = require("@discordjs/voice");
const { addSpeechEvent } = require("discord-speech-recognition");


module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: 'quiz',
      description: '[Development]',
    })
    this.quiz = {
      api: quizApi,
      soundtrack: function(soundtrackName) {
        return require(`../../structures/soundtracks/${soundtrackName}.mp3`)
      }
      
    }
  }
  run = async (interaction) => {
    const user = await Users.findOne({
      _id: interaction.member.id
    });
    
  }
}