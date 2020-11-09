const utility = require("../utility/utility");

// Props
// semver : string
// major : string
// minor : string
// patch : string
// MMP : number
// prerelease : string

class Semver {
  constructor(semver) {
    this.semver = semver;
    this.getDetails();
  }

  getDetails() {
    let semverArr = this.semver.split(".");
    this.major = semverArr[0];
    this.minor = semverArr[1];
    this.patch = semverArr[2];
    this.MMP = +this.semver.split("-")[0].split(".").join("");
    this.prerelease = this.semver.split("-")[1] || null;
  }

  //Compare Major, Minor, and Patch
  compareMMP(other) {
    if (!(other instanceof Semver)) {
      other = new Semver(other);
    }

    if (
      !utility.isSemverIdentifiers(this.semver) ||
      !utility.isSemverIdentifiers(other.semver)
    ) {
      return false;
    }

    return this.MMP > other.MMP;
  }

  //Compare Major, Minor, Patch, and Prerelease
  compareMMPP(other) {
    if (
      !utility.isSemverIdentifiers(this.semver) &&
      !utility.isSemverIdentifiers(other.semver)
    ) {
      return false;
    }

    // checking both semvers are not same in terms of Major, Minor, and Patch
    if (this.MMP !== other.MMP) {
      return this.compareMMP(other.semver.split("-")[0]);
    }

    // Below code are only for both semvers have same Major, Minor, and Patch
    // but with diffrent prerelease condition

    // 1) -> first semver not have prerelease but second have
    // 2) -> first semver have prerelease but second not have
    // 3) -> first and second semvers have prerelease

    if (!this.prerelease && other.prerelease) {
      return true;
    } else if (this.prerelease && !other.prerelease) {
      return false;
    } else {
      let i = 0;
      const fPreArr = this.prerelease.split(".");
      const sPreArr = other.prerelease.split(".");
      do {
        let a = fPreArr[i];
        let b = sPreArr[i];

        if (a === undefined && b === undefined) {
          return false;
        } else if (b === undefined) {
          return true;
        } else if (a === undefined) {
          return false;
        } else if (a === b) {
          continue;
        } else {
          if (+a && +b) {
            a = +a;
            b = +b;
          }
          if (a.length > 1) {
            a = a.split("").sort().join("");
          }
          if (b.length > 1) {
            b = b.split("").sort().join("");
          }
          return a > b;
        }
      } while (++i);
    }
  }
}

module.exports = Semver;
