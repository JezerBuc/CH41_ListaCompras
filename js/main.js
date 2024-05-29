
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

let tablaListaCompras = document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

let contadorProductos = document.getElementById("contadorProductos")
let productosTotal= document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");


let isValid=true;
let precio;
let contador = 0;
let costoTotal = 0;
let totalEnProductos =0;

//Aqui se almacena la informacion de la tabla
let datos = new Array();


function validarCantidad () {
    if(txtNumber.value.length == 0){  // Corrección: length en lugar de lenght
        return false;
    }// if length
    if (isNaN(txtNumber.value)){
        return false;
    }//isNaN
    if(Number(txtNumber.value)<=0){
        return false;
    }// <=0
    return true;
}//validar cantidad

function getPrecio() {
    return Math.floor((Math.random()*10000))/100;
    
}//getPrecio

btnAgregar.addEventListener("click", function(event) {
    event.preventDefault();
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtNombre.style.border = "";
    txtNumber.style.border = "";
    isValid=true;

    if (txtNombre.value.length < 3){  
        alertValidacionesTexto.innerHTML = " El <strong>Nombre</strong> no es correcto";
        alertValidaciones.style.display = "block";
        txtNombre.style.border = "solid red medium";
        isValid=false;
    }//length<3
    if(!validarCantidad()){
        alertValidacionesTexto.innerHTML += " El <strong>Numero</strong> no es correcto"; 
        alertValidaciones.style.display = "block";
        txtNumber.style.border = "solid red medium"; 
        isValid=false;
    }//ValidarCantidad

    if (isValid){
        contador++;
        precio = getPrecio();
        let row = `<tr>
            <td>${contador}</td>
            <td>${txtNombre.value}</td>
            <td>${txtNumber.value}</td>
            <td>${precio}</td>
        </tr>`;

        let elemento = `{ "id":${contador},
                            "nombre": "${txtNombre.value}",
                             "cantidad": "${txtNumber.value}",
                             "precio": ${precio}          
            
        }`;

        datos.push(JSON.parse(elemento));
        localStorage.setItem("datos", JSON.stringify(datos));
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        contadorProductos.innerText= contador;
        totalEnProductos += parseFloat(txtNumber.value);
        costoTotal+= precio * parseFloat(txtNumber.value);
        productosTotal.innerText=totalEnProductos;
        /*precioTotal.innerText=costoTotal `$ ${costoTotal.toFixed(2)}` */
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
        localStorage.setItem("contador", contador);
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("costoTotal", costoTotal);

        
        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus();
        
         
         
    }//isValid
    
});



btnClear.addEventListener("click", function(event) {
    event.preventDefault();

    txtNombre.value = "";
    txtNumber.value = "";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtNombre.style.border="";
    txtNumber.style.border="";
    cuerpoTabla.innerHTML=""; 
    contador = 0;
    totalEnProductos = 0;
    costoTotal =0;
    localStorage.setItem("contador", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal);
    datos = new Array();
    localStorage.removeItem("datos");  
    contadorProductos.innerHTML=contador;
    productosTotal.innerHTML=totalEnProductos;
    precioTotal.innerHTML=`$ ${costoTotal.toFixed(2)}`; 
    
});

window.addEventListener("load", function (event) {
    event.preventDefault();
    if (this.localStorage.getItem("contador") !=null){
        contador=Number(this.localStorage.getItem("contador"));
    }//if contador

    if (this.localStorage.getItem("totalEnProductos") !=null){
        totalEnProductos=Number(this.localStorage.getItem("totalEnProductos"));
    }//if totalEnProductos

    if (this.localStorage.getItem("costoTotal") !=null){
        costoTotal=Number(this.localStorage.getItem("costoTotal"));
    }//if costoTotal

    if (this.localStorage.getItem("datos") !=null){
        datos=JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach((r) => {
            let row = `<tr>
            <td>${r.id}</td>
            <td>${r.nombre}</td>
            <td>${r.cantidad}</td>
            <td>${r.precio}</td>
        </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row)
        });
    }//if datos






    
    contadorProductos.innerHTML= contador;
    productosTotal.innerHTML=totalEnProductos;
    precioTotal.innerHTML=`$ ${costoTotal.toFixed(2)}`;
})//window load