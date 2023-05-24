const socket = io();

// Manejador para recibir la lista de productos
socket.on('todos_los_msgs', (productos) => {
  const divMsgs = document.getElementById('div-msgs');
  let contenido = '';
  productos.forEach((producto) => {
    contenido += `
      <p>Producto: ${producto.title}</p>
      <p>Id: ${producto.id}</p>
      <p>Precio: $${producto.price}</p>
      <p>Stock: ${producto.stock}</p>
      <button onclick="eliminarProducto('${producto.id}')">Eliminar</button>
      <hr />
    `;
  });
  divMsgs.innerHTML = contenido;
});

// Función para enviar el evento de agregar producto al servidor
function agregarProducto() {
  const title = document.getElementById("input-msg1").value;
  const description = document.getElementById("input-msg2").value;
  const category = document.getElementById("input-msg3").value;
  const estatus = document.getElementById("input-msg4").value;
  const price = document.getElementById("input-msg5").value;
  const thumbnail = document.getElementById("input-msg6").value;
  const code = document.getElementById("input-msg7").value;
  const stock = document.getElementById("input-msg8").value;

  const product = {
    title: title,
    description: description,
    category: category,
    status: estatus,
    price: price,
    thumbnail: thumbnail,
    code: code,
    stock: stock
  };

  socket.emit("msg_front_to_back", {
    action: "add",
    product: product
  });
}

// Función para enviar el evento de eliminar producto al servidor
function eliminarProducto(productId) {
  socket.emit("msg_front_to_back", {
    action: "delete",
    productId: productId
  });
}

// Manejador para recibir el evento de producto eliminado y actualizar la vista
socket.on('producto_eliminado', (productId) => {
  const productoElement = document.getElementById(`producto-${productId}`);
  if (productoElement) {
    productoElement.remove();
  }
});








//socket.on("todos_los_msgs", (productos) => {
     

  //const divMsgs = document.getElementById("div-msgs");
  /*let contenido = "";
  product.forEach((msg) => {
    contenido = contenido + `<p>${msg.user} dice: ${msg.msg}</p>`;
  });*/
  //divMsgs.innerHTML = productos
  //window.scrollTo(0, document.body.scrollHeight);
//});

//FRONT ATAJA "msg_server_to_front"
/* socket.on("msg_server_to_front", (msg) => {
  console.log(msg);
});
 */
//FRONT EMITE "msg_front_to_back"
/* socket.emit("msg_front_to_back", {
  author: nombre,
  msg: "hola server!!!",
}); */

/* socket.emit("data_dispositivo", {
  author: nombre,
  so: "windows",
  version: 11,
  browser: "chrome",
}); */

/* setInterval(() => {
  socket.emit("msg_random", {
    author: nombre,
    msg: Math.random(),
  });
}, 1000); */

/* socket.on("msg_a_todos", (msg) => {
  console.log(msg);
}); */
