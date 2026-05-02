// ELEMENTOS DO DOM
const passwordEl = document.getElementById("password");
const lengthEl = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const strengthFill = document.getElementById("strengthFill");

// Atualiza valor do slider
lengthEl.addEventListener("input", () => {
  lengthValue.textContent = lengthEl.value;
});

// GERAR SENHA
function generatePassword() {
  const length = +15; 

  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let chars = "";

  // Verifica opções marcadas
  if (document.getElementById("lowercase").checked) chars += lower;
  if (document.getElementById("uppercase").checked) chars += upper;
  if (document.getElementById("numbers").checked) chars += numbers;
  if (document.getElementById("symbols").checked) chars += symbols;

  if (!chars) return;

  let password = "";

  // Gera senha aleatória
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  passwordEl.value = password;
  checkStrength(password);
}

// FORÇA DA SENHA
function checkStrength(pass) {
  let strength = 0;

  if (pass.length >= 8) strength++;
  if (/[A-Z]/.test(pass)) strength++;
  if (/[0-9]/.test(pass)) strength++;
  if (/[^A-Za-z0-9]/.test(pass)) strength++;

  const percent = (strength / 4) * 100;

  strengthFill.style.width = percent + "%";

  if (percent <= 25) strengthFill.className = "strength-fill bg-danger";
  else if (percent <= 50) strengthFill.className = "strength-fill bg-warning";
  else if (percent <= 75) strengthFill.className = "strength-fill bg-info";
  else strengthFill.className = "strength-fill bg-success";
}

// COPIAR SENHA (SEM ALERT)
function copyPassword() {
  const text = passwordEl.value;
  if (!text) return;

  navigator.clipboard.writeText(text).then(() => {
    showToast();
  });
}

// Mostra mensagem de sucesso
function showToast() {
  const toast = document.getElementById("toast");

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// RESET DO SISTEMA
function resetAll() {
  passwordEl.value = "";

  document.querySelectorAll("input[type=checkbox]").forEach(c => c.checked = false);

  strengthFill.style.width = "0%";
}