import fs from "fs";
import sortBy from "../untils/sortBy";
let {data: products} = require('./products.json')

export function list(filter = {}) {
  if (filter.name) {
    products = products.filter((item) => item.name === filter.name);
  }
  if (filter.sort) {
    if (filter.sort == "desc") {
      products = sortBy(products, "createdAt").reverse();
    }
    if (filter.sort == "asc") {
      products = sortBy(products, "createdAt");
    }
  }
  if (filter.limit) {
    products = products.slice(0, parseInt(filter.limit));
  }

  return products;
}

export function add(data) {
  const productList = sortBy(products, "id");
  const id = productList[productList.length - 1].id + 1;
  const result = {
    id: id,
    name: data.name,
    price: data.price,
    description: data.description,
    color: data.color,
    createdAt: data.createdAt,
    image: data.image,
  };
  const updatedProducts = [...products, result];
  fs.writeFile(
    "./src/database/products.json",
    JSON.stringify({
      data: updatedProducts,
    }),
    (err,data) => {
      if (err) {
        console.log(err);
      }
      return data;
    }
  );
  return result;
}

export function update(data, id) {
  const isExist = products.filter((product) => product.id == id);
  if (isExist.length === 0) {
    return false;
  }
  const result = products.map((product) => {
    if (product.id === id) {
      return {
        ...product,
        ...data,
      };
    }
    return product;
  });
  const updatedProducts = result;
  return fs.writeFile(
    "./src/database/products.json",
    JSON.stringify({
      data: updatedProducts,
    }),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}
export function remove(id) {
  const isExist = products.filter((product) => product.id === id);
  if (isExist.length === 0) {
    return false;
  }
  const data = products.filter((product) => {
    return product.id !== id;
  });
  return fs.writeFile(
    "./src/database/products.json",
    JSON.stringify({
      data: data,
    }),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

export function find(id) {
  return products.find((product) => product.id == id);
}
