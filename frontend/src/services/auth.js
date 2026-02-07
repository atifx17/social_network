export function logoutUser() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "/";
}
