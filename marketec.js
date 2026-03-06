const STORAGE_KEY = "marketec-vendedores";
const SESSION_KEY = "marketec-session";

async function loadVendors() {
  const cached = localStorage.getItem(STORAGE_KEY);
  if (cached) {
    return JSON.parse(cached);
  }

  const response = await fetch("vendedores.json");
  if (!response.ok) {
    throw new Error("No fue posible cargar los vendedores.");
  }

  const vendors = await response.json();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vendors));
  return vendors;
}

function saveVendors(vendors) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vendors));
}

async function loadUsers() {
  const response = await fetch("usuarios.json");
  if (!response.ok) {
    throw new Error("No fue posible cargar los usuarios.");
  }

  return response.json();
}

function getVendorBySlug(vendors, slug) {
  return vendors.find((vendor) => vendor.slug === slug);
}

function getSession() {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
}

function setSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function normalizeLabel(value) {
  return value.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatPrice(item) {
  if (typeof item.precio === "number") {
    return `$${item.precio}`;
  }

  if (typeof item.precio_adicional === "number") {
    return `+$${item.precio_adicional}`;
  }

  return "Consultar";
}
