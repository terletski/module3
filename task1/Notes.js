// eslint-disable 
const yargs = require("yargs");
const fs = require("fs");
const XLSX = require('xlsx');
const path = "./Notes.json";
// eslint-enable 
const titleOptions = {
  describe: "Title of note",
  demandOption: true,
  alias: 't'
};

const newTitleOptions = {
  describe: "New title of note",
  demandOption: true,
};

const bodyOptions = {
  describe: 'Body of note',
  demandOption: true,
  alias: 'b'
};

const typeOptions = {
  describe: 'Type of sort',
  demandOption: true
};

yargs.command("add", "Add a new note",
  function (yargs) {
    return yargs.options({
      "title": titleOptions,
      "body": bodyOptions
    });
  },

  function (argv) {
    addNote(argv);
  }
)
  .help()
  .argv;

yargs.command("list", "List all notes",

  function (argv) {
    hasFileExist(argv);
    listAllNotes(argv);
  }
)
  .help()
  .argv;

yargs.command("read", "Read a note",
  function (yargs) {
    return yargs.options({
      "title": titleOptions
    });
  },

  function (argv) {
    hasFileExist(argv);
    // hasNoteExist(argv);
    readNote(argv);
  }
)
  .help()
  .argv;

yargs.command("remove", "Remove a note",
  function (yargs) {
    return yargs.options({
      "title": titleOptions
    });
  },

  function (argv) {
    hasFileExist(argv);
    // hasNoteExist(argv);
    removeNote(argv);
  }
)
  .help()
  .argv;

yargs.command("sort", "Sort notes by types",
  function (yargs) {
    return yargs.options({
      "type": typeOptions
    });
  },

  function (argv) {
    hasFileExist();
    sortNotes(argv);
  }
)
  .help()
  .argv;

yargs.command("writeToExcel", "Write to exel",
  function (yargs) {
    return yargs.options({
    });
  },

  function () {
    hasFileExist();
    writeToExcel();
  }
)
  .help()
  .argv;

yargs.command("readFromExcel", "Read from excel",
  function (yargs) {
    return yargs.options({
    });
  },

  function () {
    readFromExcel();
  }
)
  .help()
  .argv;

yargs.command("findAndUpdate", "Find and update note",
  function (yargs) {
    return yargs.options({
      "title": titleOptions,
      "newTitle": newTitleOptions
    });
  },

  function (argv) {
    hasFileExist(argv);
    findAndUpdate(argv);
  }
)
  .help()
  .argv;

function addNote(argv) {
  const actualDate = getDate();
  if (fs.existsSync(path)) {
    const note = { title: argv.title, body: argv.body, date: actualDate };
    const jsonFile = fs.readFileSync(path, "utf8");
    let obj = JSON.parse(jsonFile);
    obj.push(note);
    obj = JSON.stringify(obj, null, "\t");
    fs.writeFileSync(path, obj, "utf8");
    console.log("The note added.");
    checkForMatches(argv);
  } else {
    const notes = [{ title: argv.title, body: argv.body, date: actualDate }];
    const jsonStr = JSON.stringify(notes, null, "\t");
    fs.writeFileSync(path, jsonStr, "utf8");
    console.log("Notes.json was created.");
  }
}

function listAllNotes() {
  // eslint-disable-next-line
  const jsonFile = require(path);
  jsonFile.forEach(function (arr) {
    console.log(arr);
  });
}

function readNote(argv) {
  // eslint-disable-next-line
  const jsonFile = require(path);
  const result = jsonFile.filter(function (arr) {
    return arr.title === argv.title;
  });
  console.log(result);
}

function removeNote(argv) {
  // eslint-disable-next-line
  const jsonFile = require(path);
  let result = jsonFile.filter((arr) => arr.title !== argv.title);
  result = JSON.stringify(result, null, "\t");
  fs.writeFileSync("Notes.json", result, "utf8");
  console.log("Note removed");
}

function hasFileExist() {
  if (fs.existsSync(path)) {
    console.log("Notes.json file exists.");
  } else throw new Error("Notes.json file not found.");
}

