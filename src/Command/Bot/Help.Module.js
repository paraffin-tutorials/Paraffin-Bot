const { MessageActionRow, MessageEmbed , MessageSelectMenu  } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Help Menu!'),
	async execute(interaction) 
    {
      const row = new MessageActionRow()
     .addComponents(
     new MessageSelectMenu()
     .setCustomId(`${interaction.id}-menuhelp`)
     .setPlaceholder('Help Menu')
     .addOptions([
         {
             label: 'Service',
             description: 'Bot Services Like : Random Toturials and ...',
             value: 'page1',
           
         },
         {
             label: 'Web',
             description: 'Website info',
             value: 'page2',
            
         },
         {
             label: 'Bot',
             description: 'Bot Commands And Options',
             value: 'page3',
             
         },
        ])
 )

 
       const help = new MessageEmbed()
       .setAuthor(`Paraffin Toturials ` , "https://paraffin-tutorials.ir/img/favicon.png")
       .setDescription(`**Hi ${interaction.user.username}
       Welcome To Paraffin Toturials Bot \n You Can Use Bottom Menu To Know Bot Commands**`)
      .setThumbnail("https://paraffin-tutorials.ir/img/favicon.png")
      .setFooter("Paraffin Help")
      .setColor('RED')
      .setTimestamp()

 await interaction.reply({embeds: [help], components: [row]})

 const collector = interaction.channel.createMessageComponentCollector({componentType: 'SELECT_MENU', time: 60000  })

 collector.on('collect', async i => {

    if(i.customId === `${interaction.id}-menuhelp`) {
   
    if(i.values[0] === 'page1') {
        const help = new MessageEmbed()
      .setAuthor("Services")
      .setThumbnail("https://paraffin-tutorials.ir/img/favicon.png")
      .setFooter("Paraffin Help")
      .setColor('RED')
      .setTimestamp()
  
        await i.deferUpdate();
        await i.followUp({embeds: [help], ephemeral: true})
    }
 }
 if(i.customId === `${interaction.id}-menuhelp`) {
   
    if(i.values[0] === 'page2') {
        const help = new MessageEmbed()
        .setAuthor("Website")
        .setDescription("")
        .setThumbnail("https://paraffin-tutorials.ir/img/favicon.png")
        .setFooter("Paraffin Help")
        .setColor('RED')
        .setTimestamp()

        await i.deferUpdate();
        await i.followUp({embeds: [help], ephemeral: true})
    }
 }
 if(i.customId === `${interaction.id}-menuhelp`) {
   
    if(i.values[0] === 'page3') {
        const help = new MessageEmbed()
        .setAuthor('Bot')
        .setDescription('')
        .setThumbnail("https://paraffin-tutorials.ir/img/favicon.png")
      .setFooter("Paraffin Help")
      .setColor('RED')
      .setTimestamp()

        await i.deferUpdate();
        await i.followUp({embeds: [help], ephemeral: true})
    }
 }
  
})
}
}