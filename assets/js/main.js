
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')

const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
//creo el objeto para agregar la informacion al carrito.
let carrito = {}


/* Removida función nombrada innecesaria */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await fetch('/assets/js/api.json').then(r => r.json());
        pintarCards(data)
    } catch (error){
        console.log(error)
    }
});
cards.addEventListener('click', e => {
    addCarrito(e)
})

items.addEventListener('click', e => {
    btnAccion(e)
})

/* No es necesaria una función flecha en este contexto */
function pintarCards(data) {
    /* Se debe resetear el contenido del contenedor antes de dibujar las tarjetas */
    cards.innerHTML = ''

    /* Un nuevo fragmento vacío debe ser creado para contener las tarjetas */
    let fragment = document.createDocumentFragment()
    data.forEach(producto => {
        /* El elemento debe ser clonado primero y después modificado */
        let card = templateCard.cloneNode(true)
        card.querySelector('h5').textContent = producto.title
        card.querySelector('p').textContent = producto.precio
        card.querySelector('img').setAttribute('src',producto.thumbnailUrl)
       //seleciiono el boton, para llamar al id de forma dinamica
       templateCard.querySelector('.btn-dark').dataset.id = producto.id 
        fragment.appendChild(card)
    });

    cards.appendChild(fragment)
}
//car capturo los elementos de la card CON CLASE BTNDARK .
const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {

       setCarrito(e.target.parentElement) 

    }
    //creo para evitar la prpagacion de eventos.
    e.stopPropagation()
}

const setCarrito = objeto => {
    //console.log(objeto)
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        
        cantidad: 1
    }

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
    carrito[producto.id] = {...producto}

    pintarCarrito()
}
const pintarCarrito = () => {
    // console.log(carrito)
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
       

        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id 
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()
    
}
const pintarFooter = () => {
    footer.innerHTML = ''
    
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `
        return
    }
    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    // console.log(nPrecio)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const botonVaciar = document.querySelector('#vaciar-carrito')
    botonVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })

}
const btnAccion = e => {
    // console.log(e.target.classList.contains('btn-info'))
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = { ...producto }
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito()
    }
    e.stopPropagation()
}


