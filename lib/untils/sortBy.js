"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const sortBy = key => {
  return (a, b) => a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
};

const sortUpAscendingBy = (key, value) => {
  const rs = key.concat().sort(sortBy(value));
  return rs;
};

var _default = sortUpAscendingBy;
exports.default = _default;
//# sourceMappingURL=sortBy.js.map