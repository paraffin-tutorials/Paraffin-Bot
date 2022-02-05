const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed , MessageButton , MessageActionRow} = require("discord.js")

module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('error')
            .setDescription('bot error'),

        async execute(Interaction)
        {
            const row = new MessageActionRow()
            .addComponents(
                    new MessageButton()
                    .setLabel('Invite Bot')
                    .setEmoji("🟠")
                    .setURL('https://google.com')
                    .setStyle('LINK'),
                   
                    new MessageButton()
                    .setLabel('Paraffin') 
                    .setCustomId("paraffin")
                    .setEmoji("🟠")
                    .setStyle('DANGER'),

                
                   
                    );
            const embed = new MessageEmbed()
            .setTitle("شما به ارور خوردید")
            .setDescription('شما به ارور نخوردید')
            .setColor("RED")
            .addFields(
                { name: `توش بنویص مهم نی`, value: 'مهم ', inline: false  },
                { name: `توش بنویص مهم نی`, value: 'مهم', inline: false },
            )
            .setFooter("Paraffin Bot")
            await Interaction.reply({ embeds: [embed] , components :[row]});

         

            const filter = i => i.customId === 'paraffin' && i.user.id === '556854910805737478';

            const collector = Interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

           collector.on('collect', async i => {
         	if (i.customId === 'primary') {
	     	await i.update({ content: 'yo!', components: [] });
      	}
       });

collector.on('end', collected => console.log(`Collected ${collected.size} items`));
            
                
                },
            };
        
        
    
