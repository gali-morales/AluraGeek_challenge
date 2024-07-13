// Define todas las funciones primero
const productList = () => {
  return fetch("https://66920b7726c2a69f6e9156a2.mockapi.io/Alurageek/Productos")
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const crearProdcuto = (titulo, precio, imgUrl) => {
  return fetch("https://66920b7726c2a69f6e9156a2.mockapi.io/Alurageek/Productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      titulo,
      precio,
      imgUrl,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const borrarProducto = (id) => {
  return fetch(`https://66920b7726c2a69f6e9156a2.mockapi.io/Alurageek/Productos/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// Luego exporta todas las funciones
export const servicesProducts = {
  productList,
  crearProdcuto,
  borrarProducto,
};

