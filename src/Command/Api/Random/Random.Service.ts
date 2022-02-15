import axios from 'axios';

import Logger from '../../../Service/Logger.Service';
import UserService from '../User/User.Service';
import ErrorService from '../../../Service/Error.Service';
import TutorialService from '../Tutorial/Tutorial.Service';
import {Interaction} from "discord.js";

export default class RandomService
{
    response: any;

    private type: string;
    private error: boolean;
    private userService: UserService;
    private errorService: ErrorService;
    private tutorialService: TutorialService;

    constructor()
    {
        this.error = false;
        this.userService = new UserService();
        this.errorService = new ErrorService();
        this.tutorialService = new TutorialService();
    }

    async optionsValidation(Interaction: Interaction)
    {
        if (this.type !== 'tutorial' && this.type !== 'user')
        {
            this.error = true;

            return this.errorService.send(Interaction, 'Bad Request', 'That type of your sorting request is not supported.');
        }
    }

    async data(Interaction: Interaction)
    {
        this.response = await axios.get(`https://api.paraffin-tutorials.ir/api/${process.env.API_VERSION}/random/${this.type}`);

        if (this.response.data?.status !== 'success')
        {
            this.error = true;

            Logger.error(this.response);

            return this.errorService.send(Interaction, 'Internal Api Error');
        }
    }

    async send(Interaction: any)
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
