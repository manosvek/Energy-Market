import {Command, flags} from '@oclif/command'

export default class Reset extends Command {
    static description = 'resets database except from admin user'

    static flags = {
        help: flags.help({char: 'h'}),
    }

    async run() {

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        const axios = require('axios')
        const qs = require('querystring')

        const {args, flags} = this.parse(Reset)

        var request = new String(`https://localhost:8765/energy/api/Reset`)

        axios.post(request.toString())
            .then((result: any) => {
                console.log(result.status);
                console.log("Done.");
            })
            .catch((err: any) => {
                console.error(err.code);
            })
    }
}
