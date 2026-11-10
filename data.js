// Inisialisasi Database Awal
const TABEL_01_DEFAULT = [
    { id: "admin", nama: "Supplier", pic: "Chusnul Intan Alfiana", hp: "081234567890", alamat: "Sragen", username: "chusnul", password: "123450", hakAkses: "admin" },
    { id: "mitra_1", nama: "Bisnis Center SMK Muhammadiyah 4 Sragen", pic: "Wahyu Wismawati, S.E.I., M.Ak.,Gr", hp: "085678901234", alamat: "Jl. Sukowati No. 2 Sine, Sragen Tengah, Sragen, Jawa Tengah 57211", username: "smkmuh4", password: "123451", hakAkses: "mitra" },
    { id: "mitra_2", nama: "Kantin SMA N Mojogedang", pic: "Suyati", hp: "085234567890", alamat: "Kedungjeruk, Mojogedang, Karanganyar, Jawa Tengah 57752", username: "smanmojo", password: "123452", hakAkses: "mitra" }
];

const TABEL_02_DEFAULT = [
    { id_produk: "p-001", nama_produk: "Risoles", varian: "Mayo, Ayam, Pizzarella", satuan: "pcs", modal: 1800, jual_supplier: 2600, jual_mitra: 3000 },
    { id_produk: "p-002", nama_produk: "Wonton Rebus", varian: "Chili Oil lvl.1, Chili Oil lvl.2", satuan: "porsi", modal: 3000, jual_supplier: 4500, jual_mitra: 5000 },
    { id_produk: "p-003", nama_produk: "Pangsit Goreng", varian: "Chili Oil", satuan: "porsi", modal: 3000, jual_supplier: 4500, jual_mitra: 5000 },
    { id_produk: "p-004", nama_produk: "Basreng", varian: "Chili Oil", satuan: "porsi", modal: 3000, jual_supplier: 4500, jual_mitra: 5000 },
    { id_produk: "p-005", nama_produk: "Mie", varian: "Chili Oil", satuan: "porsi", modal: 3000, jual_supplier: 4500, jual_mitra: 5000 },
    { id_produk: "p-006", nama_produk: "Mix Pangsit-Basreng", varian: "Chili Oil", satuan: "porsi", modal: 3000, jual_supplier: 4500, jual_mitra: 5000 },
    { id_produk: "p-007", nama_produk: "Kebab Sosis-Sayur", varian: "-", satuan: "pcs", modal: 3000, jual_supplier: 4500, jual_mitra: 5000 },
    { id_produk: "p-008", nama_produk: "Brownies (potong original)", varian: "-", satuan: "pcs", modal: 1200, jual_supplier: 1750, jual_mitra: 2000 }
];

function initDB() {
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(TABEL_01_DEFAULT));
    }
    if (!localStorage.getItem("products")) {
        localStorage.setItem("products", JSON.stringify(TABEL_02_DEFAULT));
    }
    if (!localStorage.getItem("setoran")) {
        localStorage.setItem("setoran", JSON.stringify([]));
    }
    if (!localStorage.getItem("retur")) {
        localStorage.setItem("retur", JSON.stringify([]));
    }
}

initDB();

function getUsers() { return JSON.parse(localStorage.getItem("users")); }
function saveUsers(users) { localStorage.setItem("users", JSON.stringify(users)); }

function getProducts() { return JSON.parse(localStorage.getItem("products")); }
function saveProducts(prods) { localStorage.setItem("products", JSON.stringify(prods)); }

function getSetoran() { return JSON.parse(localStorage.getItem("setoran")); }
function saveSetoran(data) { localStorage.setItem("setoran", JSON.stringify(data)); }

function getRetur() { return JSON.parse(localStorage.getItem("retur")); }
function saveRetur(data) { localStorage.setItem("retur", JSON.stringify(data)); }

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

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
