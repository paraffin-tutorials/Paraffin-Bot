const axios = require('axios');

class TutorialService
{
    async Find(Name)
    {
        try
        {
            const { data } = await axios.get('https://api.paraffin-tutorials.ir/tutorials/' + Name);

            console.log(data);
        }
        catch (Error)
        {
            console.log(Error);
        }
    }
}

module.exports = TutorialService;
