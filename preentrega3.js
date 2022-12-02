

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
let carrito = [];
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

productos.push(new Producto(1, 'Ojotas Verdes', 700, 50, "./img/ojotas-verdes.png"));
productos.push(new Producto(2, 'Ojotas Rojo Ferrari', 685, 50, "./img/ojotas-rojo-ferrari.png"));
productos.push(new Producto(3, 'Ojotas Celestes', 932, 50, "./img/ojotas-celestes.png"));

// botonPrueba.onclick = () => {
//     console.log(productos);
// };




if (listaClientesExiste) {
    clientes = listaClientesExiste;  
    console.log('hay clientes');
}   else {
        ingresoError.innerText = '¡¡¡Sos el primer Visitante, vas a tener que registrarte!!!';            
        setTimeout(function(){ingresoError.innerText = ''; }, 2000);
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
            setTimeout(function(){ingresoError.innerText = ''; }, 2000);
            borraInputs();
    }   else if (ingresoUsuario.value !== '' && ingresoPassword.value == ''){
            ingresoError.innerText = '¡¡¡¡No Ingresaste un Password!!!!';
            borraInputs();
            setTimeout(function(){ingresoError.innerText = ''; }, 2000);
            console.log('Password esta vacio');          
            
    }   else {
            existeUsuario()
            
        }    
};

function existeUsuario () {
    let z = clientes.find( (o) => o.usuario === ingresoUsuario.value);
    let zpass = clientes.find( (o) =>o.password === ingresoPassword.value);
    
    if (z !== undefined ) {
        if (zpass !==undefined) {
            console.log('pass correcto')
            menuIngreso.style.display = "none";
            saludo.innerText = `Hola ${ingresoUsuario.value}`                 
            console.log('Existe ese Usuario, te dejo entrar en la Tienda!!!')
            tienda();
            comprobarSiHayCarrito(ingresoUsuario.value);
        }   else {
                console.log('bad pass')
                ingresoError.innerText = `Contraseña Incorrecta, sos vos ${z.usuario}? \nO te estan hackeando la cuenta?`;
                setTimeout(function(){ingresoError.innerText = ''; }, 2000); 
                borraInputs();      
        }
    }   else {
        ingresoError.innerText = '¡¡¡¡¡No Existe ese Usuario!!!!!';
        setTimeout(function(){ingresoError.innerText = ''; }, 2000); 
        borraInputs();        
        console.log('No Existe ese Usuario')
    }
};

function borraInputs() {
    ingresoUsuario.value = '';
    ingresoPassword.value = '';

};

registroBoton.onclick = () => {    
    ingresoError.style.display ='none';
    borraInputs();
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
        borraInputs();
        setTimeout(function(){ingresoError.innerText = ''; }, 2000);
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
        borraInputs();
        // debugger
        setTimeout(function(){ingresoError.innerText = ''; }, 2000);
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
    // sectionCarrito.style.display = "";
    

    productos.forEach(producto => {
        contenedorCards.innerHTML += `    
        <div id="div${producto.id}" class="card cardsProductos" > 
        <img src=${producto.imagen} height="300px">
        <div class ="card-body">
        <h4 class="card-title">${producto.nombre}</h4>
        <p class="card-text">Precio: $${producto.precio}</p>
        <button id=${producto.id} class="btn carr btn-primary">Al Carrito</button>
        </div>
        </div>    
        `
    });
    
    //carrito
    const botonCarrito = document.querySelectorAll('.carr');
    const elCarrito = document.getElementById('carritoDiv');
    const cosasCarrito = document.getElementById('cosasCarrito');

    // const botonCarrito = document.getElementsByClassName("carr");
    // console.log(botonCarrito)
    
    // console.log(carrito)
    botonCarrito.forEach(pum =>{
        pum.onclick = () => {
            if (carrito === '') {
                sectionCarrito.style.display = "none";
            }   else {
                sectionCarrito.style.display = "";
            }
            const productoElegido = productos.find(x => x.id === parseInt(pum.id));
            
            const ProductoCarrito = {...productoElegido, cantidad:1};
            
            const indexCarrito = carrito.findIndex(prod=>prod.id === ProductoCarrito.id);

        // console.log(productoElegido);
        // console.log(ProductoCarrito);
        console.log(carrito);

        if (indexCarrito === -1){
          carrito.push(ProductoCarrito)
        } else {
            carrito[indexCarrito].cantidad += 1;
        }
        
        const PrecioTotal = carrito.map(prod => prod.precio * prod.cantidad);
        let final = 0;
        PrecioTotal.forEach(x=>{
          final += x
        })
        tituloCarrito.innerText = `Carrito Precio Total: $${final}`
        
        let carritoCaja = ''
        let xP = carrito.forEach (x => {
            // const ss = `${x.nombre} - Precio Unitario: $ ${x.precio} - Cant.: ${x.cantidad} - Precio Total: $ ${x.precio * x.cantidad}`;
            // const listItem = document.createElement("")
            carritoCaja += `
                <div class="contenido-carrito">
                <p class="itemCarritoTitulo"> ${x.nombre} - Precio Unitario: $${x.precio} - Cant.: ${x.cantidad} - Total: ${x.cantidad * x.precio}</p>
                </div>`;
            const sola = cosasCarrito.innerHTML = carritoCaja;
            // console.log(sola);     
            guardarCarrito();       
        })


    }
}); 
};

function comprobarSiHayCarrito(carritoEstas) {
    const claveStorage = localStorage.getItem(carritoEstas);

    if(claveStorage){
        console.log('Tiene Carrito, Lo Traigo');
        carritoDelLocal = deJson(claveStorage);
        carrito = carritoDelLocal;
        mostrarCarrito();

    }else{
        console.log('No Tiene Carrito');
    }
};

function guardarCarrito() {
    // console.log('carrito casa:', carrito);
    carritoAlLocal = aJson(carrito);
    localStorage.setItem(ingresoUsuario.value, carritoAlLocal);
    console.log('Carrito del Usuario Guardado en LocalStorage');
};

function mostrarCarrito() {

    // tituloCarrito.innerText = `Carrito Precio Total: $${final}`
};