// painel.js
import { auth, db } from './firebaseConfig.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const form = document.getElementById("formPainel");
let uid = null;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    uid = user.uid;
    await carregarDados(uid);
  } else {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "index.html";
  }
});

function renderTags(containerId, tags) {
  const tagsContainer = document.getElementById(containerId);
  tagsContainer.innerHTML = '';
  tags.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.innerHTML = `${tag} <span class="remove">×</span>`;
    span.querySelector('.remove').onclick = () => {
      tags.splice(tags.indexOf(tag), 1);
      renderTags(containerId, tags);
    };
    tagsContainer.appendChild(span);
  });
  return tags;
}

function setupMultiInput(inputId, containerId, list) {
  const input = document.getElementById(inputId);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = input.value.trim();
      if (value && !list.includes(value)) {
        list.push(value);
        renderTags(containerId, list);
        input.value = '';
      }
    }
  });
  return list;
}

let situacaoList = [];
let interessesList = [];
let disponibilidadeList = [];

function popularCampos(dados) {
  document.getElementById("nome").value = dados.nome || "";
  document.getElementById("nascimento").value = dados.nascimento || "";
  document.getElementById("cidadeEstado").value = dados.cidadeEstado || "";
  document.getElementById("telefone").value = dados.telefone || "";
  document.getElementById("escolaridade").value = dados.escolaridade || "";
  document.getElementById("cursos").value = dados.cursos || "";
  document.getElementById("idiomas").value = dados.idiomas || "";
  document.getElementById("informatica").value = dados.informatica || "";
  document.getElementById("experiencia").value = dados.experiencia || "";
  document.getElementById("atividades").value = dados.atividades || "";
  document.getElementById("sobre").value = dados.sobre || "";

  situacaoList = dados.situacao || [];
  interessesList = dados.interesses || [];
  disponibilidadeList = dados.disponibilidade || [];

  renderTags("situacaoTags", situacaoList);
  renderTags("interessesTags", interessesList);
  renderTags("disponibilidadeTags", disponibilidadeList);
}

async function carregarDados(uid) {
  const docRef = doc(db, "usuarios", uid);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    popularCampos(snap.data());
  }
}

setupMultiInput("situacaoInput", "situacaoTags", situacaoList);
setupMultiInput("interessesInput", "interessesTags", interessesList);
setupMultiInput("disponibilidadeInput", "disponibilidadeTags", disponibilidadeList);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nome: document.getElementById("nome").value,
    nascimento: document.getElementById("nascimento").value,
    cidadeEstado: document.getElementById("cidadeEstado").value,
    telefone: document.getElementById("telefone").value,
    escolaridade: document.getElementById("escolaridade").value,
    situacao: situacaoList,
    interesses: interessesList,
    disponibilidade: disponibilidadeList,
    cursos: document.getElementById("cursos").value,
    idiomas: document.getElementById("idiomas").value,
    informatica: document.getElementById("informatica").value,
    experiencia: document.getElementById("experiencia").value,
    atividades: document.getElementById("atividades").value,
    sobre: document.getElementById("sobre").value,
    tipoUsuario: "candidato",
    atualizadoEm: new Date()
  };

  try {
    await setDoc(doc(db, "usuarios", uid), data);
    alert("Perfil salvo com sucesso!");
  } catch (error) {
    alert("Erro ao salvar: " + error.message);
  }
});
