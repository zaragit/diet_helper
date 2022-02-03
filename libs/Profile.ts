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

export interface Profile {
  age: string;
  weight: number;
  height: number;
  goal: number;
  macro: number[];
}

export async function createProfile(
  uid: string,
  { age, weight, height, goal, macro }: Profile
) {
  await setDoc(doc(db, "profiles", uid), {
    age,
    weight,
    height,
    goal,
    macro,
  });
}

export async function getProfileByUid(uid: string) {
  const docRef = await getDoc(doc(db, "profiles", uid));
  return (docRef.data() as Profile) || null;
}
