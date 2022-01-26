const Logger = require('../Service/Logger.Service');

module.exports =
	{
		name: "ready",
		once: true,

		execute(Client)
		{
			Client.user.setActivity('Paraffin Tutorials Discord Bot', { type: 'COMPETING' });

            Logger.info(`Bot is Logged in as ${Client.user.tag}!`);
		},
	};
