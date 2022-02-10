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

    async typeValidation(Interaction, Type)
    {
        this.type = Type;

        if (Type !== 'bug' && Type !== 'idea')
        {
            this.error = true;

            return this.errorService.send(Interaction, 'ارور از درخواست', 'تایپ انتخاب شده اشتباه میباشید لطفا فقط تایپ های پیشنهادی را انتخاب کنید');
        }
    }

    async structure(Interaction)
    {
        const Type = await Interaction.options.getString('type');
        const Content = Interaction.options.getString('content');
        this.webhook = new WebhookClient({ url: 'webhookUrl' });

        switch (Type)
        {
            case 'bug':
            {
                this.embed = new MessageEmbed()
                    .setColor(process.env.EMBED_COLOR)
                    .setThumbnail(process.env.FAVICON_LINK)
                    .setAuthor(
                        {
                            name: `${Interaction.user.username} \n  ${Interaction.user.id}`,
                            iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 2048 })}`
                        })
                    .setTitle('Report Bug Form')
                    .setDescription(`> ${Content}`)
                    .setFooter(
                        {
                            text: process.env.EMBED_BOT_COMMANDS_FOOTER,
                            iconURL: process.env.FAVICON_LINK
                        })
                    .setTimestamp();

                break;
            }
            case 'idea':
            {
                this.embed = new MessageEmbed()
                    .setColor(process.env.EMBED_COLOR)
                    .setThumbnail(process.env.FAVICON_LINK)
                    .setAuthor(
                        {
                            name: `${Interaction.user.username} \n  ${Interaction.user.id}`,
                            iconURL: `${Interaction.user.displayAvatarURL({ dynamic: true, size: 2048 })}`
                        })
                    .setTitle('Report idea Form')
                    .setDescription(`> ${Content}`)
                    .setFooter(
                        {
                            text: process.env.EMBED_BOT_COMMANDS_FOOTER,
                            iconURL: process.env.FAVICON_LINK
                        })
                    .setTimestamp();

                break;
            }
        }
    }

    async send(Interaction)
    {
        try
        {
            await this.typeValidation();
            await this.structure();

            if (!this.error)
            {
                await this.webhook.send({embeds: [this.embed]});

                return Interaction.reply({ content : 'Your Report Submited' , ephemeral: true })
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

module.exports = ReportService;
