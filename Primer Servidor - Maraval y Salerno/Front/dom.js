const { resolve } = require("path");

async function llamadoAlBackend() {
    //Llamo a un pedido Get del servidor
    const data = {
        input : document.getElementById("llamadoBackend").value
    }
    
    var query  = "?nombre=" + data.input;
    
    const response = await fetch('http://localhost:3000/saludo' + query,{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          },
    })

    //Tengo que usar el await porque la respuesta del servidor es lenta
    const result = await response.json()
    console.log(result)

    document.getElementById("ejemplo").innerHTML = result
}

async function envioPost() {
    //Armo un objeto para mandarlo como formato JSON
    const data = {
        input : document.getElementById("ingresoTexto").value
    }

    //Envio un pedido POST con un JSON en el body
    const response = await fetch('http://localhost:3000/nombreDelPedido',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(data),
    })

}

//-----------------------------------------------------

async function obtenerJugadores () {
    const response = await fetch('http://localhost:3000/jugadores',{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          },
    })

    const result = await response.json()
    llenarTablaJugadores(result);
}

function llenarTablaJugadores (datos) {
    let htmlTabla = '<tr> <th> Id </th> <th>Nombre</th> <th>Número</th> <th>Actual club</th> </tr>'
    for (let i = 0; i < datos.length; i++){
        htmlTabla += `<tr> <td>${datos[i].Id}</td> <td> ${datos[i].Nombre} </td> <td> ${datos[i].Número} </td> <td> ${datos[i].Id_equipo} </td> </tr>`
    }
    document.getElementById("Tablas").innerHTML = htmlTabla
}

//-----------------------------------------------------
async function llenarTablaEquipos (datos) {
    let htmlTabla = '<tr> <th> Id </th> <th>Nombre</th> <th>Títulos</th> <th>Federación</th> </tr>'
    for (let i = 0; i < datos.length; i++){
        htmlTabla += `<tr> <td>${datos[i].Id}</td> <td> ${datos[i].Nombre} </td> <td> ${datos[i].Títulos} </td> <td> ${datos[i].Id_federación} </td> </tr>`
    }
    document.getElementById("Tablas").innerHTML = htmlTabla
}

async function obtenerEquipos () {
    const response = await fetch('http://localhost:3000/equipos',{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          },
    })

    const result = await response.json()
    llenarTablaEquipos(result);
}

//-----------------------------------------------------
async function llenarTablaFederaciones (datos) {
    let htmlTabla = '<tr> <th> Id </th> <th>Nombre</th> <th>Presidente</th> <th>Ligas</th> </tr>'
    for (let i = 0; i < datos.length; i++){
        htmlTabla += `<tr> <td>${datos[i].Id}</td> <td> ${datos[i].Nombre} </td> <td> ${datos[i].Presidente} </td> <td> ${datos[i].Ligas} </td> </tr>`
    }
    document.getElementById("Tablas").innerHTML = htmlTabla
}

async function obtenerFederaciones () {
    const response = await fetch('http://localhost:3000/federaciones',{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          },
    })

    const result = await response.json()
    llenarTablaFederaciones(result);
}

// ----------------------------------------------------
// 2
async function agregarFederacion() {


    const data = {
        Nombre : document.getElementById("nombreFed").value,
        Presidente: document.getElementById("presidenteFed").value,
        Ligas: document.getElementById("ligasFed").value
    }

    const response = await fetch('http://localhost:3000/addFederacion',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(data),
    }) 

    if (response.status == 200)
        alert("ok");
}

async function agregarEquipo() {


    const data = {
        Nombre : document.getElementById("nombreEqui").value,
        Títulos: document.getElementById("titulosEqui").value,
        Id_federación: document.getElementById("federacionEqui").value
    }

    const response = await fetch('http://localhost:3000/addEquipo',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(data),
    }) 

    if (response.status == 200)
        alert("ok");
}

async function agregarJugador() {


    const data = {
        Nombre : document.getElementById("nombreJug").value,
        Número: document.getElementById("numeroJug").value,
        Id_equipo: document.getElementById("idEquipoJug").value
    }

    const response = await fetch('http://localhost:3000/addJugador',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(data),
    }) 

    if (response.status == 200)
        alert("ok");
}
//-----------------------------------
// 3
async function borrarJugador() {

    const data = {
        Id : document.getElementById("selectJug").value
    }

    const response = await fetch('http://localhost:3000/deleteJugador',{
        method:"DELETE",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(data),
    }) 

    if (response.status == 200)
        alert("ok");
}

//------------------------------------
//4
async function modificarJugador() {


    const data = {
        Nombre : document.getElementById("nombreJug").value,
        Id : document.getElementById("selectJug").value
    }

    const response = await fetch('http://localhost:3000/changeJugador',{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(data),
    }) 

    if (response.status == 200)
        alert("ok");
}

async function modificarEquipo() {


    const data = {
        Nombre : document.getElementById("nombreEqui").value,
        Id : document.getElementById("selectEqui").value
    }

    const response = await fetch('http://localhost:3000/changeEquipo',{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(data),
    }) 

    if (response.status == 200)
        alert("ok");
}


async function modificarFederacion() {
    const data = {
        Nombre : document.getElementById("nombreFed").value,
        Id : document.getElementById("selectFed").value
    }

    const response = await fetch('http://localhost:3000/changeFederacion',{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(data),
    }) 

    if (response.status == 200)
        alert("ok");
}

async function llenarSelectJug () {
    const response = await fetch('http://localhost:3000/jugadores',{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          },
    })

    const datos = await response.json()
    let htmlSelect = ''
    for (let i = 0; i < datos.length; i++){
        htmlSelect += `<option value="${datos[i].Id}"> ${datos[i].Id} - ${datos[i].Nombre} </option> `
    }
    document.getElementById("selectJug").innerHTML = htmlSelect
}

async function llenarSelectFed () {
    const response = await fetch('http://localhost:3000/federaciones',{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          },
    })

    const datos = await response.json()
    let htmlSelect = ''
    for (let i = 0; i < datos.length; i++){
        htmlSelect += `<option value="${datos[i].Id}"> ${datos[i].Id} - ${datos[i].Nombre} </option> `
    }
    document.getElementById("selectFed").innerHTML = htmlSelect
}

async function llenarSelectEqui () {
    const response = await fetch('http://localhost:3000/equipos',{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          },
    })

    const datos = await response.json()
    let htmlSelect = ''
    for (let i = 0; i < datos.length; i++){
        htmlSelect += `<option value="${datos[i].Id}"> ${datos[i].Id} - ${datos[i].Nombre} </option> `
    }
    document.getElementById("selectEqui").innerHTML = htmlSelect
}