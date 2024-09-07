import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBDM1xHVwnvhSnbnBRpcx8tviYT5gH48F0",
  authDomain: "mediashare7344.firebaseapp.com",
  projectId: "mediashare7344",
  storageBucket: "mediashare7344.appspot.com",
  messagingSenderId: "34882029438",
  appId: "1:34882029438:web:c89d3b2a5ad42514d7d52f"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };



