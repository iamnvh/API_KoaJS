"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProductById = getProductById;
exports.getProducts = getProducts;
exports.remove = remove;
exports.save = save;
exports.update = update;

var _productRepository = require("../../database/productRepository");

async function getProducts(ctx) {
  try {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    await delay(2000);
    const {
      limit,
      sort,
      name
    } = ctx.query;
    const products = (0, _productRepository.list)({
      limit,
      sort,
      name
    });
    return ctx.body = {
      data: products
    };
  } catch (error) {
    ctx.status = 404;
    return ctx.body = {
      success: false,
      data: [],
      error: error.message
    };
  }
}

async function save(ctx) {
  try {
    const product = ctx.request.body;
    const data = (0, _productRepository.add)(product);
    ctx.status = 201;
    return ctx.body = {
      data: data,
      success: true
    };
  } catch (error) {
    return ctx.body = {
      success: false,
      error: error.message
    };
  }
}

function update(ctx) {
  try {
    const id = parseInt(ctx.params.id);
    const product = ctx.request.body;
    const data = (0, _productRepository.update)(product, id);

    if (data === false) {
      return ctx.body = {
        success: false,
        message: "ID not found"
      };
    }

    ctx.status = 201;
    return ctx.body = {
      success: true
    };
  } catch (error) {
    return ctx.body = {
      success: false,
      error: error.message
    };
  }
}

function remove(ctx) {
  try {
    const id = Math.floor(ctx.params.id);
    const data = (0, _productRepository.remove)(id);

    if (data === false) {
      ctx.status = 404;
      return ctx.body = {
        status: 'error',
        message: 'Product not found'
      };
    }

    ctx.status = 201;
    return ctx.body = {
      success: true
    };
  } catch (error) {
    return ctx.body = {
      success: false,
      error: error.message
    };
  }
}

function getProductById(ctx) {
  try {
    const id = parseInt(ctx.params.id);
    const data = (0, _productRepository.find)(id);

    if (typeof data === 'undefined') {
      ctx.status = 404;
      return ctx.body = {
        status: 'error',
        message: 'Product not found'
      };
    }

    ctx.status = 201;
    return ctx.body = {
      success: true,
      data: data
    };
  } catch (error) {
    return ctx.body = {
      success: false,
      error: error.message
    };
  }
}
//# sourceMappingURL=producthandlers.js.map