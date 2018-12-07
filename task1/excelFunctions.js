/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
const XLSX = require('xlsx');
const fs = require('fs');
const add = require('./addFunctions');
const path = './Notes.json';

function writeToExcel () {
  if (fs.existsSync(path)) {
  const jsonFile = require(path);
  const wb = XLSX.utils.book_new();
  const string = JSON.stringify(jsonFile);
  const result = string.split('"body":').join('"note":');
  const excel = XLSX.utils.json_to_sheet(JSON.parse(result));
  XLSX.utils.book_append_sheet(wb, excel);
  XLSX.writeFile(wb, 'Notes.xlsx');
  console.log('Notes.xlsx was created.');
  } else checkingForJsonExistance(path);
}

function findAndUpdate (argv) {
  const jsonFile = require(path);
  const result = jsonFile.filter(function (arr) {
    return arr.title === argv.title;
  });
  if (result[0].title !== argv.newTitle) {
    result[0].title = argv.newTitle;
    add.getJson(jsonFile);
    console.log('Note changed.');
  } else throw new Error('Error while changing note.');
}

function readFromExcel () {
  const excelPath = './Notes.xlsx';
  if (fs.existsSync(excelPath)) {
    const wb = XLSX.readFile(excelPath);
    const sheetnamelist = wb.SheetNames;
    let result = XLSX.utils.sheet_to_json(wb.Sheets[sheetnamelist[0]]);
    result = JSON.stringify(result, null, '\t');
    fs.writeFileSync('Notes.json', result, 'utf8');
    console.log('Notes.xlsx was converted to Json file.');
  } else throw new Error('Notes.xlsx file not found.');
}

function checkingForJsonExistance (path) {
  const note = JSON.stringify([], null, '\t');
    fs.writeFileSync(path, note, 'utf8');
    console.log('Notes.json is not found.');
    console.log('Notes.json was created, but add a note before converting.');
}

module.exports = {
  writeToExcel,
  findAndUpdate,
  readFromExcel
};
