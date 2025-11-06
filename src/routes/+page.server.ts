import { resolve } from 'path';
import type { PageServerLoad } from './$types';
import fs from 'fs';

export const load: PageServerLoad = () => {
    const subDir = "icons";
    const root = "./static/"
    const directory = resolve(`${root}${subDir}`);
    const files = fs.readdirSync(directory);
    return {
        options:
            files.map(fileName => ({
                name: fileName.split('.')[0],
                path: `${subDir}/${fileName}`
            }))
    }
};