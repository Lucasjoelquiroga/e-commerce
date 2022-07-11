function createProduct(name, url = '', price = 0, description = '', amount = 1)
{
    return {name: name, url: url, amount: amount, price: price, description: description};
}

/* Añadir más productos */

export default {
    cars: [
        createProduct('Tesla', '/assets/img/cars/tesla.png', 28000, 'Auto electrico')
    ],
    bikes: [
        
    ]
};