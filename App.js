import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function WingsTop() {
  const [userId, setUserId] = useState('');
  const [nominal, setNominal] = useState('');
  const [payment, setPayment] = useState('');

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, 'orders'), {
        gameId: userId,
        nominal,
        payment,
        status: 'pending',
        createdAt: Timestamp.now(),
      });
      alert("Pesanan berhasil dikirim!");
    } catch (error) {
      console.error("Gagal mengirim pesanan:", error);
      alert("Terjadi kesalahan saat mengirim pesanan.");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', color: 'white', backgroundColor: 'black', minHeight: '100vh' }}>
      <h1>WINGS-TOP</h1>
      <p>Top Up Game Termurah & Otomatis</p>
      <div>
        <h2>Formulir Top Up</h2>
        <input placeholder="User ID / UID Game" value={userId} onChange={e => setUserId(e.target.value)} /><br/>
        <select value={nominal} onChange={e => setNominal(e.target.value)}>
          <option>Pilih Nominal</option>
          <option>50 Diamonds</option>
          <option>100 Diamonds</option>
          <option>200 Diamonds</option>
        </select><br/>
        <select value={payment} onChange={e => setPayment(e.target.value)}>
          <option>Pilih Pembayaran</option>
          <option>Dana</option>
          <option>OVO</option>
          <option>QRIS</option>
          <option>Bank Transfer</option>
          <option>PayPal (Luar Negeri)</option>
        </select><br/>
        <button onClick={handleSubmit}>Bayar Sekarang</button>
      </div>
    </div>
  );
}