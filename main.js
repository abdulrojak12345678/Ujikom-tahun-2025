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