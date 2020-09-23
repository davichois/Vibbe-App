const ADMIN_ACTIVE = "active_adm";

export function setAdminBtn(valueAdmin) {
  localStorage.setItem(ADMIN_ACTIVE, valueAdmin);
}

export function getAdminBtn() {
  return localStorage.getItem(ADMIN_ACTIVE);
}
