// Pre-Entrega #3

// Defina la clase producto
class Producto{
    constructor(id, nombre, categoria, img, precio){
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.img = img;
        this.precio = precio;
        this.cantidad = 1;
    }
}

// Creo un objeto y guardo lo en una variale
const pilsen = new Producto (1, "Pilsen", "Lager", "img/pilsen.jpg", 950);
const amber = new Producto (2, "Amber", "Lager", "img/amber.jpg", 900);
const bock = new Producto (3, "Bock", "Lager", "img/bock.jpg", 750);
const marzen = new Producto (4, "Marzen", "Lager", "img/marzen.jpg", 950);
const german = new Producto (5, "German Lager", "Lager", "img/german.jpg", 900);
const ipa = new Producto (6, "IPA", "Ale", "img/ipa.jpg", 1000);
const porter = new Producto (7, "Porter", "Ale", "img/porter.jpg", 1000);
const weizenbier = new Producto (8, "Weizenbier", "Ale", "img/weizenbier.jpg", 1000);
const belgian = new Producto (9, "Belgian", "Ale", "img/belgian.jpg", 1200);
const paleale = new Producto (10, "Pale Ale", "Ale", "img/paleale.jpg", 1000);

// Guardo todos las variables en el arreglo productos
let productos = [pilsen, amber, bock, marzen, german, ipa, porter, weizenbier, belgian, paleale];
  
//Guardo en el LocalStorage con la clave "productos" el arreglo productos
localStorage.setItem("productos", JSON.stringify(productos));

// Recupero los productos de localStorage y lo parseo a un arreglo
const productosEnStorage = JSON.parse(localStorage.getItem("productos")) || [];
// Creo un carrito donde voy a ir guardando mis productos
let carrito = [];

// Recuperar datos del carrito desde localStorage

let carritoEnStorage = JSON.parse(localStorage.getItem("carrito")) || [];

// Ahora vamos a mostrar los productos
// Primero tenemos que modificar el DOM asi que traemos el contenedorProductos de mi HTML
const contenedorProductos = document.getElementById("contenedorProductos");

// Luego creamos la funcion mostrarProductos()
const mostrarProductos = (productos) => {
    // Limpio el contenedor antes de mostrar porque como voy a llamar esta funcion varias veces se van a repetir los productos
    contenedorProductos.innerHTML="";
    // Vamos a recorrer el arreglo productos con un forEach()
    productos.forEach(item => {
        // vamos a crear una card de bootstrap para cada producto
        const card = document.createElement("div");
        card.classList.add("col-xl-3" , "col-md-6", "col-sm-12");

        card.innerHTML = `
                            <div class= "card">
                                <img src= "${item.img}" class="card-img-top imgProductos" alt="${item.nombre}">

                                <div class="text-center">
                                    <h2>${item.nombre}</h2>
                                    <p>${item.categoria}</p>
                                    <b>$${item.precio}</b><br>
                                    <button class= "btn colorBoton" id="boton${item.id}">Agregar</button>
                                </div>

                            </div>
                         `

        // Aca decimos que dentro de contenedorProductos escribamos lo que hay en la const card
         
        contenedorProductos.appendChild(card);// Esto lo ponemos dentro del forEach() para que en cada iteracion me dibuje el producto sino se terminarian pisando los productos

        // Traigo el boton agregar de mi html
        const boton = document.getElementById(`boton${item.id}`);

        // Espero el evento "click" y llamo a la funcion agregarAlCarrito() y le paso el id del producto
        boton.addEventListener("click", () => {
            agregarAlCarrito(item.id);
        })
    })
}

// LLamo a la funcion mostrarPoductos y le paso por parametro el arreglo productos
mostrarProductos(productos);

// Traigo el id filter__input y se lo asigno a la variable filterInput, que se va a encargar de filtrar los productos
const filterInput = document.getElementById("filter__input");

