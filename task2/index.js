/* eslint-disable */
const yargs = require("yargs");
const fs = require("fs");
const get = require('./getData');

yargs
    .command('choose <parameters> for searching characters')
    .alias({
        'i': 'id',
        'n': 'name',
        's': 'status',
        'r': 'species',
        't': 'type',
        'g': 'gender',
        'o': 'origin',
        'l': 'location'
    })
    .argv;

fs.existsSync('./result') || fs.mkdirSync('./result');

get.search(yargs).then((data, err) => {
    if (err) console.log(err);
    const result = get.filterResult(data);
    if (result.length > 0) {
        fs.writeFileSync(`result.json`, JSON.stringify(result, null, '\t'));
        console.log(result);
        console.log('result.json was created.');
    }
    else console.log(`No matches found.`);
})




