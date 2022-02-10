const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const Logger = require('../../../Service/Logger.Service');
const ErrorService = require('../../../Service/Error.Service');

class InviteService
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
                    .setLabel('Full Permission')
                    .setEmoji('<:LinkIcon:939151538792824842>')
                    .setURL(process.env.FULL_PERMISSION_INVITE_LINK)
                    .setStyle('LINK'),
            )
            .addComponents(
                new MessageButton()
                    .setLabel('Standard Permission')
                    .setEmoji('<:LinkIcon:939151538792824842>')
                    .setURL(process.env.STANDARD_PERMISSION_INVITE_LINK)
                    .setStyle('LINK'),
            )
            .addComponents(
                new MessageButton()
                    .setLabel('Zero Permission')
                    .setEmoji('<:LinkIcon:939151538792824842>')
                    .setURL(process.env.ZERO_PERMISSION_INVITE_LINK)
                    .setStyle('LINK')
            );

        this.embed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setThumbnail(process.env.FAVICON_LINK)
            .setAuthor(
                {
                    name: 'Invite Paraffin-Bot with these button or links!'
                })
            .addFields(
                {
                    name: 'Full Permission',
                    value: `[Invite Link](${process.env.FULL_PERMISSION_INVITE_LINK})`
                },
                {
                    name: 'Standard Permission',
                    value: `[Invite Link](${process.env.STANDARD_PERMISSION_INVITE_LINK})`
                },
                {
                    name: 'Zero Permission',
                    value: `[Invite Link](${process.env.ZERO_PERMISSION_INVITE_LINK})`
                }
            )
            .setFooter(
                {
                    text: process.env.EMBED_BOT_COMMANDS_FOOTER,
                    iconURL: process.env.FAVICON_LINK
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
                return Interaction.reply({ embeds: [ this.embed ] , components :[ this.row ]});
            }
            else
            {
                return this.errorService.send(Interaction);
            }
        }
        catch (Error)
        {
            this.error = true;

            Logger.error(Error);

            return this.errorService.send(Interaction);
        }
    }
}

module.exports = InviteService;