function checkForMatches(argv) {
  // eslint-disable-next-line
  const jsonFile = require(path);
  const result = jsonFile.filter(function (arr) {
    return arr.title === argv.title;
  });

  if (result.length > 1) {
    console.info("But note with title <" + argv.title + "> exists.");
    console.info("Matches found: " + result.length);
  }
}

function hasNoteExist(argv) {
  const jsonFile = require(path);
  jsonFile.filter(function (arr) {
    if (arr.title !== argv.title) throw new Error("Note is not found.");
  });
}

function getDate() {
  // dd/mm/yyyy hh:mm:ss
  const date = new Date();
  const currentDate = date.getDate() + "/"
    + (date.getMonth() + 1) + "/"
    + date.getFullYear() + " "
    + date.getHours() + ":"
    + date.getMinutes() + ":"
    + date.getSeconds();
  return currentDate;
}

function sortNotes(argv) {
  const jsonFile = require(path);
  //sort by date
  if (argv.type === "date") {
    jsonFile.sort(function sortByDate(a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    const result = JSON.stringify(jsonFile, null, "\t");
    fs.writeFileSync("Notes.json", result, "utf8");
    console.log(result);
    console.log("Sorting <" + argv.type + "> completed successfully.");
  }
  else if (argv.type === "title lenght") {
    //sort by title lenght
    function sortByTitle(a, b) {
      if (a.title.length < b.title.length)
        return -1;
      if (a.title.length > b.title.length)
        return 1;
      return 0;
    }
    jsonFile.sort(sortByTitle);
    const result = JSON.stringify(jsonFile, null, "\t");
    fs.writeFileSync("Notes.json", result, "utf8");
    console.log("Sorting <" + argv.type + "> completed successfully.");
  }
  else if (argv.type === "note lenght") {
    //sort by note lenght
    function sortByNote(a, b) {
      if (a.title.length + a.body.length < b.title.length + b.body.length)
        return -1;
      if (a.title.length + a.body.length > b.title.length + b.body.length)
        return 1;
      return 0;
    }
    jsonFile.sort(sortByNote);
    const result = JSON.stringify(jsonFile, null, "\t");
    fs.writeFileSync("Notes.json", result, "utf8");
    console.log("Sorting <" + argv.type + "> completed successfully.");
  }
  else if (argv.type === "alphabetical sorting") {
    //alphabetical sorting
    function alphabeticalSorting(a, b) {
      if (a.title < b.title)
        return -1;
      if (a.title > b.title)
        return 1;
      return 0;
    }
    jsonFile.sort(alphabeticalSorting);
    const result = JSON.stringify(jsonFile, null, "\t");
    fs.writeFileSync("Notes.json", result, "utf8");
    console.log("Sorting <" + argv.type + "> completed successfully.");
  }
  else throw new Error("Incorrect type of sort.");
}

function writeToExcel() {
  const jsonFile = require(path);
  const wb = XLSX.utils.book_new();
  const string = JSON.stringify(jsonFile);
  // const result = string.replace('"body":', '"note":');
  const result = string.split('"body":').join('"note":');
  const excel = XLSX.utils.json_to_sheet(JSON.parse(result));
  XLSX.utils.book_append_sheet(wb, excel);
  XLSX.writeFile(wb, "Notes.xlsx");
  console.log("Notes.xlsx was created.");
  // console.log(typeof wb);
}

function findAndUpdate(argv) {
  const jsonFile = require(path);
  const result = jsonFile.filter(function (arr) {
    return arr.title === argv.title;
  });
  if (result[0].title !== argv.newTitle) {
    result[0].title = argv.newTitle;
    let res = JSON.stringify(jsonFile, null, "\t");
    fs.writeFileSync("Notes.json", res, "utf8");
    console.log("Note changed.");
  } else throw new Error("Error while changing note.");
}

function readFromExcel() {
  const excelPath = "./Notes.xlsx";
  if (fs.existsSync(excelPath)) {
    const wb = XLSX.readFile(excelPath);
    const sheetnamelist = wb.SheetNames;
    let result = XLSX.utils.sheet_to_json(wb.Sheets[sheetnamelist[0]]);
    result = JSON.stringify(result, null, "\t");
    fs.writeFileSync("Notes.json", result, "utf8");
    console.log("Notes.xlsx was converted to Json file.");
  } else throw new Error("Notes.xlsx file not found.");
}



