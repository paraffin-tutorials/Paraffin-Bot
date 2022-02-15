import axios from 'axios';
import {MessageEmbed, MessageActionRow, MessageButton, Collector} from 'discord.js';

import Logger from '../../../Service/Logger.Service';
import ErrorService from '../../../Service/Error.Service';
import { FormatDate } from '../../../Service/Helper.Service';

export default class RandomService
{
    sort: string;

    private type: string;
    private response: any;
    private error: boolean;
    private currentEmbed: number;
    private currentArray: number;
    private errorService: ErrorService;
    private tutorialEmbed: MessageEmbed;
    private tutorialRow: MessageActionRow;
    private collector: Collector<any, any>;
    private tutorialControllerRow: MessageActionRow;

    constructor()
    {
        this.error = false;
        this.currentEmbed = 1;
        this.currentArray = 0;
        this.errorService = new ErrorService();
    }

    async optionsValidation(Interaction: { reply?: any; followUp?: any; channel?: { createMessageComponentCollector: (arg0: { componentType: string; time: number; }) => any; }; id?: any; })
    {
        if (this.sort !== 'views' && this.sort !== 'likes' && this.sort !== 'comments' && this.sort !== 'createAt' && this.sort !== 'name')
        {
            this.error = true;

            return this.errorService.send(Interaction, 'Bad Request', 'That type of your sorting request is not supported.');
        }
    }

    async data(Interaction: { options?: any; reply?: any; followUp?: any; channel?: any; id?: any; editReply?: any; user?: any }) {
        try
        {
            this.response = await axios.get(`https://api.paraffin-tutorials.ir/api/${process.env.API_VERSION}/tutorials?skip=${this.currentArray}&limit=1&sort=${this.sort.trim()}`);

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

    async structure(Interaction: { options?: any; reply?: any; followUp?: any; channel?: any; id?: any; editReply?: any; user?: any }) {
        try
        {
            if (!this.error)
            {
                this.tutorialControllerRow = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId(Interaction.id + '_PREVIOUS_PAGE_TUTORIALS')
                            .setEmoji('<:Left:849352126881857538>')
                            .setStyle('DANGER'),

                        new MessageButton()
                            .setCustomId(Interaction.id + '_NEXT_PAGE_TUTORIALS')
                            .setEmoji('<:Right:849352129381531668>')
                            .setStyle('DANGER')
                    );

                this.tutorialRow = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel('More')
                            .setEmoji('<:LinkIcon:939151538792824842>')
                            .setURL('https://paraffin-tutorials.ir/tutorials/' + this.response.data.tutorials[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].name)
                            .setStyle('LINK')
                    );

                this.tutorialEmbed = new MessageEmbed()
                    .setColor(this.response.data.tutorials[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].author.baseColor)
                    .setThumbnail(process.env.IMAGE_LINK + this.response.data.tutorials[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].author.profile)
                    .setImage(process.env.IMAGE_LINK + this.response.data.tutorials[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].image)
                    .setAuthor(
                        {
                            name: this.response.data.tutorials[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].name.toUpperCase() + ((this.response.data.tutorials[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].edited ? '' : ' ویرایش شده ') || '') + ` (${this.currentEmbed}/${this.response.data.tutorialsCount})`
                        })
                    .setDescription(
                        `> **${this.response.data.tutorials[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].title}**` +
                        '\n> ' +
                        `\n> ${this.response.data.tutorials[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].description}`
                    )
                    .addFields(
                        {
                            name: '**<:PenIcon:940921189004640276> Author:**',
                            value: '```' + this.response.data.tutorials[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].author.username + '```',
                            inline: true
                        },
                        {
                            name: '**<:HeartIcon:940919983024766986> Likes:**',
                            value: '```' + (this.response.data.tutorials[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].likes || 0)  + '```',
                            inline: true
                        },
                        {
                            name: '**<:EyeIcon:940920543408955464> Views:**',
                            value: '```' + (this.response.data.tutorials[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].views || 0) + '```',
                            inline: true
                        },
                        {
                            name: '**<:CommentIcon:940922931863764992> Comments:**',
                            value: '```' + (this.response.data.tutorials[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].comments || 0) + '```',
                            inline: true
                        },
                        {
                            name: '**<:CpuIcon:940922798367440896> Hardship Level:**',
                            value: '```' + (this.response.data.tutorials[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].hardshipLevel || 'آسان') + '```',
                            inline: true
                        },
                        {
                            name: '**<:CpuIcon:940922798367440896> Training Level:**',
                            value: '```' + (this.response.data.tutorials[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].trainingLevel || 'مبتدی') + '```',
                            inline: true
                        },
                        {
                            name: '**<:CalenderIcon:940919983305801809> Created At:**',
                            value: '```' + (FormatDate(this.response.data.tutorials[this.type === 'SEARCH_COMMAND' ? this.currentArray : 0].createdAt) || '1 Jan 1970') + '```',
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

            this.collector.on('collect', async (Event) =>
            {
                switch (Event.customId)
                {
                    case Interaction.id + '_PREVIOUS_PAGE_TUTORIALS':
                    {
                        if (this.currentEmbed > 1)
                        {
                            this.currentEmbed--;
                            this.currentArray--;
                        }
                        else
                        {
                            this.currentEmbed = this.response.data.tutorialsCount;
                            this.currentArray = this.response.data.tutorialsCount - 1;
                        }

                        if (this.type !== 'SEARCH_COMMAND')
                        {
                            await this.data(Interaction);
                        }

                        await this.structure(Interaction);

                        await Event.update({ embeds: [ this.tutorialEmbed ], components: [ this.tutorialControllerRow, this.tutorialRow ] });

                        break;
                    }
                    case Interaction.id + '_NEXT_PAGE_TUTORIALS':
                    {
                        if (this.currentEmbed === this.response.data.tutorialsCount)
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

                        await Event.update({ embeds: [ this.tutorialEmbed ], components: [ this.tutorialControllerRow, this.tutorialRow ] });

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
                    this.sort = await Interaction.options.getString('sort') || 'views';

                    await this.optionsValidation(Interaction);
                    await this.data(Interaction);
                    await this.structure(Interaction)
                    await this.buttonCollector(Interaction);

                    break;
                }
            }

            if (!this.error)
            {
                return await Interaction.editReply({ embeds: [ this.tutorialEmbed ], components: [ this.tutorialControllerRow, this.tutorialRow ] });
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
