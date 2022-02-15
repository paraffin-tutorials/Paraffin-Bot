import axios from 'axios';
import {MessageEmbed, MessageActionRow, MessageButton, Collector} from 'discord.js';

import Logger from '../../../Service/Logger.Service';
import ErrorService from '../../../Service/Error.Service';
import { FormatDate } from '../../../Service/Helper.Service';

export default class RandomService
{
    response: any;
    tutorialsCurrentEmbed: number;

    private error: boolean;
    private username: string;
    private currentEmbed: string;
    private userTutorials: any[][];
    private tutorialsLastEmbed: number;
    private tutorialsCurrentArray: number;
    private tutorialsCurrentArrayItem: number;
    private readonly tutorialsPerEmbed: number;
    private errorService: ErrorService;
    private userProfileEmbed: MessageEmbed;
    private collector: Collector<any, any>;
    private userTutorialsEmbed: MessageEmbed;
    private userProfileRow: MessageActionRow;
    private userTutorialsRow: MessageActionRow;
    private userTutorialsControllerRow: MessageActionRow;

    constructor()
    {
        this.error = false;
        this.tutorialsPerEmbed = 5;
        this.currentEmbed = 'PAGE_PROFILE';
        this.errorService = new ErrorService();
    }

    async data(Interaction: { options?: any; reply?: any; followUp?: any; channel?: any; id?: any; editReply?: any; user?: any }) {
        try
        {
            this.response = await axios.get(encodeURI(`https://api.paraffin-tutorials.ir/api/${process.env.API_VERSION}/users/${this.username.toLowerCase().trim()}`));

            if (this.response.data?.status !== 'success')
            {
                this.error = true;

                Logger.error(this.response);

                return this.errorService.send(Interaction, 'Internal Api Error', 'No user was found with this username.');
            }
        }
        catch (Error)
        {
            this.error = true;

            Logger.error(Error);

            return await this.errorService.send(Interaction);
        }
    }

