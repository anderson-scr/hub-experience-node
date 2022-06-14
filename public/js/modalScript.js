function openModal(evt, ins = 2, total = 3) {
  if(ins >= total) {
    return alert("As vagas acabaram")
  }

  fetch(`/getPalestraModal/` + evt.target.className, { method: "GET" })
    .then(response => response.json())
    .then(data => createModal(data))
}
function createModal(cardi) {
  new Modal(cardi["data"]["0"])
}


document.addEventListener("DOMContentLoaded", () => {
  if(getMobileOperatingSystem()) {
    const cardis = document.querySelectorAll(".card-front")
    cardis.forEach(card => {
      card.addEventListener("touchstart", evt => openModal(evt))
    })
  }
})

function getMobileOperatingSystem() {
  let userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return true;
  }
}

class Modal {
  constructor(infoCard) {
    this.infoCard = infoCard
    this.trocarPalestra = `Você já se inscreveu na palestra ${this.infoCard["titulo_palestra"]}.<br> Deseja alterar sua inscrição?`
    this.modalHtml = `<div id="div-modal" class="modal">
    <section id="containnerModalUnico"></section>
    <div id="gradient">
      <div class="modal_content">
        <div class="containnerSetinha" id="containnerSetinhaCima">
          <img src="/assets/Svgs/arrow-down.svg" alt="Seta cima" id="setinhaCima" class="seta">
        </div>
        
        <!-- Parte direita do modal -->
        <div id="containnerImg">
          <div id="containnerImgSocial">
            <h2>${this.infoCard["nome_palestrante"]}</h2>
            <p>${this.infoCard["sub_info_palestrante"]}</p>
            <div id="containnerSocial">
              <a href="${this.infoCard["instagram_palestrante"]}" target="_blank">
                <img src="/assets/Svgs/instagram.svg" alt="Icone instragram" id="imgSocial">
              </a>
              <a href="${this.infoCard["linkedin_palestrante"]}" target="_blank">
                <img src="/assets/Svgs/linkedin.svg" alt="Icone Linkedin" id="imgSocial">
              </a>
            </div>
            <img src="./${this.infoCard["img_palestrante"]}" class="imgModal h${this.infoCard["id_palestra"]}" alt="Foto palestrante">
            <div id="fade${this.infoCard["id_palestra"]}" class="imgModal${this.infoCard["id_palestra"]} fotoFadeModal${this.infoCard["id_palestra"]}"></div>
          </div>
  
          <div class="containnerInformacoes">
            <h3>${this.infoCard["titulo_palestra"]}</h3>
            <div class="containnerSalaAndar">
              <p><strong>${this.infoCard["nome_sala"]}</strong></p>
            </div>
              <p><strong>${this.infoCard["andar_sala"]}</strong></p>
            <div id="paragrafo">
              ${this.infoCard["descricao_palestra"]}
            </div>
            <div class="espacoExtra"></div>
          </div>
  
        </div>
        <!-- Parte direita do modal -->
  
  
  
        <!-- Parte do form do modal -->
        <form>
  
          <p>Formulario de Inscrição</p>
          <!-- campo nome -->
          <div class="espaco">
            <div class="wrapper">
              <div class="input-data">
                <input type="text" name="nome" id="iptNome" required>
                <legend class="alertaPreencher" id="alertaPreencheriptNome">Preencha o campo corretamente.</legend>
                <label>Nome</label>
              </div>
            </div>
          </div>
  
  
  
          <!-- campo cpf -->
          <div class="espaco">
            <div class="wrapper">
              <div class="input-data">
                <input type="text" name="cpf" id="iptCpf" maxlength="14" required>
                <legend class="alertaPreencher" id="alertaPreencheriptCpf">Preencha o campo corretamente.</legend>
                <label>CPF</label>
              </div>
            </div>
          </div>
  
  
  
          <!-- campo data de nascimento -->
          <div class="espaco">
            <div class="wrapper">
              <div class="input-data">
                <input type="text" name="data_nasc" id="iptNasc" maxlength="10" required>
                <legend class="alertaPreencher" id="alertaPreencheriptNasc">Preencha o campo corretamente.</legend>
                <label>Data de Nascimento</label>
              </div>
            </div>
          </div>
  
  
  
          <!-- campo e-mail -->
          <div class="espaco">
            <div class="wrapper">
              <div class="input-data">
                <input type="email" id="iptEmail" required>
                <legend class="alertaPreencher" id="alertaPreencheriptEmail">Preencha o campo corretamente.</legend>
                <label>E-mail</label>
              </div>
            </div>
          </div>
  
  
  
          <!-- select sexo -->
          <div class="espaco">
            <div>
              <select name="select" class="sexo" id="selectSexo" required="">
                <option selected disabled>Sexo</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
              <legend class="alertaPreencher" id="alertaPreencherselectSexo">Preencha o campo corretamente.</legend>
            </div>
          </div>
  
  
  
          <!-- campo telefone -->
          <div class="espaco">
            <div class="wrapper">
              <div class="input-data">
                <input type="text" name="telefone" id="iptTelefone" maxlength="15" required>
                <legend class="alertaPreencher" id="alertaPreencheriptTelefone">Preencha o campo corretamente.</legend>
                <label>Telefone</label>
              </div>
            </div>
          </div>
  
  
  
          <!-- check box -->
          <div class="espaco_menor">
            <div class="check_box">
              <label class="containerChecks">
                <div class="containnerCheckzinho">
                  <input type="checkbox" id="check1" required>
                  <span class="checkbox"></span>
                </div>
                <div class="termo">
                  <h6>Ao enviar este formulário, você permite que seus dados pessoais sejam processados em nossas plataformas educacionais.</h6>
                </div>
              </label>
            </div>
            <legend class="alertaPreencher" id="alertaPreencherCheck">Preencha o campo corretamente.</legend>
            </div>
              <div class="espaco_menor">
                <div class="check_box">
                  <label id="containerChecks">
                    <div class="containnerCheckzinho">
                      <input type="checkbox" id="check2" required>
                      <span class="checkbox"></span>
                    </div>
                    <div class="termo">
                      <h6>Você concorda em receber informações a respeito de cursos relacionados ao Senac.</h6>
                    </div>
                  </label>
                </div>
              </div>
            <div>
              <div class="espaco" id="containnerBotoesModal">
                <div id="botoes">
                  <div id="cancelar_div">
                    <button class="btn_cancelar" id="cancelar">Cancelar</button>
                  </div>
                  <div id="enviar_div">
                    <button class="btn_enviar" id="enviar">Enviar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <!-- Parte do form do modal -->
  
        <div class="containnerSetinha" id="containnerSetinhaBaixo">
          <img src="/assets/Svgs/arrow-down.svg" alt="Seta baixo" id="setinhaBaixo" class="seta">
        </div>
  
      </div>
    </div>
  </div>`

  this.segundoModal = `
                        <div class="modal_aviso" id="aviso">
                          <div class="modal_content_aviso">
                              
                            <!-- cabeça do aviso -->
                            <div class="head_modal_aviso">
                              <h1 class="atencao">PARABÉNS!</h1>
                            </div>

                            <!-- corpo do aviso -->
                            <div class="body_modal_aviso">
                              <p>Você se inscreveu na palestra<br><strong> ${this.infoCard["titulo_palestra"]}</strong>.<br>O evento acontecerá dia 22/06 as 19hrs!<br>Te esperamos lá!</p>
                            </div>


                            <!-- rodape do aviso/botoes -->
                            <div class="footer_modal_aviso">
                              <div id="sim_div">
                                <button class="btn_sim modalzinhoBtn" id="sim">Ok</button>                       
                              </div>
                            </div>

                          </div>
                        </div>`
  this.abrir()
  }


//   <input onkeypress="return mask(event, this, '(##) ####-####')" maxlength="14" placeholder=" (DDD) 0000-0000">
// <input onkeypress="return mask(event, this, '##/##/####')" maxlength="10" placeholder="dd/mm/aaaa">
// <input onkeypress="return mask(event, this, '###.###.###-##')" maxlength="14" placeholder="000.000.000-00"></input>


  abrir() {
    let modal = document.querySelector("#containnerModal");
    
    if (typeof modal == 'undefined' || modal == null) return
  
    modal.innerHTML = this.modalHtml;
    document.querySelector("body").style.overflow = "hidden"
    
    this.mostraEscondeSetinha()
    const btnEnviar = document.querySelector("#enviar")
    const btnCancelar = document.querySelector("#cancelar")
    const iptNasc = document.querySelector("#iptNasc")
    const iptCpf = document.querySelector("#iptCpf")
    const iptTelefone = document.querySelector("#iptTelefone")

    
    btnEnviar.addEventListener("click", evt => this.verificaEntrada(evt))
    btnCancelar.addEventListener("click", evt => this.closeModal(evt))
    iptNasc.addEventListener("keypress", evt => this.mask(evt, iptNasc, '##/##/####'))
    iptCpf.addEventListener("keypress", evt => this.mask(evt, iptCpf, '###.###.###-##'))
    iptTelefone.addEventListener("keypress", evt => this.mask(evt, iptTelefone, '(##) #####-####'))
  }




  mask(e, id, mask){
    let tecla=(window.event)? e.keyCode:e.which;   
    if((tecla>47 && tecla<58)){
        this.mascara(id, mask);
        return true;
    } 
    else{
        if (tecla==8 || tecla==0){
            mascara(id, mask);
            return true;
        } 
        else  return false;
    }
  }
  mascara(id, mask){
      var i = id.value.length;
      var carac = mask.substring(i, i+1);
      var prox_char = mask.substring(i+1, i+2);
      if(i == 0 && carac != '#'){
          insereCaracter(id, carac);
          if(prox_char != '#')insereCaracter(id, prox_char);
      }
      else if(carac != '#'){
          insereCaracter(id, carac);
          if(prox_char != '#')insereCaracter(id, prox_char);
      }
      function insereCaracter(id, char){
          id.value += char;
      }
  }

