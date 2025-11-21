let dados = [];
const campo = document.getElementById("campo-busca");
const resultados = document.getElementById("resultados");
const toast = document.getElementById("toast");
const aboutSection = document.querySelector(".about-section"); // Referência à seção "Sobre Asterisk"

// Carrega os dados do JSON assim que a página é carregada
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error(`Erro na rede: ${response.statusText}`);
        dados = await response.json();
    } catch (error) {
        console.error('Falha ao carregar os dados:', error);
    }
});

campo.addEventListener("input", () => {
    const valor = campo.value.toLowerCase().trim();
    resultados.innerHTML = "";

    if (valor === "") {
        aboutSection.style.display = "grid"; // Mostra a seção "Sobre" quando a busca está vazia
        resultados.style.display = "none";
        return;
    }

    const resultadosFiltrados = dados.filter(item =>
        item.comandos.toLowerCase().includes(valor) ||
        item.descrição.toLowerCase().includes(valor)
    );

    aboutSection.style.display = "none"; // Oculta a seção "Sobre" durante a busca
    resultados.style.display = "grid";

    if (resultadosFiltrados.length === 0) {
        resultados.innerHTML = `<div class='result-card'>Nenhum comando encontrado.</div>`;
    } else {
        resultadosFiltrados.forEach(item => {
            resultados.innerHTML += `
                <div class='result-card' onclick='copiar("${item.comandos}")'> 
                  <div class='result-card-comando'>${item.comandos}</div>
                  <p class='result-card-desc'>${item.descrição}</p>
                </div>`; // Nova estrutura de card
        });
    }
});

function copiar(txt) {
    navigator.clipboard.writeText(txt).then(() => {
        toast.style.opacity = "1";
        setTimeout(() => toast.style.opacity = "0", 1500);
    }).catch(err => {
        console.error("Falha ao copiar: ", err);
        return;
    });
}