const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed , WebhookClient } = require('discord.js');


module.exports =
    {
        data: new SlashCommandBuilder()
            .setName('report')
            .setDescription('Report Bug Or Id')
            .addStringOption((Option) => Option
                .setName('type')
                .setDescription('entekhab konid ')
                .addChoice('Bug','bug')
                .addChoice('Idea', 'idea')
                .setRequired(true))
                .addStringOption(options => options.setName('text').setDescription('Text Your report').setRequired(true)),

     

        async execute(Interaction)
        {
            const Type = await Interaction.options.getString('type');
            const text = Interaction.options.getString('text');
            const webhook = new WebhookClient({ url: 'webhookUrl' });

            if(Type === "bug")
            {
             const embed = new MessageEmbed()
             .setTitle("Report Bug Form")
            .setAuthor( {
                name: `${Interaction.user.username} \n  ${Interaction.user.id}`,
                iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 2048 })}`
                })
             .setDescription(` > ${text}`)
             .setThumbnail("https://paraffin-tutorials.ir/image/favicon.png")
             .setFooter(
             {
             text: "Paraffin Report Handler",
             iconURL: 'https://paraffin-tutorials.ir/image/favicon.png'
             })
             .setColor("RED")
             .setTimestamp()
             webhook.send({embeds : [embed]})
          return Interaction.reply({content : "Your Report Submited" , ephemeral: true})
            }

            
            if(Type === "idea")
            {
             const embed = new MessageEmbed()
             .setTitle("Report idea Form")
            .setAuthor( {
                name: `${Interaction.user.username} \n  ${Interaction.user.id}`,
                iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 2048 })}`
                })
             .setDescription(` > ${text}`)
             .setThumbnail("https://paraffin-tutorials.ir/image/favicon.png")
             .setFooter(
             {
             text: "Paraffin Report Handler",
             iconURL: 'https://paraffin-tutorials.ir/image/favicon.png'
             })
             .setColor("RED")
             .setTimestamp()
             webhook.send({embeds : [embed]})
          return Interaction.reply({content : "Your Report Submited" , ephemeral: true})
            }
           
        }
    };
