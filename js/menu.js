const productos = [
  // CAMISAS
  {
    categoria: 'camisa',
    nombre: '👕 Camisa Casual Blanca',
    precio: 45000,
    descripcion: 'Camisa blanca de algodón perfecta para uso diario.',
    detalle: 'Material: 100% algodón. Corte regular. Botones frontales.',
    imagen: 'img/camisa-blanca.webp'
  },
  {
    categoria: 'camisa',
    nombre: '👔 Camisa Formal Azul',
    precio: 58000,
    descripcion: 'Camisa formal azul cielo, ideal para oficina.',
    detalle: 'Material: mezcla algodón-poliéster. Entalle slim.',
    imagen: 'img/camisa-azul.webp'
  },
  {
    categoria: 'camisa',
    nombre: '👕 Camiseta Oversize Negra',
    precio: 38000,
    descripcion: 'Camiseta urbana estilo oversize, negra básica.',
    detalle: 'Algodón suave. Cuello redondo. Estilo urbano relajado.',
    imagen: 'img/camiseta-negra.webp'
  },

  // PANTALONES
  {
    categoria: 'pantalon',
    nombre: '👖 Jean Clásico Azul',
    precio: 75000,
    descripcion: 'Jean clásico azul de mezclilla resistente.',
    detalle: 'Corte recto. Tiro medio. Lavado medio.',
    imagen: 'img/jean-azul.webp'
  },
  {
    categoria: 'pantalon',
    nombre: '👖 Pantalón Chino Beige',
    precio: 69000,
    descripcion: 'Chino beige elegante, ideal para ocasiones semi-formales.',
    detalle: 'Tela suave. Corte slim. Bolsillos laterales.',
    imagen: 'img/chino-beige.webp'
  },
  {
    categoria: 'pantalon',
    nombre: '👖 Jogger Deportivo Gris',
    precio: 52000,
    descripcion: 'Jogger gris con puños elásticos y cintura ajustable.',
    detalle: 'Tela stretch. Bolsillos laterales con cremallera.',
    imagen: 'img/jogger-gris.webp'
  },

  // CHAQUETAS
  {
    categoria: 'chaqueta',
    nombre: '🧥 Chaqueta de Cuero Negra',
    precio: 120000,
    descripcion: 'Chaqueta negra sintética tipo biker.',
    detalle: 'Interior forrado. Cremalleras metálicas. Estilo urbano.',
    imagen: 'img/chaqueta-cuero.webp'
  },
  {
    categoria: 'chaqueta',
    nombre: '🧥 Chaqueta Jeans Oversize',
    precio: 98000,
    descripcion: 'Chaqueta de mezclilla azul estilo vintage.',
    detalle: 'Corte amplio. Cuello clásico. Bolsillos frontales.',
    imagen: 'img/chaqueta-jeans.webp'
  },

  // ZAPATOS
  {
    categoria: 'zapato',
    nombre: '👟 Zapatillas Blancas Urbanas',
    precio: 87000,
    descripcion: 'Zapatillas blancas de cuero sintético.',
    detalle: 'Suelas antideslizantes. Diseño minimalista.',
    imagen: 'img/zapatillas-blancas.webp'
  },
  {
    categoria: 'zapato',
    nombre: '👞 Zapatos de Vestir Marrón',
    precio: 110000,
    descripcion: 'Zapatos clásicos de cuero marrón.',
    detalle: 'Plantilla acolchada. Diseño elegante. Cierre con cordones.',
    imagen: 'img/zapatos-marron.webp'
  },
  {
    categoria: 'zapato',
    nombre: '🥾 Botas Casual Beige',
    precio: 135000,
    descripcion: 'Botas resistentes beige para uso diario o trabajo.',
    detalle: 'Suela gruesa. Cordones metálicos. Interior térmico.',
    imagen: 'img/botas-beige.webp'
  }
];


const carrito = {};
let categoriaActual = '';

function filtrarCategoria(cat) {
  categoriaActual = cat;
  renderProductos();
}

function renderProductos() {
  const cont = document.getElementById('productos');
  cont.innerHTML = '';
  productos.forEach((prod, i) => {
    if (prod.categoria !== categoriaActual) return;
    const div = document.createElement('div');
    div.className = 'producto';
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" class="producto-img">
      <div class="producto-info">
        <h3>${prod.nombre}</h3>
        <p>${prod.descripcion}</p>
        <span class="precio">$${prod.precio.toLocaleString()}</span>
        <div class="cantidad-control">
          <button onclick="event.stopPropagation(); cambiarCantidad(${i}, -1)">-</button>
          <span id="cant_${i}">${carrito[i] || 0}</span>
          <button onclick="event.stopPropagation(); cambiarCantidad(${i}, 1)">+</button>
        </div>
      </div>
    `;
    div.onclick = () => mostrarModal(prod);
    cont.appendChild(div);
    if (!(i in carrito)) carrito[i] = 0;
  });
  actualizarTotal();
}


function cambiarCantidad(index, delta) {
  carrito[index] = Math.max(0, carrito[index] + delta);
  document.getElementById(`cant_${index}`).innerText = carrito[index];
  actualizarTotal();
}

function actualizarTotal() {
  let total = 0;
  for (let i in carrito) {
    total += carrito[i] * productos[i].precio;
  }
  document.getElementById('total').innerText = total.toLocaleString();
}

function guardarYContinuar() {
  const resumen = [];
  let total = 0;

  productos.forEach((p, i) => {
    if (carrito[i] > 0) {
      const subtotal = p.precio * carrito[i];
      resumen.push({
        nombre: p.nombre,
        cantidad: carrito[i],
        subtotal
      });
      total += subtotal;
    }
  });

  if (resumen.length === 0) {
    alert("No has agregado productos al carrito.");
    return;
  }

  const pedido = {
    resumen,
    total
  };

  sessionStorage.setItem("pedido", JSON.stringify(pedido));
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
  sessionStorage.setItem("categoriaActual", categoriaActual);
  
  window.location.href = "customer.html";
}

document.getElementById('categoriaSelect').addEventListener('change', (e) => {
  categoriaActual = e.target.value;
  renderProductos();
});


const carritoGuardado = sessionStorage.getItem("carrito");
if (carritoGuardado) {
  Object.assign(carrito, JSON.parse(carritoGuardado));
}

const categoriaGuardada = sessionStorage.getItem("categoriaActual");
if (categoriaGuardada) {
  categoriaActual = categoriaGuardada;
} else {
  categoriaActual = 'camisa';
}

document.getElementById('categoriaSelect').value = categoriaActual;

// Renderizar productos ya con datos restaurados
renderProductos();


function mostrarModal(prod) {
  document.getElementById('modal-img').src = prod.imagen;
  document.getElementById('modal-img').alt = prod.nombre;
  document.getElementById('modal-titulo').innerText = prod.nombre;
  document.getElementById('modal-descripcion').innerText = prod.descripcion;
  document.getElementById('modal-detalle').innerText = prod.detalle || '';
  document.getElementById('modal-precio').innerText = `Precio: $${prod.precio.toLocaleString()}`;
  document.getElementById('modal').classList.remove('hidden');
}


function cerrarModal() {
  document.getElementById('modal').classList.add('hidden');
}
