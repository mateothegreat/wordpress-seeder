# Seed WordPress Data 🚀🚀🚀

Create fake data to seed wordpress sites using the REST API like a boss.

### 🦾 Features

* Create unlimited categories.
* Create unlimited comments.
* Create unlimited pages:
    * Adds comments.
    * Adds random media file(s).
* Create unlimited posts.
    * Adds categories.
    * Adds comments.
    * Adds random media file(s).
* Create unlimited tags.
* Create unlimited media upload.

```sh
$ wordpress-seeder --endpoint https://yourdomain.com/wp-json --username a --password b create --amount 2 pages

Created page 1/2 ID #11109 https://yourdomain.com/delectus-repudiandae-in-animi/
Created page 2/2 ID #11110 https://yourdomain.com/aut-sunt-commodi-est/
```

## Install

```shell
npm install -g wordpress-seeder
```

## Usage

Global options:

```shell
$ wordpress-seeder --help

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

Create options:

```shell
$ wordpress-seeder create --help

Usage: 🚀 WordPress Seeder create [options] <type>

create new resources of type specified

Arguments:
  type                   resource type (choices: "categories", "comments", "pages", "posts", "tags")

Options:
  -a, --amount <amount>  amount of records to create
  -h, --help             display help for command
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
