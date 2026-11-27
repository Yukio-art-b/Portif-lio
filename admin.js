function carregarMensagens() {
    const mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];
    const lista = document.getElementById("lista-mensagens");

    lista.innerHTML = "";

    if (mensagens.length === 0) {
        lista.textContent = "Nenhuma mensagem cadastrada.";
        return;
    }

    mensagens.forEach(function(mensagem) {
        const card = document.createElement("div");
        card.className = "admin-card";

        const nome = document.createElement("h5");
        nome.textContent = mensagem.nome;

        const email = document.createElement("p");
        email.textContent = "E-mail: " + mensagem.email;

        const texto = document.createElement("p");
        texto.textContent = "Mensagem: " + mensagem.mensagem;

        const editar = document.createElement("button");
        editar.className = "btn btn-warning mr-2";
        editar.textContent = "Editar";
        editar.addEventListener("click", function() {
            editarMensagem(mensagem.id);
        });

        const excluir = document.createElement("button");
        excluir.className = "btn btn-danger";
        excluir.textContent = "Excluir";
        excluir.addEventListener("click", function() {
            excluirMensagem(mensagem.id);
        });

        card.append(nome, email, texto, editar, excluir);
        lista.appendChild(card);
    });
}

function editarMensagem(id) {
    const mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];

    const mensagem = mensagens.find(function(item) {
        return item.id === id;
    });

    if (!mensagem) return;

    const nome = prompt("Novo nome:", mensagem.nome);
    if (nome === null) return;

    const email = prompt("Novo e-mail:", mensagem.email);
    if (email === null) return;

    const texto = prompt("Nova mensagem:", mensagem.mensagem);
    if (texto === null) return;

    mensagem.nome = nome;
    mensagem.email = email;
    mensagem.mensagem = texto;

    localStorage.setItem("mensagens", JSON.stringify(mensagens));

    carregarMensagens();

    alert("Mensagem editada com sucesso!");
}

function excluirMensagem(id) {
    if (!confirm("Deseja realmente excluir esta mensagem?")) {
        return;
    }

    let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];

    mensagens = mensagens.filter(function(mensagem) {
        return mensagem.id !== id;
    });

    localStorage.setItem("mensagens", JSON.stringify(mensagens));

    carregarMensagens();

    alert("Mensagem excluída com sucesso!");
}

carregarMensagens();
