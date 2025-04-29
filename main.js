import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// conpigurasi firebase
const firebaseConfig = {
  apiKey: "AIzaSyBcym1i4oAyM2rFmBU_Ipa0vcC7Pdz0dws",
  authDomain: "insan-cemerlang-2e18f.firebaseapp.com",
  projectId: "insan-cemerlang-2e18f",
  storageBucket: "insan-cemerlang-2e18f.appspot.com",
  messagingSenderId: "1096016420480",
  appId: "1:1096016420480:web:87611389fc765e7ddbd065",
  measurementId: "G-DW23S2DXCR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// untuk mengexport ke firebase
export async function ambildaftartugas() {
  const refDokumen = collection(db, "to-di-list");
  const kueri = query(refDokumen, orderBy("tugas"));
  const cuplikankueri = await getDocs(kueri);

  let hasil = [];
  cuplikankueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      tugas: dok.data().tugas,
      status: dok.data().status,
      prioritas: dok.data().prioritas,
      tanggal: dok.data().tanggal,
    });
  });

  return hasil;
}
// untuk menghapus daftar tugas dab di update kw 
 export async function hapustugas(docId) {
  await deleteDoc(doc(db, "to-di-list", docId));
}
 // Event listener untuk hapus tugas
  $(".tombol-hapus").click(async function () {
    await hapustugas($(this).attr("data-id"));
    location.reload();
  });
  
    // Event listener untuk ubah tugas
  $(".ubah").click(async function () {
    window.location.replace("ubah.html?docId=" + $(this).attr("data-id"));
  })
  // untuk tambah tugas
  export async function tambahtugas(tugas, status, prioritas, tanggal) {
  try {
    const dokRef = await addDoc(collection(db, 'to-di-list'), {
      tugas: tugas,
      status: status,
      prioritas: prioritas,
      tanggal: tanggal,
    });
    console.log('berhasil menembah tugas ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah tugas ' + e);
  }
}
// mengubah tugas dan mengupdate kembali ke firebase
export async function ubahtugas(docId, tugas, status, prioritas, tanggal) {
  await updateDoc(doc(db, "to-di-list", docId), {
    tugas: tugas,
    status: status,
    prioritas: prioritas,
    tanggal: tanggal,
  });
}
// untuk mengambil daftar tugas ke firebase
export async function ambiltugas(docId) {
  const docRef = await doc(db, "to-di-list", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}

// Gunakan event delegation agar berfungsi pada elemen dinamis
$(document).on("click", ".btn-status", function () {
  let tugasId = $(this).attr("data-id");
  let statusSekarang = $(this).attr("data-status");
  let statusBaru;

  if (statusSekarang === "Belum Selesai") {
    statusBaru = "Selesai";
  } else {
    statusBaru = "Belum Selesai";
  }
  // Update tampilan tombol
  $(this).attr("data-status", statusBaru);
  $(this).text(statusBaru);
  updateWarnaStatus($(this), statusBaru);

  // Tambahkan kode AJAX jika ingin menyimpan perubahan status ke database
  console.log(`Status tugas ID ${tugasId} diubah menjadi ${statusBaru}`);
  
});
// Fungsi untuk memperbarui warna tombol berdasarkan status
function updateWarnaStatus(button, status) {
  if (status === "Belum Selesai") {
    button.css("background-color", "#dc3545").css("color", "white");
  } else if (status === "Selesai") {
    button.css("background-color", "#ffc107").css("color", "black");
  } else {
    button.css("background-color", "#28a745").css("color", "white");
  }
}

// Atur warna status setelah halaman dimuat
$(document).ready(function () {
  $(".btn-status").each(function () {
    updateWarnaStatus($(this), $(this).attr("data-status"));
  });
});
export async function ubahStatusTugas(id, statusBaru) {
//  const db = firebase.firestore(); // atau sesuai dengan cara kamu ambil DB
  await updateDoc(doc(db, "to-di-list", id), {
      status: statusBaru,
  });
}