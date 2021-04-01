import {Command, flags} from '@oclif/command'

export default class AggregatedGenerationPerType extends Command {
    static description = 'displays aggregated generation for chosen area and resolution per chosen production type'

    static examples = ['$ energy AggregatedGenerationPerType --area Greece --timeres PT60M --productionType ']

    static flags = {
        help: flags.help({char: 'h'}),
        area: flags.string({char: 'a', description: 'area of interest', required: true}),
        timeres: flags.string({char: 't', description: 'time resolution PT{15|30|60}M', required: true}),
        prodtype: flags.string({char: 'p', description: 'production type', required: true}),
        date: flags.string({char: 'd', description: 'date of measurement (YYYY-MM-DD)'}),
        month: flags.string({char: 'm', description: 'month of measurement (YYYY-MM)'}),
        year: flags.string({char: 'y', description: 'year of measurement (YYYY)'}),
        format: flags.string({char: 'f', description: 'choose csv or json(default) format', default: 'json'}),
    }


    async run() {

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        const axios = require('axios')
        const qs = require('querystring')

        let fs = require('fs');
        let os = require('os');

        let homedir = os.homedir();

        const {args, flags} = this.parse(AggregatedGenerationPerType)

        if (!flags.date && !flags.month && !flags.year) {
            console.log(
            'One of --date, --month or --year needs to be specified. Run energy --help for more details')
            this.exit()
        }

        var request = new String(`https://localhost:8765/energy/api/AggregatedGenerationPerType/${flags.area}/${flags.prodtype}/${flags.timeres}/`)

        if (flags.date && !flags.month && !flags.year) {
            request = request.concat(`date/`, flags.date)
        }
        else if (!flags.date && flags.month && !flags.year) {
            request = request.concat(`month/`, flags.month)
        }
        else if (!flags.date && !flags.month && flags.year) {
            request = request.concat(`year/`, flags.year)
        }
        else {
            console.log(`Only one of --date, --month and --year`)
            this.exit()
        }


        request = request.concat(`?format=`, flags.format)


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
}
