
//coleccion de objetos
//se accede a lis id y se los guarda en una variable.
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
// se accede a los template y se los guarda en una variable.importate los content para acceder a los elementos
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
//para recorrer elementos y pintarlos en el sitio web se recomienda usar fragmen, si es solo un elemento tambien se puede usar innerhtml.
const fragment = document.createDocumentFragment()
//creo el objeto para agregar la informacion al carrito.
let carrito = {}


// El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
/* Removida función nombrada innecesaria */
//// Traer productos de la api.jason con el fech y capturar los datos.
//try,hace una peticion, especifica una respuesta.cath pinta el error en consola.
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await fetch('/assets/js/api.json').then(r => r.json());
        pintarCards(data)
    } catch (error){
        console.log(error)
    }
});
//// Eventos
cards.addEventListener('click', e => {
    addCarrito(e)
})

items.addEventListener('click', e => {
    btnAccion(e)
})
//pintar productos recorriendolos.los clono y los modifico.
const pintarCards = data  => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute('src', producto.thumbnailUrl)
        //seleciiono el boton, para llamar al id de forma dinamica
        templateCard.querySelector('.btn-dark').dataset.id = producto.id 
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
 
    
    });


    cards.appendChild(fragment)
}
// Agregar al carrito, capturo los elementos de la card CON CLASE BTNDARK .
const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {

       setCarrito(e.target.parentElement) 

    }
    //creo para evitar la prpagacion de eventos.
    e.stopPropagation()
}
//captura los elementos de addcarrito.
const setCarrito = objeto => {
    //console.log(objeto)
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        
        cantidad: 1
    }
//aumentamos la cantidad
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


