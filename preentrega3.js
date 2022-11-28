

// const cabezon = document.getElementById('navbar');

// cabezon.onclick = () => console.log('Hola');

// const ingresoNombre = document.getElementById('nombre');
// const ingresoApellido = document.getElementById('apellido');
// // ingresoNombre.oninput = (i) => console.log(i)

// const boton = document.getElementById('boton');
// const saludo = document.getElementById('saludo');

// const infoUsuario = {}

// boton.onclick = () => {
//     console.log(ingresoNombre.value);
//     console.log(ingresoApellido.value);
    
//     nombreYApellido = `${ingresoNombre.value} ${ingresoApellido.value}`
//     // const saludoMod = 
//     saludo.innerText = `Hola ${nombreYApellido}`
//     ingresoNombre.value = '';
//     ingresoApellido.value = '';
// };

// contenedorNuevoUsuario.remove();

const menuIngreso = document.getElementById('contenedorNuevoUsuario');
const saludo = document.getElementById('saludo');
const ingresoUsuario = document.getElementById('usuario');
const ingresoPassword = document.getElementById('password');
const ingresoBoton = document.getElementById('botonIngreso');
const ingresoError = document.getElementById('errorIngreso');
const registroBoton = document.getElementById('botonRegistro');
const registroTodo = document.getElementById('sinUsuario');
const tituloIngreso = document.getElementById('tituloIngreso');
const listaClientesExiste = JSON.parse(localStorage.getItem('listaClientes'));
const input1 = ingresoUsuario.value;
const input2 = ingresoPassword.value;   
let clientes = [];


const ul = document.getElementById("ul")
const listItem = document.createElement("li")
const tituloCarrito = document.getElementById('carritoTitulo');
const sectionTienda = document.getElementById('sectionTienda');
const sectionCarrito = document.getElementById('contenedorCarrito');

sectionTienda.style.display = "none";
sectionCarrito.style.display = "none";

//Tienda

class Producto {
    constructor(id, nombre, precio, stock, imagen){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.stock = stock
        this.imagen = imagen
    }
};
const productos = [];

productos.push(new Producto(1, 'Ojotas Verdes', 1000, 50, "./img/ojotas-verdes.png"));
productos.push(new Producto(2, 'Ojotas Rojo Ferrari', 1000, 50, "./img/ojotas-rojo-ferrari.png"));
productos.push(new Producto(3, 'Ojotas Celestes', 1000, 50, "./img/ojotas-celestes.png"));

// botonPrueba.onclick = () => {
//     console.log(productos);
// };




if (listaClientesExiste) {
    clientes = listaClientesExiste;  
    console.log('hay clientes');
}   else {
        console.log('No hay clientes')
        clientes = [];
};


// console.log(input1);


// const contadorUsuarios = localStorage.setItem('contador', 0)

const objUsuarios = {};


ingresoBoton.onclick = () => {
    // debugger
    if (ingresoUsuario.value == '') {        
            ingresoError.innerText = '¡¡¡No Ingresaste un Usuario Valido!!!';        
    }   else if (ingresoUsuario.value !== '' && ingresoPassword.value == ''){
            ingresoError.innerText = '¡¡¡¡No Ingresaste un Password!!!!';
            console.log('Password esta vacio');          
            
    }   else {
            existeUsuario()
            
        }    
};

function existeUsuario () {
    let z = clientes.find( (o) => o.usuario === ingresoUsuario.value);

    // ingresoError.style.display ='none'
    if (z !== undefined) {
        menuIngreso.style.display = "none";
        saludo.innerText = `Hola ${ingresoUsuario.value}`
        // ingresoError.innerText = 'Bienvenido, Puede ingresar a la Tienda';
        // setTimeout(function(){ingresoError.style.display = "none"; }, 3000);
        console.log('Existe ese Usuario')
        tienda();
    }   else {
        ingresoError.innerText = '¡¡¡¡¡No Existe ese Usuario!!!!!'
        setTimeout(function(){ingresoError.style.display = "none"; }, 3000);
        console.log('No Existe ese Usuario')
    }
};



registroBoton.onclick = () => {
    // registroTodo.style.display = 'none';
    ingresoError.style.display ='none';
    ingresoUsuario.value = '';
    ingresoPassword.value = ''
    registroTodo.style.visibility = "hidden";
    tituloIngreso.innerText = 'REGISTRAR USUARIO NUEVO'
    ingresoBoton.innerText = 'Registrar'
    ingresoBoton.onclick = () => registro()//
};

function registro() {    
    
    registroUsuario()
    
};

class NuevoUsuario {
    constructor(usuario, password) {        
        this.usuario = usuario
        this.password = password
    }
};


function registroUsuario() {

    if (ingresoUsuario.value == '' || ingresoPassword.value == '' ){
        ingresoError.style.display ='';
        ingresoError.innerText = 'Registro Incompleto';
        setTimeout(function(){ingresoError.style.display = "none"; }, 3000);
        console.log('Registro Incompleto');
        
    }   else{
        hayCliente();        
    }
    
};


function aJson(variable) {
    let aJson = JSON.stringify(variable);   
    // console.log('a')
    return aJson;

};