// Espero el evento "keyup" que es cuando dejo de presionar una tecla
filterInput.addEventListener("keyup", (e) => {

    // Tomo el valor ingresado en el input y lo paso a minuscula, creo un nuevo arreglo productosFilter que va a guardar los productos filtrados bajo la condicion de que si el nombre del producto(en minuscula) contiene el valor del input

    // Creo una variable productosFilter y le asigno un nuevo arreglo donde filtro los productos que en el nombre(en minuscula) contengan el valor del input(en minuscula)
    const productosFilter = productosEnStorage.filter((item) => item.nombre.toLowerCase().includes(e.target.value.toLowerCase()));

    if (e.target.value !== "") {
        // Si se escribio algo en el input muestro el arreglo filtrado
        mostrarProductos(productosFilter);
    } else {
        // Sino muestro todos los productos del localStorage
        mostrarProductos(productosEnStorage); e
    }
});

// Filtro por categoria segun pick en lista
const filterLista = document.getElementById("filter__lista");

filterLista.addEventListener("click", (e) => {

    const productosFilter = productosEnStorage.filter((item) => item.categoria.toLowerCase().includes(e.target.innerHTML.toLowerCase()))

    if(e.target.innerHTML !== "Todos"){

      mostrarProductos(productosFilter);

    }else{

      mostrarProductos(productosEnStorage);
    }
  
})

// Filtro selector por nombre
const filterNombre = document.getElementById("filter__nombre");

// Se escucha un evento, y se le pasa a filtrarPorNombre el caso selecciona en el evento
filterNombre.addEventListener("click", (e) => {
    filtrarPorNombre(e.target.innerHTML)
})
  
//FiltrarPorNombre resive por parametro como se va a ordenar
  const filtrarPorNombre = (orden) => {

    let productosOrdenados;

    if(orden === "A - Z"){
        
        // Usamos la funcion sort para ordenar los productos y el método localeCompare() que compara los string y devuelve un valor numérico que indica el orden.
        productosOrdenados = productosEnStorage.sort((a, b) => a.nombre.localeCompare(b.nombre));
        
        mostrarProductos(productosOrdenados); 
    }else{
        
        // Aca hacemos lo mismo pero invertimos el orden de (a, b) ---> (b, a)
        let productosOrdenados = productosEnStorage.sort((a, b) => b.nombre.localeCompare(a.nombre));
        mostrarProductos(productosOrdenados);
    }
}

// Filtro por precio
const filterPrecio = document.getElementById("filter__precio");

filterPrecio.addEventListener("click", (e) => {

    const orden = e.target.innerHTML;

    // Creo una variable donde voy a guardar mi arreglo ordenado 
    let preciosOrdenados;
    
    if(orden === "Ascendente"){
        // Ordeno el arreglo y lo guardo
        preciosOrdenados = productosEnStorage.sort((a, b) => a.precio - b.precio);

    }else if(orden === "Descendente"){
        // Ordeno el arreglo y lo guardo
        preciosOrdenados = productosEnStorage.sort((a, b) => b.precio - a.precio);
    }
    
    mostrarProductos(preciosOrdenados);
})

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carritoEnStorage.find(item => item.id === id);

    if (productoEnCarrito) {
        // Si el producto ya está en el carrito, simplemente aumenta la cantidad.
        productoEnCarrito.cantidad++;

    } else {
        // Si el producto no está en el carrito, agrégalo con cantidad 1.
        const producto = productos.find(item => item.id === id);
        carritoEnStorage.push(producto);
    }

    // Recalcula el precio total para todos los productos en el carrito.
    carritoEnStorage.forEach(producto => {
        producto.precioTotal = producto.precio * producto.cantidad;
    });

    // Guarda los datos actualizados en sessionStorage
    localStorage.setItem("carrito", JSON.stringify(carritoEnStorage));

    dibujarCarrito();
}

// Evento de boton carrito
const btnCarrito = document.getElementById("btnCarrito");

const carritoTable = document.getElementById("carritoTable");

let costoTotal = 0;

// Creo un evento en el que cuando hagan click en el carrito si este no se ve se muestra y si se ve se deja de mostrar
btnCarrito.addEventListener("click", () => {
    if (carritoTable) {
        if (carritoTable.style.display === "block") {
            carritoTable.style.display = "none";
        } else {
            carritoTable.style.display = "block";
            dibujarCarrito();
        }
    }
});

