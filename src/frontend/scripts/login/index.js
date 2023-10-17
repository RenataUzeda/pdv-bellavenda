const enviar = document.querySelector('#enviar');

enviar.addEventListener('click', async (e) => {
    const usuario = pegarDadosFormulario();
    enviarDadosApi(usuario);
    e.preventDefault()
});

function pegarDadosFormulario() {
    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;

    const usuario = {
        email,
        senha
    };

    return usuario;
};

async function enviarDadosApi (usuario) {
    const resposta = await fetch(
        'http://localhost:3000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        }
    );

    if (resposta.status === 200) {
        const { token } = await resposta.json();
        localStorage.setItem('token', token);

        limparFormulario();
        window.location.href = './frontend/usuario-detalhar.html';
        
    } else {
        const erro = await resposta.json();
        alert('Erro de login: ' + erro.mensagem);
    };
};

function limparFormulario() {
    email.value = '',
    senha.value = ''
};

