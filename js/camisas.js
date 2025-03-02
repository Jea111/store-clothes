swal(" BIENVENIDO A LA MEJOR TIENDA DE MEDELLIN");
const carrito = [];

// Agregar productos al carrito
const productos = document.querySelectorAll(".producto");
productos.forEach((producto) => {
  producto.querySelector(".add-to-cart").addEventListener("click", () => {
    const nombre = producto.dataset.nombre;
    const precio = parseFloat(producto.dataset.precio);
    carrito.push({ nombre, precio });
    mostrarCarrito();
  });
});

// Mostrar carrito
function mostrarCarrito() {
  const carritoList = document.getElementById("carrito-list");
  carritoList.innerHTML = "";
  let total = 0;
  carrito.forEach((item, index) => {
    const itemElement = document.createElement("li");
    itemElement.innerHTML = `
      ${item.nombre} - $${item.precio.toFixed(2)}
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    carritoList.appendChild(itemElement);
    total += item.precio;
  });
  document.getElementById("total").textContent = total.toFixed(2);
}

// Eliminar productos del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  mostrarCarrito();
}

// Realizar pago simulado

function realizarPago() {
  if (carrito.length === 0) {
    swal("¡NO HAS INGRESADO PRODUCTO \n AGREGA PRODUCTOS.😣");
  } else {
    swal({
      title: "CONFIRMANDO STOCK...",
      text: "PEDIDO REALIZADO CON EXITO",
      icon: "success",
      button: " ¡CERRAR!",
    });

    carrito.length = 0; // Limpiar carrito
    mostrarCarrito();
  }
}
