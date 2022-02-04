const axios = require('axios');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

const { FormatDate } = require('../../Service/Helper.Service');

class RandomService
{
    async Find(Interaction, Type)
    {
        if (Type !== 'tutorial' && Type !== 'user')
        {
            return console.log('error midam')
        }

        try
        {
            let Row;
            let Embed;

            const Result = await axios.get(`https://api.paraffin-tutorials.ir/api/${process.env.API_VERSION}/random/${Type}`);

            if (Result.data?.status !== 'success')
            {
                return;
            }

            if (Type === 'tutorial')
            {
                Row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel('More')
                            .setEmoji('<:LinkIcon:939151538792824842>')
                            .setURL('https://paraffin-tutorials.ir/tutorials/' + Result.data.tutorial.name)
                            .setStyle('LINK')
                    );

                Embed = new MessageEmbed()
                    .setAuthor(
                        {
                            name: Result.data.tutorial.title + ((Result.data.tutorial.edited ? 'ویرایش شده' : '') || '')
                        })
                    .setDescription('> ' + Result.data.tutorial.description)
                    .setImage(process.env.IMAGE_LINK + Result.data.tutorial.image)
                    .setThumbnail(process.env.IMAGE_LINK + Result.data.author.profile)
                    .addFields(
                        {
                            name: '**Author:**',
                            value: '```' + Result.data.author.username + '```',
                            inline: true
                        },
                        {
                            name: '**Likes:**',
                            value: '```' + (Result.data.tutorial.likes || 0)  + '```',
                            inline: true
                        },
                        {
                            name: '**Views:**',
                            value: '```' + (Result.data.tutorial.views || 0) + '```',
                            inline: true
                        },
                        {
                            name: '**Comments:**',
                            value: '```' + (Result.data.tutorial.comments || 0) + '```',
                            inline: true
                        },
                        {
                            name: '**Hardship Level:**',
                            value: '```' + (Result.data.tutorial.hardshipLevel || 'آسان') + '```',
                            inline: true
                        },
                        {
                            name: '**Training Level:**',
                            value: '```' + (Result.data.tutorial.trainingLevel || 'مبتدی') + '```',
                            inline: true
                        },
                        {
                            name: '**Created At:**',
                            value: '```' + (FormatDate(Result.data.tutorial.createdAt) || '1 Jan 1970') + '```',
                            inline: true
                        },
                        {
                            name: '**Requested By:**',
                            value: '```' + ((Interaction.user.username + '#' + Interaction.user.discriminator) || 'GOD') + '```',
                            inline: true
                        }
                    )
                    .setFooter(
                        {
                            text: "Paraffin Service-Commands Handler",
                            iconURL: 'https://paraffin-tutorials.ir/image/favicon.png'
                        })
                    .setColor(Result.data.author.baseColor)
                    .setTimestamp();
            }
            else if (Type === 'user')
            {
                let UserTags = [];

                for (const Tag of Result.data.user.tags)
                {
                    UserTags.push(Tag)
                }

                Row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel('More')
                            .setEmoji('<:LinkIcon:939151538792824842>')
                            .setURL('https://paraffin-tutorials.ir/users/' + Result.data.user.username)
                            .setStyle('LINK'),

                        new MessageButton()
                            .setCustomId("PAGE_TUTORIALS")
                            .setLabel('Tutorials')
                            .setEmoji('<:TutorialIcon:939152819523567636>')
                            .setStyle('DANGER')
                    );

                Embed = new MessageEmbed()
                    .setAuthor(
                        {
                            name: Result.data.user.username.toUpperCase()
                        })
                    .setDescription(
                        `> ${Result.data.user.description}` +
                        '\n\n**Tags:**' +
                        '```' + (UserTags.join(' - ') || '') + '```'
                    )
                    .setThumbnail(process.env.IMAGE_LINK + Result.data.user.profile)
                    .addFields(
                        {
                            name: '**Subscription:**',
                            value: '```' + ((Result.data.user.premium ? 'ویژه' : 'عادی') || 'عادی') + '```',
                            inline: true
                        },
                        {
                            name: '**Followers:**',
                            value: '```' + (Result.data.followers.length || 0) + '```',
                            inline: true
                        },
                        {
                            name: '**Followings:**',
                            value: '```' + (Result.data.followings.length || 0) + '```',
                            inline: true
                        },
                        {
                            name: '**Created At:**',
                            value: '```' + (FormatDate(Result.data.user.createdAt) || '1 Jan 1970') + '```',
                            inline: true
                        },
                        {
                            name: '**Requested By:**',
                            value: '```' + ((Interaction.user.username + '#' + Interaction.user.discriminator) || 'GOD') + '```',
                            inline: true
                        }
                    )
                    .setFooter(
                        {
                            text: "Paraffin Service-Commands Handler",
                            iconURL: 'https://paraffin-tutorials.ir/image/favicon.png'
                        })
                    .setColor(Result.data.user.baseColor)
                    .setTimestamp();

                if (Result.data.user.background !== '/image/background/background-user-default.jpg')
                {
                    Embed.setImage(process.env.IMAGE_LINK + Result.data.user.background)
                }

                const Collector = Interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 120000  })

                Collector.on('collect', async (Event) =>
                {
                    if (Event.customId === 'PAGE_TUTORIALS')
                    {
                        // const UserEmbed = new MessageEmbed()
                        //     .setAuthor(
                        //         {
                        //             name: 'Paraffin Tutorials Bot Bot-Help Menu'
                        //         })
                        //     .setTimestamp();
                        //
                        // await Event.deferUpdate();
                        // await Event.followUp({ embeds: [ UserEmbed ], ephemeral: true });
                    }
                });
            }

            return await Interaction.reply({ embeds: [ Embed ], components: [ Row ] });
        }
        catch (Error)
        {
            return console.log(Error);
        }
    }
}

module.exports = RandomService;