  closeDoubleModal(containnerModalzinhoo) {
    let modal = document.querySelector("#containnerModal");

    document.querySelector(".modalzinhoBtn").addEventListener("click", () => {
      containnerModalzinhoo.innerHTML = ''
      modal.innerHTML = '';
      document.querySelector("body").style.overflow = "visible"
      window.location.reload();
    })
  }

  closeModal(evt) {
    evt.preventDefault()

    let modal = document.querySelector("#containnerModal");
    if (typeof modal == 'undefined' || modal == null) return
  
    modal.innerHTML = '';
    document.querySelector("body").style.overflow = "visible"
  }

  verificaEntrada(evt) {
    evt.preventDefault()
    const respostas = {
      iptNome: document.querySelector("#iptNome").value,
      iptCpf: document.querySelector("#iptCpf").value,
      iptNasc: document.querySelector("#iptNasc").value,
      iptEmail: document.querySelector("#iptEmail").value,
      selectSexo: document.querySelector("#selectSexo").value,
      iptTelefone: document.querySelector("#iptTelefone").value,
      checkUsoInfo: document.querySelector("#check1").checked,
      checkRecebeEmail: document.querySelector("#check1").checked,
      id_palestra: this.infoCard["id_palestra"]
    }
    const legends = [
                      document.querySelector("#alertaPreencheriptNome"), 
                      document.querySelector("#alertaPreencheriptCpf"), 
                      document.querySelector("#alertaPreencheriptNasc"),
                      document.querySelector("#alertaPreencheriptEmail"),
                      document.querySelector("#alertaPreencherselectSexo"),
                      document.querySelector("#alertaPreencheriptTelefone"),
                      document.querySelector("#alertaPreencherCheck") 
                    ]


    legends.forEach(valor => valor.style.visibility  = "hidden")

    console.log(respostas)
    if(respostas["iptNome"] === '') {
      document.querySelector("#alertaPreencheriptNome").style.visibility = "visible"
      return
    }

    let letraCPF = false
    for(let n of respostas["iptCpf"]) {
      if(parseInt(n) == NaN && n !== "." && n !== "-") {
        letraCPF = true
      }
    }
    if(respostas["iptCpf"] == '' || letraCPF || respostas["iptCpf"].length < 11 ) {
      document.querySelector("#alertaPreencheriptCpf").style.visibility = "visible"
      return
    }



    let letraNasc = false
    for(let n of respostas["iptNasc"]) {
      if(parseInt(n) == NaN && n !== "/") {
        letraNasc = true
      }
    }
    if(respostas["iptNasc"] == '' || letraNasc || respostas["iptNasc"].length < 8 ) {
      document.querySelector("#alertaPreencheriptNasc").style.visibility = "visible"
      return
    }



    if(respostas["iptEmail"] == '') {
      document.querySelector("#alertaPreencheriptEmail").style.visibility = "visible"
      return
    }
    if(respostas["selectSexo"] == 'Sexo') {
      document.querySelector("#alertaPreencherselectSexo").style.visibility = "visible"
      return
    }

    if (!document.querySelector("#check1").checked) {
      document.querySelector("#alertaPreencherCheck").style.visibility = "visible"
      return
    }


    const idCpf = respostas["iptCpf"]
    fetch(`/getCpfInscricao/` + idCpf, { method: "GET" })
      .then(response => response.json())
      .then(data => { this.updataOuInsere(data, respostas)})
  }

