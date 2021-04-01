energy_group062
===============



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/energy_group062.svg)](https://npmjs.org/package/energy_group062)
[![Downloads/week](https://img.shields.io/npm/dw/energy_group062.svg)](https://npmjs.org/package/energy_group062)
[![License](https://img.shields.io/npm/l/energy_group062.svg)](https://github.com/cli-client/energy_group062/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g energy_group062
$ energy_group062 COMMAND
running command...
$ energy_group062 (-v|--version|version)
energy_group062/0.0.0 linux-x64 node-v12.13.1
$ energy_group062 --help [COMMAND]
USAGE
  $ energy_group062 COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`energy_group062 ActualTotalLoad [OPTIONS]`](#energy_group062-actualtotalload-options)
* [`energy_group062 ActualvsForecast [OPTIONS]`](#energy_group062-actualvsforecast-options)
* [`energy_group062 Admin [OPTIONS]`](#energy_group062-admin-options)
* [`energy_group062 AggregatedGenerationPerType [OPTIONS]`](#energy_group062-aggregatedgenerationpertype-options)
* [`energy_group062 DayAheadTotalLoadForecast [OPTIONS]`](#energy_group062-dayaheadtotalloadforecast-options)
* [`energy_group062 HealthCheck [OPTIONS]`](#energy_group062-healthcheck)
* [`energy_group062 Login [OPTIONS]`](#energy_group062-login-options)
* [`energy_group062 Logout [OPTIONS]`](#energy_group062-logout)
* [`energy_group062 Reset [OPTIONS]`](#energy_group062-reset)
* [`energy_group062 help [COMMAND]`](#energy_group062-help-options)

## `energy_group062 ActualTotalLoad [OPTIONS]`

fetches actual total load from database

```
USAGE
  $ energy_group062 ActualTotalLoad [OPTIONS]

OPTIONS
  -a, --area        specify area
  -t, --timeres     specify time resolution (PT[60|30|15]M)
  one of:
    -d, --date      specify date (YYYY-MM-DD)
    -m, --month     specify month (YYYY-MM)
    -y, --year      specify year (YYYY)
  -f, --format      specify format of result
  -h, --help        show help
```

_See code: [src/commands/ActualTotalLoad.ts](https://github.com/cli-client/energy_group062/blob/v0.0.0/src/commands/ActualTotalLoad.ts)_

## `energy_group062 ActualvsForecast [OPTIONS]`

fetches actual vs forecast load from database

```
USAGE
  $ energy_group062 ActualvsForecast [OPTIONS]

OPTIONS
  -a, --area        specify area
  -t, --timeres     specify time resolution (PT[60|30|15]M)
  one of:
    -d, --date      specify date (YYYY-MM-DD)
    -m, --month     specify month (YYYY-MM)
    -y, --year      specify year (YYYY)
  -f, --format      specify format of result
  -h, --help        show help
```

_See code: [src/commands/ActualvsForecast.ts](https://github.com/cli-client/energy_group062/blob/v0.0.0/src/commands/ActualvsForecast.ts)_

## `energy_group062 Admin [OPTIONS]`

admin-only subcommands

```
USAGE
  $ energy_group062 Admin [OPTIONS]

OPTIONS
  -n, --newuser     create new user with [username], --passw [password], --email [email], --quota [quota]
  -m, --moduser     modify [username] with --passw [password], --email [email], --quota [quota]
  -s, --userstatus  show [username]'s status
  -d, --newdata     import [table] data from --source [file]
  -h, --help       show help
```

_See code: [src/commands/Admin.ts](https://github.com/cli-client/energy_group062/blob/v0.0.0/src/commands/Admin.ts)_

## `energy_group062 AggregatedGenerationPerType [OPTIONS]`

fetches aggregated generation per type

```
USAGE
  $ energy_group062 AggregatedGenerationPerType [OPTIONS]

OPTIONS
  -a, --area            specify area
  -t, --timeres         specify time resolution (PT[60|30|15]M)
  -p, --productiontype  specify production type (inside "")
  one of:
    -d, --date          specify date (YYYY-MM-DD)
    -m, --month         specify month (YYYY-MM)
    -y, --year          specify year (YYYY)
  -f, --format          specify format of result
  -h, --help            show help
```

_See code: [src/commands/AggregatedGenerationPerType.ts](https://github.com/cli-client/energy_group062/blob/v0.0.0/src/commands/AggregatedGenerationPerType.ts)_

## `energy_group062 DayAheadTotalLoadForecast [OPTIONS]`

fetches day ahead total load forecast

```
USAGE
  $ energy_group062 DayAheadTotalLoadForecast [OPTIONS]

OPTIONS
  -a, --area        specify area
  -t, --timeres     specify time resolution (PT[60|30|15]M)
  one of:
    -d, --date      specify date (YYYY-MM-DD)
    -m, --month     specify month (YYYY-MM)
    -y, --year      specify year (YYYY)
  -f, --format      specify format of result
  -h, --help        show help
```

_See code: [src/commands/DayAheadTotalLoadForecast.ts](https://github.com/cli-client/energy_group062/blob/v0.0.0/src/commands/DayAheadTotalLoadForecast.ts)_

## `energy_group062 HealthCheck`

checks if back-end is up and ready

```
USAGE
  $ energy_group062 HealthCheck

OPTIONS
  -h, --help       show CLI help
```

_See code: [src/commands/HealthCheck.ts](https://github.com/cli-client/energy_group062/blob/v0.0.0/src/commands/HealthCheck.ts)_

## `energy_group062 Login [OPTIONS]`

Logs in user

```
USAGE
  $ energy_group062 Login [OPTIONS]

OPTIONS
  -u, --username    username
  -p, --passw       password
  -h, --help        show help
```

_See code: [src/commands/Login.ts](https://github.com/cli-client/energy_group062/blob/v0.0.0/src/commands/Login.ts)_

## `energy_group062 Logout`

Logs out last logged-in user

```
USAGE
  $ energy_group062 Logout

OPTIONS
  -h, --help       show help
```

_See code: [src/commands/Logout.ts](https://github.com/cli-client/energy_group062/blob/v0.0.0/src/commands/Logout.ts)_

## `energy_group062 Reset`

erases data from database

```
USAGE
  $ energy_group062 Reset

OPTIONS
  -h, --help       show CLI help
```

_See code: [src/commands/Reset.ts](https://github.com/cli-client/energy_group062/blob/v0.0.0/src/commands/Reset.ts)_

## `energy_group062 help [COMMAND]`

display help for energy_group062

```
USAGE
  $ energy_group062 help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_
<!-- commandsstop -->
