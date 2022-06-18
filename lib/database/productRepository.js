"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.find = find;
exports.list = list;
exports.remove = remove;
exports.update = update;

var _fs = _interopRequireDefault(require("fs"));

var _sortBy = _interopRequireDefault(require("../untils/sortBy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let {
  data: products
} = require('./products.json');

function list(filter = {}) {
  if (filter.name) {
    products = products.filter(item => item.name === filter.name);
  }

  if (filter.sort) {
    if (filter.sort == "desc") {
      products = (0, _sortBy.default)(products, "createdAt").reverse();
    }

    if (filter.sort == "asc") {
      products = (0, _sortBy.default)(products, "createdAt");
    }
  }

  if (filter.limit) {
    products = products.slice(0, parseInt(filter.limit));
  }

  return products;
}

function add(data) {
  const productList = (0, _sortBy.default)(products, "id");
  const id = productList[productList.length - 1].id + 1;
  const result = {
    id: id,
    name: data.name,
    price: data.price,
    description: data.description,
    color: data.color,
    createdAt: data.createdAt,
    image: data.image
  };
  const updatedProducts = [...products, result];

  _fs.default.writeFile("./src/database/products.json", JSON.stringify({
    data: updatedProducts
  }), (err, data) => {
    if (err) {
      console.log(err);
    }

    return data;
  });

  return result;
}

function update(data, id) {
  const isExist = products.filter(product => product.id == id);

  if (isExist.length === 0) {
    return false;
  }

  const result = products.map(product => {
    if (product.id === id) {
      return { ...product,
        ...data
      };
    }

    return product;
  });
  const updatedProducts = result;
  return _fs.default.writeFile("./src/database/products.json", JSON.stringify({
    data: updatedProducts
  }), err => {
    if (err) {
      console.log(err);
    }
  });
}

function remove(id) {
  const isExist = products.filter(product => product.id === id);

  if (isExist.length === 0) {
    return false;
  }

  const data = products.filter(product => {
    return product.id !== id;
  });
  return _fs.default.writeFile("./src/database/products.json", JSON.stringify({
    data: data
  }), err => {
    if (err) {
      console.log(err);
    }
  });
}

function find(id) {
  return products.find(product => product.id == id);
}
//# sourceMappingURL=productRepository.js.map