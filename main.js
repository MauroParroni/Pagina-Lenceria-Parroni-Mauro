class admin {
    constructor(usua, contraseña) {
      this.usua = usua;
      this.contraseña = contraseña;
    }
  }
    const admi = new admin("admin", "admin");
    const verificaUsuario = document.querySelector("#card");//agarro el id card del form
    if (verificaUsuario) {
      verificaUsuario.addEventListener("submit", (e) => { //cuando mando el formulario guardo los valores en una variable
        e.preventDefault();
        const user = e.target.querySelector("#usuario").value;
        const pass = e.target.querySelector("#contra").value;
    
        if (user === admi.usua && pass === admi.contraseña) {      //verifico
          window.location.href = "../index.html";
          localStorage.setItem("isLoggedIn", "true");
        }
      });
    }   
    if (localStorage.getItem("isLoggedIn") === "true") {// y aca hago desaparecer el boton de login y hago aparecer el panel de admin
      let url = "../Paginas/panel_admin.html"
      if (document.querySelector("#index")){
        url = "./Paginas/panel_admin.html"
      }
        let boton = document.getElementById("booot");
        if (boton){
        boton.style.display = "none";
        let header = document.getElementById("header");
        header.innerHTML = '<h1 class="col-md-11">Roma Lenceria</h1>' +
                           '<button type="button" class="btn btn-danger col-md-1" id="adm">' +
                           `<a href=${url} class="link-light logxd">` +
                           'Panel Admin' +
                           '</a>' +
                           '</button>';
      }
    }
    class Producto {
      constructor(nombre, precio, stock, tipo, imagen) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.tipo = tipo;
        this.imagen = imagen;
      }
    }
    
    const productos = JSON.parse(localStorage.getItem("productos")) || []; //verifico si ya hay algo guardado en el localstorage
    
    const cargarProducto = document.querySelector(".panel2");
    cargarProducto?.addEventListener("submit", (e) => { //utilizo el ? para verificar si existe cargar producto en el HTML
      e.preventDefault();
      console.log("Formulario enviado");
      const nombre = document.querySelector("#nombreProducto").value;
      const precio = document.querySelector("#precioProducto").value;
      const stock = document.querySelector("#stock").value;
      const tipoSelect = document.querySelector("#tipoProducto");
      const tipo = tipoSelect.value;
      const imagenProducto = document.querySelector("#imagenProducto").files[0];// uso la propiedad file con indice 0 para conseguir el primer archivo de la lista
    
      const reader = new FileReader(); //aca se lee el contenido del archivo y lo transforma en una URL para poder mostrar el producto
    
      reader.addEventListener("load", () => {
        const imagenURL = reader.result; // una vez transformada en url lo guardo en la variable imagenurl para crear un nuevo producto
        const nuevoProducto = new Producto(nombre, precio, stock, tipo, imagenURL);
    
        productos.push(nuevoProducto);
        localStorage.setItem("productos", JSON.stringify(productos));//guardo los productos en el localstorage en forma de json porque es un objeto
        console.log(nuevoProducto);
        cargarProducto.reset();
        mostrarProductos();
      });
    
      if (imagenProducto) {
        reader.readAsDataURL(imagenProducto);
      }
    });
    
    const mostrarProductos = () => {
      const tablaProductos = document.querySelector(".productos");
      if (tablaProductos) {// muestro instancias del producto en la clase .producto
        tablaProductos.innerHTML = "";
        productos.forEach(nuevoProducto => {
          tablaProductos.innerHTML += `
            <div class="col-md-3 Centrado">
              <div class="Articulos">
                <div class="carta">
                  <figure>
                    <img src="${nuevoProducto.imagen}" alt="Imagen de producto">
                  </figure>
                  <div class="contenido">
                    <h3>${nuevoProducto.nombre}</h3>
                    <p>${nuevoProducto.precio}</p>
                    <button type="submit" class="btn btn-outline-dark">Comprar</button>
                  </div>
                </div>
              </div>
            </div>
          `;
        });
      }
    };
    
    mostrarProductos();


      