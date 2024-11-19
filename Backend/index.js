// Paquetes instalados: -g nodemon, express, body-parser, mysql2, socket.io
// Agregado al archivo "package.json" la línea --> "start": "nodemon index"

// Proyecto "Node_base"
// Desarrollo de Aplicaciones Informáticas - Proyecto de Producción - 5to Informática

// Docentes: Nicolás Facón, Matías Marchesi, Martín Rivas

// Revisión 5 - Año 2024
var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
const cors = require('cors');
const MySql = require('./modulos/mysql')
const fileUpload = require('express-fileupload');

var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 4000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

// Cargo librerías instaladas y necesarias				// Añado el archivo mysql.js presente en la carpeta módulos
const session = require('express-session');				// Para el manejo de las variables de sesión
									// Inicializo express para el manejo de las peticiones

const server = app.listen(port, () => {
	console.log(`Servidor NodeJS corriendo en http://localhost:${port}/`);
});;

const io = require('socket.io')(server, {
	cors: {
		// IMPORTANTE: REVISAR PUERTO DEL FRONTEND
		origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003", "http://localhost:3004", "http://localhost:3005"],            	// Permitir el origen localhost:3000
		methods: ["GET", "POST", "PUT", "DELETE"],  	// Métodos permitidos
		credentials: true                           	// Habilitar el envío de cookies
	}
});

const sessionMiddleware = session({
	//Elegir tu propia key secreta
	secret: "supersarasa",
	resave: false,
	saveUninitialized: false
});

app.use(sessionMiddleware);

io.use((socket, next) => {
	sessionMiddleware(socket.request, {}, next);
});

// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
// A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)


io.on("connection", (socket) => {
	const req = socket.request;

	socket.on('joinRoom', data => {
		if (req.session.room != undefined && req.session.room.length > 0)
			socket.leave(req.session.room);
		req.session.room = data.room;
		socket.join(req.session.room);
        console.log("🚀 ~ io.on ~ req.session.room:", req.session.room)
		
		io.to(req.session.room).emit('chat-messages', { user: req.session.user, room: req.session.room });
        
	});

	socket.on('pingAll', data => {
		console.log("PING ALL: ", data);
		io.emit('pingAll', { event: "Ping to all", message: data });
	});

	socket.on('sendMessage', async (data) => {
		await MySql.realizarQuery(`INSERT INTO Mensajes (idChat, mensaje, usuarioEnvia, tiempo)
    VALUES (${data.idChat}, '${data.mensaje}', ${data.usuarioEnvia}, NOW())`);
        io.to(req.session.room).emit('newMessage', { room: req.session.room, mensaje: data.mensaje, idChat: data.idChat, usuarioEnvia: data.usuarioEnvia

        });
	});

	socket.on('disconnect', () => {
		console.log("Disconnect");
	})
});


app.get('/saludo', function(req,res){
    console.log(req.query) //Los pedidos get reciben los datos del req.query
    res.send({respuesta: `Respuesta del Backend`})
})

app.post('/nombreDelPedido', function(req,res) {
    console.log(req.body) //Los pedidos post reciben los datos del req.body
    res.send("ok")
})

app.post('/addUsuario', async function(req,res) {
    console.log(req.body);
    let respuesta = {
        success: false,
        id: 0,
        nombre: ""
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
        respuesta.nombre = usuario[0].nombre;
        res.send(respuesta);     
    }
})

app.post('/login', async function(req,res) {
    console.log(req.body);
    let respuesta = {
        success: false,
        id: 0,
        nombre: ""
    }
    let usuario = await MySql.realizarQuery(`select * from Usuarios where nombre = '${req.body.nombre}' and contraseña = '${req.body.contraseña}'`);
    if (usuario.length != 0) {
        respuesta.id = usuario[0].idUsuario;
        respuesta.success = true;
        respuesta.nombre = usuario[0].nombre;
        res.send(respuesta);
    } else {
        res.send(respuesta);  
    }
})

