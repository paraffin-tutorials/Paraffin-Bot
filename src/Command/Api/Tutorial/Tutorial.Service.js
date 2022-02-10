const axios = require('axios');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const Logger = require('../../../Service/Logger.Service');
const ErrorService = require('../../../Service/Error.Service');
const { FormatDate } = require('../../../Service/Helper.Service');

class TutorialService
{
    constructor()
    {
        this.error = false;
        this.errorService = new ErrorService();
    }

    async data(Interaction)
    {
        this.response = await axios.get(`https://api.paraffin-tutorials.ir/api/${process.env.API_VERSION}/tutorials/${this.name}`);

        if (this.response.data?.status !== 'success')
        {
            this.error = true;

            return this.errorService.send(Interaction, 'ارور از وب سرویس' , 'آموزشی با این نام پیدا نشد');
        }

    }

    async structure(Interaction)
    {
        this.tutorialRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('More')
                    .setEmoji('<:LinkIcon:939151538792824842>')
                    .setURL('https://paraffin-tutorials.ir/tutorials/' + this.response.data.tutorial.name)
                    .setStyle('LINK'),

                new MessageButton()
                    .setLabel('Refresh')
                    .setCustomId('PAGE_TUTORIAL_REFRESH')
                    .setEmoji('<:RepeatIcon:941290998171045928>')
                    .setStyle('DANGER')
            );

