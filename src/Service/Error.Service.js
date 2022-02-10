const { MessageEmbed , MessageButton , MessageActionRow } = require('discord.js');

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

        const Collector = Interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 120000  });

        Collector.on('collect', async (Event) =>
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
            await this.structure(Interaction, Title || 'ارور از سرویس', Description || 'ارور از سرویس ما است با ریپورت کردن آن مارا از این ارور با خبر کنید تا به زودی فیکس شود');

            return await Interaction.reply({ embeds: [ this.embed ], components : [ this.row ] });
        }
        catch (Error)
        {
            Logger.error(Error)

            await this.structure(Interaction, 'ارور از سرویس', 'ارور از سرویس ما است با ریپورت کردن آن مارا از این ارور با خبر کنید تا به زودی فیکس شود');

            return await Interaction.update({ embeds: [ this.embed ], components : [ this.row ] });
        }
    }
}

module.exports = ErrorService;
