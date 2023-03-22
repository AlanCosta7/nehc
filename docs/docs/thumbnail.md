O firebase possui uma extenção que redimensiona imagens automaticamente. Para guardar o link e utilizar em sua aplicação, criamos uma função (_**generateThumbnail**_) que observa a gravação no storage. A função aguarda seis tamanhos de imagens que devem ser configurada na extensão do firebase.

Tamanhos: 30x30, 100x100, 200x200, 400x400, 600x600, 800x800

Ao enviar a imagem para a function _**uploadPhotoURL**_ você deverá enviar um objeto com os seguintes parâmetros:

* collectionName: Nome da collection onde a imagem deverá ser salva
* id: Id do documento
* files: imagem
* type: Tipo de imagem (foto, perfil, capa...)

Esses parâmetros são importantes para que a function _**generateThumbnail**_ consiga guardar a imagem corretamente.
