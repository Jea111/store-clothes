const carrito = [];
swal("BIENVENID@! A LA TIENDA DE CAMISAS \n APROVECHA NUESTRAS OFERTAS");

// Agregar productos al carrito
const productos = document.querySelectorAll(".producto");
productos.forEach((producto) => {
  const botonAgregar = producto.querySelector(".add-to-cart");

  if (botonAgregar) {
    botonAgregar.addEventListener("click", () => {
      const nombre = producto.dataset.nombre; // data-nombre
      const precio = parseFloat(producto.dataset.precio); // data-precio

      if (isNaN(precio)) {
        console.error("El precio no es válido.");
        return;
      }

      // Agregar el producto al carrito
      carrito.push({ nombre, precio });

      // Actualizar la vista del carrito
      mostrarCarrito();

      // Mostrar el carrito si hay productos
      if (carrito.length > 0) {
        document.getElementById("carrito").style.display = "block"; // Mostrar el carrito
      }
    });
  }
});

// Función para mostrar el carrito y actualizar el total
function mostrarCarrito() {
  const carritoList = document.getElementById("carrito-list");
  carritoList.innerHTML = ""; // Limpiar la lista de productos
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

// Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1); // Eliminar el producto del carrito
  mostrarCarrito(); // Volver a mostrar el carrito con los productos actualizados
}

// Función para simular el pago
function realizarPago() {
  if (carrito.length === 0) {
    swal("No has agregado productos", "Agrega para finalizar compra", "error");
  } else {
    swal("CONFIRMANDO STOCK!", "STOCK DISPONIBLE", "success");
    carrito.length = 0; // Limpiar el carrito
    mostrarCarrito(); // Actualizar la vista del carrito
    document.getElementById("carrito").style.display = "none"; // Ocultar el carrito nuevamente
  }
}

// Cambiar tema entre claro y oscuro
const botonTema = document.getElementById("theme-toggle");

// Función para alternar entre tema claro y oscuro
function cambiarTema() {
  // Alternar la clase 'dark-mode' en el body y otros elementos que quieras cambiar
  document.body.classList.toggle("dark-mode");
  document.querySelector("header").classList.toggle("dark-mode");
  document.querySelector("footer").classList.toggle("dark-mode");

  // Guardar la preferencia en localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("tema", "oscuro");
  } else {
    localStorage.setItem("tema", "claro");
  }
}

// Al cargar la página, comprobar la preferencia del usuario
window.addEventListener("load", () => {
  const temaGuardado = localStorage.getItem("tema");

  if (temaGuardado === "oscuro") {
    document.body.classList.add("dark-mode");
    document.querySelector("header").classList.add("dark-mode");
    document.querySelector("footer").classList.add("dark-mode");
  }
});

// Agregar un evento al botón para cambiar de tema
botonTema.addEventListener("click", cambiarTema);

// Función para mostrar los productos en la página
function mostrarProductos(productosParaMostrar) {
  const productosContainer = document.getElementById("productos");
  productosContainer.innerHTML = ""; // Limpiar el contenedor de productos

  productosParaMostrar.forEach((producto) => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto");
    productoDiv.dataset.nombre = producto.nombre;
    productoDiv.dataset.precio = producto.precio;

    productoDiv.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <h3>${producto.nombre}</h3>
      <p>Marca: ${producto.marca}</p>
      <p>Precio: $${producto.precio.toFixed(2)}</p>
      <button class="add-to-cart">Agregar al carrito</button>
    `;
    productosContainer.appendChild(productoDiv);
  });
}

// Función de búsqueda por marca
const inputBusquedaMarca = document.getElementById("search-brand");

inputBusquedaMarca.addEventListener("input", function () {
  const terminoBusqueda = inputBusquedaMarca.value.toLowerCase(); // Convertir el término de búsqueda a minúsculas para hacerlo insensible a mayúsculas/minúsculas
  const productosFiltrados = productosArray.filter((producto) => {
    return producto.marca.toLowerCase().includes(terminoBusqueda); // Filtrar productos por marca
  });
  mostrarProductos(productosFiltrados); // Mostrar productos filtrados
});

// Mostrar todos los productos al cargar la página
window.addEventListener("load", () => {
  mostrarProductos(productosArray);
});
