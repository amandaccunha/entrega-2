const musicas = {
    musica1: {
      id: "musica1",
      nome: "Clouds",
      arquivo: "musica1.mp3",
      capa: "https://i.pinimg.com/736x/ab/35/17/ab3517a1e7c0aed0b65b24c9e3a5fb32.jpg"
    },
    musica2: {
      id: "musica2",
      nome: "My Fault",
      arquivo: "musica2.mp3",
      capa: "https://i.pinimg.com/736x/5e/c6/19/5ec619cd3028e6f24e5d74e0d0045fcd.jpg"
    },
    musica3: {
      id: "musica3",
      nome: "One Day",
      arquivo: "musica3.mp3",
      capa: "https://i.pinimg.com/736x/bf/40/07/bf4007146b981692ee212836566a6a74.jpg"
    }
  };
  
  let audio = new Audio();
  let musicaTocando = false;
  
  function tocarMusica() {
      const musicaSelecionadaId = document.getElementById("musicas").value;
      const musicaSelecionada = musicas[musicaSelecionadaId];
  
      if (!musicaSelecionada) {
          console.error("Música não encontrada. Verifique o ID selecionado.");
          Swal.fire({
              icon: 'error',
              title: 'Erro',
              text: 'A música selecionada não foi encontrada.',
              confirmButtonText: 'Ok'
          });
          return;
      }
  
      if (musicaTocando) {
          Swal.fire({
              icon: 'info',
              title: 'Atenção!',
              text: 'Já existe uma música tocando.',
              confirmButtonText: 'Ok'
          });
          return;
      }
  
      audio.src = musicaSelecionada.arquivo;
      audio.play();
      
      musicaTocando = true;
      document.getElementById("status").innerText = "Música tocando: " + musicaSelecionada.nome;
      document.getElementById("status").classList.add("visible");
      document.getElementById("musicName").innerText = musicaSelecionada.nome;
      document.getElementById("albumCover").src = musicaSelecionada.capa;
  
      // Salva a música tocada no localStorage
      localStorage.setItem("musica", musicaSelecionadaId);
  }
  
  function pararMusica() {
      if (!musicaTocando) {
          Swal.fire({
              icon: 'info',
              title: 'Atenção!',
              text: 'Nenhuma música está tocando.',
              confirmButtonText: 'Ok'
          });
          return;
      }
  
      // Pergunta se o usuário quer parar a música
      Swal.fire({
          title: 'Você deseja realmente parar a música?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sim, parar!',
          cancelButtonText: 'Não, continuar'
      }).then((result) => {
          if (result.isConfirmed) {
              audio.pause();
              audio.currentTime = 0;
              musicaTocando = false;
              document.getElementById("status").innerText = "Nenhuma música tocando.";
              document.getElementById("status").classList.remove("visible");
              document.getElementById("musicName").innerText = "Nenhuma música tocando";
              document.getElementById("albumCover").src = "album-default.jpg";
  
              // Mensagem de confirmação
              Swal.fire({
                  icon: 'success',
                  title: 'Música Parada!',
                  text: 'A música foi parada com sucesso.',
                  confirmButtonText: 'Ok'
              });
          }
      });
  }
  