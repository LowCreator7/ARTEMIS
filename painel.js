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

function getCheckedValues(containerId) {
  return Array.from(document.querySelectorAll(`#${containerId} input:checked`)).map(input => input.value);
}

function setCheckedValues(containerId, values) {
  const inputs = document.querySelectorAll(`#${containerId} input[type='checkbox']`);
  inputs.forEach(input => {
    input.checked = values.includes(input.value);
  });
}

function getInputValues(className) {
  return Array.from(document.getElementsByClassName(className)).map(input => input.value).filter(val => val.trim() !== "");
}

function setInputValues(className, values) {
  const container = className.includes('curso') ? document.getElementById('qualificacoes') : document.getElementById('experiencias');
  container.innerHTML = '';
  values.forEach(val => {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.gap = "10px";
    wrapper.style.marginBottom = "10px";

    const input = document.createElement("input");
    input.type = "text";
    input.value = val;
    input.placeholder = className.includes('curso') ? "Curso (nome + instituição)" : (className.includes('atividade') ? "Atividades exercidas e resultados" : "Empresa, cargo e tempo de serviço");
    input.className = className;
    input.style.flex = "1";

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Remover";
    removeBtn.style.backgroundColor = "#ccc";
    removeBtn.style.border = "none";
    removeBtn.style.borderRadius = "4px";
    removeBtn.style.padding = "6px 10px";
    removeBtn.style.cursor = "pointer";
    removeBtn.onclick = () => wrapper.remove();

    wrapper.appendChild(input);
    wrapper.appendChild(removeBtn);
    container.appendChild(wrapper);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nome: document.getElementById("nome").value,
    nascimento: document.getElementById("nascimento").value,
    cidadeEstado: document.getElementById("cidadeEstado").value,
    telefone: document.getElementById("telefone").value,
    escolaridade: document.getElementById("escolaridade").value,
    idiomas: document.getElementById("idiomas").value,
    informatica: document.getElementById("informatica").value,
    sobre: document.getElementById("sobre").value,
    situacao: getCheckedValues("situacao"),
    interesses: getCheckedValues("interesses"),
    disponibilidade: getCheckedValues("disponibilidade"),
    cursos: getInputValues("curso-extra"),
    experiencia: getInputValues("experiencia-extra"),
    atividades: getInputValues("atividade-extra"),
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
