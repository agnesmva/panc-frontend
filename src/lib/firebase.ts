import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC5SucdiuKbg7S0g8AKoSX_0WrvHMXDClk",
  authDomain: "hortamockadafatec.firebaseapp.com",
  databaseURL: "https://hortamockadafatec-default-rtdb.firebaseio.com",
  projectId: "hortamockadafatec",
  storageBucket: "hortamockadafatec.firebasestorage.app",
  messagingSenderId: "645359481329",
  appId: "1:645359481329:web:c69683ba0ffaa3143cd450",
}

// Inicializa o Firebase
const app = initializeApp(firebaseConfig)

// Exporta o Auth para usar nos formulários
export const auth = getAuth(app)
