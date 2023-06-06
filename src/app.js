
import express from "express";
import handlebars from "express-handlebars";
import { routerCarts } from "./routes/carts.router.js";
import { routerProducts } from "./routes/products.router.js";
import { routerVistaProducts } from "./routes/products.vista.router.js";
import { routerRealTimeProducts } from "./routes/socket.vista.router.js";
import  ProductManager  from './productmanager.js';
const alfombra = new ProductManager('./products.json');
import { __dirname, connectMongo } from "./utils.js";
import { Server } from "socket.io";
const app = express();
const port = 8080;

//mongodb+srv://martinrozada:5UEe26MLj7iarOtY@martin-cluster.acwuf3p.mongodb.net/?retryWrites=true&w=majority
connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CONFIGURACION DEL MOTOR DE HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//archivos publicos
app.use(express.static(__dirname + "/public"));
//ENDPOINT TIPO API CON DATOS CRUDOS EN JSON
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);



//HTML REAL TIPO VISTA
app.use("/vista/productos", routerVistaProducts);

//VISTA Sockets
app.use("/vista/realtimeproducts", routerRealTimeProducts);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "error esa ruta no existe",
    data: {},
  });
});

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
  // Envia los productos al cliente cuando se establece la conexión
  const productos = await alfombra.getProducts();
  socket.emit('todos_los_msgs', productos);

  socket.on('msg_front_to_back', async (message) => {
    if (message.action === 'add') {
      alfombra.addProduct(message.product);
    } else if (message.action === 'delete') {
      alfombra.deleteProduct(message.productId);
    }

    const productosActualizados = await alfombra.getProducts();
    socketServer.emit('todos_los_msgs', productosActualizados);
  });
});