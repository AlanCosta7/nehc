import { functions, firestore } from '../commons-init'
import xlsx from 'node-xlsx';


export const cadastrarProdutos = functions.region('southamerica-east1').https.onRequest( async (req:any, res:any) => {
  const filePath = `/Users/alancosta/Documents/nehc/FiatLux/functions/src/script/produtos.xlsx`

  const plan = xlsx.parse(filePath)


  plan[0].data.forEach((el:any, i) => {
    console.log('workSheetsFromFile', i, el[0])
    let val = {
      description: '',
      destaque: false,
      index: i,
      link: '',
      midia: [],
      site: 'utility',
      subtitle: '',
      title: el[0]
    }

    firestore.collection('produtos').add(val)
  });


  res.send(plan[0].data)
})
