/* Esta base de datos contiene los elementos a vender */
import products from './database.js';

/* Elementos */
let main = document.querySelector('.main');
let section4products = main.childNodes[1];
let section4cart = main.childNodes[3];
let productTemplate = document.getElementsByTagName('template')[0].content;

/* El array dónde se contendrán los elementos que se comprarán */
let cart = []; 

/* products functions */
products.getElement = function(i)
{
    if(i < 0 || i >= products.length)
        return null;
    
    let product =  products[i];
    let template = productTemplate.cloneNode(true);
    
    let h2 = template.querySelector('h2');
    let img = template.querySelector('img');
    let p = template.querySelector('p');
    
    h2.innerText = product.name;
    img.src = product.url;
    p.innerText = product.description;

    return template;
};

/* Inserta un producto en un container */
products.appendTo = function(i, element)
{
    if(i < 0 || i >= this.length)
        return;

    element.appendChild(products.getElement(i));
};

/* Inserta todos los productos en un container */
products.drawAll = function(container)
{
    products.forEach((_, i) => products.appendTo(i, container));
};

/* Función genérica para dibujar todos los productos en el section */
function drawProducts(container)
{
    container.innerHTML = '';
    products.drawAll(container);
}

function drawCart(container)
{

}

/* Utilizado para dibujar tanto los productos cómo los enlistados */
function drawBoth()
{
    drawProducts(section4products);
    drawCart(section4cart);
}

drawBoth();