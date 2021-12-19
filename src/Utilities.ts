import * as fs from 'fs';

export class Utilities {

    public static getRandomNumberBetween(min: number, max: number): number {

        return Math.floor(Math.random() * max) + min;

    }

    public static getRandomImage(path: string): { path: string, filename: string } {

        const images = fs.readdirSync(path);
        const image = images[ Math.floor(Math.random() * images.length) ];

        return {

            path: `${ path }/${ image }`,
            filename: image

        };

    }

}
