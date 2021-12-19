import * as WPAPI from 'wpapi';
import * as faker from 'faker';
import { Utilities } from './Utilities';
import { Argument, Command, Option } from 'commander';

export class Seeder {

    public cli = new Command();

    private client: WPAPI;
    private categories: Array<{ id: number, name: string }> = [];
    private tags: Array<{ id: number, name: string }> = [];

    public constructor() {

        this.cli.version('0.0.1').name('🚀 WordPress Seeder').description('Creates fake data to seed wordpress sites using the REST API.');

        this.cli
            .addOption(new Option('-e, --endpoint <endpoint>', 'url to the rest api base (i.e.: https://domain.com/wp-json)'))
            .addOption(new Option('-u, --username <username>', 'wordpress username'))
            .addOption(new Option('-p, --password <password>', 'wordpress password'));

        this.cli
            .command('create').addArgument(new Argument('<type>', 'resource type').choices([ 'categories', 'comments', 'pages', 'posts', 'tags' ]))
            .addOption(new Option('-a, --amount <amount>', 'amount of records to create'))
            .description('create new resources of type specified')
            .action(async (type, options) => {

                this.client = new WPAPI({

                    endpoint: this.cli.opts().endpoint,
                    username: this.cli.opts().username,
                    password: this.cli.opts().password

                });

                if (type === 'categories') {

                    await this.seedCategories(options.amount);

                } else if (type === 'tags') {

                    await this.seedTags(options.amount);

                } else if (type === 'pages') {

                    await this.seedPages(options.amount);

                } else if (type === 'posts') {

                    await this.seedPosts(options.amount);

                } else if (type === 'comments') {

                    await this.seedComments(options.amount);

                } else {

                    console.log('Invalid resource type!');

                    this.cli.help();

                }

            });

        this.cli.parse();

    }

    public async getRandomCategories(amount: number): Promise<Array<{ id: number, name: string }>> {

        const initial = await this.client.categories().perPage(1);

        return this.client.categories().perPage(amount).page(Utilities.getRandomNumberBetween(1, Math.ceil(initial._paging.totalPages / amount)));

    }

    public async getPosts(): Promise<Array<any>> {

        try {

            const result = await this.client.posts();

            console.log(result);

            return result;

        } catch (e) {

            console.log(e);

        }

    }

    public async seedCategories(amount: number) {

        for (let i = 1; i <= amount; i++) {

            try {

                const result = await this.client.categories().create({

                    name: faker.random.alphaNumeric(Utilities.getRandomNumberBetween(4, 32)),
                    description: faker.lorem.paragraph()

                });

                console.log(`Created category ${ i }/${ amount } ${ result.name } (#${ result.id }) ${ result.link }`);

            } catch (e) {

                console.log(e);

            }
        }

    }

    public async seedTags(amount: number) {

        for (let i = 1; i <= amount; i++) {

            try {

                const result = await this.client.tags().create({

                    name: faker.random.alphaNumeric(Utilities.getRandomNumberBetween(4, 32)),
                    description: faker.lorem.paragraph()

                });

                console.log(`Created tag ${ i }/${ amount } ${ result.name } (#${ result.id }) ${ result.link }`);

            } catch (e) {

                console.log(e);

            }
        }

    }

    public async seedPages(amount: number) {

        for (let i = 1; i <= amount; i++) {

            try {

                const categories = await this.getRandomCategories(Utilities.getRandomNumberBetween(1, 5));
                const start = Utilities.getRandomNumberBetween(0, this.categories.length - 1);
                const end = start + 3;

                const result = await this.client.pages().create({

                    title: faker.lorem.words(4),
                    except: faker.lorem.paragraph(),
                    content: faker.lorem.paragraphs(Utilities.getRandomNumberBetween(1, 100)),
                    categories: categories.map(category => category.id),
                    comment_status: 'open',
                    status: 'publish'

                });

                console.log(`Created page ${ i }/${ amount } ID #${ result.id } ${ result.link }`);

            } catch (e) {

                console.log(e);

            }
        }

    }

    public async seedPosts(amount: number) {

        for (let i = 1; i <= amount; i++) {

            try {

                const categories = await this.getRandomCategories(Utilities.getRandomNumberBetween(1, 5));
                const start = Utilities.getRandomNumberBetween(0, this.categories.length - 1);
                const end = start + 3;

                const result = await this.client.posts().create({

                    title: faker.lorem.paragraph(),
                    content: faker.lorem.paragraphs(Utilities.getRandomNumberBetween(1, 100)),
                    categories: categories.map(category => category.id),
                    status: 'publish'

                });

                console.log(`Created post ${ i }/${ amount } ID #${ result.id } ${ result.link }`);

            } catch (e) {

                console.log(e);

            }
        }

    }

    public async seedComments(amount: number) {

        const post = await this.client.posts().perPage(1);
        const pages = Math.floor(post._paging.total / 100);
        const total = post._paging.total * amount;

        for (let i = 1; i <= pages; i++) {

            const posts = await this.client.posts().perPage(100).page(i);

            for (let j = 0; j <= posts.length; j++) {

                for (let h = 0; h <= amount; h++) {

                    const comment = await this.client.comments().create({

                        author_email: faker.internet.email(),
                        author_name: `${ faker.name.firstName() } ${ faker.name.lastName() }`,
                        author_url: faker.internet.url(),
                        content: faker.lorem.paragraphs(Utilities.getRandomNumberBetween(1, 3)),
                        post: posts[ j ].id,
                        status: 'approved'

                    });

                    console.log(`Created comment ${ i + j }/${ total } ID #${ comment.id }`);

                }

            }

        }


    }

}
