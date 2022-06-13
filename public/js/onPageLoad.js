document.addEventListener("DOMContentLoaded", () => {
  menuScroll()


  setTimeout(function(){
    const texto1 = document.querySelector(".textImpact")
    const texto2 = document.querySelector(".textDatePlace")
    const cubao = document.querySelector("#campoDo3D")

    texto1.style.opacity = "1"
    texto2.style.opacity = "1"
    cubao.style.opacity = "1" 
 }, 500);

  fetch("/qnt_inscritoGrande", {method: "GET"})
   .then(result => result.json())
   .then(data => {
     console.log("oiiie")
     console.log(data)
     const vagas = document.querySelector(".vagaGrande")
     vagas.textContent = `${data["data"][0]["qnt_inscricao"]}/150`
  })

  if(iOS()) {
    addClickOpenModal()
  }
})

function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.userAgent)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

function addClickOpenModal() {
  const todosCards = document.querySelectorAll(".card-front")
  todosCards.forEach(card, () => {
    card.addEventListener("touchstart", () => {
      openModal()
    })
  })
}

function menuScroll() {
  const botoes = document.querySelectorAll(".btnNav")
  window.addEventListener("scroll", () => {
    window.scrollY > 550? botoes.forEach(botao => botao.style.color = "var(--blue)") : botoes.forEach(botao => botao.style.color = "#fff")
  })
}