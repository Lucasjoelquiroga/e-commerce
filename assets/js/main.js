
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
// const fragment = document.createDocumentFragment() /* Alexander: No es necesario usar fragmentos en este código */
//creo el objeto para agregar la informacion al carrito.
let carrito = {}

//pintar productos recorriendolos.los clono y los modifico.
const pintarCards = data  => {
    data.forEach(producto => {
        const clone = templateCard.cloneNode(true)
        clone.querySelector('h5').textContent = producto.title
        clone.querySelector('p').textContent = producto.precio
        clone.querySelector('img').setAttribute('src', producto.thumbnailUrl)
        //seleciiono el boton, para llamar al id de forma dinamica
        clone.querySelector('.btn-dark').dataset.id = producto.id /* Nice trick */
        cards.appendChild(clone)
    });


    
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
        const clone = templateCarrito.cloneNode(true)
        clone.querySelector('th').textContent = producto.id
        clone.querySelectorAll('td')[0].textContent = producto.title
        clone.querySelectorAll('td')[1].textContent = producto.cantidad
        clone.querySelector('span').textContent = producto.cantidad * producto.precio
       

        clone.querySelector('.btn-info').dataset.id = producto.id
        clone.querySelector('.btn-danger').dataset.id = producto.id 
        
        items.appendChild(clone)
    })
    

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

    const clone = templateFooter.cloneNode(true)
    clone.querySelectorAll('td')[0].textContent = nCantidad
    clone.querySelector('span').textContent = nPrecio

    footer.appendChild(clone)

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

// El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
/* Removida función nombrada innecesaria */
//// Traer productos de la api.jason con el fech y capturar los datos.
//try,hace una peticion, especifica una respuesta.cath pinta el error en consola.
/* Eventos */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await fetch('/assets/js/api.json').then(r => r.json());
        pintarCards(data)
    } catch (error){
        console.log(error)
    }
});

cards.addEventListener('click', addCarrito)
items.addEventListener('click', btnAccion)