// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // These would be replaced with actual keys from Firebase Console
  apiKey: "AIzaSy_demo_key",
  authDomain: "dugama-app.firebaseapp.com",
  projectId: "dugama-app",
  storageBucket: "dugama-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };

// Firebase Service Layer Simulation
export const firebaseService = {
  // Orders
  async saveOrder(order: any) {
    console.log("Firebase: Saving order", order);
    // await addDoc(collection(db, "orders"), order);
    return true;
  },

  async updateOrderStatus(orderId: string, status: string) {
    console.log(`Firebase: Updating order ${orderId} to status ${status}`);
    // await updateDoc(doc(db, "orders", orderId), { status });
    return true;
  },

  // Products
  async saveProduct(product: any) {
    console.log("Firebase: Saving product", product);
    // await addDoc(collection(db, "products"), product);
    return true;
  },

  async deleteProduct(productId: string) {
    console.log(`Firebase: Deleting product ${productId}`);
    // await deleteDoc(doc(db, "products", productId));
    return true;
  },

  // Donations
  async saveDonation(donation: any) {
    console.log("Firebase: Saving donation", donation);
    // await addDoc(collection(db, "donations"), { ...donation, timestamp: serverTimestamp() });
    return true;
  },

  // Seller Approval
  async updateSellerStatus(userId: string, status: 'approved' | 'rejected') {
    console.log(`Firebase: Updating seller ${userId} to ${status}`);
    // await updateDoc(doc(db, "users", userId), { isApprovedSeller: status === 'approved' });
    return true;
  }
};
