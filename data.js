function getUsers() { return JSON.parse(localStorage.getItem("users") || "[]"); }
function getProducts() { return JSON.parse(localStorage.getItem("products") || "[]"); }
function getSetoran() { return JSON.parse(localStorage.getItem("setoran") || "[]"); }
function getRetur() { return JSON.parse(localStorage.getItem("retur") || "[]"); }
function getCurrentUser() { return JSON.parse(localStorage.getItem("currentUser")); }
function checkAccess(requiredRole) {
    const user = getCurrentUser();
    if (!user || user.hakAkses !== requiredRole) {
        alert("Akses ditolak! Silakan login kembali.");
        window.location.href = "index.html";
    }
}
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
function formatRupiah(angka) {
    return "Rp " + Number(angka).toLocaleString("id-ID");
}
