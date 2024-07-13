import { servicesProducts } from './Productos.js';

const misProductos = document.querySelector("[data-producto]");
const formulario = document.querySelector("[data-form]");

function crearProductos(id, titulo, precio, imgUrl) {
  const productoItem = document.createElement("div");
  productoItem.classList.add("productosItem");

  productoItem.innerHTML = `
    <img class="imagen-producto" src="${imgUrl}" alt="${titulo}">
      <h3 class="titulo-producto">${titulo}</h3>
      <p class="precio-producto">${precio}</p>
      <div data-borrar class="boton-borrar" id="${id}">
      <img src="img/delete_icon.png" alt="borrar" class="img-borrar"/>
    </div>
  `;

  const botonBorrar = productoItem.querySelector("[data-borrar]");
  botonBorrar.addEventListener("click", async () => {
    try {
      await servicesProducts.borrarProducto(id);
      productoItem.remove();
    } catch (error) {
      console.error("Error al borrar el producto:", error);
    }
  });

  misProductos.appendChild(productoItem);
  return productoItem;
}

const render = async () => {
  try {
    const listaProductos = await servicesProducts.productList();
    misProductos.innerHTML = ''; // Limpiar el contenedor antes de agregar productos
    listaProductos.forEach((producto) => {
      crearProductos(
        producto.id,
        producto.titulo,
        producto.precio,
        producto.imgUrl
      );
    });
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
};


formulario.addEventListener("submit", async (event) => {
  event.preventDefault();
  const titulo = document.querySelector("[data-titulo]").value;
  const precio = document.querySelector("[data-precio]").value;
  const imgUrl = document.querySelector("[data-imagen]").value;

  try {
    const nuevoProducto = await servicesProducts.crearProdcuto(
      titulo,
      precio,
      imgUrl
    );
    crearProductos(
      nuevoProducto.id,
      nuevoProducto.titulo,
      nuevoProducto.precio,
      nuevoProducto.imgUrl
    );
  } catch (error) {
    console.error("Error al crear el producto:", error);
  }

  limpiarForm();
});

const limpiarForm = () => {
  document.querySelector("[data-titulo]").value = "";
  document.querySelector("[data-precio]").value = "";
  document.querySelector("[data-imagen]").value = "";
};

render();


