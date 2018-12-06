/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
const fs = require('fs');
const path = './Notes.json';

function getDate () {
  // dd/mm/yyyy hh:mm:ss
  const date = new Date();
  const currentDate = date.getDate() + '/' +
    (date.getMonth() + 1) + '/' +
    date.getFullYear() + ' ' +
    date.getHours() + ':' +
    date.getMinutes() + ':' +
    date.getSeconds();
  return currentDate;
}

function sortNotes (argv) {
  const jsonFile = require(path);
  // sort by date
  switch (argv.type) {
    case 'date':
      jsonFile.sort(function sortByDate (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      getJson(jsonFile);
      console.log('Sorting <' + argv.type + '> completed successfully.');
      break;
    // sort by title lenght
    case 'title lenght':
      // eslint-disable-next-line no-inner-declarations
      function sortByTitle (a, b) {
        if (a.title.length < b.title.length) { return -1; }
        if (a.title.length > b.title.length) { return 1; }
        return 0;
      }
      jsonFile.sort(sortByTitle);
      getJson(jsonFile);
      console.log('Sorting <' + argv.type + '> completed successfully.');
      break;
    // sort by note lenght
    case 'note lenght':
      // eslint-disable-next-line no-inner-declarations
      function sortByNote (a, b) {
        if (a.title.length + a.body.length < b.title.length + b.body.length) { return -1; }
        if (a.title.length + a.body.length > b.title.length + b.body.length) { return 1; }
        return 0;
      }
      jsonFile.sort(sortByNote);
      getJson(jsonFile);
      console.log('Sorting <' + argv.type + '> completed successfully.');
      break;
    // alphabetical sorting
    case 'alphabetical sorting':
      // eslint-disable-next-line no-inner-declarations
      function alphabeticalSorting (a, b) {
        if (a.title < b.title) { return -1; }
        if (a.title > b.title) { return 1; }
        return 0;
      }
      jsonFile.sort(alphabeticalSorting);
      getJson(jsonFile);
      console.log('Sorting <' + argv.type + '> completed successfully.');
      break;
    default: throw new Error('Incorrect type of sort.');
  }
}

function getJson () {
  const jsonFile = require(path);
  const result = JSON.stringify(jsonFile, null, '\t');
  fs.writeFileSync('Notes.json', result, 'utf8');
  return result;
}

module.exports = {
  getJson,
  getDate,
  sortNotes
};
