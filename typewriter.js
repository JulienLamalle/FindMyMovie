const txtAnim = document.querySelector('h1');

new Typewriter(txtAnim , {
  deleteSpeed: 20
})
.typeString('Bonjour !')
.pauseFor(300)
.deleteChars(9)
.typeString('Bienvenue')
.pauseFor(300)
.typeString(' sur <span class="font-weight-bold">FindMyMovie</span> !')
.start()
