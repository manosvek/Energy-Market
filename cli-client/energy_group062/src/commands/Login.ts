import {Command, flags} from '@oclif/command'

export default class Login extends Command {
  static description = 'authorized user login'

  static flags = {
    help: flags.help({char: 'h'}),
    username: flags.string({char: 'u', description: 'username', required: true}),
    passw: flags.string({char: 'p', description: 'password', required: true}),
  }

  async run() {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const {flags} = this.parse(Login);
    const axios = require('axios')
    const qs = require('querystring')

    var request = new String('https://localhost:8765/energy/api/Login');
    
    const requestBody = {
        Username: flags.username,
        Password: flags.passw
    }

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    axios.post(request.toString(), qs.stringify(requestBody), config)
        .then((result: any) => {
            let fs = require('fs');
            let os = require('os');

            let homedir = os.homedir();

            fs.writeFile(require('path').join(homedir, 'softeng19bAPI.token'), result.data.token, function(err: any) {
                if (err) {
                    return console.error(err);
                }

                console.log(result.status);
                console.log("Logged in succesfully.");
            });
        })
        .catch((err: any) => {
            console.error(err.response.status);
            console.error(err.response.data);
        })
  }
}
