exports.isSemverIdentifiers = (semver) =>
  RegExp(
    "^^(([1-9][0-9]*|0)[.])(([1-9][0-9]*|0)[.])(([1-9][0-9]*|0))([-](0|[1-9][0-9]*|[a-zA-Z-]+[a-zA-Z0-9]*)([.](0|[1-9][0-9]*|[a-zA-Z]+[a-zA-Z0-9]*))*)*$"
  ).test(semver);

// exports.check = (semver) => {
//   return RegExp("^[a-zA-Z0-9-.]*$").test(semver);
// };