        this.tutorialEmbed = new MessageEmbed()
            .setColor(this.response.data.author.baseColor)
            .setThumbnail(process.env.IMAGE_LINK + this.response.data.author.profile)
            .setImage(process.env.IMAGE_LINK + this.response.data.tutorial.image)
            .setAuthor(
                {
                    name: this.response.data.tutorial.name.toUpperCase() + ((this.response.data.tutorial.edited ? '' : 'ویرایش شده') || '')
                })
            .setDescription(
                `> **${this.response.data.tutorial.title}**` +
                '\n> ' +
                `\n> ${this.response.data.tutorial.description}`
            )
            .addFields(
                {
                    name: '**<:PenIcon:940921189004640276> Author:**',
                    value: '```' + this.response.data.author.username + '```',
                    inline: true
                },
                {
                    name: '**<:HeartIcon:940919983024766986> Likes:**',
                    value: '```' + (this.response.data.tutorial.likes || 0)  + '```',
                    inline: true
                },
                {
                    name: '**<:EyeIcon:940920543408955464> Views:**',
                    value: '```' + (this.response.data.tutorial.views || 0) + '```',
                    inline: true
                },
                {
                    name: '**<:CommentIcon:940922931863764992> Comments:**',
                    value: '```' + (this.response.data.tutorial.comments || 0) + '```',
                    inline: true
                },
                {
                    name: '**<:CpuIcon:940922798367440896> Hardship Level:**',
                    value: '```' + (this.response.data.tutorial.hardshipLevel || 'آسان') + '```',
                    inline: true
                },
                {
                    name: '**<:CpuIcon:940922798367440896> Training Level:**',
                    value: '```' + (this.response.data.tutorial.trainingLevel || 'مبتدی') + '```',
                    inline: true
                },
                {
                    name: '**<:CalenderIcon:940919983305801809> Created At:**',
                    value: '```' + (FormatDate(this.response.data.tutorial.createdAt) || '1 Jan 1970') + '```',
                    inline: true
                },
                {
                    name: '**<:ReplyIcon:940919376121565235> Requested By:**',
                    value: '```' + ((Interaction.user.username + '#' + Interaction.user.discriminator) || 'GOD') + '```',
                    inline: true
                }
            )
            .setFooter(
                {
                    text: process.env.EMBED_SERVICE_COMMANDS_FOOTER,
                    iconURL: process.env.FAVICON
                })
            .setTimestamp();
    }

    async buttonCollector(Interaction)
    {
        this.collector = Interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 120000  });

        this.collector.on('collect', async (Event) =>
        {
            if (Event.customId === 'PAGE_TUTORIAL_REFRESH')
            {
                await this.data(Interaction);

                this.tutorialRow = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel('More')
                            .setEmoji('<:LinkIcon:939151538792824842>')
                            .setURL('https://paraffin-tutorials.ir/tutorials/' + this.response.data.tutorial.name)
                            .setStyle('LINK'),

                        new MessageButton()
                            .setLabel('Refresh')
                            .setCustomId('PAGE_REFRESH')
                            .setEmoji('<:RepeatIcon:941290998171045928>')
                            .setStyle('DANGER')
                    );

                this.tutorialEmbed = new MessageEmbed()
                    .setColor(this.response.data.author.baseColor)
                    .setThumbnail(process.env.IMAGE_LINK + this.response.data.author.profile)
                    .setImage(process.env.IMAGE_LINK + this.response.data.tutorial.image)
                    .setAuthor(
                        {
                            name: this.response.data.tutorial.name.toUpperCase() + ((this.response.data.tutorial.edited ? '' : 'ویرایش شده') || '')
                        })
                    .setDescription(
                        `> **${this.response.data.tutorial.title}**` +
                        '\n> ' +
                        `\n> ${this.response.data.tutorial.description}`
                    )
                    .addFields(
                        {
                            name: '**<:PenIcon:940921189004640276> Author:**',
                            value: '```' + this.response.data.author.username + '```',
                            inline: true
                        },
                        {
                            name: '**<:HeartIcon:940919983024766986> Likes:**',
                            value: '```' + (this.response.data.tutorial.likes || 0)  + '```',
                            inline: true
                        },
                        {
                            name: '**<:EyeIcon:940920543408955464> Views:**',
                            value: '```' + (this.response.data.tutorial.views || 0) + '```',
                            inline: true
                        },
                        {
                            name: '**<:CommentIcon:940922931863764992> Comments:**',
                            value: '```' + (this.response.data.tutorial.comments || 0) + '```',
                            inline: true
                        },
                        {
                            name: '**<:CpuIcon:940922798367440896> Hardship Level:**',
                            value: '```' + (this.response.data.tutorial.hardshipLevel || 'آسان') + '```',
                            inline: true
                        },
                        {
                            name: '**<:CpuIcon:940922798367440896> Training Level:**',
                            value: '```' + (this.response.data.tutorial.trainingLevel || 'مبتدی') + '```',
                            inline: true
                        },
                        {
                            name: '**<:CalenderIcon:940919983305801809> Created At:**',
                            value: '```' + (FormatDate(this.response.data.tutorial.createdAt) || '1 Jan 1970') + '```',
                            inline: true
                        },
                        {
                            name: '**<:ReplyIcon:940919376121565235> Requested By:**',
                            value: '```' + ((Interaction.user.username + '#' + Interaction.user.discriminator) || 'GOD') + '```',
                            inline: true
                        }
                    )
                    .setFooter(
                        {
                            text: process.env.EMBED_SERVICE_COMMANDS_FOOTER,
                            iconURL: process.env.FAVICON
                        })
                    .setTimestamp();

                return await Event.update({ embeds: [ this.tutorialEmbed ], components: [ this.tutorialRow ] });
            }
        });
    }

    async send(Interaction, Data, Type)
    {
        try
        {
            switch (Type)
            {
                case 'RANDOM_COMMAND':
                {
                    if (!Data)
                    {
                        return this.errorService.send(Interaction);
                    }

                    this.response = Data;

                    await this.structure(Interaction);
                    await this.buttonCollector(Interaction);

                    break;
                }
                default:
                {
                    this.name = Interaction.options.getString('name');

                    await this.data(Interaction);
                    await this.structure(Interaction);
                    await this.buttonCollector(Interaction);

                    break;
                }
            }

            if (!this.error)
            {
                return await Interaction.reply({ embeds: [ this.tutorialEmbed ], components: [ this.tutorialRow ] });
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

module.exports = TutorialService;
