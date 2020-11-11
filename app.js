const Semver = require("./classes/semver");

function determinePrecedence(fSem, sSem) {
  const fSemver = new Semver(fSem);
  const sSemver = new Semver(sSem);

  if (fSemver.prerelease || sSemver.prerelease) {
    return fSemver.compareMMPP(sSemver);
  }
  return fSemver.compareMMP(sSemver);
}


// console.log(determinePrecedence("2.0.0-cba", "2.0.0-b"));

module.exports = determinePrecedence;

