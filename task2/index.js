const yargs = require("yargs");
const fs = require("fs");
const get = require('./getData');
  
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
    .help()
    .argv;

get.search(args).then((data, err) => {
    if (err) console.log(err);
    const result = get.filterResult(data);
    if (result.length > 0) {
       mkdirSync('./result');
        fs.writeFileSync(`./result/result.json`, JSON.stringify(result, null, '\t'));
        console.log(result);
        console.log('result.json was created.');
    }
    else console.log(`No matches found.`);
})

const mkdirSync = function (dirPath) {
    try {
      fs.mkdirSync(dirPath)
    } catch (err) {
      if (err.code !== 'EEXIST') throw err
    }
  }
