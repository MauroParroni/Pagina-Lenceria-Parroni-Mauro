class admin {
    constructor(usua, contraseña) {
      this.usua = usua;
      this.contraseña = contraseña;
    }
  }
    const admi = new admin("admin", "admin");
    const verificaUsuario = document.querySelector("#card");
    if (verificaUsuario) {
      verificaUsuario.addEventListener("submit", (e) => {
        e.preventDefault();
        const user = e.target.querySelector("#usuario").value;
        const pass = e.target.querySelector("#contra").value;
    
        if (user === admi.usua && pass === admi.contraseña) {      
          window.location.href = "../index.html";
          localStorage.setItem("isLoggedIn", "true");
        }
      });
    } 
    if (localStorage.getItem("isLoggedIn") === "true") {
        let boton = document.getElementById("booot");
        boton.style.display = "none";
        let header = document.getElementById("header");
        header.innerHTML = '<h1 class="col-md-11">Roma Lenceria</h1>' +
                           '<button type="button" class="btn btn-danger col-md-1" id="adm">' +
                           '<a href="/Paginas/panel_admin.html" class="link-light logxd">' +
                           'Panel Admin' +
                           '</a>' +
                           '</button>';
      }
      