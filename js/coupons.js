/* ── Estado activo del modal ── */
let activeModal = null;
let currentCoupons = COUPONS;
const IMAGE_COUNT = 20;

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */

/**
 * Formatea una fecha ISO "YYYY-MM-DD" al estilo "31 Dic 2026"
 */
function formatDate(isoDate) {
  if (!isoDate) return "—";
  const [y, m, d] = isoDate.split("-");
  const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
}

/**
 * Devuelve el HTML del badge de estado con la clase CSS correspondiente.
 * estados: disponible | usado | expirado | especial
 */
function estadoBadge(estado) {
  const labels = {
    disponible: "Disponible",
    usado:      "Usado",
    expirado:   "Expirado",
    especial:   "Especial"
  };
  return `<span class="badge-estado ${estado}">${labels[estado] ?? estado}</span>`;
}

/**
 * Devuelve una imagen dinámica para cada cupón
 */
function getCouponImage(index) {
  const imageIndex = index % IMAGE_COUNT;
  return imageIndex === 0 ? `img/0.jpg` : `img/${imageIndex}.jpeg`;
}

/**
 * Renueva la expiración a la fecha indicada para cupones no especiales.
 */
function renewNonSpecialCoupons(targetDate) {
  currentCoupons = currentCoupons.map(coupon => {
    if (coupon.estado === 'disponible' || coupon.estado === 'usado' || coupon.estado === 'expirado') {
      return { ...coupon, expiracion: targetDate };
    }
    return coupon;
  });
}

/**
 * Retorna la cuenta regresiva hasta la fecha objetivo.
 */
