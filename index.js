'use strict';

class Carrito{

    constructor(producto, cantidad, precio) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.precio = precio;
    }

}
 let listacarrito = []
/*
 * PICART - PIÑEIRO
 */

let productos = [
    {
        id: 1,
        nombre: 'Iphone 13 Mini',
        descripcion: 'Descripción del producto 1',
        precio: 400000,
        imagen: 'images/iphone_mini.jpg',
        categoría: 'IPHONE',
        numerocategoría : 1,
    },
    {
        id: 2,
        nombre: 'Iphone PRO',
        descripcion: 'Descripción del producto 2',
        precio: 680000,
        imagen: 'images/iphone_pro.jpg',
        categoría: 'IPHONE',
        numerocategoría : 1,
    },
    {
        id: 3,
        nombre: 'Moto e 40',
        descripcion: 'Descripción del producto 3',
        precio: 45000,
        imagen: 'images/motoe_40.jpg',
        categoría: 'MOTOROLA',
        numerocategoría : 2,
    },
    {
        id: 4,
        nombre: 'Moto Edge 30',
        descripcion: 'Descripción del producto 4',
        precio: 115000,
        imagen: 'images/motoedge_30.jpg',
        categoría: 'MOTOROLA',
        numerocategoría : 2,
    },
    {
        id: 5,
        nombre: 'S-20',
        descripcion: 'Descripción del producto 5',
        precio: 140000,
        imagen: 'images/s20.jpg',
        categoría: 'SAMSUNG',
        numerocategoría : 3,
    },
    {
        id: 6,
        nombre: 'Z Fold',
        descripcion: 'Descripción del producto 6',
        precio: 430000,
        imagen: 'images/z_fold.jpg',
        categoría: 'SAMSUNG',
        numerocategoría : 3,
    },
];

let carr = localStorage.getItem("carrito");
if(carr != null && carr != ""){
    listacarrito = JSON.parse(carr);
    actualizarCarrito();
}

function agregarCarrito(nroproducto, precio){
    let nuevo = new Carrito(nroproducto, 1, precio);
    listacarrito.push(nuevo);
    localStorage.setItem("carrito", JSON.stringify(listacarrito));
    actualizarCarrito();
}

function actualizarCarrito(){
    document.getElementById("cantidadintems").innerText = listacarrito.length;
    let total = 0;
    for(let i=0;i<listacarrito.length;i++){
        total = total + (listacarrito[i].precio * listacarrito[i].cantidad);
    }
    document.getElementById("totalapagar").innerText = total;
}

function filtrar(nrocategoria){
    let contenedor = document.getElementById("productos");
    for(let i =0;i<productos.length;i++){
        if(productos[i].numerocategoría==nrocategoria){
            let div = generarProducto(productos[i]);
            contenedor.appendChild(div);    
        }
    }
}

function cargarproductos(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const filtro = urlParams.get('categoria');
    if(filtro==undefined){
        cargarTodosLosProductos();
    }else{
        filtrar(filtro)
    }
}

function cargarTodosLosProductos(){
    document.getElementById("productos").innerHTML = "";
    let contenedor = document.getElementById("productos");
    for(let i =0;i<productos.length;i++){
        let div = generarProducto(productos[i]);
        contenedor.appendChild(div);
    }
}

function generarProducto(producto){
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute("src", producto.imagen);
    img.setAttribute("alt", producto.nombre);
    img.onclick = () => {
        abrirModalProducto(producto.id);
    }
    let div2 = document.createElement("div");
    let h3 = document.createElement("h3");
    h3.innerHTML = producto.nombre;
    let p1 = document.createElement("p");
    p1.innerHTML = producto.descripcion;
    let p2 = document.createElement("p");
    p2.innerHTML = 'Precio: $' + producto.precio;
    let p3 = document.createElement("p");
    p3.innerHTML = producto.categoría;
    let but = document.createElement("button");
    but.innerHTML = 'Agregar';
    but.onclick = () => {
        agregarCarrito(producto.id, producto.precio);
    }
    div2.appendChild(h3);
    div2.appendChild(p1);
    div2.appendChild(p2);
    div2.appendChild(p3);
    div2.appendChild(but);
    div.appendChild(img);
    div.appendChild(div2);
    return div;
}

function abrirModalProducto(id){
    let datos = document.getElementById("datosproducto");
    datos.removeChild(datos.firstChild);
    for(let i =0;i<productos.length;i++){
        if(id==productos[i].id){
            let div = generarProducto(productos[i]);
            datos.appendChild(div);
        }
    }
    document.getElementById("modalProducto").classList.remove("oculto");
}

function cerrarModalProducto(){
    document.getElementById("modalProducto").classList.add("oculto");
    document.getElementById("datosproducto").innerHTML = "";
}

function vercarrito(){
    let carrito = document.getElementById("datoscarrito");
    let tabla = document.createElement("table")
    let total = 0;
    for(let i=0;i<listacarrito.length;i++){
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerHTML = obtenerNombreProducto(listacarrito[i].producto)
        let td2 = document.createElement("td");
        td2.innerHTML = listacarrito[i].cantidad;
        let td3 = document.createElement("td");
        td3.innerHTML = listacarrito[i].precio;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        let tdeliminar = document.createElement("td");
        tdeliminar.innerHTML = 'X';
        tdeliminar.onclick = () =>{
            eliminarProductoCarrito(listacarrito[i].producto);
        }
        tr.appendChild(tdeliminar);
        tabla.appendChild(tr);
        total = total + listacarrito[i].precio * listacarrito[i].cantidad;
    }

    let trtotal = document.createElement("tr");
    let td11 = document.createElement("td");
    td11.innerHTML = 'Total';
    let td21 = document.createElement("td");
    let td31 = document.createElement("td");
    td31.innerHTML = total;
    let td41 = document.createElement("td");
    trtotal.appendChild(td11);
    trtotal.appendChild(td21);
    trtotal.appendChild(td31);
    trtotal.appendChild(td41);
    tabla.appendChild(trtotal);

    carrito.appendChild(tabla);
    let but = document.createElement("button");
    but.innerHTML = 'Vaciar';
    but.onclick = () => {
        vaciarCarrito();
    }

    let but2 = document.createElement("button");
    but2.innerHTML = 'Ir al checkout';
    but2.onclick = () => {
        alert("Hemos recibido el pago. ¡GRACIAS POR TU COMPRA!")
    }

    carrito.appendChild(but);
    carrito.appendChild(but2);

    document.getElementById("modalCarrito").classList.remove("oculto");
    
}

function eliminarProductoCarrito(id){
    for(let i=0;i<listacarrito.length;i++){
        if(listacarrito[i].producto == id){
           listacarrito.splice(i, 1);
           cerrarModalCarrito();
           vercarrito();
           actualizarCarrito();
           break;
        }
    }

}


function vaciarCarrito(){
    listacarrito = [];
    localStorage.setItem("carrito", "");
    cerrarModalCarrito();
    document.getElementById("cantidadintems").innerText = 0;
    document.getElementById("totalapagar").innerText = 0;
}

function cerrarModalCarrito(){
    document.getElementById("modalCarrito").classList.add("oculto");
    document.getElementById("datoscarrito").innerHTML = "";
}

function obtenerNombreProducto(id){
    for(let i =0;i<productos.length;i++){
        if(id==productos[i].id){
            return productos[i].nombre;
        }
    }
}