
/*
    Alexander:
    Los nombres de las variables deben ser descriptivos,
    tanto en español como en inglés
*/
const productsContainer = document.getElementById('items') // Alexander: Por qué el nombre de clase es "items" y no "products-container" o algo así?
const productCardTemplate = document.getElementById('template-card').content

/* Nuevas variables */
const articlesContainer = document.getElementById('articulosContenedor'); // Alexander: Por qué este nombre de este id está en CammelCase y el resto separado por guiones?
const articlesItemTemplate = document.getElementById(''); // Alexander: No existe ningún template para los articulos enlistados

/* Alexander: Removida función nombrada innecesaria */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const products = await fetch('/assets/js/api.json').then(r => r.json());
        drawProducts(products)
    } catch (error){
        console.log(error)
    }
});

/* Alexander: No es necesaria una función flecha en este contexto */
/* Alexander: Cambié el nombre porque "pintarCards" tiene inglés y español al mismo tiempo xd */
function drawProducts(products) {
    /* Alexander: Se debe resetear el contenido del contenedor antes de dibujar las tarjetas */
    productsContainer.innerHTML = ''

    products.forEach(producto => {
        /* Alexander:El elemento debe ser clonado primero y después modificado */
        let productCard = productCardTemplate.cloneNode(true)
        productCard.querySelector('h5').textContent = producto.title
        productCard.querySelector('p').textContent = producto.precio
        productCard.querySelector('img').setAttribute('src',producto.thumbnailUrl)

        /* Alexander: Se añade el nuevo 'card' directamente, no es necesario ningún fragmento */
        productsContainer.appendChild(productCard)
    });
}