// Dibujar el Carrito
const dibujarCarrito = () => {
    // Selecciona el elemento de la lista del carrito
    const listaCarrito = document.getElementById("items");

    // Limpia el contenido anterior del carrito
    listaCarrito.innerHTML = '';

    carritoEnStorage.forEach(productosEnStorage => {
        const { img, nombre, cantidad, precio, id } = productosEnStorage;
        // Crea una fila para el producto en el carrito
        const row = document.createElement("tr");
        row.className = "producto__carrito";
        row.innerHTML = `
            <td><img src="${img}" class="card-img-top" style="width: 40%; height: 30%" /></td>
            <td>${nombre}</td>
            <td>${cantidad}</td>
            <td>$${precio}</td>
            <td>$${productosEnStorage.precioTotal}</td>
            <td>
                <button id="+${id}" class="btn btn-success">+</button>
                <button id="-${id}" class="btn btn-danger">-</button>
            </td>
        `;

        // Agrega la fila al carrito
        listaCarrito.appendChild(row);

        // Agrega eventos a los botones de aumento y disminución
        const btnAgregar = document.getElementById(`+${id}`);
        const btnRestar = document.getElementById(`-${id}`);
        
        btnAgregar.addEventListener("click", () => aumentarCantidad(id));
        btnRestar.addEventListener("click", () => restarCantidad(id));
    });

    dibujarFooter();
};

const aumentarCantidad = (id) => {
    const indexProductoCarrito = carritoEnStorage.findIndex((productosEnStorage) => productosEnStorage.id === id);

    if (indexProductoCarrito !== -1) {
        carritoEnStorage[indexProductoCarrito].cantidad++;
        carritoEnStorage[indexProductoCarrito].precioTotal = carritoEnStorage[indexProductoCarrito].cantidad * carritoEnStorage[indexProductoCarrito].precio;
    }

    // Guarda los datos actualizados en sessionStorage
    localStorage.setItem("carrito", JSON.stringify(carritoEnStorage));
    dibujarCarrito();
}

const restarCantidad = (id) => {
    const indexProductoCarrito = carritoEnStorage.findIndex((productosEnStorage) => productosEnStorage.id === id);

    if (indexProductoCarrito !== -1) {
        if (carritoEnStorage[indexProductoCarrito].cantidad > 1) {
            carritoEnStorage[indexProductoCarrito].cantidad--;
            carritoEnStorage[indexProductoCarrito].precioTotal = carritoEnStorage[indexProductoCarrito].cantidad * carritoEnStorage[indexProductoCarrito].precio;
        } else {
            // Si la cantidad es 1 o menor, simplemente elimina el producto del carrito
            carritoEnStorage.splice(indexProductoCarrito, 1);
        }
    }

    // Guarda los datos actualizados en sessionStorage
    localStorage.setItem("carrito", JSON.stringify(carritoEnStorage));
    dibujarCarrito();
}

// Generar Total a pagar
const generarTotales = () => {
    costoTotal = carritoEnStorage.reduce((total, { precioTotal }) => total + precioTotal, 0)
    const cantidadTotal = carritoEnStorage.reduce((total, {cantidad}) => total + cantidad, 0)

    return {
        costoTotal: costoTotal,
        cantidadTotal: cantidadTotal
    }
}

const footCarrito = document.getElementById("totales");
// Dibujar Footer
const dibujarFooter = () => {
    if (carritoEnStorage.length > 0) {
        footCarrito.innerHTML = "";

        let footer = document.createElement("tr");

        footer.innerHTML = `
        <th><b>Totales:</b></th>
        <td></td>
        <td>${generarTotales().cantidadTotal}</td>
        <td></td>
        <td>$${generarTotales().costoTotal}</td>
        <td>
        <button id="btnFinalizarCompra" class="btn btn-success">Finalizar Compra</button>
        </td>
        `;

        footCarrito.append(footer);
    } else {
        footCarrito.innerHTML = "<h3>No hay producto en carrito</h3>";
    }
    const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");
    if (btnFinalizarCompra) {
        btnFinalizarCompra.addEventListener("click", () => Comprar());
    }
};

const Comprar = () => {
    if (carritoEnStorage.length > 0) {
        const respuesta = confirm("¿Desea continuar con la compra?");
        if (respuesta) {
            carritoEnStorage = [];
            alert("La compra se realizó con éxito");
            localStorage.setItem("carrito", JSON.stringify(carritoEnStorage));
            dibujarCarrito();
        } else {
            alert("Compra cancelada");
        }
    } else {
        alert("El carrito está vacío");
    }
}