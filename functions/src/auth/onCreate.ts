import { firestore, functions } from '../commons-init'

export const onCreate = functions.region('southamerica-east1').auth.user().onCreate((user:any) => {

  const {uid, email, emailVerified, displayName, photoURL, phoneNumber} = user

  // Cria um "objeto cópia" do "user"
  const userCopy = {
    uid: uid,
    email: email,
    displayName: displayName,
    photoURL: photoURL,
    emailVerified: emailVerified,
    phoneNumber: phoneNumber,
  }

  firestore.collection('users').doc(uid).set(userCopy)

})
