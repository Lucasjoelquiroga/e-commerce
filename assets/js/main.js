/* Esta base de datos contiene los elementos a vender */
import products from './database.js';

/* Elementos */
let main = document.querySelector('.main');
let section4products = main.childNodes[1];
let section4cart = main.childNodes[3];

/* El array dónde se contendrán los elementos que se comprarán */
let cart = []; 

function drawProducts()
{

}

function drawCart()
{

}

/* Utilizado para dibujar tanto los productos cómo los enlistados */
function drawBoth()
{
    drawProducts();
    drawCart();
}