
const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content

/* Removida función nombrada innecesaria */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await fetch('/assets/js/api.json').then(r => r.json());
        pintarCards(data)
    } catch (error){
        console.log(error)
    }
});

/* No es necesaria una función flecha en este contexto */
function pintarCards(data) {
    /* Se debe resetear el contenido del contenedor antes de dibujar las tarjetas */
    items.innerHTML = ''

    /* Un nuevo fragmento vacío debe ser creado para contener las tarjetas */
    let fragment = document.createDocumentFragment()
    data.forEach(producto => {
        /* El elemento debe ser clonado primero y después modificado */
        let card = templateCard.cloneNode(true)
        card.querySelector('h5').textContent = producto.title
        card.querySelector('p').textContent = producto.precio
        card.querySelector('img').setAttribute('src',producto.thumbnailUrl)
        fragment.appendChild(card)
    });

    items.appendChild(fragment)
}

