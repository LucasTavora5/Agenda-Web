// Referências do DOM
const form = document.getElementById("form-contato");
const listaContatos = document.getElementById("lista-contatos");
const campoBusca = document.getElementById("busca");

// Carrega contatos ao abrir a página
document.addEventListener("DOMContentLoaded", function () {
  mostrarContatos(""); // Sem filtro, mostra todos
});

// Função para mostrar contatos
function mostrarContatos(filtro) {
  var contatosSalvos = localStorage.getItem("contacts");
  if (contatosSalvos === null) {
    contatosSalvos = [];
  } else {
    contatosSalvos = JSON.parse(contatosSalvos);
  }

  listaContatos.innerHTML = "";

  for (var i = 0; i < contatosSalvos.length; i++) {
    var contato = contatosSalvos[i];
    var mostrar = false;

    // Verifica se deve mostrar o contato
    if (filtro === "" || 
        contato.name.toLowerCase().indexOf(filtro.toLowerCase()) !== -1 ||
        contato.email.toLowerCase().indexOf(filtro.toLowerCase()) !== -1 ||
        contato.phoneNumber.indexOf(filtro) !== -1) {
      mostrar = true;
    }

    if (mostrar) {
      var card = '<div class="contact-card">' +
                   '<img src="' + contato.avatar + '" width="50">' +
                   '<div>' +
                     '<div style="display: flex; justify-content: space-between; align-items: center;">' +
                       '<h3>' + contato.name + '</h3>' +
                       '<div>' +
                         '<span style="cursor: pointer; margin-right: 10px;" onclick="editarContato(' + i + ')">&#9881;</span>' +
                         '<span style="cursor: pointer;" onclick="excluirContato(' + i + ')">&#128465;</span>' +
                       '</div>' +
                     '</div>' +
                     '<p>📞 ' + contato.phoneNumber + '</p>' +
                     '<p>✉ ' + contato.email + '</p>' +
                   '</div>' +
                 '</div>';
      listaContatos.innerHTML += card;
    }
  }
}

// Manipula envio do formulário
form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  var nome = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var telefone = document.getElementById("phone_number").value;
  var avatar = document.getElementById("avatar-url").value;

  if (avatar === "") {
    avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxuxTgDogsdRbisxgEDTXmshFuxLltYsFvLg&s";
  }

  var novoContato = {
    name: nome,
    email: email,
    phoneNumber: telefone,
    avatar: avatar
  };

  var contatosSalvos = localStorage.getItem("contacts");
  if (contatosSalvos === null) {
    contatosSalvos = [];
  } else {
    contatosSalvos = JSON.parse(contatosSalvos);
  }

  var indiceEdicao = localStorage.getItem("indiceEdicao");
  if (indiceEdicao !== null) {
    contatosSalvos[indiceEdicao] = novoContato;
    localStorage.removeItem("indiceEdicao");
  } else {
    contatosSalvos.push(novoContato);
  }

  localStorage.setItem("contacts", JSON.stringify(contatosSalvos));
  form.reset();
  mostrarContatos(""); // Atualiza a lista
});

// Busca enquanto digita
campoBusca.addEventListener("input", function () {
  var filtro = campoBusca.value;
  mostrarContatos(filtro);
});

// Editar contato
function editarContato(indice) {
  var contatosSalvos = localStorage.getItem("contacts");
  if (contatosSalvos === null) {
    contatosSalvos = [];
  } else {
    contatosSalvos = JSON.parse(contatosSalvos);
  }

  var contato = contatosSalvos[indice];
  document.getElementById("name").value = contato.name;
  document.getElementById("email").value = contato.email;
  document.getElementById("phone_number").value = contato.phoneNumber;
  document.getElementById("avatar-url").value = contato.avatar;

  localStorage.setItem("indiceEdicao", indice);
}

// Excluir contato
function excluirContato(indice) {
  var contatosSalvos = localStorage.getItem("contacts");
  if (contatosSalvos === null) {
    contatosSalvos = [];
  } else {
    contatosSalvos = JSON.parse(contatosSalvos);
  }

  if (confirm("Tem certeza que quer excluir este contato?")) {
    contatosSalvos.splice(indice, 1);
    localStorage.setItem("contacts", JSON.stringify(contatosSalvos));
    mostrarContatos(""); // Atualiza lista
  }
}



