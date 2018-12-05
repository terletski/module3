/*eslint-disable*/
const add = require('./addFunctions')
const fs = require("fs");
const path = "./Notes.json";
/* eslint-enable */

function addNote (argv) {
  const actualDate = add.getDate();
  if (fs.existsSync(path)) {
    const note = { title: argv.title, body: argv.body, date: actualDate };
    const jsonFile = fs.readFileSync(path, 'utf8');
    let obj = JSON.parse(jsonFile);
    obj.push(note);
    obj = JSON.stringify(obj, null, '\t');
    fs.writeFileSync(path, obj, 'utf8');
    console.log('The note added.');
    checkForMatches(argv);
  } else {
    const notes = [{ title: argv.title, body: argv.body, date: actualDate }];
    const jsonStr = JSON.stringify(notes, null, '\t');
    fs.writeFileSync(path, jsonStr, 'utf8');
    console.log('Notes.json was created.');
  }
}

function listAllNotes () {
  // eslint-disable-next-line
    const jsonFile = require(path);
  jsonFile.forEach(function (arr) {
    console.log(arr);
  });
}

function readNote (argv) {
  // eslint-disable-next-line
    const jsonFile = require(path);
  const result = jsonFile.filter(function (arr) {
    return arr.title === argv.title;
  });
  console.log(result);
}

function removeNote (argv) {
  // eslint-disable-next-line
    const jsonFile = require(path);
  let result = jsonFile.filter((arr) => arr.title !== argv.title);
  result = JSON.stringify(result, null, '\t');
  fs.writeFileSync('Notes.json', result, 'utf8');
  console.log('Note removed');
}

function hasFileExist () {
  if (fs.existsSync(path)) {
    console.log('Notes.json file exists.');
  } else throw new Error('Notes.json file not found.');
}

function checkForMatches (argv) {
  // eslint-disable-next-line
  const jsonFile = require(path);
  const result = jsonFile.filter(function (arr) {
    return arr.title === argv.title;
  });
  if (result.length > 1) {
    console.info('But note with title <' + argv.title + '> exists.');
    console.info('Matches found: ' + result.length);
  }
}

function hasNoteExist (argv) {
  const jsonFile = require(path);
  let result = false;
  jsonFile.forEach(element => {
    if (element.title === argv.title) {
      result = true;
    }
  });
  if (!result) {
    throw new Error("Note wasn't found.");
  }
}

module.exports.addNote = addNote;
module.exports.listAllNotes = listAllNotes;
module.exports.readNote = readNote;
module.exports.removeNote = removeNote;
module.exports.hasFileExist = hasFileExist;
module.exports.hasNoteExist = hasNoteExist;
module.exports.checkForMatches = checkForMatches;
