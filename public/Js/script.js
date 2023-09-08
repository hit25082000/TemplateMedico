const gg = function (a) { var d = "area base br col embed hr img input keygen link meta param source track wbr".split(" "); if (a) { a.style ? a.style = a.style.split("\n").join(" ") : se = 0; a.tag ? se = 0 : a.tag = "div"; var b = "<" + a.tag, c; for (c in a) "tag" != c && "html" != c ? b += " " + c + "='" + a[c] + "'" : se = 0; d.includes(a.tag) ? a = b + "/>" : (b = a.html ? b + (">" + a.html) : b + ">", a = b + ("</" + a.tag + ">")); return a } };
const analytics = firebase.analytics();
const db = firebase.firestore();
var storage = firebase.storage();
var Produtos = []

class Item {
  constructor(id, nome, valor, imagem, detalhes) {
    this.id = id,
    this.nome = nome,
      this.valor = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      this.imagem = imagem,
      this.detalhes = detalhes,
      this.quantidade = 0
  }
}

const HTML = {

  Hero: {
    setHero(html, heroList) {

      var layout = ""

      heroList.forEach((doc) => {
        switch (doc.id) {
          case "Esquerda":
            layout += HTML.Hero.leftHero(doc.data())
            break;
          case "Direita":
            layout += HTML.Hero.rightHero(doc.data())
            break;
          default:
            layout += HTML.Hero.rightHero(doc.data())
            break;
        }

        html.innerHTML = layout;
      });
    },

    leftHero: (hero) => gg({
      tag: "div",
      class: "container col-xxl-8 px-4 py-5",
      html: `<div class="row flex-lg-row-reverse align-items-center g-5 py-5"> 
        ${HTML.Hero.imgHero(hero.imagem) + HTML.Hero.textHero(hero.titulo, hero.descricao)}
        </div>`
    }),

    rightHero: (hero) => gg({
      tag: "div",
      class: "container col-xxl-8 px-4 py-5",
      html: `<div class="row flex-lg-row-reverse align-items-center g-5 py-5"> 
        ${HTML.Hero.textHero(hero.titulo, hero.descricao) + HTML.Hero.imgHero(hero.imagem)}
        </div>`
    }),

    imgHero: (img) => gg({
      tag: "div",
      class: "col-sm-8 col-lg-6",
      html: gg({
        tag: "img",
        class: "d-block rounded-3 mx-lg-auto img-fluid",
        alt: "Bootstrap Themes",
        width: "100%",
        loading: "lazy",
        src: `${img}`
      })
    }),

    textHero: (title, description) => gg({
      tag: "div",
      class: "col-lg-6",
      html: gg({
        tag: "h1",
        class: "display-5 fw-bold text-body-emphasis lh-1 mb-3",
        html: title
      }) +
        gg({
          tag: "p",
          class: "lead",
          html: description
        }) +
        gg({
          tag: "div",
          class: "d-grid gap-2 d-md-flex justify-content-md-start",
          html: `
          <button type="button" class="btn btn-dark btn-outline-primary btn-lg px-4 me-md-2">Comprar</button>
          <button type="button" class="btn btn-outline-secondary btn-lg px-4">Detalhes</button>`
        })
    }),
  },

  Carrossel: {

    setCarrossel(html, items) {

      var slideBtns = ''
      var carrosselItemsHTML = `<div class="carousel-inner">`

      items.docs.forEach((item, i) => {
        var active = (i == 0 ? active = "active" : active = "")

        let textPosition;

        slideBtns += HTML.Carrossel.slideBtns(active, i);

        switch (item.id) {
          case "Esquerda":
            textPosition = "text-start"
            break;
          case "Direita":
            textPosition = "text-end"
            break;
          default:
            textPosition = ""
            break;
        }

        carrosselItemsHTML += HTML.Carrossel.carrosselItems(active, item.data(), textPosition)
      });

      carrosselItemsHTML += HTML.Carrossel.carrosselBtns()

      console.log()

      html.innerHTML = HTML.Carrossel.carrosselBody(slideBtns) + carrosselItemsHTML
    },

    slideBtns(active, index) {
      return `<button type="button" class="${active}" data-bs-target="#myCarousel" data-bs-slide-to="${index}" aria-label="Slide ${index + 1}"></button>`
    },

    carrosselItems(active, data, textPosition) {
      return `
      <div class="carousel-item ${active}">
        <img src="${data.imagem}" width="100%" xmlns="https://source.unsplash.com/random"aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false" alt="">
        <div class="container">
          <div class="carousel-caption ${textPosition}">
            <h3 style="color:white;">${data.titulo}</h3>
            <p style="color:white;">${data.descricao}</p>
            <p><a class="btn btn-primary" href="#">Compre Ja!</a></p>
          </div>
        </div>
      </div>`
    },

    carrosselBtns() {
      return `
      </div> 
      <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>`
    },

    carrosselBody: (slideBtns) => gg({
      tag: "div",
      class: "carousel-indicators",
      html: `${slideBtns}`
    })
  },

  Modal: {
    itemModal(item) {
      return modalItem = ` 
        <div class="modal fade" id="${item.id}" tabindex="-1" aria-labelledby="${item.id}Label" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="${item.id}Label">${item.nome}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              <img class="rounded" src="${item.imagem}" width="100%" xmlns="https://source.unsplash.com/random"aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false" alt="">
              <div class="border outline-black m-1 rounded p-2">
              <h5>Detalhes Tecnicos</h5>
              <p>Peso:</p>
              <p>Altura:</p>
              <p>Medida Profissional</p>
              </div>
              </div>
              <div class="modal-footer">
                ${HTML.Item.addToCartBtn(item.id)}
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              </div>
            </div>
          </div>
        </div> `
    },


    btnTrigger(itemModal) {
      return `<button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#${itemModal}">
              Detalhes
            </button>`
    }
  },

  Item: {
    addToCartBtn(id) {
      return `
      <button type="button" class="btn btn-sm btn-outline-secondary" onclick="Cart.AddItem('${id}')" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling">Comprar</button>`
    }
  }
}

