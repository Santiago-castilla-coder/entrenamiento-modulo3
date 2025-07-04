// gestion_api.js

const API_URL = 'http://localhost:3000/productos';

// Obtener todos los productos
async function obtenerProductos() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener los productos');
    const data = await res.json();
    console.log('Productos disponibles:', data);
  } catch (error) {
    console.error('Error en GET:', error.message);
  }
}

// Crear un nuevo producto
async function crearProducto(nombre, precio) {
  if (!nombre || isNaN(precio)) {
    console.error('Datos inválidos para crear producto');
    return;
  }

  const nuevoProducto = { nombre, precio: Number(precio) };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoProducto)
    });

    if (!res.ok) throw new Error('Error al crear producto');
    const creado = await res.json();
    console.log('Producto creado:', creado);
  } catch (error) {
    console.error('Error en POST:', error.message);
  }
}

// Actualizar producto existente
async function actualizarProducto(id, nuevoNombre, nuevoPrecio) {
  if (!id || !nuevoNombre || isNaN(nuevoPrecio)) {
    console.error('Datos inválidos para actualizar producto');
    return;
  }

  const datosActualizados = { nombre: nuevoNombre, precio: Number(nuevoPrecio) };

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosActualizados)
    });

    if (!res.ok) throw new Error('Error al actualizar producto');
    const actualizado = await res.json();
    console.log('Producto actualizado:', actualizado);
  } catch (error) {
    console.error('Error en PUT:', error.message);
  }
}

// Eliminar un producto por ID
async function eliminarProducto(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) throw new Error('Error al eliminar producto');
    console.log(`Producto con ID ${id} eliminado correctamente`);
  } catch (error) {
    console.error('Error en DELETE:', error.message);
  }
}

// Función de pruebas
async function pruebas() {
  console.log('\nObtener productos:');
  await obtenerProductos();

  console.log('\nCrear producto:');
  await crearProducto('Parlantes', 120);

  console.log('\nActualizar producto con ID 2:');
  await actualizarProducto(2, 'Mouse Gamer', 35);

  console.log('\nEliminar producto con ID 3:');
  await eliminarProducto(3);

  console.log('\nProductos finales:');
  await obtenerProductos();
}

// Ejecutar pruebas
pruebas();
