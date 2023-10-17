const perfil = document.querySelector('#perfil');
const token = localStorage.getItem('token');

try {
    if (!token) {
        window.location.href = '../index.html';
    } else {
        detalharUsuario();
    }
} catch (error) {
    window.location.href = '../index.html';
}

async function detalharUsuario() {
    options = validarAcesso(token, 'GET');
        
        try {
            const retorno = await fetch('http://localhost:3000/usuario', options);

            if (retorno.status === 200) {
                const usuario = await retorno.json();
                listar(usuario)
            } else {
            }
        } catch (error) {
            console.error('Erro ao consultar perfil:', error);
        }

};

function listar(usuario) {
    perfil.innerHTML += `
    <p>
    Id: ${usuario.id}</br>
    Nome: ${usuario.nome}</br>
    Email: ${usuario.email}</br>
    </p>
    `
};

function validarAcesso(token, method) {
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const options = {
        method,
        headers
    };

    return options;
}

const logout = document.querySelector('#logout');

logout.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '../index.html';
});