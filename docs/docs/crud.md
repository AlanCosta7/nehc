# CRUD - Criar, Ler, Atualizar e Deletar

O firestore é estruturado da seguinte maneira:

* **collection** : Nome da tabela onde os documentos são salvos.

* **doc** : Documento onde os dados são salvos. Geralmente usamos um id para referenciar um documento.

## Salvar dados em uma colletion
Para salvar um conjunto de dados no banco de dados é necessário formatar um objeto da seguinte maneira:

Exemplo:

    {
      function: 'saveDoc',
      value: {
        collectionName: 'cliente',
        id: '123456',
        dados: {
          nome: 'João'
        }
      }
    }

O campo _function_ recebe o nome da funcão _saveDoc_ no backend que salva os dados no banco de dados.
O campo _collectionName_ recebe o nome da tabela.
O campo _'id'_ é opcional. Se você não preenche o campo id o back-end criará um id para você.
O campo _dados_ é o objeto que será salvo.


## Salvar dados em uma sub collections
Às vezes é necessário criar uma collection dentro de outra collection. Nesse caso basta passar o nome da subcollection no campo _subCollectionName_.

Exemplo:

    {
      function: 'saveSubDoc',
      value: {
        collectionName: 'assinante',
        subCollectionName: 'cliente',
        id: '123456',
        dados: {
          nome: 'João'
        }
      }
    }


## Ler dados em uma collection
### É possível pegar todos os dados de uma collection, ou um documento específico, dados de uma subcollection, ou fazendo consultas simples ou compostas.

Pega dados de um documento específico:

Exemplo:

    {
      function: 'getDoc',
      value: {
        collectionName: 'assinante',
        id: '123456',
      }
    }


Pega todos os dados de uma collection com paginação

Exemplo:

    {
      function: 'getAllCollection',
      value: {
        collectionName: 'assinante',
        lastVisible: 'wrtygcv',
        limit: 50,
      }
    }

Por padrão o back-end está configurado para retornar no máximo 50 resultados. Depois da primeira consulta o objeto retornará um campo chamado _lastVisible_ que é um marcador do ultimo dado retornado na paginação. Para buscar mais dados basta enviar o _lastVisible_ no corpo da requisição para pegar dados a partir da marcação. O campo _limit_ é personalizado e defini quantos objetos retornará na busca.


Pega todos os dados de uma subcollections com paginação.

Exemplo:

    {
      function: 'getSubDoc',
      value: {
        collectionName: 'assinante',
        subCollectionName: 'cliente'
        id: '123456'
        lastVisible: 'wrtygcv',
        limit: 50,
      }
    }


Pega dados de uma collection com consulta simples e paginação

Exemplo:

    {
      function: 'getSubDoc',
      value: {
        collectionName: 'assinante',
        lastVisible: 'wrtygcv',
        limit: 50,
        campo: 'banco',
        arg: '=',
        val: 'Nubank'
      }
    }

Para fazer uma consulta simples basta enviar o nome do campo que deseja consultar, o tipo de consulta e o valor esperado.
No exemplo acima o resultado será todos os assinantes que possuem como banco o nubank.


Pega dados de uma collection com consulta composta (dois parâmetros) e paginação

Exemplo:

    {
      function: 'getCompostaCollection',
      value: {
        collectionName: 'assinante',
        subCollectionName: 'cliente'
        lastVisible: 'wrtygcv',
        limit: 50,
        campo1: 'banco',
        arg1: '=',
        val1: 'Nubank',
        campo2: 'likes',
        arg2: '>',
        val2: '1000',
      }
    }


## Atualizar dados em um documento

Exemplo:

    {
      function: 'updateDoc',
      value: {
        collectionName: 'cliente',
        id: '123456',
        dados: {
          nome: 'João Silva'
        }
     }
    }


## Atualizar dados em um SubDocumento

Exemplo:

    {
      function: 'updateSubDoc',
      value: {
        collectionName: 'assinante',
        subCollectionName: 'cliente'
        id: '123456',
        subId: '654321',
        dados: {
          nome: 'João Silva'
        }
      }
    }


## Deleta um documento

Exemplo:

    {
      function: 'deleteDoc',
      value: {
        collectionName: 'assinante',
        id: '123456',
      }
    }


## Deleta um SubDocumento

Exemplo:

    {
      function: 'deleteSubDoc',
      value: {
        collectionName: 'assinante',
        subCollectionName: 'cliente'
        id: '123456',
        subId: '654321',
      }
    }


## Atualizar elementos em uma matriz (lista)

Exemplo:

    {
      function: 'updateItemArray',
      value: {
        collectionName: 'assinante',
        id: '123456',
        nameDados: 'Lista_endereco',
        dados: [{Rua: 'Silva'}]
      }
    }

Para atulizar uma matriz basta enviar o nome da matriz no campo _nameDados_ e os dados a serem atualizados no campo _dados_.


## Deletar elementos em uma matriz (lista)

Exemplo:

    {
      function: 'deleteItemArray',
      value: {
        collectionName: 'assinante',
        id: '123456',
        nameDados: 'Lista_endereco',
        dados: [{Rua: 'Silva'}]
      }
    }


## Incrementa valor em um documento
Incrementa um valor numérico a um campo se o valor for positivo e decrementa um valor se for negativo

Exemplo:

    {
      function: 'increment',
      value: {
        collectionName: 'assinante',
        id: '123456',
        nameDados: 'credito',
        dados: 100
      }
    }
