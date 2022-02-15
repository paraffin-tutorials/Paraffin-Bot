import {  MessageEmbed, WebhookClient } from 'discord.js';

import { UpdateServersCount } from '../Service/Helper.Service';

export default class InteractionCreateModule
{
    private readonly eventName: string;
    private readonly eventOnce: boolean;

    constructor()
    {
        this.eventName = 'guildDelete';
        this.eventOnce = false;
    }

    name()
    {
        return this.eventName;
    }

    once()
    {
        return this.eventOnce;
    }

    async execute(Guild: { name: any; id: any; memberCount: any; }, Client: any)
    {
        const Embed = new MessageEmbed()
            .setTitle(`Left from a Server`)
            .setDescription(`**Server Name:** ${Guild.name}\n **Server ID:** ${Guild.id}\n **Members Count:** ${Guild.memberCount}`)
            .setFooter(
                {
                    text: 'Paraffin Guild-Event System',
                    iconURL: process.env.FAVICON
                })                .setTimestamp()
            .setColor('#e92e2e');

        const Webhook = new WebhookClient({ url: process.env.GUILD_EVENT_WEBHOOK });

        await Webhook.send({ embeds : [Embed] });

        UpdateServersCount(Client);
    }
}
