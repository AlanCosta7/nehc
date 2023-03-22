import { defineStore } from 'pinia';
import { $firestore, $functions, $auth, $storage } from '../boot/firebase'
import { collection, onSnapshot, query, setDoc, deleteDoc, getDoc, getDocs, doc, updateDoc, addDoc, where } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { getFunctions, httpsCallable } from "firebase/functions";
import { Dialog, Loading, LocalStorage, Notify, Platform } from 'quasar'
import axios from 'axios'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    currentUser: null,
    leftDrawerOpen: false,
    user: null,
    loading: false,
    infoContatoSuporte: [],
    listaContatoSuporte: [],
    resultados: [],
    listaSocial: null,
    listaPages: [],
    listaSite: [],
    pageSelect: null,
    siteSelect: null,
    isCategoria: null,
    listaProdutos: [],
    bannerHome: [],
    bannerInstitucional: [],
    bannerFaixaParalax: [],
    listaAdmin: [],
    banner: [],
    bannerProduto: [],
    errors: {
      'auth/app-deleted': 'O banco de dados não foi localizado.',
      'auth/expired-action-code': 'O código da ação o ou link expirou.',
      'auth/invalid-action-code': 'O código da ação é inválido. Isso pode acontecer se o código estiver malformado ou já tiver sido usado.',
      'auth/user-disabled': 'O usuário correspondente à credencial fornecida foi desativado.',
      'auth/user-not-found': 'O usuário não correponde à nenhuma credencial.',
      'auth/weak-password': 'A senha é muito fraca.',
      'auth/email-already-in-use': 'Já existi uma conta com o endereço de email fornecido.',
      'auth/invalid-email': 'O endereço de e-mail não é válido.',
      'auth/operation-not-allowed': 'O tipo de conta correspondente à esta credencial, ainda não encontra-se ativada.',
      'auth/account-exists-with-different-credential': 'E-mail já associado a outra conta.',
      'auth/auth-domain-config-required': 'A configuração para autenticação não foi fornecida.',
      'auth/credential-already-in-use': 'Já existe uma conta para esta credencial.',
      'auth/operation-not-supported-in-this-environment': 'Esta operação não é suportada no ambiente que está sendo executada. Verifique se deve ser http ou https.',
      'auth/timeout': 'Excedido o tempo de resposta. O domínio pode não estar autorizado para realizar operações.',
      'auth/missing-android-pkg-name': 'Deve ser fornecido um nome de pacote para instalação do aplicativo Android.',
      'auth/missing-continue-uri': 'A próxima URL deve ser fornecida na solicitação.',
      'auth/missing-ios-bundle-id': 'Deve ser fornecido um nome de pacote para instalação do aplicativo iOS.',
      'auth/invalid-continue-uri': 'A próxima URL fornecida na solicitação é inválida.',
      'auth/unauthorized-continue-uri': 'O domínio da próxima URL não está na lista de autorizações.',
      'auth/invalid-dynamic-link-domain': 'O domínio de link dinâmico fornecido, não está autorizado ou configurado no projeto atual.',
      'auth/argument-error': 'Verifique a configuração de link para o aplicativo.',
      'auth/invalid-persistence-type': 'O tipo especificado para a persistência dos dados é inválido.',
      'auth/unsupported-persistence-type': 'O ambiente atual não suportar o tipo especificado para persistência dos dados.',
      'auth/invalid-credential': 'A credencial expirou ou está mal formada.',
      'auth/wrong-password': 'Senha incorreta.',
      'auth/invalid-verification-code': 'O código de verificação da credencial não é válido.',
      'auth/invalid-verification-id': 'O ID de verificação da credencial não é válido.',
      'auth/custom-token-mismatch': 'O token está diferente do padrão solicitado.',
      'auth/invalid-custom-token': 'O token fornecido não é válido.',
      // 'auth/invalid-email': 'O endereço de e-mail não é válido.',
      'auth/captcha-check-failed': 'O token de resposta do reCAPTCHA não é válido, expirou ou o domínio não é permitido.',
      'auth/invalid-phone-number': 'O número de telefone está em um formato inválido (padrão E.164).',
      'auth/missing-phone-number': 'O número de telefone é requerido.',
      'auth/quota-exceeded': 'A cota de SMS foi excedida.',
      'auth/cancelled-popup-request': 'Somente uma solicitação de janela pop-up é permitida de uma só vez.',
      'auth/popup-blocked': 'A janela pop-up foi bloqueado pelo navegador.',
      'auth/popup-closed-by-user': 'A janela pop-up foi fechada pelo usuário sem concluir o login no provedor.',
      'auth/unauthorized-domain': 'O domínio do aplicativo não está autorizado para realizar operações.',
      'auth/invalid-user-token': 'O usuário atual não foi identificado.',
      'auth/user-token-expired': 'O token do usuário atual expirou.',
      'auth/null-user': 'O usuário atual é nulo.',
      'auth/app-not-authorized': 'Aplicação não autorizada para autenticar com a chave informada.',
      'auth/invalid-api-key': 'A chave da API fornecida é inválida.',
      'auth/network-request-failed': 'Falha de conexão com a rede.',
      'auth/requires-recent-login': 'O último horário de acesso do usuário não atende ao limite de segurança.',
      'auth/too-many-requests': 'As solicitações foram bloqueadas devido a atividades incomuns. Tente novamente depois que algum tempo.',
      'auth/web-storage-unsupported': 'O navegador não suporta armazenamento ou se o usuário desativou este recurso.',
      'auth/invalid-claims': 'Os atributos de cadastro personalizado são inválidos.',
      'auth/claims-too-large': 'O tamanho da requisição excede o tamanho máximo permitido de 1 Megabyte.',
      'auth/id-token-expired': 'O token informado expirou.',
      'auth/id-token-revoked': 'O token informado perdeu a validade.',
      'auth/invalid-argument': 'Um argumento inválido foi fornecido a um método.',
      'auth/invalid-creation-time': 'O horário da criação precisa ser uma data UTC válida.',
      'auth/invalid-disabled-field': 'A propriedade para usuário desabilitado é inválida.',
      'auth/invalid-display-name': 'O nome do usuário é inválido.',
      'auth/invalid-email-verified': 'O e-mail é inválido.',
      'auth/invalid-hash-algorithm': 'O algoritmo de HASH não é uma criptografia compatível.',
      'auth/invalid-hash-block-size': 'O tamanho do bloco de HASH não é válido.',
      'auth/invalid-hash-derived-key-length': 'O tamanho da chave derivada do HASH não é válido.',
      'auth/invalid-hash-key': 'A chave de HASH precisa ter um buffer de byte válido.',
      'auth/invalid-hash-memory-cost': 'O custo da memória HASH não é válido.',
      'auth/invalid-hash-parallelization': 'O carregamento em paralelo do HASH não é válido.',
      'auth/invalid-hash-rounds': 'O arredondamento de HASH não é válido.',
      'auth/invalid-hash-salt-separator': 'O campo do separador de SALT do algoritmo de geração de HASH precisa ser um buffer de byte válido.',
      'auth/invalid-id-token': 'O código do token informado não é válido.',
      'auth/invalid-last-sign-in-time': 'O último horário de login precisa ser uma data UTC válida.',
      'auth/invalid-page-token': 'A próxima URL fornecida na solicitação é inválida.',
      'auth/invalid-password': 'A senha é inválida, precisa ter pelo menos 6 caracteres.',
      'auth/invalid-password-hash': 'O HASH da senha não é válida.',
      'auth/invalid-password-salt': 'O SALT da senha não é válido.',
      'auth/invalid-photo-url': 'A URL da foto de usuário é inválido.',
      'auth/invalid-provider-id': 'O identificador de provedor não é compatível.',
      'auth/invalid-session-cookie-duration': 'A duração do COOKIE da sessão precisa ser um número válido em milissegundos, entre 5 minutos e 2 semanas.',
      'auth/invalid-uid': 'O identificador fornecido deve ter no máximo 128 caracteres.',
      'auth/invalid-user-import': 'O registro do usuário a ser importado não é válido.',
      'auth/invalid-provider-data': 'O provedor de dados não é válido.',
      'auth/maximum-user-count-exceeded': 'O número máximo permitido de usuários a serem importados foi excedido.',
      'auth/missing-hash-algorithm': 'É necessário fornecer o algoritmo de geração de HASH e seus parâmetros para importar usuários.',
      'auth/missing-uid': 'Um identificador é necessário para a operação atual.',
      'auth/reserved-claims': 'Uma ou mais propriedades personalizadas fornecidas usaram palavras reservadas.',
      'auth/session-cookie-revoked': 'O COOKIE da sessão perdeu a validade.',
      'auth/uid-alread-exists': 'O indentificador fornecido já está em uso.',
      'auth/email-already-exists': 'O e-mail fornecido já está em uso.',
      'auth/phone-number-already-exists': 'O telefone fornecido já está em uso.',
      'auth/project-not-found': 'Nenhum projeto foi encontrado.',
      'auth/insufficient-permission': 'A credencial utilizada não tem permissão para acessar o recurso solicitado.',
      'auth/internal-error': 'O servidor de autenticação encontrou um erro inesperado ao tentar processar a solicitação.'
    },
    optionsCategoria: [
      'Brinquedos',
      'Informática',
      'Cabos e conectores',
      'Iluminação',
      'Automotivo',
      'Utilidade do lar',
      'Saúde e beleza',
      'Embalagem para envio'
    ]
  }),
  getters: {
    mobile() {
      return Platform?.is?.mobile ? true : false
    },
    desktop() {
      return Platform?.is?.desktop ? true : false
    },
  },
  actions: {
    // Notifica status de operações
    handleCallback(payload) {
      Loading.hide()
      if(payload.type && payload.message) {
        Notify.create({
          type: payload.type,
          message: payload.message,
          timeout: 2000,
        })
      }
    },
    // adiciona o usuário atual
    async setCurrentUser(userCredential) {

      const {uid, email, emailVerified, displayName, photoURL, providerData, phoneNumber} = userCredential
      const providerId = providerData && providerData.length > 0 ? providerData[0].providerId : userCredential.providerId

      this.currentUser = {
        uid,
        email,
        emailVerified,
        displayName,
        photoURL,
        providerId,
        phoneNumber,
      }

      LocalStorage.set('currentUser', {
        uid,
        email,
        emailVerified,
        displayName,
        photoURL,
        providerId,
        phoneNumber,
      })

      return this.currentUser
    },
    // Inicia o login
    async signIn(payload) {
      let his = this
      let email = payload.email
      let password = payload.password
      let isProvider = payload.provider
      let provider, result

      $auth.languageCode = 'pr-BR';

      const currentUser = $auth.currentUser;
      if(!currentUser) {
        switch (isProvider) {
          case 'email_password':
            try {
              result = await signInWithEmailAndPassword($auth, email, password)
            } catch (error) {
              let code = error.code;
              his.error = error

              if(code) {
                var throwError = !!his.errors[code] ? his.errors[code] : 'Ops!'
                let val = {
                  type: "negative",
                  message: throwError
                }
                his.handleCallback(val)
              }
            }

            break;
          case 'google':
            try {
              provider = new firebase.auth.GoogleAuthProvider();
              result = this.authProvider(provider)
            } catch (error) {
              let code = error.code;
              his.error = error

              if(code) {
                var throwError = !!his.errors[code] ? his.errors[code] : 'Ops!'
                let val = {
                  type: "negative",
                  message: throwError
                }
                his.handleCallback(val)
              }

            }
            break;
          case 'facebook':
            try {
              provider = new firebase.auth.FacebookAuthProvider();
              result = this.authProvider(provider)
            } catch (error) {
              let code = error.code;
              his.error = error

              if(code) {
                var throwError = !!his.errors[code] ? his.errors[code] : 'Ops!'
                let val = {
                  type: "negative",
                  message: throwError
                }
                his.handleCallback(val)
              }

            }
            break;
          default:
        }

        if(result?.user) {
          await this.setCurrentUser(result.user)
        }
        return result
      } else {
        await this.setCurrentUser(currentUser)
        return false
      }

    },
    // Verifica se o usuário está logado
    async isOnAuthStateChanged() {

      onAuthStateChanged($auth, async (user) => {
        if (user) {
          this.setCurrentUser(user)
        } else {
          setTimeout(() => {
            this.currentUser = null
            this.user = null
            LocalStorage.set('currentUser', null)
          }, 1000);
        }
      });
    },
    // desloga o usuário
    async signOut() {
      await $auth.signOut()
    },
    // autentica usuário com provedor
    async authProvider(provider) {

      return await $auth
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        // var credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        this.setCurrentUser(user)
        return true
        // ...
      }).catch((error) => {
        // Handle Errors here.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;

        this.errorCode = error.code;
        this.errorMessage = error.message;
        this.error = error
        // ...

        return false
      });
    },
    async saveDocs(payload) {
      return await addDoc(collection($firestore, payload.collection), payload.data)
      .then(() => {
        let val = {
          type: "positive",
          message: "Salvo com sucesso",
        }

        this.handleCallback(val)
        return true
      })
      .catch((error) => {
        console.error("Error writing document: ", error);

        let val = {
          type: "negative",
          message: 'Ops! não foi possível salvar'
        }
        this.handleCallback(val)
        return {error: error}
      });
    },
    async updateDocs(payload) {
      const docRef = doc($firestore, payload.collection, payload.id);

      return await updateDoc(docRef, { ...payload.data})
      .then(() => {
        let val = {
          type: "positive",
          message: 'Atualizado com sucesso',
        }
        this.handleCallback(val)

        return true
      })
      .catch((error) => {
        console.error("Error writing document: ", error);

        let val = {
          type: "negative",
          message: 'Ops! não foi possível salvar',
        }
        this.handleCallback(val)

        return {error: error}
      });
    },
    async deleteDocs(payload) {

      await deleteDoc(doc($firestore, payload.collection, payload.id))
      .then(() => {
        let val = {
          type: "positive",
          message: 'Deletado com sucesso',
        }
        this.handleCallback(val)
      })
      .catch((error) => {
        console.error("Error writing document: ", error);

        let val = {
          type: "negative",
          message: 'Ops! não foi possível deletar',
        }
        this.handleCallback(val)

      });

    },
    async saveDocsId(payload) {
      console.log('saveDocsId', payload)
      return await setDoc(doc($firestore, payload.collection, payload.id), payload.data)
      .then(() => {
        let val = {
          type: "positive",
          message: "Salvo com sucesso",
        }

        this.handleCallback(val)
        return true
      })
      .catch((error) => {
        console.error("Error writing document: ", error);

        let val = {
          type: "negative",
          message: 'Ops! não foi possível salvar'
        }
        this.handleCallback(val)
        return {error: error}
      });
    },
    async getDocs(payload) {
      const q = query(collection($firestore, payload.collection), where(payload.param, "==", payload.doc));
      let result = []
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let val = {
          id: doc.id,
          dados: doc.data()
        }
        result.push(val)
      });

      return result
    },
    async uploadPhotoURL(payload) {
      let his = this
      const id = payload.id;
      const collection = payload.collection;
      const files = payload.files;
      const type = payload.type;
      const page = payload.page
      const index = payload.index || null

      console.log('type:', type)

      if (!files) {
        Loading.hide()
        return;
      } else if(type !== 'video') {

        const storageRef = index ? `${collection}/${id}/${index}`:`${collection}/${id}`

        const uidRef = ref($storage, storageRef)
        const uploadTask = uploadBytesResumable(uidRef, files);

        await uploadTask.on('state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            Loading.show({
              html: true,
              message: `<h3>Salvando imagem...</h3><p><b>Progresso: ${progress.toFixed(0)}%</b></p>`
            })
            console.log('Upload is ' + progress + '% done');
            if(progress == 100) {
              if(type == 'anexo') {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                  let itemPage = his.listaPages.find(v => v.id == id)
                  itemPage.data.lista[0].link = downloadURL
                  console.log('downloadURL:', downloadURL)
                  let val = {
                    collection: collection,
                    id: id,
                    data: itemPage.data
                  }
                  his.updateDocs(val)
                });
                Loading.hide()

              }
              Loading.hide()
            }
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;

              // ...

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
            Loading.hide()

          })
        return uploadTask;
      } else {

        const storageRef = index ? `${collection}/${id}/${index}`:`${collection}/${id}`

        const uidRef = ref($storage, storageRef)
        const uploadTask = uploadBytesResumable(uidRef, files);

        await uploadTask.on('state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            Loading.show({
              html: true,
              message: `<h3>Salvando imagem...</h3><p><b>Progresso: ${progress.toFixed(0)}%</b></p>`
            })
            if(progress == 100) {
              Loading.hide()
            }
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;

              // ...

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
            Loading.hide()

          },
          async () => {
            // Upload completed successfully, now we can get the download URL
            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              let itemPage = his.listaPages.find(v => v.id == id)
              itemPage.data.lista[index-1].midia = downloadURL

              let val = {
                collection: collection,
                id: id,
                data: itemPage.data
              }
              his.updateDocs(val)
            });
            Loading.hide()

          })
      }
    },
    async sendHttpCall(payload) {
      const send = httpsCallable($functions, payload.functions);
      return await send(payload.data).then((result) => {
        const data = result.data;
        console.log('sendHttpCall', data)
        return data
      });
    },
    onLoadCollections(payload) {
      const q = query(collection($firestore, payload.collection))
      return onSnapshot(q, (snapshot) => {
        let lista = [];
        snapshot.docChanges().forEach((change) => {
          let val = {
            collection: payload.collection,
            id: change.doc.id,
            data: change.doc.data()
          }
          if (change.type === "added") {
            this.added(val)
          }
          if (change.type === "modified") {
            this.modified(val)
          }
          if (change.type === "removed") {
            this.removed(val)
          }
        });
        return lista
      })
    },
    async added(payload) {
      let lista = await this.verificaCollections(payload)
      let i = lista?.find(v => v.id == payload.id)
      if(!i) {
        lista.push(payload)
      }
    },
    async modified(payload) {
      let lista = await this.verificaCollections(payload)

      for (let i = 0; i < lista.length; i++) {
        const element = lista[i];
        if (element.id === payload.id) {
          lista.splice(i, 1, payload)
        }
      }
    },
    async removed(payload) {
      let lista = await this.verificaCollections(payload)
      for (let i = 0; i < lista.length; i++) {
        const element = lista[i];
        if(element.id === payload.id) {
          lista.splice(i, 1);
        }
      }
    },
    async verificaCollections(payload) {
      switch (payload.collection) {
        case 'suporte':
          return this.listaContatoSuporte
        case 'pages':
          return this.listaPages
        case 'suporte-info':
          return this.infoContatoSuporte
        case 'faixa-paralax':
          return this.bannerFaixaParalax
        case 'banner-home':
          return this.bannerHome
        case 'banner-produto':
          return this.bannerProduto
        case 'banner-institucional':
          return this.bannerInstitucional
        case 'banner':
          return this.banner
        case 'produtos':
          return this.listaProdutos
        case 'site':
          return this.listaSite
        default:
          break;
      }
    },
    setResultados(lista) {
      this.resultados = lista
    },
    async getAdmin() {

      if(!this.currentUser) {
        return null
      }

      const userUid = this.currentUser?.uid
      const docRef = doc($firestore, 'admin', userUid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.admin = docSnap.data()
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    },
    setPages(payload) {
      this.pageSelect = payload
    },
    setSite(payload) {
      this.siteSelect = payload
      this.pageSelect = null
    },
    setToggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    onWhatsapp(phoneNumber) {
      openURL(`https://api.whatsapp.com/send?phone=55${phoneNumber}`);
    },
    setSocial() {
      let val = {
        collection: 'social',
        id: this.listaSocial.id,
        data: this.listaSocial.data
      }
      this.updateDocs(val)
    },
    async getSocial() {
      const docRef = doc($firestore, "social", "U3owsRrAl3pK96bLVKMr");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let val = {
          id: docSnap.id,
          data: docSnap.data()
        }
        this.listaSocial = val
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    },
    setCategoria(payload) {
      this.isCategoria = payload
    }
  },
});
