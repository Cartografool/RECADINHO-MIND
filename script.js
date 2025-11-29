// --- Dados de diálogo ---
const dialogo = [
  "AAAA OI MEEEEENINAS 💅✨",
  "Ai juro, migas, cês suaram GLITTER pra chegar aqui, vey…",
  "Passaram por cada BABADÃO que eu e meu squad montou",
  "Mesmo perdendo umas migas no caminho",
  "drama total…",
  "...",
  "Eu tava me perguntando:",
  "Quantas de vocês ainda tão vivas pra levar APAVORO? 😳💀",
];

const respostaAlta = [
  "AAAAAAA EU TÔ PASSANDO MAL 😭😭😭",
  "SOBROU GERAL, MIGA?! NÃO CREIOOOOO 😱✨",
  "Arrasaram DEMAIS, tô chocada tipo 'meu Deus genteh' 🤌",
  "Cês viraram IRMÃS, né? 😭💗",
  "Querem tudo sair juntinhas igual final de filme teen…",
  "Drama vibes…",
  "Mas...",
  "Mas e se",
  "MAS E SE......",
  "Tipo",
  "E se",
  "Tipo assim...",
  "......",
  "......",
  "Eh",
  "EU DISSER QUE TEM UMA SAÍDA? 👁️",
  "Lembra da porta da PRIMEIRA SALA?",
  "Então monas… eu ABRI ela agora 😭",
  "RUMO A LIBERADE!!!",
  "!!!!!!!",
  "Eitcha, ixe!",
  "Ai que menina desastrada que eu sou, genteh",
  "Oooops!",
  "Esbarrei em um outro botão",
  "Que abre uma porta",
  "AQUELA porta VERMELHA",
  "...",
  "...",
  "...",
  "Corre",
];

const respostaBaixa = [
  "Hmm… então sobrou só NATA mesmo",
  "As que ficam até no flop 😭💅",
  "Poucas, porém LENDAS vivas, juro.",
  "Squad FECHADÍSSIMO, nível besties desde 2015.",
  "Vocês passaram por coisas",
  "que nem a fanfic da Wattpad ousaria escrever 🤡",
  "E agora tão aqui… juntinhas… ai aaa…",
  "Drama vibes…",
  "MAS E SE........",
  "Tipo",
  "E se",
  "Tipo assim...",
  "......",
  "......",
  "Eh",
  "EU DISSER QUE TEM UMA SAÍDA? 👁️",
  "Lembra da porta da PRIMEIRA SALA?",
  "Então monas… eu ABRI ela agora 😭",
  "RUMO A LIBERADE!!!",
  "!!!!!!!",
  "Eitcha, ixe!",
  "Ai que menina desastrada que eu sou, genteh",
  "Oooops!",
  "Esbarrei em um outro botão",
  "Que abre uma porta",
  "AQUELA porta VERMELHA",
  "...",
  "...",
  "...",
  "Corre",
];

// --- Elementos e variáveis ---
const box = document.getElementById("dialogueBox");
const overlay = document.getElementById("overlay");
const cursor = document.getElementById("cursor");
const profile = document.getElementById("profilePic");
const input = document.getElementById("user-input");

let i = 0;
let speed = 50;
let dialogIndex = 0;

// --- Som ---
const somTecla = new Audio("stuff/keyboard.wav");
somTecla.volume = 0.3;

// --- Cursor customizado ---
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});

// --- Animação do rosto ---
let mouthInterval;
let blinkTimeout;
let speaking = false;

const faces = {
  neutral: "face/face.png",
  mouth: "face/facemouth.png",
  closed: "face/closed.png",
};

// Boca alternando durante a fala
function startFaceAnim() {
  speaking = true;
  clearInterval(mouthInterval);
  profile.src = faces.mouth;

  // alterna boca aberta e fechada
  mouthInterval = setInterval(() => {
    if (!speaking) return;
    profile.src = profile.src.includes("facemouth")
      ? faces.neutral
      : faces.mouth;
  }, 180);
}

// para a boca quando termina a fala
function stopFaceAnim() {
  speaking = false;
  clearInterval(mouthInterval);
  profile.src = faces.neutral;
}

// Piscar independente
function blinkLoop() {
  const nextBlink = 2000 + Math.random() * 4000; // entre 2 e 6s
  blinkTimeout = setTimeout(() => {
    const prevFace = profile.src;
    profile.src = faces.closed;
    setTimeout(() => {
      if (speaking && prevFace.includes("facemouth")) {
        profile.src = faces.mouth;
      } else {
        profile.src = faces.neutral;
      }
      blinkLoop(); // repete o ciclo
    }, 150);
  }, nextBlink);
}

// inicia o loop de piscar assim que a página carrega
blinkLoop();

// --- Funções de digitação ---
function digitar(texto, callback) {
  startFaceAnim(); // começa a "falar"
  if (i < texto.length) {
    box.innerHTML += texto.charAt(i).match(/[\p{Emoji}]/u)
      ? `<span class="emoji">${texto.charAt(i)}</span>`
      : texto.charAt(i);

    somTecla.currentTime = 0;
    somTecla.play();
    i++;
    setTimeout(() => digitar(texto, callback), speed);
  } else {
    stopFaceAnim(); // para quando termina
    if (callback) setTimeout(callback, 800);
  }
}

function mostrarDialogo(falas, onEnd) {
  if (dialogIndex < falas.length) {
    i = 0;
    box.innerHTML = "";
    digitar(falas[dialogIndex], () => {
      dialogIndex++;
      mostrarDialogo(falas, onEnd);
    });
  } else {
    if (onEnd) onEnd();
  }
}

function flicker(callback) {
  if (callback) callback();
}

// --- Sequência principal ---
function startDialogo() {
  dialogIndex = 0;
  mostrarDialogo(dialogo, () => {
    flicker(() => {
      input.classList.add("show");
      input.focus();
    });
  });
}

input.addEventListener("change", () => {
  input.classList.remove("show");
  const n = parseInt(input.value);
  box.innerHTML = "";
  dialogIndex = 0;

  const falas = n > 3 ? respostaAlta : respostaBaixa;

  mostrarDialogo(falas, () => {
    // tudo fica vermelho
    document.body.classList.add("alerta");
    box.style.fontSize = "48px";
    box.innerHTML = "CORRE!";

    // --- Troca a imagem do rosto ---
    clearInterval(mouthInterval);
    clearTimeout(blinkTimeout);
    speaking = false;

    // define imagem final e garante que nenhuma outra troque
    profile.src = "face/facemouth_red.png";

    // opcional: desativa animações futuras
    profile.style.filter = "none"; // garante cor pura
  });
});

window.onload = startDialogo;

