import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, doc, deleteDoc, query, where, getDocs, onSnapshot, serverTimestamp, getDoc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };

export const firebaseService = {
  // Authentication
  async registerUser(email: any, password: any, userData: any) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      ...userData,
      role: userData.role || 'customer',
      createdAt: serverTimestamp()
    });
    return user;
  },

  async loginUser(email: any, password: any) {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  async logoutUser() {
    return await signOut(auth);
  },

  async getUserData(uid: any) {
    const docSnap = await getDoc(doc(db, "users", uid));
    return docSnap.exists() ? docSnap.data() : null;
  },

  async updateUserData(uid: any, data: any) {
    return await updateDoc(doc(db, "users", uid), data);
  },

  // Products
  async addProduct(productData: any, imageFile: any) {
    let imageUrl = "";
    if (imageFile) {
      const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    return await addDoc(collection(db, "products"), {
      ...productData,
      imageUrl,
      createdAt: serverTimestamp()
    });
  },

  async updateProduct(productId: any, productData: any, imageFile: any) {
    const updateData = { ...productData };
    if (imageFile) {
      const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      updateData.imageUrl = await getDownloadURL(storageRef);
    }
    return await updateDoc(doc(db, "products", productId), updateData);
  },

  async deleteProduct(productId: any) {
    return await deleteDoc(doc(db, "products", productId));
  },

  // Orders
  async createOrder(orderData: any) {
    return await addDoc(collection(db, "orders"), {
      ...orderData,
      deliveryStatus: "Order Received",
      createdAt: serverTimestamp()
    });
  },

  async updateOrderStatus(orderId: any, status: any) {
    const updateData: any = { deliveryStatus: status };
    if (status === "Delivered Successfully") {
      updateData.completedAt = serverTimestamp();
    }
    return await updateDoc(doc(db, "orders", orderId), updateData);
  },

  // Seller Applications
  async submitSellerApplication(applicationData: any, gardenImages: any) {
    const gardenImageUrls = [];
    if (gardenImages && gardenImages.length > 0) {
      for (const file of gardenImages) {
        const storageRef = ref(storage, `applications/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        gardenImageUrls.push(url);
      }
    }

    return await addDoc(collection(db, "sellerApplications"), {
      ...applicationData,
      gardenImages: gardenImageUrls,
      applicationStatus: "pending",
      submittedAt: serverTimestamp()
    });
  },

  async approveSeller(applicationId: any, userId: any) {
    await updateDoc(doc(db, "sellerApplications", applicationId), { applicationStatus: "approved" });
    const appSnap = await getDoc(doc(db, "sellerApplications", applicationId));
    const appData: any = appSnap.data();

    // Create seller profile
    await setDoc(doc(db, "sellers", userId), {
      sellerId: userId,
      name: appData.applicantName,
      whatsappNumber: appData.whatsappNumber,
      location: appData.location,
      bio: appData.bio,
      profileImage: appData.gardenImages[0] || "",
      approvedStatus: true,
      featuredStatus: false,
      createdAt: serverTimestamp()
    });

    // Update user role
    return await updateDoc(doc(db, "users", userId), { role: "seller" });
  },

  subscribeToUserData(uid: string, callback: (data: any) => void) {
    return onSnapshot(doc(db, "users", uid), (doc) => {
      if (doc.exists()) {
        callback(doc.data());
      }
    });
  },

  // Donations
  async saveDonation(donationData: any) {
    return await addDoc(collection(db, "donations"), {
      ...donationData,
      donationDate: serverTimestamp()
    });
  },

  // Real-time Listeners
  subscribeToProducts(callback: any) {
    return onSnapshot(collection(db, "products"), (snapshot) => {
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(products);
    });
  },

  subscribeToOrders(userId: any, role: any, callback: any) {
    let q;
    if (role === 'admin') {
      q = query(collection(db, "orders"));
    } else {
      q = query(collection(db, "orders"), where("customerId", "==", userId));
    }

    return onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(orders);
    });
  },

  subscribeToBundles(callback: any) {
    return onSnapshot(collection(db, "bundles"), (snapshot) => {
      const bundles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(bundles);
    });
  },

  subscribeToSellers(callback: any) {
    return onSnapshot(query(collection(db, "sellers"), where("approvedStatus", "==", true)), (snapshot) => {
      const sellers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(sellers);
    });
  },

  subscribeToSellerApplications(callback: any) {
    return onSnapshot(query(collection(db, "sellerApplications"), where("applicationStatus", "==", "pending")), (snapshot) => {
      const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(apps);
    });
  }
};
