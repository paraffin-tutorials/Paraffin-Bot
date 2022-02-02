const axios = require('axios');

class RandomService
{
    async Find(Type)
    {
        if (Type !== 'tutorial' || Type !== 'user')
        {
            console.log('error midam')
        }

        try
        {
            const { data } = await axios.get('https://api.paraffin-tutorials.ir/api/v1/random/' + Type);

            return data;
        }
        catch (Error)
        {
            console.log(Error);
            console.log('error nemidam')
        }
    }
}

module.exports = RandomService;
