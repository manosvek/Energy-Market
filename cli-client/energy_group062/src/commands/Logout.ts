import {Command, flags} from '@oclif/command'

export default class Logout extends Command {
    static description = 'logout authorized user'

    async run() {

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        const axios = require('axios')
        const qs = require('querystring')

        var request = new String('https://localhost:8765/energy/api/Logout');

        let fs = require('fs');
        let os = require('os');

        let homedir = os.homedir();

        fs.readFile(require('path').join(homedir, 'softeng19bAPI.token'), (err: any, token: any) => {
            if (err) {
                return console.error("You are not logged in (see energy_group062 Login -h).");
            }

            const requestBody = {}

            const config = {
                headers: {
                    'X-OBSERVATORY-AUTH': token.toString()
                }
            }

            axios.post(request.toString(), qs.stringify(requestBody), config)
                .then((result: any) => {
                    console.log(result.status);
                    fs.unlink(require('path').join(homedir, 'softeng19bAPI.token'), function(err: any) {
                        if (err) {
                            return console.error(err);
                        }

                        console.log("Logged out succesfully.");
                    })
                })
                .catch((err: any) => {
                    console.error(err.response.status);
                    console.error(err.response.data);
                })
        });
    }
}
