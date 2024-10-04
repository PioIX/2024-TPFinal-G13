var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
const cors = require('cors');
const MySql = require('./modulos/mysql')

var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 3000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

/**
 * req = request. en este objeto voy a tener todo lo que reciba del cliente
 * res = response. Voy a responderle al cliente
 */
app.get('/saludo', function(req,res){
    console.log(req.query) //Los pedidos get reciben los datos del req.query
    res.send({respuesta: `Respuesta del Backend`})
})

app.post('/nombreDelPedido', function(req,res) {
    console.log(req.body) //Los pedidos post reciben los datos del req.body
    res.send("ok")
})

//Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
});

app.post('/addUsuario', async function(req,res) {
    console.log(req.body);
    let respuesta = {
        success: false,
        id: 0
    }
    let usuario = await MySql.realizarQuery(`select * from Usuarios where nombre = '${req.body.nombre}'`);
    if (usuario.length != 0) {
        res.send(respuesta.success);
    } else {
        await MySql.realizarQuery(`INSERT INTO Usuarios (nombre, contraseña, nombreApellido, administrador)
        VALUES ('${req.body.nombre}', '${req.body.contraseña}', '${req.body.nombreApellido}', false)`);
        let usuario = await MySql.realizarQuery(`select * from Usuarios  WHERE nombre='${req.body.nombre}' and  nombreApellido='${req.body.nombreApellido}'`);
        console.log(usuario)
        respuesta.id = usuario[0].idUsuario;
        respuesta.success = true;
        res.send(respuesta);     
    }
})

app.post('/login', async function(req,res) {
    console.log(req.body);
    let respuesta = {
        success: false,
        id: 0
    }
    let usuario = await MySql.realizarQuery(`select * from Usuarios where nombre = '${req.body.nombre}' and contraseña = '${req.body.contraseña}'`);
    if (usuario.length != 0) {
        respuesta.id = usuario[0].idUsuario;
        respuesta.success = true;
        res.send(respuesta);
    } else {
        res.send(respuesta);  
    }
})