function getCountdownHtml(targetDate) {
  const now = new Date();
  const target = new Date(targetDate);
  const msRemaining = target - now;

  if (msRemaining <= 0) {
    return `<p class="coupon-countdown">La espera ha terminado. Disfruta tus cupones amor</p>`;
  }

  const days = Math.floor(msRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((msRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((msRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((msRemaining % (1000 * 60)) / 1000);

  return `<p class="coupon-countdown">Cuenta regresiva: <strong>${days}d ${hours}h ${minutes}m ${seconds}s</strong></p>`;
}

/**
 * Genera el HTML completo de una tarjeta de cupón.
 */
function buildCardHTML(coupon) {
  const { _id, titulo, descripcion, codigo, expiracion, estado, etiqueta, imagen, categoria } = coupon;

  const isRedimible = estado === "disponible";
  const btnDisabled = isRedimible ? "" : "disabled";
  const btnClass    = isRedimible ? "btn-redeem" : `btn-redeem ${estado}`;
  const btnLabel    = estado === "usado" ? "Ya canjeado" : estado === "expirado" ? "Expirado" : "Canjear";

  const specialBody = estado === "especial"
    ? `
        <div class="coupon-body">
          ${estadoBadge(estado)}
          ${getCountdownHtml("2026-05-17")}
        </div>
        <div class="coupon-footer">
          <div>
            <div class="coupon-exp">Disponible hasta: <span>17 May 2026</span></div>
          </div>
          <button class="btn-redeem especial" disabled>Canjear</button>
        </div>
      `
    : `
        <div class="coupon-body">
          ${estadoBadge(estado)}
          <h3 class="coupon-title">${titulo}</h3>
          <p class="coupon-desc">${descripcion}</p>
        </div>

        <div class="coupon-footer">
          <div>
            <div class="coupon-exp">Válido hasta: <span>${formatDate(expiracion)}</span></div>
          </div>
          <button
            class="${btnClass}"
            ${btnDisabled}
            onclick="openModal('${_id}')">
            ${btnLabel}
          </button>
        </div>
      `;

  return `
    <div class="col-sm-6 col-lg-4 coupon-item" data-cat="${categoria}" data-id="${_id}">
      <div class="coupon-card">

        <div class="coupon-img-wrap">
          <img src="${imagen}" alt="${titulo}"/>
        </div>

        <div class="coupon-tear"></div>

        ${specialBody}

      </div>
    </div>
  `;
}

/* ══════════════════════════════════════════
   RENDER
══════════════════════════════════════════ */

/**
 * Inserta todas las tarjetas en el grid del DOM.
 * Llama a esta función con el array que venga de tu API.
 */
function renderCoupons(data) {
  currentCoupons = data.map((coupon, index) => ({
    ...coupon,
    imagen: getCouponImage(index)
  }));

  const grid = document.getElementById("couponsGrid");
  grid.innerHTML = currentCoupons.map(buildCardHTML).join("");
}

/* ══════════════════════════════════════════
   FILTROS
══════════════════════════════════════════ */

function filterCoupons(cat, btn) {
  // Actualizar pills activos
  document.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
  btn.classList.add("active");

  // Mostrar / ocultar cards con animación
  document.querySelectorAll(".coupon-item").forEach(item => {
    const match = cat === "all" || item.dataset.cat === cat;
    if (match) {
      item.style.display = "";
      item.style.animation = "none";
      requestAnimationFrame(() => {
        item.style.animation = "fadeIn 0.35s ease";
      });
    } else {
      item.style.display = "none";
    }
  });
}

/* ══════════════════════════════════════════
   MODAL DE CANJE
══════════════════════════════════════════ */

/**
 * Abre el modal con los datos del cupón cuyo _id recibe.
 */
function openModal(id) {
  const coupon = currentCoupons.find(c => c._id === id);
  if (!coupon) return;

  // Si se abre el cupón especial llamado "Cupón especial", renovar otros cupones
  if (coupon.estado === 'especial' && coupon.titulo === 'Cupón especial') {
    renewNonSpecialCoupons('2027-05-17');
    renderCoupons(currentCoupons);
  }

  // Guardar referencia para confirmRedeem()
  activeModal = coupon;

  // Rellenar datos del modal
  document.getElementById("modalName").textContent = coupon.titulo;
  document.getElementById("modalImg").src          = coupon.imagen;
  document.getElementById("modalVal").textContent  = coupon.descripcion;
  document.getElementById("modalCat").textContent  = coupon.etiqueta;
  document.getElementById("couponCode").textContent = coupon.codigo;

  const modal = new bootstrap.Modal(document.getElementById("redeemModal"));
  modal.show();
}

/* ══════════════════════════════════════════
   CONFIRMAR CANJE
══════════════════════════════════════════ */

/**
 * Construye la URL de WhatsApp para enviar la notificación.
 */
function getWhatsAppUrl(message) {
  const phone = "524426342561"; // 44 2634 2561 en formato internacional
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Abre WhatsApp Web / app para notificar el canje.
 */
function sendWhatsAppNotification(coupon) {
  const message = `Se canjeó un cupón: "${coupon.titulo}" (código ${coupon.codigo}).`;
  window.open(getWhatsAppUrl(message), "_blank");
}

/**
 * Marca el cupón como "usado" en MongoDB Atlas y actualiza la UI.
 * Ahora hace una llamada a la API para persistir los cambios.
 */
async function confirmRedeem() {
  if (!activeModal) return;

  // 1. Cerrar el modal
  const modalEl = document.getElementById("redeemModal");
  bootstrap.Modal.getInstance(modalEl).hide();

  // 2. Actualizar estado localmente primero para mejor UX
  const coupon = currentCoupons.find(c => c._id === activeModal._id);
  if (coupon) {
    coupon.estado = "usado";
    coupon.fechaCanje = new Date().toISOString().split("T")[0];
  }

  // 3. Re-renderizar las tarjetas para reflejar el cambio inmediato
  setTimeout(() => {
    renderCoupons(currentCoupons);

    // 4. Enviar notificación por WhatsApp
    sendWhatsAppNotification(coupon);

    // 5. Mostrar toast de éxito
    document.getElementById("toastMsg").textContent =
      `"${activeModal.titulo}" ha sido canjeado exitosamente con el código ${activeModal.codigo}.`;
    const toast = new bootstrap.Toast(document.getElementById("successToast"), { delay: 4500 });
    toast.show();

    activeModal = null;
  }, 350);

  // 6. Persistir en MongoDB Atlas (en background)
  try {
    const response = await fetch('http://localhost:3000/api/coupons/redeem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: activeModal._id,
        fechaCanje: new Date().toISOString().split('T')[0]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(' Cupón canjeado en MongoDB Atlas:', result);

  } catch (error) {
    console.error(' Error persistiendo en MongoDB Atlas:', error);
    // Aquí podrías mostrar un mensaje de error al usuario si falla la persistencia
    // pero el cambio local ya se hizo para mejor UX
  }
}

/* ══════════════════════════════════════════
   INIT — se ejecuta al cargar la página
══════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  loadCoupons();
});

/* ══════════════════════════════════════════
   CARGA DE DATOS DESDE API
══════════════════════════════════════════ */

/**
 * Carga los cupones desde la API de MongoDB Atlas
 */
async function loadCoupons() {
  try {
    const response = await fetch('http://localhost:3000/api/coupons');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const coupons = await response.json();
    renderCoupons(coupons);
  } catch (error) {
    console.error('Error cargando cupones:', error);
    // Fallback a datos locales si la API no está disponible
    console.warn('Usando datos locales como fallback');
    renderCoupons(COUPONS);
  }
}