    async tutorials(Interaction: { reply?: any; followUp?: any; channel?: { createMessageComponentCollector: (arg0: { componentType: string; time: number; }) => any; }; id?: any; })
    {
        this.tutorialsCurrentEmbed = 1;
        this.tutorialsCurrentArray = 0;
        this.tutorialsCurrentArrayItem = 1;
        this.userTutorials = [ [], [], [], [], [], [], [], [], [], [] ];

        try
        {
            this.tutorialsLastEmbed = Math.ceil(this.response.data.user.tutorials.length / this.tutorialsPerEmbed);

            if (this.tutorialsLastEmbed === 0)
            {
                this.tutorialsLastEmbed = 1;
            }

            for (const Tutorial of this.response.data.user.tutorials)
            {
                if (this.tutorialsCurrentArrayItem <= ((this.tutorialsCurrentArray + 1) * this.tutorialsPerEmbed))
                {
                    this.tutorialsCurrentArrayItem++;
                    this.userTutorials[this.tutorialsCurrentArray].push(`[${Tutorial.name}](https://paraffin-tutorials.ir/tutorials/${Tutorial.name})`);
                }
                else
                {
                    this.tutorialsCurrentArray++;
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

    async structure(Interaction: { options?: any; reply?: any; followUp?: any; channel?: any; id?: any; editReply?: any; user?: any }) {
        try
        {
            if (!this.error)
            {
                this.userProfileRow = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel('More')
                            .setEmoji('<:LinkIcon:939151538792824842>')
                            .setURL('https://paraffin-tutorials.ir/users/' + this.response.data.user.username)
                            .setStyle('LINK'),

                        new MessageButton()
                            .setCustomId(Interaction.id + '_PAGE_USER_TUTORIALS')
                            .setLabel('Tutorials')
                            .setEmoji('<:TutorialIcon:939152819523567636>')
                            .setStyle('DANGER'),

                        new MessageButton()
                            .setCustomId(Interaction.id + '_PAGE_USER_REFRESH')
                            .setLabel('Refresh')
                            .setEmoji('<:RepeatIcon:941290998171045928>')
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
                        '```' + (this.response.data.user.tags.join(' - ') || '') + '```'
                    )
                    .addFields(
                        {
                            name: '**<:AwardIcon:940919059539722260> Subscription:**',
                            value: '```' + ((this.response.data.user.premium ? 'ویژه' : 'عادی') || 'عادی') + '```',
                            inline: true
                        },
                        {
                            name: '**<:PeopleIcon:940921189436641300> Followers:**',
                            value: '```' + (this.response.data.user.followers || 0) + '```',
                            inline: true
                        },
                        {
                            name: '**<:PeopleIcon:940921189436641300> Followings:**',
                            value: '```' + (this.response.data.user.following || 0) + '```',
                            inline: true
                        },
                        {
                            name: '**<:BookIcon:940923075027939358> Tutorials:**',
                            value: '```' + (this.response.data.user.tutorials.length || 0) + '```',
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
                            iconURL: process.env.FAVICON
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
                            .setCustomId(Interaction.id + '_PAGE_USER_PROFILE')
                            .setLabel('Profile')
                            .setEmoji('<:TutorialIcon:939152819523567636>')
                            .setStyle('DANGER'),

                        new MessageButton()
                            .setLabel('Refresh')
                            .setCustomId(Interaction.id + '_PAGE_USER_REFRESH')
                            .setEmoji('<:RepeatIcon:941290998171045928>')
                            .setStyle('DANGER')
                    );

                this.userTutorialsControllerRow = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId(Interaction.id + '_PREVIOUS_PAGE_USER_TUTORIALS')
                            .setEmoji('<:Left:849352126881857538>')
                            .setStyle('DANGER'),

                        new MessageButton()
                            .setCustomId(Interaction.id + '_NEXT_PAGE_USER_TUTORIALS')
                            .setEmoji('<:Right:849352129381531668>')
                            .setStyle('DANGER')
                    );

                this.userTutorialsEmbed = new MessageEmbed()
                    .setColor(this.response.data.user.baseColor)
                    .setThumbnail(process.env.IMAGE_LINK + this.response.data.user.profile)
                    .setAuthor(
                        {
                            name: this.response.data.user.username.toUpperCase() + ` (tutorials ${this.tutorialsCurrentEmbed}/${this.tutorialsLastEmbed})`
                        })
                    .setDescription(
                        `**> ${this.userTutorials[this.tutorialsCurrentEmbed - 1]?.join('\n > ') || ''}**`
                    )
                    .setFooter(
                        {
                            text: process.env.EMBED_SERVICE_COMMANDS_FOOTER,
                            iconURL: process.env.FAVICON
                        })
                    .setTimestamp();

                if (this.response.data.user.background !== '/image/background/background-user-default.jpg')
                {
                    this.userProfileEmbed.setImage(process.env.IMAGE_LINK + this.response.data.user.background)
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

    async buttonCollector(Interaction: { options?: any; reply?: any; followUp?: any; channel?: any; id?: any; editReply?: any; user?: any }) {
        try
        {
            this.collector = await Interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 120000  });

            this.collector.on('collect', async (Event: { customId: any; update: (arg0: { embeds: MessageEmbed[]; components: MessageActionRow[]; }) => any; }) =>
            {
                switch (Event.customId)
                {
                    case Interaction.id + '_PAGE_USER_REFRESH':
                    {
                        switch (this.currentEmbed)
                        {
                            case 'PAGE_USER_PROFILE':
                            {
                                await this.data(Interaction);
                                await this.tutorials(Interaction);
                                await this.structure(Interaction);

                                await Event.update({ embeds: [ this.userProfileEmbed ], components: [ this.userProfileRow ] });

                                break;
                            }
                            case 'PAGE_USER_TUTORIALS':
                            {
                                await this.data(Interaction);
                                await this.tutorials(Interaction);
                                await this.structure(Interaction);

                                await Event.update({ embeds: [ this.userTutorialsEmbed ], components: [ this.userTutorialsControllerRow, this.userTutorialsRow ] });

                                break;
                            }
                            default:
                            {
                                await this.data(Interaction);
                                await this.tutorials(Interaction);
                                await this.structure(Interaction);

                                await Event.update({ embeds: [ this.userProfileEmbed ], components: [ this.userProfileRow ] });

                                break;
                            }
                        }

                        break;
                    }
                    case Interaction.id + '_PAGE_USER_PROFILE':
                    {
                        this.currentEmbed = 'PAGE_USER_PROFILE';

                        await Event.update({ embeds: [ this.userProfileEmbed ], components: [ this.userProfileRow ] });

                        break;
                    }
                    case Interaction.id + '_PAGE_USER_TUTORIALS':
                    {
                        this.currentEmbed = 'PAGE_USER_TUTORIALS';

                        await Event.update({ embeds: [ this.userTutorialsEmbed ], components: [ this.userTutorialsControllerRow, this.userTutorialsRow ] });

                        break;
                    }
                    case Interaction.id + '_PREVIOUS_PAGE_USER_TUTORIALS':
                    {
                        this.currentEmbed = 'PAGE_USER_TUTORIALS';

                        if (this.tutorialsCurrentEmbed > 1)
                        {
                            this.tutorialsCurrentEmbed--;
                        }
                        else
                        {
                            this.tutorialsCurrentEmbed = this.tutorialsLastEmbed;
                        }

                        await this.structure(Interaction);

                        await Event.update({ embeds: [ this.userTutorialsEmbed ], components: [ this.userTutorialsControllerRow, this.userTutorialsRow ] });

                        break;
                    }
                    case Interaction.id + '_NEXT_PAGE_USER_TUTORIALS':
                    {
                        this.currentEmbed = 'PAGE_USER_TUTORIALS';

                        if (this.tutorialsCurrentEmbed === this.tutorialsLastEmbed)
                        {
                            this.tutorialsCurrentEmbed = 1;
                        }
                        else
                        {
                            this.tutorialsCurrentEmbed++;
                        }

                        await this.structure(Interaction);

                        await Event.update({ embeds: [ this.userTutorialsEmbed ], components: [ this.userTutorialsControllerRow, this.userTutorialsRow ] });

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

    async send(Interaction: { options?: any; reply?: any; followUp?: any; channel?: any; id?: any; editReply?: any; user?: any; }, Data: any, Type: string)
    {
        try
        {
            switch (Type)
            {
                case 'RANDOM_COMMAND':
                {
                    if (!Data)
                    {
                        return await this.errorService.send(Interaction);
                    }

                    this.response = Data;

                    await this.tutorials(Interaction);
                    await this.structure(Interaction);
                    await this.buttonCollector(Interaction);

                    break;
                }
                case 'SEARCH_COMMAND':
                {
                    if (!Data)
                    {
                        return await this.errorService.send(Interaction);
                    }

                    this.response = Data;

                    await this.tutorials(Interaction);
                    await this.structure(Interaction);
                    await this.buttonCollector(Interaction);

                    break;
                }
                default:
                {
                    this.username = Interaction.options.getString('username').toLowerCase();

                    await this.data(Interaction);
                    await this.tutorials(Interaction);
                    await this.structure(Interaction);
                    await this.buttonCollector(Interaction);

                    break;
                }
            }

            if (!this.error)
            {
                return await Interaction.editReply({ embeds: [ this.userProfileEmbed ], components: [ this.userProfileRow ] });
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
