const expect = require('chai').expect;
const addFunctions = require('./addFunctions');

let myPromise = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve('Success!');
  }, 250);
});

// eslint-disable-next-line no-undef
describe('Get date', () => {
  // eslint-disable-next-line no-undef
  it('should return current date', () => {
    let result = addFunctions.getDate();
    expect(result).to.be.an('String').to.have.lengthOf.below(20);
  });
});

// eslint-disable-next-line no-undef
describe('Get json', () => {
  // eslint-disable-next-line no-undef
  it('should return json file with title', () => {
    let result = addFunctions.getJson();
    expect(result).to.include('title');
  });
});

// eslint-disable-next-line no-undef
describe('myPromise', function () {
  // eslint-disable-next-line no-undef
  it('should return "Success!" eventually', () => {
    expect(myPromise).to.eventually.be.equal('Success!');
  });
});