  updataOuInsere(info, todasRespostas) {

    if(info["data"].length > 0) {
      console.log("Tenho cadastro")

      fetch(`/atualizaCadastro`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          cpf: todasRespostas["iptCpf"],
          palestra: todasRespostas["id_palestra"]
        })
      })

      const containnerModalzinho = document.querySelector("#containnerModalUnico")
      containnerModalzinho.innerHTML = this.segundoModal
      this.closeDoubleModal(containnerModalzinho)

    } else {
      console.log("Nao tenho cadastro")
      console.log(todasRespostas)

      fetch(`/novoCadastro`, {
        headers: {
          'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(todasRespostas)
      })

      .then('', this.insereInscricao(todasRespostas["iptCpf"], todasRespostas["id_palestra"]))


      const containnerModalzinho = document.querySelector("#containnerModalUnico")
      containnerModalzinho.innerHTML = this.segundoModal
      this.closeDoubleModal(containnerModalzinho)
      }
  }

  insereInscricao(cpf, idPale) {
    fetch('/insereInscricao', {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        cpf: cpf,
        palestra: idPale
      })
    })
  }


  mostraEscondeSetinha() {
    const setinhaBaixo = document.querySelector("#setinhaBaixo")
    const setinhaCima = document.querySelector("#setinhaCima")

    setinhaCima.style.visibility = "hidden"
    setinhaBaixo.style.visibility = "visible"

    const scrollCampo = document.querySelector("#containnerImg")
  
    scrollCampo.addEventListener("scroll", () => {
      if (scrollCampo.offsetHeight + scrollCampo.scrollTop >= scrollCampo.scrollHeight) {  
        setinhaBaixo.style.visibility = "hidden"
      } else {
        setinhaBaixo.style.visibility = "visible"
      }
  
      if (scrollCampo.scrollTop == 0) {  
        setinhaCima.style.visibility = "hidden"
      } else {
        setinhaCima.style.visibility = "visible"
      }
    })
  }

}