app.post('/addPropiedad', async function(req,res) {
    console.log(req.body);
    let respuesta = {
        success: false,
        id: 0
    }
    let propiedad = await MySql.realizarQuery(`select * from Propiedades where direccion = '${req.body.direccion}'`);
    if (propiedad.length == 0) {
        let propiedadInsert = await MySql.realizarQuery(`INSERT INTO Propiedades (tipoVivienda, precio, direccion, ambientes, zona, alquiler, descripcion, idUsuario)
        VALUES ('${req.body.tipoVivienda}', ${req.body.precio}, '${req.body.direccion}', ${req.body.ambientes}, '${req.body.zona}', ${req.body.alquiler}, '${req.body.descripcion}', ${req.body.idUsuario})`);
        console.log("RTA INSERT", propiedadInsert);
        //let propiedad = await MySql.realizarQuery(`select * from Propiedades  WHERE direccion='${req.body.direccion}' and  precio=${req.body.precio}`);
        console.log(propiedad)
        let propiedadId = propiedadInsert.insertId;

        console.log("ARCHIVOS:                    ", req.files);

        let files = [];

        if(req.files.file.length) {
            for(let i = 0; i < req.files.file.length; i++) {
                const base64String = Buffer.from(req.files.file[i].data).toString('base64');
                files.push( { base64String } );
            }
        }
        else {
            const base64String = Buffer.from(req.files.file.data).toString('base64');
            files.push( { base64String } );
        }

        for(let i = 0; i < files.length; i++) {        
            await MySql.realizarQuery(`INSERT INTO Imagenes (idPropiedad, imagen)
                VALUES (${propiedadId}, '${files[i].base64String}')`);
        }

        respuesta.id = propiedadId;
        respuesta.success = true;

    }
    res.send(respuesta);
})

app.get('/propiedades', async function(req,res){
    //let usuario = await MySql.realizarQuery(`select nombre from Propiedades where idUsuario = '${req.body.id}'`);
    let propiedades = await MySql.realizarQuery(`select * from Propiedades`);
    res.send(propiedades)
})




app.get('/propiedad', async function(req, res) {
    try {
        // Asegúrate de que se está recibiendo el parámetro `id`
        if (!req.query.id) {
            return res.status(400).send({ error: 'ID de propiedad es requerido' });
        }

        // Realiza la consulta a la base de datos
        let propiedades = await MySql.realizarQuery(`SELECT * FROM Propiedades WHERE idPropiedad = ${req.query.id}`);
        console.log(propiedades)
        // Verifica si se encontraron propiedades
        if (propiedades.length === 0) {
            return res.status(404).send({ error: 'Propiedad no encontrada' });
        }

        // Enviar las propiedades como respuesta
        res.send(propiedades);
    } catch (error) {
        console.error('Error al obtener propiedades:', error); // Log del error para depuración
        res.status(500).send({ error: 'Error interno del servidor' });
    }
});

app.get('/getImagenes', async function(req, res) {
    try {
        let imagenes
        // Asegúrate de que se está recibiendo el parámetro `id`
        if (!req.query.idPropiedad) {
            imagenes = await MySql.realizarQuery(`SELECT * FROM Imagenes`); 
        } else {
            imagenes = await MySql.realizarQuery(`SELECT * FROM Imagenes WHERE idPropiedad = ${req.query.idPropiedad}`);
        }
        
        // Verifica si se encontraron propiedades
        if (imagenes.length === 0) {
            return res.status(404).send({ error: 'Imagenes no encontradas' });
        }

        // Enviar las propiedades como respuesta
        res.send(imagenes);
    } catch (error) {
        console.error('Error al obtener imagenes:', error); // Log del error para depuración
        res.status(500).send({ error: 'Error interno del servidor' });
    }
});

app.post('/addComentario', async function(req,res) {
    console.log(req.body);
    let respuesta = {
        success: false,
        id: 0
    }
    await MySql.realizarQuery(`INSERT INTO Comentarios (idUsuario, texto, nombreApellido, mail, asunto)
    VALUES (${req.body.idUsuario}, '${req.body.texto}', '${req.body.nombreApellido}', '${req.body.mail}', '${req.body.asunto}')`);
    let comentario = await MySql.realizarQuery(`select * from Comentarios  WHERE idUsuario=${req.body.idUsuario} and  nombreApellido='${req.body.nombreApellido}'`);
    console.log(comentario)
    respuesta.id = comentario[0].idComentario;
    respuesta.success = true;
    res.send(respuesta);     
})


app.get('/user', async function(req,res){
    try {
        // Asegúrate de que se está recibiendo el parámetro `id`
        if (!req.query.id) {
            return res.status(400).send({ error: 'ID de usuario es requerido' });
        }
            //con un 5 nos conformamos brenchu ❤❤💖😢💖💖💖😜💖😘🙌🙌😘💕💕
        // Realiza la consulta a la base de datos
        let usuarios = await MySql.realizarQuery(`SELECT * FROM Usuarios WHERE idUsuario = ${req.query.id}`);

        // Verifica si se encontraron usuarioes
        if (usuarios.length === 0) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }

        // Enviar las usuarioes como respuesta
        res.send(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error); // Log del error para depuración
        res.status(500).send({ error: 'Error interno del servidor' });
    }
})

