const productsDataInsertion = (userData) => {
    const { product_name, price } = userData;
    const query = `
    INSERT INTO products (product_name, price) VALUES
    ('${product_name}', ${price})
    `;
    return query;
}

module.exports = productsDataInsertion;