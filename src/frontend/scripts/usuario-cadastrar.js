const enviar = document.querySelector('#enviar');

enviar.addEventListener('click', async (e) => {
    const novoUsuario = pegarDadosFormulario();
    enviarDadosApi(novoUsuario);
    e.preventDefault()
});

function pegarDadosFormulario() {
    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;

    const novoUsuario = {
        nome,
        email,
        senha
    };

    return novoUsuario;
};

async function enviarDadosApi(novoUsuario) {
    const resposta = await fetch(
        'http://localhost:3000/usuario', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoUsuario)
    }
    );

    if (resposta.status === 201) {
        alert('Usuário cadastrado com sucesso')

        limparFormulario();
        window.location.href = '../index.html';
    } else {
        const erro = await resposta.json();
        alert('Erro ao cadastrar: ' + erro.mensagem);
    };
};

function limparFormulario() {
    nome.value = '',
        email.value = '',
        senha.value = ''
};
