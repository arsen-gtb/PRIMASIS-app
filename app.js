import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, onSnapshot, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// 1. Ganti dengan konfigurasi dari Project Firebase Anda
const firebaseConfig = {
    apiKey: "AIzaSyDK-ZO1bY9ZqezkRrlDzbvGS830ev7CQqU",
    authDomain: "primasis02.firebaseapp.com",
    projectId: "primasis02",
    storageBucket: "primasis02.firebasestorage.app",
    messagingSenderId: "702844801036",
    appId: "1:702844801036:web:20ddb3c3fc4ad9486a5e29"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2. Data Default untuk Inisialisasi Awal di Firestore
const TABEL_01_DEFAULT = [
    { id: "admin", nama: "Supplier", pic: "Chusnul Intan Alfiana", hp: "081234567890", alamat: "Sragen", username: "chusnul", password: 123450, hakAkses: "admin" },
    { id: "mitra_1", nama: "Bisnis Center SMK Muhammadiyah 4 Sragen", pic: "Wahyu Wismawati", hp: "085678901234", alamat: "Jl. Sukowati", username: "smkmuh4", password: 123451, hakAkses: "mitra" }
];

const TABEL_02_DEFAULT = [
    { id_produk: "p-001", nama_produk: "Risoles", varian: "Mayo", satuan: "pcs", modal: 1800, jual_supplier: 2600, jual_mitra: 3000 }
];

// 3. Fungsi Inisialisasi Database (Hanya berjalan jika Firestore kosong)
async function initFirestore() {
    const usersDoc = await getDoc(doc(db, "primasis", "users"));
    if (!usersDoc.exists()) await setDoc(doc(db, "primasis", "users"), { list: TABEL_01_DEFAULT });

    const prodDoc = await getDoc(doc(db, "primasis", "products"));
    if (!prodDoc.exists()) await setDoc(doc(db, "primasis", "products"), { list: TABEL_02_DEFAULT });

    const setorDoc = await getDoc(doc(db, "primasis", "setoran"));
    if (!setorDoc.exists()) await setDoc(doc(db, "primasis", "setoran"), { list: [] });

    const returDoc = await getDoc(doc(db, "primasis", "retur"));
    if (!returDoc.exists()) await setDoc(doc(db, "primasis", "retur"), { list: [] });
}
initFirestore();

// 4. REALTIME LISTENER: Sinkronisasi Firestore ke LocalStorage
const collections = ["users", "products", "setoran", "retur"];
collections.forEach(col => {
    onSnapshot(doc(db, "primasis", col), (docSnap) => {
        if (docSnap.exists()) {
            localStorage.setItem(col, JSON.stringify(docSnap.data().list));
            
            // Auto-refresh tampilan tabel jika ada perubahan data realtime
            if (typeof renderTable === "function") renderTable();
            if (typeof render === "function") render();
        }
    });
});

// 5. WRITE OVERRIDE: Menimpa fungsi save agar menulis ke Firestore
window.saveUsers = function(users) { 
    setDoc(doc(db, "primasis", "users"), { list: users }); 
    localStorage.setItem("users", JSON.stringify(users)); // Update lokal instan
};
window.saveProducts = function(prods) { 
    setDoc(doc(db, "primasis", "products"), { list: prods }); 
    localStorage.setItem("products", JSON.stringify(prods));
};
window.saveSetoran = function(data) { 
    setDoc(doc(db, "primasis", "setoran"), { list: data }); 
    localStorage.setItem("setoran", JSON.stringify(data));
};
window.saveRetur = function(data) { 
    setDoc(doc(db, "primasis", "retur"), { list: data }); 
    localStorage.setItem("retur", JSON.stringify(data));
};
