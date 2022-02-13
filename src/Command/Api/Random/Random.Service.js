const axios = require('axios');

const Logger = require('../../../Service/Logger.Service');
const ErrorService = require('../../../Service/Error.Service');
const UserService = require('../User/User.Service');
const TutorialService = require('../Tutorial/Tutorial.Service');

class RandomService
{
    constructor()
    {
        this.error = false;
        this.errorService = new ErrorService();
        this.userService = new UserService();
        this.tutorialService = new TutorialService();
    }

    async optionsValidation(Interaction)
    {
        if (this.type !== 'tutorial' && this.type !== 'user')
        {
            this.error = true;

            return this.errorService.send(Interaction, 'Bad Request', 'That type of your sorting request is not supported.');
        }
    }

    async data(Interaction)
    {
        this.response = await axios.get(`https://api.paraffin-tutorials.ir/api/${process.env.API_VERSION}/random/${this.type}`);

        if (this.response.data?.status !== 'success')
        {
            this.error = true;

            Logger.error(this.response);

            return this.errorService.send(Interaction, 'Internal Api Error');
        }
    }

    async send(Interaction)
    {
        try
        {
            this.type = await Interaction.options.getString('type');

            await this.optionsValidation(Interaction);
            await this.data(Interaction);

            if (!this.error)
            {
                switch (this.type)
                {
                    case 'user':
                    {
                        await this.userService.send(Interaction, this.response, 'RANDOM_COMMAND');

                        break;
                    }
                    case 'tutorial':
                    {
                        await this.tutorialService.send(Interaction, this.response, 'RANDOM_COMMAND');

                        break;
                    }
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
}

module.exports = RandomService;
