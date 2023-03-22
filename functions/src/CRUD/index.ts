/* eslint-disable camelcase */
import { functions, firestore, admin } from '../commons-init'
import { uid } from 'uid'

// CRUD
// Pega dados de um documento específico.
export const getDoc = functions.region('southamerica-east1').https.onCall( async (data:any, context:any) => {

  const collectionName = data.collectionName
  const idDoc = data.id

  let result = await firestore.collection(collectionName).doc(idDoc).get().then((doc:any) => {
    if (doc.exists) {
      let value = {
        id: doc.id,
        data: doc.data()
      }
      return value
    } else {
      return {msg: "Esse documento não existe"}
    }
  }).catch((error:any) => {
    return {error: error}
  })

  return result

})

// Pega todos os dados de uma collection com paginação
export const getAllCollection = functions.region('southamerica-east1').https.onCall( async (data:any, context:any) => {

  const collectionName = data.collectionName
  const startAfter = data.lastVisible
  const limit = data.limit || 50
  let result = null

  if(startAfter) {
    result = firestore.collection(collectionName)
      .startAfter(startAfter)
      .limit(limit).get().then((querySnapshot:any) => {
        var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
        let lista:any = []
        querySnapshot.forEach((doc:any) => {
          let value = {
            id: doc.id,
            data: doc.data(),
            lastVisible: lastVisible
          }
          lista = value
        });
        return lista
      })
  } else {
    result = firestore.collection(collectionName)
      .limit(limit).get().then((querySnapshot:any) => {
        var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
        let lista:any = []
        querySnapshot.forEach((doc:any) => {
          let value = {
            id: doc.id,
            data: doc.data(),
            lastVisible: lastVisible
          }
          lista = value
        });
        return lista
      })
  }
  return result

})

// Pega todos os dados de uma subcollections com paginação.
export const getSubDoc = functions.region('southamerica-east1').https.onCall( async (data:any, context:any) => {

  const collectionName = data.collectionName
  const idDoc = data.id
  const subCollectionName = data.subCollectionName
  const startAfter = data.lastVisible
  const limit = data.limit || 50
  let result = null
  if(startAfter) {
    result = firestore.collection(collectionName).doc(idDoc)
      .collection(subCollectionName)
      .startAfter(startAfter)
      .limit(limit).get().then((querySnapshot:any) => {
        var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
        let lista:any = []
        querySnapshot.forEach((doc:any) => {
          let value = {
            id: doc.id,
            data: doc.data(),
            lastVisible: lastVisible
          }
          lista = value
        });
        return lista
    })

  } else {
    result = firestore.collection(collectionName).doc(idDoc)
      .collection(subCollectionName)
      .limit(limit).get().then((querySnapshot:any) => {
      var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
      let lista:any = []
      querySnapshot.forEach((doc:any) => {
        let value = {
          id: doc.id,
          data: doc.data(),
          lastVisible: lastVisible
        }
        lista = value
      });
      return lista
    })

  }

  return result

})

// Pega dados de uma collection com consulta simples e paginação
export const getSimplesCollection = functions.region('southamerica-east1').https.onCall( async (data:any, context:any) => {

  const collectionName = data.collectionName
  const startAfter = data.lastVisible
  const limit = data.limit || 50
  const arg = data.arg
  const campo = data.campo
  const val = data.value
  let result = null
  if(startAfter) {

    result = firestore.collection(collectionName).where(campo, arg, val)
      .startAfter(startAfter)
      .limit(limit).get().then((querySnapshot:any) => {
      var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
      let lista:any = []
      querySnapshot.forEach((doc:any) => {
        let value = {
          id: doc.id,
          data: doc.data(),
          lastVisible: lastVisible
        }
        lista.push(value)
      })
      return lista
    })
    .catch((error:any) => {
      return {error: error}
    })
  } else {

    result = firestore.collection(collectionName).where(campo, arg, val)
      .limit(limit).get().then((querySnapshot:any) => {
      var lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
      let lista:any = []
      querySnapshot.forEach((doc:any) => {
        let value = {
          id: doc.id,
          data: doc.data(),
          lastVisible: lastVisible
        }
        lista.push(value)
      })
      return lista
    })
    .catch((error:any) => {
      return {error: error}
    })

  }

  return result
})

// Pega dados de uma collection com consulta composta (dois parâmetros) e paginação
export const getCompostaCollection = functions.region('southamerica-east1').https.onCall( async (data:any, context:any) => {

  const collectionName = data.collectionName
  const startAfter = data.lastVisible
  const limit = data.limit || 50
  const arg1 = data.arg1
  const campo1 = data.campo1
  const val1 = data.value1
  const arg2 = data.arg2
  const campo2 = data.campo2
  const val2 = data.value2
  let result = null

  if(startAfter) {
    result = firestore.collection(collectionName)
      .where(campo1, arg1, val1)
      .where(campo2, arg2, val2)
      .startAfter(startAfter)
      .limit(limit)
      .get().then((querySnapshot:any) => {
        let lista:any = []
        querySnapshot.forEach((doc:any) => {
          let value = {
            id: doc.id,
            data: doc.data()
          }
          lista.push(value)
        })
        return lista
      })
      .catch((error:any) => {
        return {error: error}
      })

  } else {
    result = firestore.collection(collectionName)
      .where(campo1, arg1, val1)
      .where(campo2, arg2, val2)
      .limit(limit)
      .get().then((querySnapshot:any) => {
        let lista:any = []
        querySnapshot.forEach((doc:any) => {
          let value = {
            id: doc.id,
            data: doc.data()
          }
          lista.push(value)
        })
        return lista
      })
      .catch((error:any) => {
        return {error: error}
      })

  }

    return result
})

