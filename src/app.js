import express from "express";
//import handlebars from "express-handlebars";
import { routerCarts } from "./routes/carts.router.js";
import { routerProducts } from "./routes/products.router.js";
//import { routerVistaProductos } from "./routes/productos.vista.router.js";
//import { __dirname } from "./utils.js";
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CONFIGURACION DEL MOTOR DE HANDLEBARS
/*app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");*/

//archivos publicos
//app.use(express.static(__dirname + "/public"));
//ENDPOINT TIPO API CON DATOS CRUDOS EN JSON
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

//HTML REAL TIPO VISTA
//app.use("/vista/productos", routerVistaProductos);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "error esa ruta no existe",
    data: {},
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
