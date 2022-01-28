const  { MessageEmbed, MessageActionRow , MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = 
       {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('say cmd')
    .addStringOption(o => o.setName('text').setDescription('متن شما').setRequired(true)),

    async execute(interaction, bot) 
    {
   
        const say = interaction.options.getString('text');
        if(say.includes('@')) return interaction.reply({content: `ag everyone ya here ya kasio mention kard mige ke kerm narize XD`, ephemeral: true})
          await interaction.reply({content: `${say}`});

            }
    }
