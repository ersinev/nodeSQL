const productsTableCreation = `
   CREATE TABLE IF NOT EXISTS products(
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL
   )

`
module.exports = productsTableCreation