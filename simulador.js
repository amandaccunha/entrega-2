// Declaração de variáveis e constantes
const musicas = {
    musica1: {
        nome: "Clouds",
        arquivo: "musica1.mp3",
        capa: "https://i.pinimg.com/736x/ab/35/17/ab3517a1e7c0aed0b65b24c9e3a5fb32.jpg"
    },
    musica2: {
        nome: "My Fault",
        arquivo: "musica2.mp3",
        capa: "https://i.pinimg.com/736x/5e/c6/19/5ec619cd3028e6f24e5d74e0d0045fcd.jpg"
    },
    musica3: {
        nome: "One Day",
        arquivo: "musica3.mp3",
        capa: "https://i.pinimg.com/736x/bf/40/07/bf4007146b981692ee212836566a6a74.jpg"
    }
};

let audio = new Audio();
let musicaTocando = false;

// Função para tocar a música selecionada
function tocarMusica() {
    const musicaSelecionada = document.getElementById("musicas").value;
    
    if (musicaTocando) {
        alert("Já existe uma música tocando.");
        return;
    }
    
    audio.src = musicas[musicaSelecionada].arquivo;
    audio.play();
    
    musicaTocando = true;
    document.getElementById("status").innerText = "Música tocando: " + musicas[musicaSelecionada].nome;
    document.getElementById("status").classList.add("visible");
    document.getElementById("musicName").innerText = musicas[musicaSelecionada].nome;
    document.getElementById("albumCover").src = musicas[musicaSelecionada].capa;

    // Salva a música tocada no localStorage
    localStorage.setItem("musica", musicaSelecionada);
}

// Função para parar a música
function pararMusica() {
    if (!musicaTocando) {
        alert("Nenhuma música está tocando.");
        return;
    }

    const confirmarParada = confirm("Você deseja realmente parar a música?");
    
    if (confirmarParada) {
        audio.pause();
        audio.currentTime = 0;
        musicaTocando = false;
        document.getElementById("status").innerText = "Nenhuma música tocando.";
        document.getElementById("status").classList.remove("visible");
        document.getElementById("musicName").innerText = "Nenhuma música tocando";
        document.getElementById("albumCover").src = "album-default.jpg";
    }
}

// Função para carregar a última música tocada (se houver)
function carregarMusica() {
    const musicaSalva = localStorage.getItem("musica");
    if (musicaSalva) {
        document.getElementById("musicas").value = musicaSalva;
    }
}

// Carregar a última música tocada ao carregar a página
window.onload = carregarMusica;
