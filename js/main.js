
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");


function validarCantidad () {
    if(txtNumber.value.length == 0){  // Corrección: length en lugar de lenght
        return false;
    }
    return true;
}

btnAgregar.addEventListener("click", function(event) {
    event.preventDefault();
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtNombre.style.border = "";
    txtNumber.style.border = "";

    if (txtNombre.value.length < 3){  // Corrección: length en lugar de lenght
        alertValidacionesTexto.innerHTML = " El <strong>Nombre</strong> no es correcto";
        alertValidaciones.style.display = "block";
        txtNombre.style.border = "solid red medium";
    }
    if(!validarCantidad()){
        alertValidacionesTexto.innerHTML += " El <strong>Numero</strong> no es correcto";  // Corrección: += en lugar de +-
        alertValidaciones.style.display = "block";
        txtNumber.style.border = "solid red medium";  // Corrección: txtNumber en lugar de txtNombre
    }
});

btnClear.addEventListener("click", function(event) {
    event.preventDefault();

    txtNombre.value = "";
    txtNumber.value = "";
    
});