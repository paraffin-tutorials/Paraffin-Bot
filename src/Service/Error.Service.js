const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

const Logger = require('./Logger.Service');
const HelpService = require('../Command/Bot/Help/Help.Service');

class ErrorService
{
    constructor()
    {
        this.helpService = new HelpService('PAGE_ERROR');
    }

    async structure(Interaction, Title, Description)
    {
        this.row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Help')
                    .setCustomId('PAGE_HELP')
                    .setEmoji('<:MotherboardWitheIcon:941210207458058271>')
                    .setStyle('DANGER')
            );

        this.embed = new MessageEmbed()
            .setTitle(Title)
            .setDescription(Description)
            .setFooter(
                {
                    text: process.env.EMBED_ERROR_COMMANDS_FOOTER,
                    iconURL: process.env.FAVICON
                })
            .setColor(process.env.EMBED_COLOR)
            .setTimestamp();
    }

    async buttonCollector(Interaction)
    {
        this.collector = await Interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 120000  });

        this.collector.on('collect', async (Event) =>
        {
            if (Event.customId === 'PAGE_HELP')
            {
                await this.helpService.structure(Interaction, 'PAGE_ERROR', Event);
            }
        });
    }

    async send(Interaction, Title, Description)
    {
        try
        {
            await this.structure(Interaction, Title || 'Internal Server Error', Description || 'Error is from our service. By reporting it, let us know about this error so that it can be fixed soon');
            await this.buttonCollector(Interaction);

            return await Interaction.followUp({ embeds: [ this.embed ], components : [ this.row ] });
        }
        catch (Error)
        {
            Logger.error(Error);

            await this.structure(Interaction, 'Internal Server Error', 'Error is from our service. By reporting it, let us know about this error so that it can be fixed soon');
            await this.buttonCollector(Interaction);

            return await Interaction.followUp({ embeds: [ this.embed ], components : [ this.row ] });
        }
    }
}

module.exports = ErrorService;
