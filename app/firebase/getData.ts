import firebase_app from "./config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getDocuments(collectionName: string) {
    let result: { id: string; }[] = [];
    let error = null;

    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        result = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Extract data from each document
    } catch (e) {
        error = e;
    }

    return { result, error };
}
