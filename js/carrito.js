//Recupero del localstorage los datos y los cargo en carrito
const carrito = JSON.parse(localStorage.getItem("carrito"));

//Selecciono el sector donde voy a renderizar mi carrito de compras
let tbody = document.querySelector('#tbody');

//pinto con una tabla todos los productos que se cargaron el carrito
const rellenarCarrito = (arrayCarrito) =>{
    for(let producto of arrayCarrito){
        let row = document.createElement('tr');
        row.innerHTML = `<td>${producto.nombre}</td>
                        <td>${producto.precio}</td>
                        <td>${producto.cantidad}</td>
                        <td>${producto.precio * producto.cantidad}</td>
                        <td><button id="${producto.id}" class="btn btn-danger btn-sm eliminar">Eliminar</button></td>`;
    
        tbody.append(row);
    }   
}

rellenarCarrito(carrito);

//Selecciono los botonones "Eliminar"
let botonesEliminar = document.querySelectorAll(".eliminar");

//Recorro ese array de botones eliminar y con el metodo splice quito cada producto del localstorage
const eliminarProducto = (e) => {
   let index =  carrito.findIndex(producto => producto.id == e.target.id)
    carrito.splice(index,1);
    e.target.parentNode.parentNode.remove();
    localStorage.setItem("carrito",JSON.stringify(carrito));
}
botonesEliminar.forEach(elemento => {
    elemento.addEventListener("click", eliminarProducto)
});
