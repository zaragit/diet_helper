import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('users');

export function create({id, displayName, age, height, weight}) {
  return usersCollection.doc(id).set({
    id,
    displayName,
    age,
    height,
    weight,
  });
}

export async function getUser(id) {
  const doc = await usersCollection.doc(id).get();
  return doc.data();
}
