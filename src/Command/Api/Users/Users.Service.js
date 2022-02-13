const axios = require('axios');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const Logger = require('../../../Service/Logger.Service');
const ErrorService = require('../../../Service/Error.Service');
const { FormatDate } = require('../../../Service/Helper.Service');

class RandomService
{
    constructor()
    {
        this.currentEmbed = 1;
        this.currentArray = 0;
        this.error = false;
        this.errorService = new ErrorService();
    }

    async optionsValidation(Interaction)
    {
        if (this.sort !== 'followers' && this.sort !== 'following' && this.sort !== 'username' && this.sort !== 'createAt')
        {
            this.error = true;

            return this.errorService.send(Interaction, 'Bad Request', 'That type of your sorting request is not supported.');
        }
    }

    async data(Interaction)
    {
        try
        {
            this.response = await axios.get(`https://api.paraffin-tutorials.ir/api/${process.env.API_VERSION}/users?skip=${this.currentArray}&limit=1&sort=${this.sort}`);

            if (this.response.data?.status !== 'success')
            {
                this.error = true;

                Logger.error(this.response);

                return this.errorService.send(Interaction, 'Internal Api Error');
            }
        }
        catch (Error)
        {
            this.error = true;

            Logger.error(Error);

            return await this.errorService.send(Interaction);
        }
    }

    async structure(Interaction)
    {
        try
        {
            if (!this.error)
            {
                this.userControllerRow = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId(Interaction.id + '_PREVIOUS_PAGE_USERS')
                            .setEmoji('<:Left:849352126881857538>')
                            .setStyle('DANGER'),

                        new MessageButton()
                            .setCustomId(Interaction.id + '_NEXT_PAGE_USERS')
                            .setEmoji('<:Right:849352129381531668>')
                            .setStyle('DANGER')
                    );

                this.userRow = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel('More')
                            .setEmoji('<:LinkIcon:939151538792824842>')
                            .setURL('https://paraffin-tutorials.ir/users/' + this.response.data.users[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].username)
                            .setStyle('LINK')
                    );

                this.userEmbed = new MessageEmbed()
                    .setColor(this.response.data.users[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].baseColor)
                    .setThumbnail(process.env.IMAGE_LINK + this.response.data.users[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].profile)
                    .setAuthor(
                        {
                            name: `${this.response.data.users[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].username.toUpperCase()} (${this.currentEmbed}/${this.response.data.usersCount})`
                        })
                    .setDescription(
                        `> ${this.response.data.users[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].description}` +
                        '\n\n**<:HashIcon:940924838338523176> Tags:**' +
                        '```' + (this.response.data.users[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].tags.join(' - ') || '') + '```'
                    )
                    .addFields(
                        {
                            name: '**<:AwardIcon:940919059539722260> Subscription:**',
                            value: '```' + ((this.response.data.users[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].premium ? 'ویژه' : 'عادی') || 'عادی') + '```',
                            inline: true
                        },
                        {
                            name: '**<:PeopleIcon:940921189436641300> Followers:**',
                            value: '```' + (this.response.data.users[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].followers || 0) + '```',
                            inline: true
                        },
                        {
                            name: '**<:PeopleIcon:940921189436641300> Followings:**',
                            value: '```' + (this.response.data.users[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].following || 0) + '```',
                            inline: true
                        },
                        {
                            name: '**<:BookIcon:940923075027939358> Tutorials:**',
                            value: '```' + (this.response.data.users[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].tutorials.length || 0) + '```',
                            inline: true
                        },
                        {
                            name: '**<:CalenderIcon:940919983305801809> Created At:**',
                            value: '```' + (FormatDate(this.response.data.users[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].createdAt) || '1 Jan 1970') + '```',
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

                if (this.response.data.users[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].background !== '/image/background/background-user-default.jpg')
                {
                    this.userEmbed.setImage(process.env.IMAGE_LINK + this.response.data.users[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].background)
                }
            }
        }
        catch (Error)
        {
            this.error = true;

            Logger.error(Error);

            return await this.errorService.send(Interaction);
        }
    }

    async buttonCollector(Interaction)
    {
        try
        {
            this.collector = await Interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 120000  });

            this.collector.on('collect', async (Event) =>
            {
                switch (Event.customId)
                {
                    case Interaction.id + '_PREVIOUS_PAGE_USERS':
                    {
                        if (this.currentEmbed > 1)
                        {
                            this.currentEmbed--;
                            this.currentArray--;
                        }
                        else
                        {
                            this.currentEmbed = this.response.data.usersCount;
                            this.currentArray = this.response.data.usersCount - 1;
                        }

                        if (this.type !== 'SEARCH_COMMAND')
                        {
                            await this.data(Interaction);
                        }

                        await this.structure(Interaction);

                        await Event.update({ embeds: [ this.userEmbed ], components: [ this.userControllerRow, this.userRow ] });

                        break;
                    }
                    case Interaction.id + '_NEXT_PAGE_USERS':
                    {
                        if (this.currentEmbed === this.response.data.usersCount)
                        {
                            this.currentEmbed = 1;
                            this.currentArray = 0;
                        }
                        else
                        {
                            this.currentEmbed++;
                            this.currentArray++;
                        }

                        if (this.type !== 'SEARCH_COMMAND')
                        {
                            await this.data(Interaction);
                        }

                        await this.structure(Interaction);

                        await Event.update({ embeds: [ this.userEmbed ], components: [ this.userControllerRow, this.userRow ] });

                        break;
                    }
                }
            });
        }
        catch (Error)
        {
            this.error = true;

            Logger.error(Error);

            return await this.errorService.send(Interaction);
        }
    }

    async send(Interaction, Data, Type)
    {
        try
        {
            switch (Type)
            {
                case 'SEARCH_COMMAND':
                {
                    if (!Data)
                    {
                        return await this.errorService.send(Interaction);
                    }

                    this.type = Type;
                    this.response = Data;

                    await this.structure(Interaction)
                    await this.buttonCollector(Interaction);

                    break;
                }
                default:
                {
                    this.sort = await Interaction.options.getString('sort') || 'followers';

                    await this.optionsValidation(Interaction);
                    await this.data(Interaction);
                    await this.structure(Interaction)
                    await this.buttonCollector(Interaction);

                    break;
                }
            }

            if (!this.error)
            {
                return await Interaction.editReply({ embeds: [ this.userEmbed ], components: [ this.userControllerRow, this.userRow ] });
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

module.exports = RandomService;
