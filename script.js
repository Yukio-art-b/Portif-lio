function criarMensagensTeste() {
    const jaCriadas = localStorage.getItem("mensagensTesteCriadas");
    let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];

    if (!jaCriadas && mensagens.length === 0) {
        const exemplos = [];

        for (let i = 1; i <= 20; i++) {
            exemplos.push({
                id: i,
                nome: `Usuário de teste ${i}`,
                email: `teste${i}@exemplo.com`,
                mensagem: `Esta é a mensagem de teste número ${i}.`
            });
        }

        localStorage.setItem("mensagens", JSON.stringify(exemplos));
    }

    if (!jaCriadas) {
        localStorage.setItem("mensagensTesteCriadas", "true");
    }
}

criarMensagensTeste();

emailjs.init({
    publicKey: "wBzwMn5ynx2xvhMxv"
});

const formulario = document.getElementById("contact-form");

if (formulario) {
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const mensagem = document.getElementById("mensagem").value;

        let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];

        const novaMensagem = {
            id: Date.now(),
            nome: nome,
            email: email,
            mensagem: mensagem
        };

        mensagens.push(novaMensagem);

        localStorage.setItem("mensagens", JSON.stringify(mensagens));

        emailjs.send("service_r5blq6q", "template_e607r9r", {
            from_name: nome,
            from_email: email,
            message: mensagem
        })
        .then(function() {
            alert("Mensagem enviada com sucesso!");
            formulario.reset();
        })
        .catch(function(erro) {
            console.error("Erro ao enviar e-mail:", erro);
            alert("Mensagem salva, mas houve um erro ao enviar o e-mail.");
        });
    });
}

