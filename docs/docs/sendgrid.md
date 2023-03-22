Sendgrid é um serviço de envio de emails facilmente configurável. Para usar basta cadastrar nas variaveis de ambiente a chave e email.

SENDGRID_KEY= ''

EMAIL= ''

### Envia email para um grupo de usuários


    {
      function: 'sendGroup',
      value: {
        group: [''],
        assunto: '',
        message: '',
        collectionName: '',
        arg: '',
        campo: ''
      }
    }

**collectionName**: Nome da collections onde buscaremos o grupo

**campo**: Nome do campo correspondente ao grupo

**arg**: Argumento para corresponder ao grupo

**assunto**: Assunto do email

**message**: Mensagem do corpo do email

**group**: Lista de grupos que será consultado no banco de dados



Exemplo: Vamos enviar um email para todos os alunos de um curso. O nome do curso é matemática.


    {
      function: 'sendGroup',
      value: {
        group: ['matematica'],
        assunto: 'Seja bem vindo',
        message: 'Seja bem vindo ao curso de matemática',
        collectionName: 'cursos',
        arg: '==',
        campo: 'nome_curso'
      }
    }


### Envia email para todos os usuários

    {
      function: 'sendEmail',
      value: {
        assunto: 'Seja bem vindo',
        message: 'Seja bem vindo ao nosso curso',
      }
    }
