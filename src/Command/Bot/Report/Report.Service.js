const { MessageEmbed, WebhookClient } = require('discord.js');

const Logger = require('../../../Service/Logger.Service');
const ErrorService = require('../../../Service/Error.Service');

class ReportService
{
    constructor()
    {
        this.error = false;
        this.errorService = new ErrorService();
    }

    async optionsValidation(Interaction, Type)
    {
        this.type = Type;

        if (Type !== 'bug' && Type !== 'idea')
        {
            this.error = true;

            Logger.error(Error);

            return this.errorService.send(Interaction, 'Bad Request', 'That type of your sorting request is not supported.');
        }
    }

    async structure(Interaction)
    {
        this.type = await Interaction.options.getString('type');
        this.content = Interaction.options.getString('content');
        this.webhook = new WebhookClient({ url: process.env.REPORT_EVENT_WEBHOOK });

        this.resultEmbed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setThumbnail(process.env.FAVICON)
            .setAuthor(
                {
                    name: `${Interaction.user.username} \n  ${Interaction.user.id}`,
                    iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 2048 })}`
                })
            .setTitle(`A New ${this.type.toString()} was Reported`)
            .setDescription(`> ${this.content}`)
            .setFooter(
                {
                    text: process.env.EMBED_BOT_COMMANDS_FOOTER,
                    iconURL: process.env.FAVICON
                })
            .setTimestamp();

        this.responsembed = new MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setThumbnail(process.env.FAVICON)
            .setAuthor(
                {
                    name: `${Interaction.user.username} \n  ${Interaction.user.id}`,
                    iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 2048 })}`
                })
            .setTitle(`A New ${this.type.toString()} was Reported, Thanks for your participate!`)
            .setDescription(`> ${this.content}`)
            .setFooter(
                {
                    text: process.env.EMBED_BOT_COMMANDS_FOOTER,
                    iconURL: process.env.FAVICON
                })
            .setTimestamp();
    }

    async send(Interaction)
    {
        try
        {
            const Type = await Interaction.options.getString('type');

            await this.optionsValidation(Interaction, Type);
            await this.structure(Interaction);

            if (!this.error)
            {
                await this.webhook.send({ embeds: [ this.resultEmbed ] });

                return Interaction.reply({ embeds: [ this.responsembed ], ephemeral: true })
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

module.exports = ReportService;
