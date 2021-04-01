import {Command, flags} from '@oclif/command'

export default class HealthCheck extends Command {
    static description = 'checks if back-end is online'

    static examples = ['$ energy_group062 HealthCheck']

    static flags = {
        help: flags.help({char: 'h'}),
    }

    async run() {

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        const axios = require('axios')
        const qs = require('querystring')

        const {args, flags} = this.parse(HealthCheck)

        var request = new String(`https://localhost:8765/energy/api/HealthCheck`)

        axios.get(request.toString())
            .then((result: any) => {
                console.log(result.status);
                console.log("Back-end is " + "\x1b[32m" + "up.");
            })
            .catch((err: any) => {
                console.error('Back-end is ' + '\x1b[31m' + 'down.');
            })
    }
}
