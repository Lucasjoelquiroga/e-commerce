function createProduct(name, url = '', price = 0, description = '', amount = 1)
{
    return {name: name, url: url, amount: amount, price: price, description: description};
}

export default {
    cars: [
        createProduct('Tesla', '/assets/img/cars/tesla.png', 28000, 'Auto electrico')
    ],
    bikes: [
        
    ]
};