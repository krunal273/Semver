const assert = require("assert");
const expect = require("chai").expect;
const determinePrecedence = require("../app");
const data = require("./data/data.json");

describe("Testing determinePrecedence()", () => {
  // true cases
  describe("All true cases", () => {
    for (const i of data.true) {
      const str = `${i.fsem} > ${i.ssem} should return true `;
      it(str, () => {
        expect(determinePrecedence(i.fsem, i.ssem)).to.equal(i.result);
      });
    }
  });

  // false cases
  describe("All false cases", () => {
    for (const i of data.false) {
      const str = `${i.fsem} > ${i.ssem} should return false `;
      it(str, () => {
        expect(determinePrecedence(i.fsem, i.ssem)).to.equal(i.result);
      });
    }
  });
});
