//PARTE PARA LOGUEARSE
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
        }else{
          Toastify({
            text: "Contraseña Incorrecta",
            gravity: "bottom",
            position: "right",
            duration: 3000,
            style:{
              background:"red",
            }            
            }).showToast();            
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
    // PARTE PARA SUBIR LOS PRODUCTOS
    class Producto {
      constructor(nombre, precio, stock, tipo, imagen,id) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.tipo = tipo;
        this.imagen = imagen;
        this.id = id;
      }
    } 
      //////////////////////////////////////////////////////////////////////////////////////////////// PRODUCTOS/////////////////////////////////////////////////////////////////////   
      const carrito = JSON.parse(localStorage.getItem("carrito")) ?? []
      const productos = JSON.parse(localStorage.getItem("productos")) || []; //verifico si ya hay algo guardado en el localstorage
      const cargarProducto = document.querySelector(".panel2");
      cargarProducto?.addEventListener("submit", (e) => { //utilizo el ? para verificar si existe cargar producto en el HTML
        e.preventDefault();
        console.log("Formulario enviado");
        const nombre = document.querySelector("#nombreProducto").value;
        const precio = document.querySelector("#precioProducto").value;
        const errorPrecio = document.querySelector("#errorPrecio");
        if (isNaN(precio)) {
          errorPrecio.textContent = "El precio ingresado no es válido";
          errorPrecio.style.display = "block";
          return;
          } else {
           errorPrecio.style.display = "none";
          }
        const stock = document.querySelector("#stock").value;
        const errorStock = document.querySelector("#errorStock");
        if (isNaN(stock)) { // su respectiva validacion
          errorStock.textContent = "Ingrese un valor valido";
          errorStock.style.display = "block";
          return;
          } else {
          errorStock.style.display = "none";
          }
        const tipoSelect = document.querySelector("#tipoProducto");
        const tipo = tipoSelect.value;
        const imagenProducto = document.querySelector("#imagenProducto").files[0];// uso la propiedad file con indice 0 para conseguir el primer archivo de la lista    
        const reader = new FileReader(); //aca se lee el contenido del archivo y lo transforma en una URL para poder mostrar el producto    
        reader.addEventListener("load", () => {
          const imagenURL = reader.result; // una vez transformada en url lo guardo en la variable imagenurl para crear un nuevo producto
          const cantidadProductos = productos.length;
          const id =cantidadProductos+ 1;
          const nuevoProducto = new Producto(nombre, precio, stock, tipo, imagenURL,id);
          productos.push(nuevoProducto);
          localStorage.setItem("productos", JSON.stringify(productos));//guardo los productos en el localstorage en forma de json porque es un objeto
          console.log(nuevoProducto);
          console.log(productos);
          const happy= document.querySelector(".happy"); //algo random
          happy.innerHTML+=`<h3>Felicidades subiste un producto</h3>
          <img src="../Imagenes/happy.gif" alt="" ></img>
          `;
        });    
        if (imagenProducto) {
          reader.readAsDataURL(imagenProducto);
        }
      });    
      
      const mostrarProductos = () => {
        const tablaProductos = document.querySelector(".productos");
        if (tablaProductos) {
          // muestro instancias del producto en la clase .producto
          tablaProductos.innerHTML = "";
          productos.forEach((nuevoProducto) => {
            console.log(nuevoProducto);
            tablaProductos.innerHTML += `
                    <div class="col-md-3 Centrado">
                      <div class="Articulos">
                        <div class="carta">
                          <figure>
                            <img src="${nuevoProducto.imagen}" alt="Imagen de producto">
                          </figure>
                          <div class="contenido">
                            <h3>${nuevoProducto.nombre}</h3>
                            <h6>Disponibles:${nuevoProducto.stock}</h6>
                            <p>${nuevoProducto.precio}$</p>
                            <form id="formulario${nuevoProducto.id}">
                          <input name="cantidad" type="number" value="1" min="1" max="${nuevoProducto.stock}" class="cant">
                          <button type="submit" class="btn btn-outline-dark">Añadir al carro</button>
                          <span id="errorCantidad" style="color: red; display: none;"></span>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                    `;
          });
          productos.forEach((nuevoProducto) => {
            agregarCarrito(nuevoProducto.id);
            console.log(nuevoProducto.id);
          });
        }
      };
        //////////////////////////////////////////////////////////////////////////////////////////////// CARRITO/////////////////////////////////////////////////////////////////////
      const agregarCarrito = (id) => { //agregar elementos al carrito     
        const formulario = document.getElementById(`formulario${id}`);
        formulario?.addEventListener("submit", (e) => {
          e.preventDefault();
          const cantidad = parseInt (e.target.elements.cantidad.value);
          const productoExistente = carrito.find(itemCarrito => itemCarrito.id === id);
          console.log(productoExistente); //busco si el producto ya existe en el carrito
          if (productoExistente) {      
        productoExistente.cantidad += cantidad;
        const producto = productos.find(producto => producto.id === id);
        if (productoExistente.cantidad > producto.stock) {        // La cantidad excede el stock disponible
          const errorCantidad = e.target.querySelector("#errorCantidad");
          errorCantidad.textContent = "Ingrese un valor válido";
          errorCantidad.style.display = "block";
          productoExistente.cantidad = 0;
        }
      } else {// El producto no existe en el carrito, lo agrego como un nuevo objeto
        
        carrito.push({
          id,
          cantidad
        });
      
      }
          console.log(carrito);
          localStorage.setItem("carrito", JSON.stringify(carrito));
        });
      };
      //////////////////////////////////////////////////////////////////////////////////////////////// CARRITO/////////////////////////////////////////////////////////////////////
      let acum = 0;
      carrito.forEach(itemCarrito => {// mostrar elementos en el carrito
        const idCarrito = itemCarrito.id;
        const producto = productos.find(producto => producto.id === idCarrito);
        if (producto) {// busco si lo que esta en el carrito estan en los productos disponibles
          const precioProducto = parseFloat(producto.precio);
          const cantidadCarrito = parseInt(itemCarrito.cantidad);
          acum += precioProducto * cantidadCarrito;
          const tablaCarrito = document.querySelector("#carrote");
          if (tablaCarrito){
            if (cantidadCarrito === 0){
              tablaCarrito.innerHTML="";
            }else {// creo una instancia en la tabla del carrito
            const tr = document.createElement('tr');
            tr.dataset.id = idCarrito;
            tr.innerHTML = `
              <th scope="row">1</th>
              <td>
                <img src="${producto.imagen}" alt="Imagen del producto" class="img-fluid img-thumbnail">
              </td>
              <td>
                <p class="fs-6">${producto.nombre}</p>
              </td>
              <td>${producto.precio}$</td>
              <td>${itemCarrito.cantidad}</td>
              <td>
                <button type="button" id="btn-close-${idCarrito}" class="btn-close" aria-label="Close"></button>
              </td>
            `;
            tablaCarrito.appendChild(tr);
    
          const totalProducto = document.querySelector("#total");
          totalProducto.innerHTML =`
          $${acum}
          `;
          const eliminarProductoCarrito = (id) => { //para que funcione el boton para eliminar el producto
            const index = carrito.findIndex(itemCarrito => itemCarrito.id === id);
            if (index !== -1) {
              carrito.splice(index, 1);
              // Resto del código para actualizar la interfaz y guardar en localStorage
            }
          };
          const botonEliminar = document.querySelector(`#btn-close-${idCarrito}`);
          botonEliminar.addEventListener("click", (e) => { // esto sirve por si deseas eliminar un producto del carrito
            const boton = e.target;
            const parentTr = boton.closest('tr');
            const idCarrito = parseInt(parentTr.dataset.id);
            console.log(idCarrito);
            Swal.fire({
              title: '¿Deseas eliminar el producto del carrito?',
              showCancelButton: true,
              confirmButtonText: 'Eliminar',
            }).then((result) => {
              if (result.isConfirmed) {
                eliminarProductoCarrito(idCarrito);
                Swal.fire('producto eliminado');
                localStorage.setItem("carrito", JSON.stringify(carrito));
                parentTr.remove();
              }//
            })
          });
        }}}
      });
  
      mostrarProductos();    
           
 
  
