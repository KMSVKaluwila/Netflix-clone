// Import Firebase modules
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc
} from "firebase/firestore";
import { toast } from "react-toastify";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxKv1UsObQ8ViFTcm3SWmEFdrd3a1lCFE",
    authDomain: "my-netflix-clone-12c24.firebaseapp.com",
    projectId: "my-netflix-clone-12c24",
    storageBucket: "my-netflix-clone-12c24.firebasestorage.app", // Fixed incorrect storageBucket URL //my-netflix-clone-12c24.firebasestorage.app //my-netflix-clone-12c24.appspot.com
    messagingSenderId: "33347457077",
    appId: "1:33347457077:web:9d04c126be5e260aeae17c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup function
const signup = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user data in Firestore
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            email: user.email,
            createdAt: new Date(),
        });

        console.log("User signed up:", user);
    } catch (error) {
        console.error("Error signing up:", error.message);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
};

// Login function
const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("User logged in:", user);
    } catch (error) {
        console.error("Error logging in:", error.message);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

// Logout function
const logout = async () => {
    try {
        await signOut(auth); 
        console.log("User logged out");
    } catch (error) {
        console.error("Error logging out:", error.code);
    }
};

// Export functions for use in React components
export { auth, db, signup, login, logout };
