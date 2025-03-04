import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import firebase_app from "./config";

const db = getFirestore(firebase_app);

export default async function addData(collectionName: string, data: object) {
    let result = null;
    let error = null;

    try {
        const newDocRef = doc(collection(db, collectionName)); // Generates a new ID
        result = await setDoc(newDocRef, data);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
