import { list as listQuery,add as addProduct, remove as removeProduct, update as updateProduct, find as findProduct } from '../../database/productRepository'

export async function getProducts(ctx) {
    try {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(2000);
        const {limit, sort, name} = ctx.query;
        const products = listQuery({limit, sort, name})
        return ctx.body = {
            data: products
        };
    } catch (error) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            data: [],
            error: error.message
        }
    }
}

export async function save(ctx) {
    try {
        const product = ctx.request.body;
        const data = addProduct(product)
        ctx.status = 201;
        return ctx.body = {
            data: data,
            success: true,
        }
    } catch (error) {
        return ctx.body = {
            success: false,
            error: error.message
        }
    }
}
export function update(ctx) {
    try {
        const id = parseInt(ctx.params.id);
        const product = ctx.request.body;
        const data = updateProduct(product,id)
        if (data === false) {
            return ctx.body = {
                success: false, 
                message: "ID not found"
            }
        }
        ctx.status = 201;
        return ctx.body = {
            success: true,
        }
    } catch (error) {
        return ctx.body = {
            success: false,
            error: error.message
        }
    }
}

export function remove(ctx) {
    try {
        const id = Math.floor(ctx.params.id);
        const data = removeProduct(id)
        if (data === false) {
            ctx.status = 404;
            return ctx.body = {
                status: 'error',
                message: 'Product not found',
            }
        }
        ctx.status = 201;
        return ctx.body = {
            success: true,
        }
    } catch (error) {
        return ctx.body = {
            success: false,
            error: error.message
        }
    }
}
export function getProductById(ctx) {
    try {
        const id = parseInt(ctx.params.id);
        const data = findProduct(id)
        if (typeof data === 'undefined') {
            ctx.status = 404;
            return ctx.body = {
                status: 'error',
                message: 'Product not found',
            }
        }
        ctx.status = 201;
        return ctx.body = {
            success: true,
            data: data
        }
    } catch (error) {
        return ctx.body = {
            success: false,
            error: error.message
        }
    }
}
