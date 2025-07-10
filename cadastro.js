// cadastro.js
import { auth, db } from "./firebaseConfig.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

window.cadastrar = async () => {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, senha);
    const uid = cred.user.uid;

    await setDoc(doc(db, "usuarios", uid), {
      nome,
      email,
      tipoUsuario: "candidato",
      criadoEm: new Date()
    });

    alert("Usuário cadastrado com sucesso!");
    window.location.href = "index.html";
  } catch (error) {
    alert("Erro: " + error.message);
  }
};
