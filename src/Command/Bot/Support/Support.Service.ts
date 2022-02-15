const { MessageEmbed, MessageActionRow, MessageButton } from 'discord.js');

const Logger from '../../../Service/Logger.Service');
const ErrorService from '../../../Service/Error.Service');

class SupportService
{
    constructor()
    {
        this.error = false;
        this.errorService = new ErrorService();
    }

    async structure()
    {
        this.row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Join')
                    .setEmoji('<:LinkIcon:939151538792824842>')
                    .setURL(process.env.DISCORD_INVITE_LINK)
                    .setStyle('LINK')
            );

        this.embed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setThumbnail(process.env.FAVICON)
            .setAuthor(
                {
                    name: 'Paraffin Tutorials support discord server!'
                })
            .addFields(
                {
                    name: 'Discord Server',
                    value: `[Link](${process.env.DISCORD_INVITE_LINK})`,
                    inline: true,
                }
            )
            .setFooter(
                {
                    text: process.env.EMBED_WEB_COMMANDS_FOOTER,
                    iconURL: process.env.FAVICON
                })
            .setTimestamp();
    }

    async send(Interaction)
    {
        try
        {
            await this.structure();

            if (!this.error)
            {
                return Interaction.reply({ embeds: [ this.embed ], components :[ this.row ]});
            }
        }
        catch (Error)
        {
            this.error = true;

            Logger.error(Error);

            return await this.errorService.send(Interaction);
        }
    }
}

module.exports = SupportService;
