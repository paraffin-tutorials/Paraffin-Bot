import {MessageEmbed, MessageButton, MessageActionRow, ColorResolvable, Interaction} from 'discord.js';

import Logger from './Logger.Service';
import HelpService from '../Command/Bot/Help/Help.Service';

export default class ErrorService
{
    // @ts-ignore
    private color: ColorResolvable = process.env.EMBED_COLOR;
    private collector: any;
    private helpService: any;
    private embed: MessageEmbed;
    private row: MessageActionRow;

    constructor()
    {
        this.helpService = new HelpService('PAGE_ERROR');
    }

    async structure(Interaction: Interaction, Title: string, Description: string) {
        this.row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Help')
                    .setCustomId(Interaction.id + 'PAGE_HELP')
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
            .setColor(this.color)
            .setTimestamp();
    }

    async buttonCollector(Interaction: { reply?: any; followUp?: any; channel?: { createMessageComponentCollector: (arg0: { componentType: string; time: number }) => any }; id?: any }) {
        this.collector = await Interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 120000  });

        this.collector.on('collect', async (Event: any) =>
        {
            if (Event.customId === (Interaction.id + 'PAGE_HELP'))
            {
                await this.helpService.structure(Interaction, 'PAGE_ERROR', Event);
            }
        });
    }

    async send(Interaction: any, Title?: string, Description?: string)
    {
        try
        {
            await this.structure(Interaction, Title || 'Internal Server Error', Description || 'Error is from our service. By reporting it, let us know about this error so that it can be fixed soon');
            await this.buttonCollector(Interaction);

            return await Interaction.followUp({ embeds: [ this.embed ], components : [ this.row ] });
        }
        catch (Error)
        {
            Logger.error(Error);

            await this.structure(Interaction, 'Internal Server Error', 'Error is from our service. By reporting it, let us know about this error so that it can be fixed soon');
            await this.buttonCollector(Interaction);

            return await Interaction.followUp({ embeds: [ this.embed ], components : [ this.row ] });
        }
    }
}
