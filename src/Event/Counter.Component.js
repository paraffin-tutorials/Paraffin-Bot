
module.exports = (client) => {
  
    const channelId = 'voice channel id'
  
    const updateMembers = (guild) => {
      const channel = guild.channels.cache.get(channelId)
      const servers = client.guilds.cache.size
      channel.setName(`servers: ${servers}`)
    }
  
    client.on('guildCreate', (guild) => updateServers(client.guilds.cache.size))
    client.on('guildMemberRemove', (guild) => updateServers(client.guilds.cache.size))
  
    updateMembers(servers)
  }