const Local = {
  get(data) {
    return JSON.parse(localStorage.getItem(data)) || [];
  },

  set(local, data) {
    return localStorage.setItem(local, JSON.stringify(data))
  }

}

const Theme = {

  LightTheme() {
    document.documentElement.classList.remove('dark');
  },

  DarkTheme() {
    document.documentElement.classList.add('dark')      
    document.querySelector("#btnMudarTema").checked = true    
  },

  RenderTheme() {
    var theme = localStorage.getItem('theme');

    if (JSON.parse(theme) == 'dark') {
      this.DarkTheme()
    }
    else {
      this.LightTheme()
    }
  },

  SwitchTheme() {
    Local.get('theme') == 'dark' ? Local.set('theme', 'ligth') : Local.set('theme', 'dark')

    this.RenderTheme();
  },

}

const App = {
  Init() {
    console.log("XD")

    this.LoadCache();
    this.ConfigEmpresa();
    // this.ConfigHome();
    // this.LoadAbout();
  },

  LoadCache() {
    Theme.RenderTheme();
  },

  ConfigEmpresa() {
    const favicon = document.querySelector('[rel=icon]');
    const empresaNome = document.querySelector("#EmpresaNome")
    const empresaIcone = document.querySelector("#EmpresaIcone")
    const empresaFacebook = document.querySelector("#EmpresaFacebook")
    const empresaInstagram = document.querySelector("#EmpresaInstagram")
    const empresaWhatsApp = document.querySelector("#EmpresaWhatsApp")

    db.collection("Informações").doc("Empresa").get().then((doc) => {
      if (doc.exists) {

        empresaIcone.src = doc.data().logo;
        favicon.href = doc.data().logo;
        document.title = doc.data().nome;
        empresaNome.innerHTML = doc.data().nome;
        empresaFacebook.href = doc.data().facebook;
        empresaWhatsApp.href = doc.data().whatsapp;
        empresaInstagram.href = doc.data().instagram;

      } else {
        console.log("Cliente Não Encontrado");
      }

    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  },  

  LoadCarrossel() {
    var carrosselHTML = document.querySelector('.carousel'); 

    db.collection("Carrossel").get().then((querySnapshot) => {

      HTML.Carrossel.setCarrossel(carrosselHTML, querySnapshot)

    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  },

  ConfigHome() {
    var homeHTML = document.querySelector('#home');
    var homeImagem = document.querySelector('#homeImagem');

    db.collection("Inicio").get().then((querySnapshot) => {      

      HTML.Hero.setHero(homeHTML, querySnapshot)

    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  },

  LoadAbout() {
    var aboutHTML = document.querySelector('.about');

    db.collection("Sobre").get().then((querySnapshot) => {

      HTML.Hero.setHero(aboutHTML, querySnapshot)

    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

}

App.Init();