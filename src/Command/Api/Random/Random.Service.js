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

    async typeValidation(Interaction, Type)
    {
        this.type = Type;

        if (Type !== 'tutorial' && Type !== 'user')
        {
            this.error = true;

            return this.errorService.send(Interaction, 'ارور از درخواست', 'تایپ انتخاب شده اشتباه میباشید لطفا فقط تایپ های پیشنهادی را انتخاب کنید');
        }
    }

    async data(Interaction)
    {
        this.response = await axios.get(`https://api.paraffin-tutorials.ir/api/${process.env.API_VERSION}/random/${this.type}`);

        if (this.response.data?.status !== 'success')
        {
            this.error = true;

            return this.errorService.send(Interaction, 'ارور از وب سرویس');
        }
    }

    async send(Interaction, Type)
    {
        try
        {
            await this.typeValidation(Interaction, Type);
            await this.data(Interaction);

            if (!this.error)
            {
                switch (Type)
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

            return this.errorService.send(Interaction);
        }
    }
}

module.exports = RandomService;
