import { firestore, functions } from '../commons-init'
import * as constants from '../constants'
const Logger = functions.logger

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  constants.SENDGRID_KEY
)

// Envia email para um grupo de usuários
export const sendGroup = functions.region('southamerica-east1').https.onCall( async (data:any, context:any) => {

  const { group, assunto, message, collectionName, arg, campo  } = data

  group.forEach((element: any) => {
    firestore.collection(collectionName).where(campo, arg, element)
      .get()
      .then((querySnapshot:any) => {
        querySnapshot.forEach((doc:any) => {
          if (doc.exists) {
            const email = doc.data().email

            const msg = {
              to: email,
              from: constants.EMAIL,
              subject: assunto,
              text: message,
              html: message
            }

            sgMail.send(msg).then(() => {
              console.log('Enviado com sucesso')
            }).catch((error: any) => {
              console.log('Error:', error)
            })

          }
        });
      })
      .catch((error:any) => {
        console.log('Error:', error)
      })
  })

  return

})

// Envia email ds usuários que preencheram o formulário
export const sendContato = functions.region('southamerica-east1').https.onCall( async (data:any, context:any) => {

  let nome = data.name
  let tel = data.tel
  let email = data.email
  // let emailAdmin = 'comercial@nehc.com.br'
  let subject = `contato de ${nome}`
  let text = data.msg

  const msg = {
    to: constants.EMAIL,
    from: constants.EMAIL,
    subject: subject,
    text: `Nome: ${nome}, Email: ${email}, Telefone: ${tel}, Menssagem: ${text}`,
    html: `<p>Nome: ${nome}</p><p>Email: ${email}</p><p>Telefone: ${tel}</p><p>Menssagem: ${text}</p>`,
  }

  Logger.log('sendContato', msg, constants.SENDGRID_KEY)

  sgMail
    .send(msg)
    .then((response:any) => {
      Logger.log('response statusCode', response)
    })
    .catch((error:any) => {
      console.error(error.response.body.errors)
    })

  return 'mensagem enviada com sucesso'
})
