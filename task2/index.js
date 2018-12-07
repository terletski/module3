const yargs = require("yargs");
const fs = require("fs");
const get = require('./getData');
const path = require('path');
  
const args = yargs
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

get.search(args).then((data, err) => {
    if (err) console.log(err);
    const result = get.filterResult(data);
    if (result.length > 0) {
        mkdirp('./result');
        fs.writeFileSync(`./result/result.json`, JSON.stringify(result, null, '\t'));
        console.log(result);
        console.log('result.json was created.');
    }
    else console.log(`No matches found.`);
})

function mkdirp(filepath) {
    fs.existsSync(path) || fs.mkdirSync(filepath);
}
