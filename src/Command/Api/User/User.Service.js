const axios = require('axios');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const Logger = require('../../../Service/Logger.Service');
const ErrorService = require('../../../Service/Error.Service');
const { FormatDate } = require('../../../Service/Helper.Service');

class RandomService
{
    constructor()
    {
        this.error = false;
        this.errorService = new ErrorService();
    }

    async data(Interaction)
    {
        this.response = await axios.get(`https://api.paraffin-tutorials.ir/api/${process.env.API_VERSION}/users/${this.username}`);

        if (this.response.data?.status !== 'success')
        {
            this.error = true;

            return this.errorService.send(Interaction, 'ارور از وب سرویس' , 'کاربری با این نام کاربری پیدا نشد');
        }
    }

    async structure(Interaction)
    {
        this.userTags = [];
        this.tutorialsPerEmbed = 5;
        this.tutorialsCurrentEmbed = 1;
        this.tutorialsCurrentArray = 0;
        this.tutorialsCurrentArrayItem = 1;
        this.userTutorials = [ [], [], [], [], [], [], [], [], [], [] ];
        this.tutorialsLastEmbed = Math.ceil(this.response.data.tutorials.length / this.tutorialsPerEmbed);

        if (this.tutorialsLastEmbed === 0)
        {
            this.tutorialsLastEmbed = 1;
        }

        for (const Tag of this.response.data.user.tags)
        {
            this.userTags.push(Tag)
        }

        for (const Tutorial of this.response.data.tutorials)
        {
            if (this.tutorialsCurrentArrayItem <= (this.tutorialsCurrentArray + 1) * this.tutorialsPerEmbed)
            {
                this.tutorialsCurrentArrayItem = this.tutorialsCurrentArrayItem + 1;
                this.userTutorials[this.tutorialsCurrentArray].push(`[${Tutorial.name}](https://paraffin-tutorials.ir/tutorials/${Tutorial.name})`);
            }
            else
            {
                this.tutorialsCurrentArray = this.tutorialsCurrentArray + 1;
            }
        }

        this.userProfileRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('More')
                    .setEmoji('<:LinkIcon:939151538792824842>')
                    .setURL('https://paraffin-tutorials.ir/users/' + this.response.data.user.username)
                    .setStyle('LINK'),

                new MessageButton()
                    .setCustomId('PAGE_TUTORIALS')
                    .setLabel('Tutorials')
                    .setEmoji('<:TutorialIcon:939152819523567636>')
                    .setStyle('DANGER')
            );

        this.userProfileEmbed = new MessageEmbed()
            .setColor(this.response.data.user.baseColor)
            .setThumbnail(process.env.IMAGE_LINK + this.response.data.user.profile)
            .setAuthor(
                {
                    name: this.response.data.user.username.toUpperCase() + ' (profile)'
                })
            .setDescription(
                `> ${this.response.data.user.description}` +
                '\n\n**<:HashIcon:940924838338523176> Tags:**' +
                '```' + (this.userTags.join(' - ') || '') + '```'
            )
            .addFields(
                {
                    name: '**<:AwardIcon:940919059539722260> Subscription:**',
                    value: '```' + ((this.response.data.user.premium ? 'ویژه' : 'عادی') || 'عادی') + '```',
                    inline: true
                },
                {
                    name: '**<:PeopleIcon:940921189436641300> Followers:**',
                    value: '```' + (this.response.data.followers.length || 0) + '```',
                    inline: true
                },
                {
                    name: '**<:PeopleIcon:940921189436641300> Followings:**',
                    value: '```' + (this.response.data.followings.length || 0) + '```',
                    inline: true
                },
                {
                    name: '**<:BookIcon:940923075027939358> Tutorials:**',
                    value: '```' + (this.response.data.tutorials.length || 0) + '```',
                    inline: true
                },
                {
                    name: '**<:CalenderIcon:940919983305801809> Created At:**',
                    value: '```' + (FormatDate(this.response.data.user.createdAt) || '1 Jan 1970') + '```',
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
                    iconURL: process.env.FAVICON_LINK
                })
            .setTimestamp();

        this.userTutorialsRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('More')
                    .setEmoji('<:LinkIcon:939151538792824842>')
                    .setURL('https://paraffin-tutorials.ir/users/' + this.response.data.user.username + '/tutorials')
                    .setStyle('LINK'),

