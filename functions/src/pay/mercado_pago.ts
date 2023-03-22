/* eslint-disable camelcase */
import axios from 'axios'
import { functions, firestore } from '../commons-init'
import { uid } from 'uid'

var mercadopago = require('mercadopago');

const Logger = functions.logger

const MERCADO_PAGO_ACCESS_TOKEN = '' // constants.MERCADO_PAGO_ACCESS_TOKEN
mercadopago.configurations.setAccessToken(MERCADO_PAGO_ACCESS_TOKEN)

const URL = 'https://api.mercadopago.com'

// Gera pagamento com cartão ou pix
export const createPayment = functions.region('southamerica-east1').https.onCall( async (data:any, context:any) => {

  const items:any = data
  const collectionName = items.collectionName
  const pedido: any = items.pedido
  const taxa: any = items.taxa
  const token = items.token
  const description = items.description
  const installments = items.installments
  const paymentMethodId = items.paymentMethodId
  const issuerId = items.issuerId
  const payer = items.payer
  const userId = items.uid
  const cupom = data.cupom

  let value: any = 0
  let result:any = null

  const iscupom:any = getCupom(cupom)
  const valCupom = await Promise.resolve(iscupom).then(async (val) => {
    return val
  })

  if(valCupom) {
    value = parseFloat(value) - (parseFloat(value) * valCupom)
  }

  const pedido_id:any = uid()
  Logger.log('pedido_id generated:', pedido_id)

  pedido.forEach(async(element: { id: any }) => {
    const id = element.id

    let produto = await firestore.collection(collectionName).doc(id).get().then(async (doc:any) => {
      if (doc.exists) {
        const produto = doc.data()
        return produto
      }
    })

    if(produto) {
      const price:any = produto?.price
      const amount = produto?.amount
      value = parseFloat(value) + (parseFloat(price) * parseFloat(amount)) + parseFloat(taxa)

      items.valor = value

      let val = {
        transaction_amount: value,
        token: token,
        description: description,
        payment_method_id: paymentMethodId,
        installments: Number(installments),
        issuer_id: issuerId,
        payer: payer,
        metadata: {
          pedido_id: pedido_id,
          uid: userId
        }
      }
      if(paymentMethodId == 'cartão') {
        result = mercadopago.payment.save(val)
        .then(function(response:any) {
          salvarBD('invoice', pedido_id, response.body,)
          return response.body
        })
        .catch(function(error:any) {
          Logger.log(error)
          return error
        })
      } else if(paymentMethodId == 'pix') {
        result = mercadopago.payment.create(val)
        .then(function(data:any) {
          salvarBD('invoice', pedido_id, data)
          return data
        })
        .catch(function(error:any) {
          Logger.log(error)
          return error
        })
      }

      return result
    } else {
      return true
    }
  })
})

// Sistema de comunicação com o Mercado Pago
export const mercadoPago = functions.region('southamerica-east1').https.onCall( async (data:any, context:any) => {
  const items:any = data
  let urlMercadoPago = items.url
  let method = items.method
  let dataMercadoPago = items.data

  let url = `${URL}/${urlMercadoPago}`

  const config: any = {
    method: method,
    url: url,
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
    },
    data: dataMercadoPago
  }

  const resultAxios = await axios(config).catch((err) => {
    Logger.log('erro ao cancelar compra', err?.response?.data)
    return err
  })

  return resultAxios
})

// Crie um cliente com todos os seus detalhes para que você possa salvar os cartões que eles usam e simplificar o processo de pagamento.
export const createCustomers = functions.region('southamerica-east1').https.onCall( async (data:any, context:any) => {
  const items:any = data
  const uid = items.uid
  const address = items.address // id, zip_code, street_name, street_number
  const date_registered = items.date_registered // Data de registo do cliente
  const default_address = items.default_address // Endereço padrão do cliente
  const default_card = items.default_card // Cartão padrão do cliente
  const description = items.description // Descrição do cliente
  const email = items.email // E-mail do cliente
  const first_name = items.first_name // Nome do cliente
  const identification = items.identification // Informações sobre a identificação do cliente (type, number)
  const last_name = items.last_name // Sobrenome do cliente
  const phone = items.phone // Telefone do cliente (area_code, number)

  let url = `https://api.mercadopago.com/v1/customers`

  const config: any = {
    method: 'PUT',
    url: url,
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
    },
    data: {
      email: email,
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      address: address,
      date_registered: date_registered,
      default_address: default_address,
      default_card: default_card,
      description: description,
      identification: identification,
    },
  }

  const resultAxios = await axios(config).then((result) => {
    salvarBD('users', uid, result.data)
  })
  .catch((err) => {
    Logger.log('erro ao cliar customers', err?.response?.data)
    return err
  })

  return resultAxios
})

// webhook do pagamento
export const webhook = functions.region('southamerica-east1').https.onRequest(async(req:any, res:any) => {
  Logger.debug('webhook request.body', req.body )
  const dataPay = req.body

  switch (dataPay?.action) {

    case 'payment.updated':
      Logger.warn('webhook updated:', dataPay)
      await handlePaymentPixUpdated(dataPay?.data?.id)
      break
    default:
      Logger.warn('Unhandled action:', dataPay?.action)
      break
  }

  async function handlePaymentPixUpdated(id: any) {
    Logger.info(`Getting information for Payment ID: ${id}`)
    const result: any = await axios({
      method: 'get',
      url: `https://api.mercadopago.com/v1/payments/${id}`,
      headers: {
        authorization: `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
      },
    }).catch((err) => {
      res.send(err)
    })

    Logger.debug('get payments response.data:', result?.data)

    const pedido_id = result?.data?.metadata?.pedido_id

    if (!pedido_id) {
      Logger.error('pedido_id not found')
      res.send()
    }

    await firestore.collection('invoice').doc(pedido_id).update({...result.data})

    res.send()
  }
  return dataPay
})

const salvarBD = async (collection:any, id:any, data:any) => {
  let result = await firestore.collection(collection).doc(id).set({...data})
  return result
}

const getCupom = async (cupom: any) => {

  const resultFirebase = await firestore.collection('desconto').where("cupom", "==", cupom)
  .get()
  .then((querySnapshot:any) => {
    let value:any = null
    querySnapshot.forEach((doc:any) => {
      if (doc.exists) {
        value = parseInt(doc.data()?.desconto)/100
      }
    })
    return value
  })

  return resultFirebase
}

/* Fim */