app.get('/nombreUsuario', async function(req,res){
    //let usuario = await MySql.realizarQuery(`select nombre from Propiedades where idUsuario = '${req.body.id}'`);
    console.log("query :" + req.query.idUsuario)
    let nombreUsuario = await MySql.realizarQuery(`select nombre from Usuarios where idUsuario = ${req.query.idUsuario}`);
    console.log(nombreUsuario)
    res.send(nombreUsuario)
})

app.put('/changeNombreApellido', async function(req, res){
    console.log(req.body);
    let respuesta = {
        success: false,
        id: 0,
        nombre: ""
    }
    await MySql.realizarQuery(`UPDATE Usuarios SET nombreApellido = '${req.body.nombreApellido}' WHERE idUsuario = ${req.body.idUsuario}`);
    respuesta.success = true;
    res.send(respuesta);     
})

app.put('/changeContrasena', async function(req, res){
    console.log(req.body);
    let respuesta = {
        success: false,
        id: 0,
        nombre: ""
    }
    await MySql.realizarQuery(`UPDATE Usuarios SET contraseña = '${req.body.contraseña}' WHERE idUsuario = ${req.body.idUsuario}`);
    respuesta.success = true;
    res.send(respuesta);         
})

app.delete('/deletePropiedad', async function(req, res){
    let respuesta = {
        success: false,
        id: 0,
        nombre: ""
    }
    let id = req.query.idPropiedad
    console.log("query :" + id)
    await MySql.realizarQuery(`DELETE FROM Imagenes WHERE idPropiedad = ${id}`);
    await MySql.realizarQuery(`DELETE FROM Propiedades WHERE idPropiedad = ${id}`);
    respuesta.success = true;
    res.send(respuesta);    
})


app.post('/addChat', async function(req, res) {
    console.log("user 1:", req.body.usuario1);
    console.log("nombre1:", req.body.nombre1);
    console.log("nombre2:", req.body.nombre2);
    
    let respuesta = { success: false, id: 0 };

    // Comprobar si ya existe un chat entre nombre1 y nombre2
    let chat = await MySql.realizarQuery(`SELECT * FROM Chats WHERE nombre1 = '${req.body.nombre1}' AND nombre2 ='${req.body.nombre2}'`);
    
    if (chat.length !== 0) {
        res.send(respuesta); // Chat ya existe, enviar respuesta con success: false
    } else {
        // Obtener idUsuario de nombre2 en la tabla Usuarios
        let usuario2Data = await MySql.realizarQuery(`SELECT idUsuario FROM Usuarios WHERE nombre = '${req.body.nombre2}'`);

        if (usuario2Data.length === 0) {
            res.send({ success: false, message: "Usuario no encontrado" });
            return;
        }

        const usuario2 = usuario2Data[0].idUsuario;

        // Insertar el nuevo chat en la tabla Chats
        await MySql.realizarQuery(`
            INSERT INTO Chats (usuario1, usuario2, nombre1, nombre2) 
            VALUES (${req.body.usuario1}, ${usuario2}, '${req.body.nombre1}', '${req.body.nombre2}')
        `);
        
        respuesta.success = true;
        res.send(respuesta);     
    }
});



app.get('/chats', async function(req,res){
    console.log("query :" + req.query.idUsuario)
    let chats = await MySql.realizarQuery(`SELECT * FROM Chats WHERE usuario1 = ${req.query.idUsuario} OR usuario2 = ${req.query.idUsuario};`);
    console.log(chats)
    res.send(chats)
})

app.get('/mensajes', async function(req,res){
    console.log("query id chat:" + req.query.idChat)
    let mensajes = await MySql.realizarQuery(`SELECT * FROM Mensajes WHERE idChat = ${req.query.idChat};`);
    console.log("mensajes: " + {mensajes})
    res.send(mensajes)
})

app.post('/addMensaje', async function(req,res) {
    console.log(req.body);
    let respuesta = {
        success: false,
        id: 0
    }
    await MySql.realizarQuery(`INSERT INTO Mensajes (idChat, mensaje, usuarioEnvia, tiempo)
    VALUES (${req.body.idChat}, '${req.body.mensaje}', ${req.body.usuarioEnvia}, NOW())`);
    respuesta.success = true;
    res.send(respuesta);     
})

app.get('/usuarios', async function(req,res){
    //let usuario = await MySql.realizarQuery(`select nombre from Propiedades where idUsuario = '${req.body.id}'`);
    let usuarios = await MySql.realizarQuery(`select * from Usuarios`);
    res.send(usuarios)
})