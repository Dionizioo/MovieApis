const botaoPesquisa = document.querySelector("#pesquisa");
const apiKey = "8fa8be48";
const inputPesquisa = document.querySelector("#search-movie");

botaoPesquisa.addEventListener("click", () => {
    const barrapesquisa = document.querySelector("#search-movie").value;

    if (barrapesquisa === "") {
        alert("Digite um filme");
    }

    fetch(`https://omdbapi.com/?s=${barrapesquisa}&apikey=${apiKey}`)
        .then(result => result.json())
        .then(json => carregaLista(json))
        .catch(error => console.log(error))
});

const carregaLista = (json) => {
    const lista = document.querySelector("#list_movie");

    lista.innerHTML = "";

    if (json.Response === "False") {
        exibirMensagem("Nenhum filme encontrado");
        return;
    }

    // Percorre a lista de filmes e cria os elementos
    const letraPesquisa = inputPesquisa.value.trim().toLowerCase();
    const filmes = json.Search.filter(filme => filme.Title.toLowerCase().includes(letraPesquisa));

    if(filmes.length === 0) {
        exibirMensagem("Nenhum filme encontrado");
        return;
    }

    json.Search.forEach(element => {
        // Cria um elemento div para cada filme
        const item = document.createElement("div");
        item.classList.add("item");

        // Define o conteúdo do elemento
        item.innerHTML = `<img src="${element.Poster}" alt="${element.Title}" /><h3>${element.Title}</h3> <p>${element.Year}</p> `;

        // Adiciona o elemento à lista
        lista.appendChild(item);
    });
};

const exibirMensagem = (mensagem) => {
    const lista = document.querySelector("#list_movie");
    
    const item = document.createElement("div");
    item.classList.add("item");

    // Adicione a classe com a imagem padrão quando nenhum filme é encontrado
    item.classList.add("not-found");
    
    item.innerHTML = `<h3>${mensagem}</h3>`;
    lista.appendChild(item);

    setTimeout(() => {
        window.location.reload(); // Recarrega a página
    }, 3000);
};


// https://omdbapi.com/?i=tt3896198&apikey=8fa8be48&s=