const categorias = document.querySelector('.categorias');

async function consultarCategorias() {
    const retorno = await fetch('http://localhost:3000/categoria');
    const lista = await retorno.json();
    listarCategorias(lista);
};

function listarCategorias(lista) {
    for (const categoria of lista) {
        const categoriaHtml = `
        <li>${categoria.descricao}</li>
        `;

        categorias.innerHTML += categoriaHtml;
    }
};

consultarCategorias();