// Salva dados em um documento específico
export const saveDoc = functions.region('southamerica-east1').https.onCall( async (data:any, context:any) => {

  const collectionName = data.collectionName
  const newId = uid()
  const idDoc = data.id || newId
  const dados = data.dados

  let result = firestore.collection(collectionName).doc(idDoc).set(dados)
  .then(() => {
    return {msg: 'Dados salvo com sucesso'}
  })
  .catch((error:any) => {
    return {error: error}
  })
  return result

})

// Salva dados em um SubDocumento
export const saveSubDoc = functions.region('southamerica-east1').https.onCall( async (data:any, context:any) => {

  const collectionName = data.collectionName
  const subCollectionName = data.subCollectionName
  const newId = uid()
  const idDoc = data.id || newId
  const dados = data.dados

  let result = firestore.collection(collectionName).doc(idDoc)
    .collection(subCollectionName).add(dados)
  .then(() => {
    return {msg: 'Dados salvo com sucesso'}
  })
  .catch((error:any) => {
    return {error: error}
  })
  return result

})

// Atualiza dados em um documento
export const updateDoc = functions.region('southamerica-east1').https.onCall( async (data:any, context:any) => {

  const collectionName = data.collectionName
  const idDoc = data.id
  const dados = data.dados

  let result = firestore.collection(collectionName).doc(idDoc).update(dados)
  .then(() => {
    return {msg: 'Dados atualizados com sucesso'}
  })
  .catch((error:any) => {
    return {error: error}
  })
  return result

})

// Atualiza dados em um SubDocumento
export const updateSubDoc = functions.region('southamerica-east1').https.onCall( async (data:any, context:any) => {

  const collectionName = data.collectionName
  const subCollectionName = data.subCollectionName
  const idDoc = data.id
  const idSubDoc = data.subId
  const dados = data.dados

  let result = firestore.collection(collectionName).doc(idDoc).
    collection(subCollectionName).doc(idSubDoc).
    update(dados)
    .then(() => {
      return {msg: 'Dados atualizados com sucesso'}
    })
    .catch((error:any) => {
      return {error: error}
    })
    return result

})

// Deleta um documento
export const deleteDoc = functions.region('southamerica-east1').https.onCall( async (data:any, context:any) => {

  const collectionName = data.collectionName
  const idDoc = data.id

  let result = firestore.collection(collectionName).doc(idDoc).delete()
  .then(() => {
    return {msg: 'Dados deletados com sucesso'}
  })
  .catch((error:any) => {
    return {error: error}
  })
  return result
})

// Deleta um SubDocumento
export const deleteSubDoc = functions.region('southamerica-east1').https.onCall( async (data:any, context:any) => {

  const collectionName = data.collectionName
  const subCollectionName = data.subCollectionName
  const idDoc = data.id
  const idSubDoc = data.subId

  let result = firestore.collection(collectionName).doc(idDoc)
    .collection(subCollectionName).doc(idSubDoc)
    .delete()
    .then(() => {
      return {msg: 'Dados deletados com sucesso'}
    })
    .catch((error:any) => {
      return {error: error}
    })
    return result
})

// Atualizar elementos em uma matriz
export const updateItemArray = functions.region('southamerica-east1').https.onCall( async (data:any, context:any) => {

  const collectionName = data.collectionName
  const idDoc = data.id
  const nameDados = data.nameDados
  const dados = data.dados

  var docRef = firestore.collection(collectionName).doc(idDoc)
  const obj = `${nameDados}: ${admin.firestore.FieldValue.arrayUnion(dados)}`

  docRef.update({obj})


  return {msg: 'Dados atualizados com sucesso'}
})

// deleta elementos em uma matriz
export const deleteItemArray = functions.region('southamerica-east1').https.onCall( async (data:any, context:any) => {

  const collectionName = data.collectionName
  const idDoc = data.id
  const nameDados = data.nameDados
  const dados = data.dados

  var docRef = firestore.collection(collectionName).doc(idDoc)
  const obj = `${nameDados}: ${admin.firestore.FieldValue.arrayRemove(dados)}`

  docRef.update({obj})

  return {msg: 'Dados deletados com sucesso'}
})

// incrementa valor em um documento
export const increment = functions.region('southamerica-east1').https.onCall( async (data:any, context:any) => {

  const collectionName = data.collectionName
  const idDoc = data.id
  const nameDados = data.nameDados
  const dados = data.dados

  var docRef = firestore.collection(collectionName).doc(idDoc)
  const obj = `${nameDados}: ${admin.firestore.FieldValue.increment(dados)}`

  docRef.update({obj})

  return {msg: 'Dados atualizados com sucesso'}
})