function deJson(variable) {
    let deJson = JSON.parse(variable);
    return deJson;
};

function comprobarClienteDuplicado () {
    console.log('comprobando no hay un cliente igual')
    let xxxx = deJson(localStorage.getItem('listaClientes'));
    const u = clientes.find( (o) => o.usuario === ingresoUsuario.value);

    if (u === undefined) {
        console.log('Usuario No Duplicado, Se Agrega');
        // guardarClienteEnArray();
        actualizarArrayConLocal();
        guardarEnLocal();
        // console.log(xxxx)
    }   else {
        console.log('Ya hay un Usuario con ese nombre');
        ingresoError.style.display = '';
        ingresoError.innerText = 'Usuario ya Existente, Modificar!!!';
        // debugger
        setTimeout(function(){ingresoError.style.display = "none"; }, 3000);
    };

    // xxxx.forEach(i => {
    //     // console.log(i);
    //     if (i.usuario === ingresoUsuario.value) {
    //         console.log('Ya hay un Usuario con ese nombre');
    //         ingresoError.style.display = '';
    //         ingresoError.innerText = 'Usuario ya Existente, Modificar!!!';
    //         debugger
    //         setTimeout(function(){ingresoError.style.display = "none"; }, 3000);

    //     }   else {
    //             console.log('Usuario No Duplicado, Se Agrega');
    //             // guardarClienteEnArray();
    //             actualizarArrayConLocal();
    //             guardarEnLocal();
    //             // console.log(xxxx)
    //     };
    
    // });
    
};

function actualizarArrayConLocal() {
    let xxxxx = deJson(localStorage.getItem('listaClientes'));
    console.log('agrego?', deJson(localStorage.getItem('listaClientes', xxxxx)));        
    clientes.push(new NuevoUsuario(ingresoUsuario.value, ingresoPassword.value));
    console.log(clientes)

}

function hayCliente() {
    // localStorage.setItem("contadorUsuario", 1)
    if (localStorage.getItem('listaClientes') === null) {
        console.log('No hay ningun Cliente en el Local')
        guardarClienteEnArray();

    }   else {
        comprobarClienteDuplicado();
    }

};
// botonPrueba.onclick = () => {
//    let pruebill = JSON.parse(localStorage.getItem('listaClientes'));
//    console.log(pruebill[0].usuario);
//    console.log(ingresoUsuario.value);
//    console.log(input1);
    // hayCliente();
    // console.log(productos)
// };

function guardarClienteEnArray () {
    console.log('guardar cliente en el array')
    clientes.push(new NuevoUsuario(ingresoUsuario.value, ingresoPassword.value));
    guardarEnLocal()
};

function guardarEnLocal() {
    // console.log('primera vez')
    // if ()
    // console.log(clientes)
    // if ( )
    localStorage.setItem('listaClientes', aJson(clientes));
    console.log('guardado en el local Storage')
    window.location.reload();
    // console.log(clientes)
}

// console.log(clientes);

//Tienda Cards
const scontenedorCards = document.getElementById('contenedorCards');

function tienda () {
    sectionTienda.style.display = "";
    sectionCarrito.style.display = "";
    

    productos.forEach(producto => {
        contenedorCards.innerHTML += `    
        <div id="div${producto.id}" class="card cardsProductos" > 
        <img src=${producto.imagen} height="350px">
        <div class ="card-body">
        <h4 class="card-title">${producto.nombre}</h4>
        <p class="card-text">Precio: $${producto.precio}</p>
        <button id=${producto.id} class="btn carr btn-primary">Al Carrito</button>
        </div>
        </div>    
        `
    });

    //carrito
const carrito = [];
const botonCarrito = document.querySelectorAll('.carr');
const elCarrito = document.getElementById('carritoDiv');
// const botonCarrito = document.getElementsByClassName("carr");
// console.log(botonCarrito)

botonCarrito.forEach(pum =>{
    pum.onclick = () => {
        const productoElegido = productos.find(x => x.id === parseInt(pum.id));

        const ProductoCarrito = {...productoElegido, cantidad:1};

        const indexCarrito = carrito.findIndex(prod=>prod.id === ProductoCarrito.id);
        if (indexCarrito === -1){
          carrito.push(ProductoCarrito)
        } else {
            carrito[indexCarrito].cantidad += 1;
        }
        console.log(carrito)
        // elCarrito.innerText += ProductoCarrito.nombre// console.log(carrito)
        // elCarrito.innerHTML = document.createElement('h5')
        // const ul = document.getElementById("ul")
        const listItem = document.createElement("li")
        // const tituloCarrito = document.getElementById('carritoTitulo');
        
        const PrecioTotal = carrito.map(prod => prod.precio * prod.cantidad);
        let final = 0;
        PrecioTotal.forEach(x=>{
          final += x
        })
        tituloCarrito.innerText = `Carrito Precio Total: $${final}`
        listItem.innerText = `${productoElegido.nombre} - Precio: $ ${productoElegido.precio}`
        ul.append(listItem)

        
    }
});
};






// botonCarrito.onclick = () => console.log('dfd')