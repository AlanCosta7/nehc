# Instalação

Para utilizar o sistema de pagamento via Mercado Pago basta configurar as variaveis de ambiente com o valor do access token com o parâmetro MERCADO_PAGO_ACCESS_TOKEN


### Criar um cliente
Crie um cliente com todos os seus detalhes para que você possa salvar os cartões que eles usam e simplificar o processo de pagamento.

Exemplo:

    {
      function: 'createCustomers',
      value: {
        email: 'teste@teste.com', // E-mail do cliente
        first_name: 'João', // Nome do cliente
        last_name: 'Silva', // Sobrenome do cliente
        phone: {
          area_code: '21',
          number: '999999999', // Telefone do cliente (area_code, number)
        },
        identification: {
          type: 'CPF',
          number : '12312312312', // Informações sobre a identificação do cliente (type, number)
        },
        default_address: 'Casa', // Endereço padrão do cliente
        address: {
          id: '123123',
          zip_code: '25240010',
          street_name: 'Rua C',
          street_number: '10',
        },
        date_registered: '2021-10-20T11:37:30.000-04:00', // Data de registo do cliente
        default_card: 'None', // Cartão padrão do cliente
        description: 'Description del user', // Descrição do cliente
        uid: '45j34g25jg4hgk252g3k',
      }
    }


### Gerar um pagamento com cartão ou pix

    {
      function: 'createPayment',
      value: {
        collectionName: 'produtos',
        pedido: [
         {
          id: '3j5hk34j5l34j652',
         },
         {
          id: '6nj57l5j7bl4j567',
         }
        ],
        taxa: 2,
        token: 'jfdhvuavdjvbapdsuvbdvbqp',
        description: 'Televisão black friday',
        installments: '2',
        paymentMethodId: 'cartão', // ou 'pix'
        issuerId: '24',
        payer: {
          first_name: "João",
          last_name: "Silva",
          phone: {
            area_code: 11,
            number: "987654321"
          },
          address: {}
        },
        uid: '5h3b4o5h34g56h34g25jh34l2',
        cupom: 'BLACKFRIDAY'
      }
    }

### Webhook do pagamento
Webhook mercadoPago é uma rota que recebe notificações do Mercado Pago sempre que há uma atualização no status do pagamento. Assim é possível manipular e gravar os dados do pagamento para autorizar uma entrega de produto... por exemplo.
O Webhook mercadoPago está configurado para atualizar a collection _invoice_ que por padrão é onde fica salvo os dados do pagamento quando é realizado uma compra.
Para registrar o Webhook é necessário acessar o dashboard do mercado pago, integrações e notificações:

