const fs = require('fs-extra');
const concat = require('concat');
const argv = require('yargs').argv;

(async function build() {
    if (!argv.name) {
        console.error('no element name specified. Add `--name [element-name]` to the command');
        return;
    }
    const files = [
        `./dist/${argv.name}/runtime-es5.js`,
        `./dist/${argv.name}/polyfills-es5.js`,
        `./dist/${argv.name}/main-es5.js`,
    ];
    await fs.ensureDir('./dist/wc');
    await concat(files, './dist/wc/main.js');
    await fs.copyFile(`./dist/${argv.name}/styles.css`, './dist/wc/styles.css');
    await fs.copy(`./dist/${argv.name}/assets/`, './dist/wc/assets/' );
})()