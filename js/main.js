//Armo un array vacio que va a ser nuestro carrito de compras
let carrito = [];

//Armo una variable que va a tener el contenido del json
let productos;

//Selecciono donode voy a renderizar mis productos
let tarjetas = document.getElementById("tarjetas")

//creo una función que se va a ocupar de renderizar cada producto
const pintarCards = (arrayProductos) =>{
  arrayProductos.forEach((producto)=>{
    const {id, nombre, imagen, precio, efecto, seccion, cantidad} = producto;
    const card = document.createElement('div');
    card.className = "card mt-5 mb-5 me-5 ms-5 hvr-grow";
    card.innerHTML = `
    <a href="${seccion}"><img src="${imagen}" class="card-img-top" alt="${producto.nombre}"/></a>
    <div class="card-body">
    <p class="card-text fw-bold">${nombre}</p>
    <p class="card-text">$<strong>${precio}</strong></p>
    <button data-id="${id}" class="buttonCTA btn btn-secondary"> Agregar al Carrito </button>
    </div>`;
    tarjetas.appendChild(card);
  });
  }

// Creo una función asyn con fetch para traer los productos cargados en el json
const cargarProductos = async () =>{
  const res = await fetch('../data/productos.json')
  const jsonResponse = await res.json()
  productos = jsonResponse.data
  pintarCards(productos)

//-------------------------------------//
//Esta clase sirve para formar el carrito con cada producto seleccionado

class Pedales{
  constructor(id,nombre, imagen, precio, efecto, seccion, cantidad){
    this.nombre = nombre;
    this.imagen = imagen;
    this.precio = precio;
    this.efecto = efecto;
    this.seccion = seccion;
    this.id = id;
    this.cantidad = 1;
  }
} 
//------------------------------------//

//Selecciono cada botón "Agregar al carrito"
  let botones = document.querySelectorAll(".buttonCTA");
 
//Creo la funcion para agregar cada producto a localstorage
  const agregarAlCarrito = (e) =>{
  
    let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));
  
    if(carritoLocalStorage){
     carrito = carritoLocalStorage;
    }
  
    
    let nombre = e.target.parentNode.children[0].textContent;
    let precio = e.target.parentNode.children[1].children[0].textContent;
    let imagen = e.target.parentNode.parentNode.children[0].children[0].src;
    let id = e.target.dataset.id;
    let index = carrito.findIndex(producto => producto.id == e.target.dataset.id);
    
    if(index == -1){
      const producto = new Pedales(id,nombre,imagen,precio);
      carrito.push(producto); 
    }else{
      carrito[index].cantidad++;
    }
    
  
    localStorage.setItem("carrito",JSON.stringify(carrito));
    
  
  }
  
  //Recorro los botones y les agrego un listener con la función agregarAlCarrito y uno para agregar tostify
  botones.forEach(elemento=>{
    elemento.addEventListener("click", agregarAlCarrito)
    elemento.addEventListener("click", ()=>{
      Toastify({
        text: "PRODUCTO AGREGADO",
        duration: 2000
      }).showToast();
    })
  
  })
}





cargarProductos();






