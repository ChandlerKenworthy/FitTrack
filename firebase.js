import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: add SDKs for Firebase prodjcts that you want to use

const firebaseConfig = {
    apiKey: 'AIzaSyDhRIMa9rkdPQ4rF6E9ME4kRbF9W7xItk4',
    authDomain: 'fittrack-7bcf8.firebaseapp.com',
    projectId: 'fittrack-7bcf8',
    storageBucket: 'fittrack-7bcf8.appspot.com',
    messagingSenderId: '287839198178',
    appId: '1:287839198178:web:2cafb250359db56efb37bb'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;