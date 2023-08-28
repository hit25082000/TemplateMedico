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

const Cart = {
  cart: Local.get('cart'),  

  LoadCart() {
    console.log(this.cart)

    var cartOffCanvas = document.querySelector('.offcanvas-body');
    var cartIconNotification = document.querySelector('.cartIconNotification');

    cartOffCanvas.innerHTML = ''

    var countNotification = (count) => gg({
      tag: "span",
      class: "position-absolute top-0 start-100  translate-middle badge rounded-pill bg-danger",
      html: `${count} ${gg({
        tag: 'span',
        class: 'visually-hidden',
        html: 'unread messages'
      })}`
    })

    if (this.cart != null && this.cart.length > 0) {
      cartIconNotification.innerHTML = countNotification(this.cart.length)
    } else {
      cartIconNotification.innerHTML = ""
      this.cart = []
    }

    this.cart.forEach(e => {
      cartOffCanvas.innerHTML +=
        `<div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-md-7">
          <img
            src="${e.imagem}"
            class="img-fluid h-100 rounded-start" alt="imgProduct" style=" object-fit: cover; object-position: left;"
          >
        </div>
        <div class="col-md-5">
          <div class="card-body">
            <h5 class="card-title">${e.nome}
            ${countNotification(e.quantidade)}
          </h5>
            <p class="card-text">${e.valor}</p>
            <button class="btn btn-danger" onclick="Cart.RemoveItem('${e.id}')">Remover</button>
          </div>
        </div>
      </div>
    </div>`
    })
  },

  AddItem(id) {
    var item = Produtos.find(e => e.id == id)   

    if (item.quantidade >= 1) {
      this.cart.find(i => i.id == item.id).quantidade++
    } else {      
      item.quantidade = 1
      this.cart.push(item);      
    }

    Local.set('cart', this.cart)

    this.LoadCart();
  },

  RemoveItem(id) {
    this.cart.forEach(e => {
      if (e.id == id)
        e.quantidade--
      if (e.quantidade < 1)
        this.cart.splice(this.cart.indexOf(e), 1);
    })

    Local.set('cart', this.cart)

    this.LoadCart();
  },
}

const Theme = {

  LightTheme(load, button) {
    document.documentElement.setAttribute('data-bs-theme', 'light');

    load.forEach(function (node) {
      node.style.backgroundColor = "black";
    });

    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="grey" class="bi bi-moon-fill" viewBox="0 0 16 16">
      <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
      </svg>`
  },

  DarkTheme(load, button) {
    document.documentElement.setAttribute('data-bs-theme', 'dark');

    load.forEach(function (node) {
      node.style.backgroundColor = "white";
    });

    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="yellow" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
  <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
  </svg>`
  },

  RenderTheme() {
    var loadAnim = document.querySelectorAll(".loadChild");
    var button = document.getElementById("btnMudarTema");
    var theme = localStorage.getItem('theme');

    if (JSON.parse(theme) == 'dark') {
      this.DarkTheme(loadAnim, button)
    }
    else {
      this.LightTheme(loadAnim, button)
    }
  },

  SwitchTheme() {
    Local.get('theme') == 'dark' ? Local.set('theme', 'ligth') : Local.set('theme', 'dark')

    this.RenderTheme();
  },

}

const App = {
  Init() {
    this.LoadInfo();
    this.LoadHome();
    this.LoadProducts();
    this.LoadAbout();
    this.LoadCache();
  },

  LoadCache() {
    Theme.RenderTheme();
    Cart.LoadCart();
  },

  LoadInfo() {
    const favicon = document.querySelector('[rel=icon]');
    const empresaNome = document.querySelector("#EmpresaNome")
    const empresaIcone = document.querySelector("#empresaIcone")
    const empresaFacebook = document.querySelector("#EmpresaFacebook")
    const empresaInstagram = document.querySelector("#EmpresaInstagram")
    const empresaWhatsApp = document.querySelector("#EmpresaWhatsApp")

    db.collection("Informações").doc("Empresa").get().then((doc) => {
      if (doc.exists) {

        empresaIcone.innerHTML = `<img src="${doc.data().logo}" width="50px">`
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

  LoadProducts() {
    var produtosHtml = document.querySelector('.produtos');

    this.LoadCarrossel();

    db.collection("Produtos").get().then((querySnapshot) => {

      produtosHtml.innerHTML = '';    

      querySnapshot.forEach((doc) => {
        Produtos.push(new Item(doc.id, doc.data().nome, doc.data().valor, doc.data().imagem, doc.data().detalhes))
      });

      Produtos.forEach(e => {

        produtosHtml.innerHTML += `
        <div class="col">
      <div class="card shadow-sm ">
      <img src="${e.imagem}" width="100%" height="100%" xmlns="https://source.unsplash.com/random"
      aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false" alt="">
        <div class="card-body">
        <p class="card-text">${e.detalhes}</p>
        <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
        ${HTML.Modal.btnTrigger(e.id)}
        ${HTML.Item.addToCartBtn(e.id)}
        </div>
        <small class="text-body-secondary">${e.valor}</small>
        </div>
        </div>
        </div>
        </div>

        ${HTML.Modal.itemModal(e)}
        `
      })
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

  LoadHome() {
    var homeHTML = document.querySelector('.home');

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