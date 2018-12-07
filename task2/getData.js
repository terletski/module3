const request = require('request-promise-native');
const url = "https://rickandmortyapi.com/api/character";

//get characters 
function getData() {
    let result = [];
    const getChars = (url) => request(url, { json: true }).then((body) => {
        result = result.concat(body.results);
        if (body.info.next !== "") {
            return getChars(body.info.next);
        } else return result;
    });
    return getChars(url);
}
//get all data
function search(args) {
    return new Promise((resolve, reject) => {
        const properties = getProperties(args);
        getData().then((data) => {
            const chars = data.map((element) => {
                let flag = true;
                for (let i = 0; i < properties.length; i++) {
                    //"origin" and "location" parameters are objects
                    if (properties[i] === 'origin' || properties[i] === 'location') {
                        if (element[properties[i]].name.indexOf(args[properties[i]]) === -1) {
                            flag = false;
                            break;
                        }
                    } else if (properties[i] === 'id') {
                        if (element.id !== args['id']) {
                            flag = false;
                        }
                    }
                    else {
                        if (element[properties[i]].indexOf(args[properties[i]]) === -1) {
                            flag = false;
                            break;
                        }
                    }
                }
                if (flag === true) {
                    return element;
                }
            })
            resolve(chars);
        }).catch((err) => { reject(err); })
    })
}

function getProperties(args) {
    const result = [];
    //availiable parameters for search 
    const properties = ['id', 'name', 'species', 'status', 'type', 'gender', 'origin', 'location', 'episode'];
    //get keys from command arguments
    Object.keys(args).forEach((element) => {
        if (properties.includes(element)) result.push(element);
    });
    if (result.length > 1) throw new Error("invalid parameters.");
    return result;
}
//remove empty elements from array
function filterResult(arr) {
    return arr.filter((element) => element !== undefined);
}

module.exports = {
    getData,
    search,
    filterResult
};
