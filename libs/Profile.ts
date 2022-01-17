import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./Firebase";

export interface Profile extends DocumentData {
  age: string;
  weight: number;
  height: number;
  gender: string;
}

export async function createProfile(
  uid: string,
  age: string,
  gender: string,
  weight: number,
  height: number
) {
  await setDoc(doc(db, "profiles", uid), {
    age,
    gender,
    weight,
    height,
  });
}

export async function getProfileByUid(uid: string) {
  const docRef = await getDoc(doc(db, "profiles", uid));
  return (docRef.data() as Profile) || null;
}
