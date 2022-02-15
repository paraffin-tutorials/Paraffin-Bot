import axios from 'axios';

import Logger from '../../../Service/Logger.Service';
import UsersService from '../Users/Users.Service';
import ErrorService from '../../../Service/Error.Service';
import TutorialsService from '../Tutorials/Tutorials.Service';

export default class RandomService
{
    keyword: string;

    private type: string;
    private response: any;
    private error: boolean;
    private errorService: ErrorService;
    private usersService: UsersService;
    private tutorialsService: TutorialsService;

    constructor()
    {
        this.error = false;
        this.errorService = new ErrorService();
        this.usersService = new UsersService();
        this.tutorialsService = new TutorialsService();
    }

    async optionsValidation(Interaction: { options?: any; reply?: any; followUp?: any; channel?: { createMessageComponentCollector: (arg0: { componentType: string; time: number }) => any }; id?: any })
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

    async data(Interaction: { reply?: any; followUp?: any; channel?: { createMessageComponentCollector: (arg0: { componentType: string; time: number; }) => any; }; id?: any; })
    {
        this.response = await axios.get(encodeURI(`https://api.paraffin-tutorials.ir/api/${process.env.API_VERSION}/search/${this.type.trim()}?keyword=${this.keyword.trim()}`));

        if (!this.response.data[this.type + 's'][0])
        {
            this.error = true;

            Logger.error(this.response);

            return this.errorService.send(Interaction, 'Internal Api Error');
        }
    }

    async send(Interaction: { options?: any; reply?: any; followUp?: any; channel?: { createMessageComponentCollector: (arg0: { componentType: string; time: number; }) => any; }; id?: any; })
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
