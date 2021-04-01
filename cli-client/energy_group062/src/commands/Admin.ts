import {Command, flags} from '@oclif/command'

export default class Admin extends Command {
    static description = 'For administrator purposes only'

    static examples = ['$ energy_group062 Admin --newuser dummy --passw 12345 --email test@example.com --quota 5']

    static flags = {
        help: flags.help({char: 'h'}),
        newuser: flags.string({char: 'n', description: 'create new user'}),
        moduser: flags.string({char: 'm', description: 'modify existing user'}),
        passw: flags.string({char: 'p', description: 'new user password'}),
        email: flags.string({char: 'e', description: 'new user email'}),
        quota: flags.string({char: 'q', description: 'new user quotas'}),
        userstatus: flags.string({char: 's', description: 'show user status'}),
        newdata: flags.string({char: 'd', description: 'add csv data to database'}),
        source: flags.string({char: 'f', description: 'csv file to add to database'}),
    }

    async run() {

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        const axios = require('axios')
        const qs = require('querystring')

        let fs = require('fs');
        let os = require('os');

        let homedir = os.homedir();
       
        var request = new String('https://localhost:8765/energy/api/Admin/');

        const {args, flags} = this.parse(Admin)

        // ****************************
        // For new user
        if (flags.newuser && !flags.moduser && !flags.userstatus && !flags.newdata) {
            if (!flags.passw || !flags.email || !flags.quota) {
                console.log(`must provide --passw, --email and --quota`)
                this.exit()
            }

            request = request.concat('users')
            
            fs.readFile(require('path').join(homedir, 'softeng19bAPI.token'), (err: any, token: any) => {
                if (err) {
                    return console.error(err);
                }

                const requestBody = {
                    Username: flags.newuser,
                    Password: flags.passw,
                    Email: flags.email,
                    Quotas: flags.quota,
                }

                const config = {
                    headers: {
                        'X-OBSERVATORY-AUTH': token.toString(),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }

                axios.post(request.toString(), qs.stringify(requestBody), config)
                    .then((result: any) => {
                        console.log(result.data);
                    })
                    .catch((err: any) => {
                        //console.error(err);
                        console.error(err.response.status);
                        console.error(err.response.data);
                    })
            });
        }


        // ****************************
        // For modify user
        else if (!flags.newuser && flags.moduser && !flags.userstatus && !flags.newdata) {
            if (!flags.passw || !flags.email || !flags.quota) {
                console.log(`must provide --passw, --email and --quota`)
                this.exit()
            }

            request = request.concat(`users/${flags.moduser}`)
            
            fs.readFile(require('path').join(homedir, 'softeng19bAPI.token'), (err: any, token: any) => {
                if (err) {
                    return console.error(err);
                }

                const requestBody = {
                    Password: flags.passw,
                    Email: flags.email,
                    Quotas: flags.quota,
                }

                const config = {
                    headers: {
                        'X-OBSERVATORY-AUTH': token.toString(),
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }

                axios.put(request.toString(), qs.stringify(requestBody), config)
                    .then((result: any) => {
                        console.log(result.data);
                    })
                    .catch((err: any) => {
                        console.error(err.response.status);
                        console.error(err.response.data);
                    })
            });
        }


        // ****************************
        // For user status
        else if (!flags.newuser && !flags.moduser && flags.userstatus && !flags.newdata) {
            request = request.concat(`users/${flags.userstatus}`)
            
            fs.readFile(require('path').join(homedir, 'softeng19bAPI.token'), (err: any, token: any) => {
                if (err) {
                    return console.error(err);
                }

                const config = {
                    headers: {
                        'X-OBSERVATORY-AUTH': token.toString()
                    }
                }

                axios.get(request.toString(), config)
                    .then((result: any) => {
                        console.log(result.data);
                    })
                    .catch((err: any) => {
                        console.error(err.response.status);
                        console.error(err.response.data);
                    })
            });
        }


        // ****************************
        // For new data upload
        else if (!flags.newuser && !flags.moduser && !flags.userstatus && flags.newdata) {
            if (!flags.source) {
                console.log(`must provide --source`)
                this.exit()
            }

            var FormData = require('form-data');

            request = request.concat(`${flags.newdata}`)
            
            fs.readFile(require('path').join(homedir, 'softeng19bAPI.token'), (err: any, token: any) => {
                if (err) {
                    return console.error(err);
                }

                //const form_data = new FormData();
                //form_data.append('file', fs.readFileSync(flags.source));
                fs.readFile(flags.source, "utf8", (err: any, data: any) => {
                    if (err) {
                        return console.error(err);
                    }

                    //console.log(data);
                
                    const requestBody = {
                        file: /*form_*/data,
                    }

                    const config = {
                        headers: {
                            'X-OBSERVATORY-AUTH': token.toString(),
                        },
                        'maxContentLength': Infinity,
                        'maxBodyLength': Infinity
                    }

                    axios.post(request.toString(), qs.stringify(requestBody), config)
                        .then((result: any) => {
                            console.log(result.data);
                        })
                        .catch((err: any) => {
                            console.error(err);
                            //console.error(err.response.status);
                            //console.error(err.response.data);
                        })
                })
            })
        }

        else {
            console.log("See energy_group062 Admin --help.");
        }
    }
}
