import firestore from '@react-native-firebase/firestore';
import {User} from '../contexts/UserContext';

export const usersCollection = firestore().collection('users');

export function createUser({id, displayName, age, height, weight}: User) {
  return usersCollection.doc(id).set({
    id,
    displayName,
    age,
    height,
    weight,
  });
}

export async function getUser(id: string): Promise<User> {
  const doc = await usersCollection.doc(id).get();
  return doc.data() as User;
}
