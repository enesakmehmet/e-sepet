import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Firebase konsolundan aldığınız gerçek yapılandırma bilgilerinizi buraya ekleyin
// https://console.firebase.google.com/ adresinden projenize gidin
// Proje ayarları > Genel > Firebase SDK snippet > Yapılandırma
const firebaseConfig = {
  apiKey: "AIzaSyBKFneTu-hko95Gj-pkJiRvVglXSrIjG7M",
  authDomain: "webb-ebb3d.firebaseapp.com",
  projectId: "webb-ebb3d",
  storageBucket: "webb-ebb3d.firebasestorage.app",
  messagingSenderId: "334065933186",
  appId: "1:334065933186:web:71a29d9f3d09eb75188d9b",
  measurementId: "G-B7S4XMP1G0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 