                new MessageButton()
                    .setCustomId('PAGE_PROFILE')
                    .setLabel('Profile')
                    .setEmoji('<:TutorialIcon:939152819523567636>')
                    .setStyle('DANGER')
            );

        this.userTutorialsControllerRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setDisabled(true)
                    .setCustomId('PREVIOUS_PAGE_TUTORIALS')
                    .setEmoji('<:Left:849352126881857538>')
                    .setStyle('DANGER'),

                new MessageButton()
                    .setDisabled(true)
                    .setCustomId('NEXT_PAGE_TUTORIALS')
                    .setEmoji('<:Right:849352129381531668>')
                    .setStyle('DANGER')
            );

        if (this.tutorialsLastEmbed > this.tutorialsCurrentEmbed)
        {
            this.userTutorialsControllerRow.components[1].setDisabled(false)
        }

        this.userTutorialsEmbed = new MessageEmbed()
            .setColor(this.response.data.user.baseColor)
            .setThumbnail(process.env.IMAGE_LINK + this.response.data.user.profile)
            .setAuthor(
                {
                    name: this.response.data.user.username.toUpperCase() + ` (tutorials 1/${this.tutorialsLastEmbed})`
                })
            .setDescription(
                `**> ${this.userTutorials[0]?.join('\n > ') || ''}**`
            )
            .setFooter(
                {
                    text: process.env.EMBED_SERVICE_COMMANDS_FOOTER,
                    iconURL: process.env.FAVICON_LINK
                })
            .setTimestamp();

        if (this.response.data.user.background !== '/image/background/background-user-default.jpg')
        {
            this.userProfileEmbed.setImage(process.env.IMAGE_LINK + this.response.data.user.background)
        }

        const Collector = Interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 120000  });

        Collector.on('collect', async (Event) =>
        {
            if (Event.customId === 'PAGE_TUTORIALS')
            {
                return await Event.update({ embeds: [ this.userTutorialsEmbed ], components: [ this.userTutorialsControllerRow, this.userTutorialsRow ] });
            }
            else if (Event.customId === 'PAGE_PROFILE')
            {
                return await Event.update({ embeds: [ this.userProfileEmbed ], components: [ this.userProfileRow ] });
            }
            else if (Event.customId === 'PREVIOUS_PAGE_TUTORIALS')
            {
                if (this.tutorialsCurrentEmbed > 1)
                {
                    this.tutorialsCurrentEmbed = this.tutorialsCurrentEmbed - 1;
                    this.tutorialsCurrentArray = this.tutorialsCurrentArray - 1;
                    this.userTutorialsControllerRow.components[1].setDisabled(false)
                }

                if (this.tutorialsCurrentEmbed === 1)
                {
                    this.userTutorialsControllerRow.components[0].setDisabled(true)
                }

                this.userTutorialsEmbed
                    .setAuthor(
                        {
                            name: this.response.data.user.username.toUpperCase() + ` (tutorials ${this.tutorialsCurrentEmbed}/${this.tutorialsLastEmbed})`
                        })
                    .setDescription(
                        `**> ${this.userTutorials[this.tutorialsCurrentArray]?.join('\n > ') || ''}**`
                    )

                return await Event.update({ embeds: [ this.userTutorialsEmbed ], components: [ this.userTutorialsControllerRow, this.userTutorialsRow ] });
            }
            else if (Event.customId === 'NEXT_PAGE_TUTORIALS')
            {
                if (this.tutorialsCurrentEmbed < this.tutorialsLastEmbed)
                {
                    this.tutorialsCurrentEmbed = this.tutorialsCurrentEmbed + 1;
                    this.userTutorialsControllerRow.components[0].setDisabled(false)

                    if (this.tutorialsCurrentEmbed === this.tutorialsLastEmbed)
                    {
                        this.userTutorialsControllerRow.components[1].setDisabled(true)
                    }
                }

                this.userTutorialsEmbed
                    .setAuthor(
                        {
                            name: this.response.data.user.username.toUpperCase() + ` (tutorials ${this.tutorialsCurrentEmbed}/${this.tutorialsLastEmbed})`
                        })
                    .setDescription(
                        `**> ${this.userTutorials[this.tutorialsCurrentArray]?.join('\n > ') || ''}**`
                    )

                return await Event.update({ embeds: [ this.userTutorialsEmbed ], components: [ this.userTutorialsControllerRow, this.userTutorialsRow ] });
            }
        });
    }

    async send(Interaction, Data, Type)
    {
        try
        {
            if (Type === 'RANDOM_COMMAND')
            {
                if (!Data)
                {
                    return this.errorService.send(Interaction);
                }

                this.response = Data;

                await this.structure(Interaction);

            }
            else
            {
                this.username = Interaction.options.getString('username');

                await this.data(Interaction);
                await this.structure(Interaction);
            }

            if (!this.error)
            {
                return await Interaction.reply({ embeds: [ this.userProfileEmbed ], components: [ this.userProfileRow ] });
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

module.exports = RandomService;
