"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seeder = void 0;
const WPAPI = require("wpapi");
class Seeder {
    constructor() {
        this.client = new WPAPI({
            endpoint: 'http://35.237.27.62/wp-json',
            username: 'matthew@matthewdavis.io',
            password: 'cw+mj7zL'
        });
    }
    async getPosts() {
        try {
            const client = await WPAPI.discover('http://35.237.27.62');
            client.auth({
                username: 'automation',
                password: 'Agby5kma0130'
            });
            const result = await client.settings();
        }
        catch (e) {
        }
    }
}
exports.Seeder = Seeder;
//# sourceMappingURL=Seeder.js.map