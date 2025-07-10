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

function getCheckboxValues(groupId) {
  return Array.from(document.querySelectorAll(`#${groupId} input[type=checkbox]:checked`)).map(cb => cb.value);
}

function setCheckboxValues(groupId, values) {
  if (!Array.isArray(values)) return;
  const checkboxes = document.querySelectorAll(`#${groupId} input[type=checkbox]`);
  checkboxes.forEach(cb => {
    cb.checked = values.includes(cb.value);
  });
}

async function carregarDados(uid) {
  const docRef = doc(db, "usuarios", uid);
  const snap = await getDoc(docRef);

  if (snap.exists()) {
    const dados = snap.data();
    document.getElementById("nome").value = dados.nome || "";
    document.getElementById("nascimento").value = dados.nascimento || "";
    document.getElementById("cidadeEstado").value = dados.cidadeEstado || "";
    document.getElementById("telefone").value = dados.telefone || "";
    document.getElementById("escolaridade").value = dados.escolaridade || "";

    setCheckboxValues("situacao", dados.situacao || []);
    setCheckboxValues("interesses", dados.interesses || []);
    setCheckboxValues("disponibilidade", dados.disponibilidade || []);

    document.getElementById("cursos").value = dados.cursos || "";
    document.getElementById("idiomas").value = dados.idiomas || "";
    document.getElementById("informatica").value = dados.informatica || "";
    document.getElementById("experiencia").value = dados.experiencia || "";
    document.getElementById("atividades").value = dados.atividades || "";
    document.getElementById("sobre").value = dados.sobre || "";
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nome: document.getElementById("nome").value,
    nascimento: document.getElementById("nascimento").value,
    cidadeEstado: document.getElementById("cidadeEstado").value,
    telefone: document.getElementById("telefone").value,
    escolaridade: document.getElementById("escolaridade").value,
    situacao: getCheckboxValues("situacao"),
    interesses: getCheckboxValues("interesses"),
    disponibilidade: getCheckboxValues("disponibilidade"),
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