[https://www.mercadopago.com.br/developers/panel/notifications?id=xxxxxxxxxxxx](https://www.mercadopago.com.br/developers/panel/notifications?id=)

    https://[região]-[id do projeto].cloudfunctions.net/mercadoPago


### Sistema de comunicação com o Mercado Pago
Com apenas uma única funcão você consegue enviar o caminho e os dados para pegar informação, criar, atualizar e deletar. Veja a baixo uma lista de modelos de objetos para fazer a requisição correta com o Mercado Pago.

Modelo de todas as chamadas para a function do Mercado Pago

    {
      function: 'mercadoPago',
      value: {
        url: '',
        method: '',
        data: {
        }
      }
    }


### Cancelar uma compra de um pagamento específico

    {
      function: 'mercadoPago',
      value: {
        url: 'v1/payments/{payment_id}',
        method: 'PUT',
        data: {
          status: 'cancelled',
        }
      }
    }

obs: payment_id é o id do pagamento

### Encontre todas as informações do cliente através de filtros específicos.

    {
      function: 'mercadoPago',
      value: {
        url: 'v1/customers/search?email={email}',
        method: 'GET',
      }
    }

obs: Buscar pelo email do cliente

### Veja todas as informações de um cliente a partir da sua identificação.

    {
      function: 'mercadoPago',
      value: {
        url: 'v1/customers/{id}',
        method: 'GET',
      }
    }

obs: Buscar pelo id do cliente


## Atualize os dados de um cliente. Indique o ID do cliente e envie as informações que você deseja atualizar.


    {
      function: 'mercadoPago',
      value: {
        url: 'v1/customers/${id}',
        method: 'PUT',
        data: {
          email: "jhon@doe.com",
          first_name: "Jhon",
          last_name: "Doe",
          phone: {
            area_code: "55",
            number: "991234567"
          },
          identification: {
            type: "CPF",
            number: "12345678900"
          },
          default_address: "Home",
          address: {
            id: "123123",
            zip_code: "01234567",
            street_name: "Rua Exemplo",
            street_number: 123
          },
          date_registered: "22021-10-20T11:37:30.000-04:00",
          description: "Description del user",
          default_card: "None"
        }
      }
    }

obs: Passe o id do cliente e os dados que deseja atualizar


### Consulte todas as formas de pagamento disponíveis e obtenha uma lista com os detalhes de cada uma delas e suas propriedades.

    {
      function: 'mercadoPago',
      value: {
        url: 'v1/payment_methods',
        method: 'GET',
      }
    }

### Para criar ou atualizar o token necessário para operar seu aplicativo em nome de um vendedor.

    {
      function: 'mercadoPago',
      value: {
        url: 'v1/payment_methods',
        method: 'POST',
        data: {
          client_secret: "client_secret",
          client_id: "client_id",
          grant_type: "authorization_code",
          code: "TG-XXXXXXXX-241983636",
          redirect_uri: redirect_uri,
          refresh_token: refresh_token
        }
      }
    }

### Veja todas as informações de operações contestadas de seu produto ou serviço com a identificação do estorno que você deseja.

    {
      function: 'mercadoPago',
      value: {
        url: 'v1/chargebacks/{id}', // Identificador único do estorno
        method: 'GET',
      }
    }

### Criar um reembolso parcial/total para um pagamento específico. Se o campo amount estiver preechido, será criado um reembolso parcial, caso contrário, se criará um reembolso total.

    {
      function: 'mercadoPago',
      value: {
        url: 'v1/payments/{id}/refunds', // Identificador único do estorno
        method: 'POST',
        data: {
          amount: amount // Valor a ser reembolsado
        }
      }
    }

### Consultar todos os reembolsos para um pagamento específico.

    {
      function: 'mercadoPago',
      value: {
        url: 'v1/payments/${id}/refunds', // Identificador único do estorno
        method: 'GET',
      }
    }

### Consultar reembolso específico de determinado pagamento.

    {
      function: 'mercadoPago',
      value: {
        url: 'v1/payments/${id}/refunds/${refund_id}', // Identificador único do estorno e do reembolso
        method: 'GET',
      }
    }

### Armazena com segurança em nossos servidores a referência a um cartão utilizado pelo cliente no pagamento para evitar pedir todos os dados em transações futuras.

    {
      function: 'mercadoPago',
      value: {
        url: 'v1/customers/{customer_id}/cards', // Customer's Id
        method: 'POST',
        data: {
          token: token
        }
      }
    }


### Consulte a lista de cartões armazenados de um cliente a fim de mostrá-los no momento de fazer um pagamento.

    {
      function: 'mercadoPago',
      value: {
        url: 'v1/customers/{customer_id}/cards', // Customer's Id && Card's Id
        method: 'GET',
      }
    }


### Consultar as informações de referência de um cartão armazenado associado a um cliente.

    {
      function: 'mercadoPago',
      value: {
        url: 'v1/customers/{customer_id}/cards/{id}', // Customer's Id && Card's Id
        method: 'GET',
      }
    }

### Atualize os dados de um cartão associado a um cliente. Indique o ID e envie as informações que você deseja atualizar.

    {
      function: 'mercadoPago',
      value: {
        url: 'v1/customers/{customer_id}/cards/{id}', // Customer's Id && Card's Id
        method: 'PUT',
        data: {
          token: token
        }
      }
    }

### Exclua a referência a um cartão associado ao cliente sempre que for necessário.

    {
      function: 'mercadoPago',
      value: {
        url: 'v1/customers/{customer_id}/cards/{id}', // Customer's Id && Card's Id
        method: 'DELETE',
      }
    }

### Veja todos os tipos de documentos disponíveis por país e obtenha uma lista com a identificação e detalhes de cada um deles.

    {
      function: 'mercadoPago',
      value: {
        url: 'v1/identification_types',
        method: 'GET',
      }
    }
