const axios = require('axios');

const Logger = require('../../../Service/Logger.Service');
const ErrorService = require('../../../Service/Error.Service');
const UsersService = require('../Users/Users.Service');
const TutorialsService = require('../Tutorials/Tutorials.Service');

class SearchService
{
    constructor()
    {
        this.error = false;
        this.errorService = new ErrorService();
        this.usersService = new UsersService();
        this.tutorialsService = new TutorialsService();
    }

    async optionsValidation(Interaction)
    {
        if (!this.keyword)
        {
            this.error = true;

            return this.errorService.send(Interaction, 'Bad Request', 'Please type some words in keyword option to search in your selected type.');
        }

        if (this.type !== 'tutorial' && this.type !== 'user')
        {
            this.error = true;

            return this.errorService.send(Interaction, 'Bad Request', 'That type of your sorting request is not supported.');
        }
    }

    async data(Interaction)
    {
        this.response = await axios.get(encodeURI(`https://api.paraffin-tutorials.ir/api/${process.env.API_VERSION}/search/${this.type.trim()}?keyword=${this.keyword.trim()}`));

        if (!this.response.data[this.type + 's'][0])
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
            this.keyword = await Interaction.options.getString('keyword');

            await this.optionsValidation(Interaction);
            await this.data(Interaction);

            if (!this.error)
            {
                switch (this.type)
                {
                    case 'user':
                    {
                        await this.usersService.send(Interaction, this.response, 'SEARCH_COMMAND');

                        break;
                    }
                    case 'tutorial':
                    {
                        await this.tutorialsService.send(Interaction, this.response, 'SEARCH_COMMAND');

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

module.exports = SearchService;
