import { MessageEmbed, WebhookClient } from 'discord.js';

export default class InteractionCreateModule
{
    private readonly eventName: string;
    private readonly eventOnce: boolean;

    constructor()
    {
        this.eventName = 'interactionCreate';
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

    async execute(Interaction: { isCommand: () => any; inGuild: () => any; reply: (arg0: string) => any; user: { tag: string; id: string; }; guild: { name: string; }; channel: { name: string; }; commandName: string; })
    {
        if (!Interaction.isCommand())
        {
            return;
        }
        if (!Interaction.inGuild())
        {
            return Interaction.reply("You Can't use this Command in DM.")
        }

        const Webhook = new WebhookClient({ url: process.env.INTERACTION_EVENT_WEBHOOK })

        const Embed = new MessageEmbed()
            .setTitle(`New Interaction Used`)
            .addFields(
                {
                    name: '**User:**',
                    value: '```' + Interaction.user.tag + '```'
                },
                {
                    name: '**ID:**',
                    value: '```' + Interaction.user.id + '```'
                },
                {
                    name: '**Server:**',
                    value: '```' + Interaction.guild.name  + '```'
                },
                {
                    name: '**Channel:**',
                    value: '```' + Interaction.channel.name + '```'
                },
                {
                    name: '**Command:**',
                    value: '```' + Interaction.commandName + '```'
                }
            )
            .setFooter(
                {
                    text: 'Paraffin Interaction-Handler System',
                    iconURL: process.env.FAVICON
                })
            .setTimestamp()
            .setColor('#e92e2e');

        await Webhook.send({ embeds: [Embed] });
    }
};
