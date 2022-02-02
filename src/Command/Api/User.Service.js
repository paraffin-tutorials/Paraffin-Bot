const axios = require('axios');

class UserService
{
    async Find(Name)
    {
        try
        {
            const { data } = await axios.get('https://api.paraffin-tutorials.ir/users/' + Name);

            console.log(data);
        }
        catch (Error)
        {
            console.log(Error);
        }
    }
}

module.exports = UserService;
