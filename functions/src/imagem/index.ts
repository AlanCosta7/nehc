import { functions, firestore } from '../commons-init'
const Logger = functions.logger

export const generateThumbnail = functions.storage.object().onFinalize(async (object) => {
  // ...

  const link = object.mediaLink

  const filePath:any = object?.name
  Logger.log('filePath', filePath)

  const pathName = filePath.split('/')

  const collectionName = pathName[0]
  let id = pathName[1]
  const idTwo = pathName[2]
  const index = pathName[3]
  let ind:any = 0
  let pathId = []
  if(index) {
    pathId = index.split('_')
    ind = pathId[0]
  } else {
    pathId = idTwo.split('_')
    id = pathId[0]
  }

  const size = pathId[1].split('x').pop()

  let result:any = await firestore.collection(collectionName).doc(id).get().then((doc:any) => {
    if (doc.exists) {
      return doc.data()
    } else {
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });

  if(!index) {
    await firestore.collection(collectionName).doc(id).update({
      imagem_200: link,
      imagem_400: link,
      imagem_600: link,
      imagem_800: link,
      imagem_1600: link,
    })
  } else if(index) {
    if(collectionName == 'produtos') {
      switch (size) {
        case '800':
          result.midia[ind-1] = link
          await firestore.collection(collectionName).doc(id).update({...result})
          break
      }
    } else {
      switch (size) {
        case '1600':
          result.lista[(ind-1)].midia = link
          await firestore.collection(collectionName).doc(id).update({...result})
          break
      }
    }
  } else {
    switch (size) {
      case '200':
        await firestore.collection(collectionName).doc(id).update({
          imagem_200: link,
        })
        break
      case '400':
        await firestore.collection(collectionName).doc(id).update({
          imagem_400: link,
        })
        break
      case '600':
        await firestore.collection(collectionName).doc(id).update({
          imagem_600: link,
        })
        break
      case '800':
        await firestore.collection(collectionName).doc(id).update({
          imagem_800: link,
        })
        break
      case '1600':
        await firestore.collection(collectionName).doc(id).update({
          imagem_1600: link,
        })
        break
      default:
        break
    }
  }
})
