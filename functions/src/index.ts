
import * as Auth from './auth/onCreate'
// import * as CRUD from './CRUD/index'
import * as Email from './email/index'
// import * as Pay from './pay/mercado_pago'
import * as Imagem from './imagem/index'
// import * as Script from './script/index'

// Auth
export const authOnCreate = Auth.onCreate

// Email
export const sendGroup = Email.sendGroup
export const sendContato = Email.sendContato

// Pay
// export const createPayment = Pay.createPayment
// export const mercadoPago = Pay.mercadoPago
// export const createCustomers = Pay.createCustomers
// export const webhook = Pay.webhook

// Imagem
export const generateThumbnail = Imagem.generateThumbnail

// export const cadastrarProdutos = Script.cadastrarProdutos
