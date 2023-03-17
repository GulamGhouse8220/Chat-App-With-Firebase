import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBVq998t8HznDMqN1boAU8t-1i50dWbebo",
    authDomain: "chat-616ed.firebaseapp.com",
    projectId: "chat-616ed",
    storageBucket: "chat-616ed.appspot.com",
    messagingSenderId: "873534544558",
    appId: "1:873534544558:web:0cc79bc3762c5999296b3f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()