# Seed WordPress Data

Create fake data to seed wordpress sites using the REST API like a boss.

```sh
$ seed --endpoint https://yourdomain.com/wp-json --username a --password b create --amount 2 pages

Created page 1/2 ID #11109 https://yourdomain.com/delectus-repudiandae-in-animi/
Created page 2/2 ID #11110 https://yourdomain.com/aut-sunt-commodi-est/
```

## Install

```shell
npm install -g @mateotehgreat/wordpress-seeder
```

## Usage

```shell
$seed --help

Usage: 🚀 WordPress Seeder [options] [command]

Creates fake data to seed wordpress sites using the REST API.

Options:
  -V, --version              output the version number
  -e, --endpoint <endpoint>  url to the rest api base (i.e.: https://domain.com/wp-json)
  -u, --username <username>  wordpress username
  -p, --password <password>  wordpress password
  -h, --help                 display help for command

Commands:
  create [options] <type>    create new resources of type specified
  help [command]             display help for command
```

## Development

```shell
git clone https://github.com/mateothegreat/wordpress-seeder.git
cd wordpress-seeder
npm install
```

Running a command locally:

```shell
npx ts-node src/main.ts create --amount 2 categories
```
