const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('testt')
            .setDescription('test cmd'),

        async execute(Interaction)
        {
            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('paraffin')
                    .setLabel('test')
                    .setStyle('DANGER')
                    .setEmoji('🎉'),
                    );
 
    const filter = i => i.user.id === `${Interaction.user.id}`;
    
    const collector = Interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
    
    collector.on('collect', async i => {
        if (i.customId === 'paraffin') {
            const embed = new MessageEmbed()
            .setDescription("paraffin double be mola")
            await i.update({ embeds: [embed], components: [] });
        }
    });
    
    collector.on('end', async collected => {
        const embed = new MessageEmbed()
        .setDescription("vaghtet tamom shod vas click kardn dokme be mola")
        Interaction.editReply({embeds : [embed] , components: []})
    });
    
    
           const embed = new MessageEmbed()
           .setDescription("paraffin")

            return Interaction.reply({ embeds : [embed] , components: [row]});
        },
    };
      