const enviar = document.querySelector('#enviar');
const token = localStorage.getItem('token');

try {
    if (!token) {
        window.location.href = '../index.html';
    } else {
        enviar.addEventListener('click', async (e) => {
            const atualizacaoUsuario = pegarDadosFormulario();
            enviarDadosApi(atualizacaoUsuario);
            e.preventDefault()
        });
    }
} catch (error) {
    window.location.href = '../index.html';
}

function pegarDadosFormulario() {
    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;

    const atualizacaoUsuario = {
        nome,
        email,
        senha
    };

    return atualizacaoUsuario;
};

async function enviarDadosApi (atualizacaoUsuario) {
    const resposta = await fetch(
        'http://localhost:3000/usuario', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(atualizacaoUsuario)
        }
    );

    if (resposta.status === 201) {
        alert('Usuário atualizado com sucesso')

        limparFormulario();
        window.location.href = 'usuario-detalhar.html';
        
    } else {
        const erro = await resposta.json();
        alert('Erro ao atualizar: ' + erro.mensagem);
    };
    
    
};

function limparFormulario() {
    nome.value = '',
    email.value = '',
    senha.value = ''
};

const logout = document.querySelector('#logout');

logout.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '../index.html';
});