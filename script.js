const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passError = document.getElementById("passError");
const strengthText = document.getElementById("strengthText");
const result = document.getElementById("result");
const toggle = document.getElementById("toggle");
const teeth = document.querySelectorAll(".tooth");

// هر شرط یک دندانه‌ی کلید رو بالا میاره
const rules = [
  (p) => p.length >= 8,
  (p) => /[a-z]/.test(p),
  (p) => /[A-Z]/.test(p),
  (p) => /\d/.test(p),
  (p) => /[^A-Za-z0-9]/.test(p),
  (p) => p.length >= 12,
];

const labels = [
  "هنوز چیزی ننوشتی",
  "خیلی ضعیف",
  "ضعیف",
  "متوسط",
  "خوب",
  "قوی",
  "عالی، کلیدت کامله",
];

function updateKey() {
  const p = password.value;
  let score = 0;
  rules.forEach((rule, i) => {
    const ok = rule(p);
    teeth[i].classList.toggle("on", ok);
    if (ok) score++;
  });
  strengthText.textContent = p ? labels[score] : labels[0];
}

function validateEmail() {
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  emailError.textContent = ok ? "" : "ایمیل معتبر نیست. مثال: name@example.com";
  email.classList.toggle("invalid", !ok);
  return ok;
}

function validatePassword() {
  const ok = password.value.length >= 8;
  passError.textContent = ok ? "" : "رمز باید حداقل ۸ کاراکتر باشه.";
  password.classList.toggle("invalid", !ok);
  return ok;
}

password.addEventListener("input", updateKey);

toggle.addEventListener("click", () => {
  const hidden = password.type === "password";
  password.type = hidden ? "text" : "password";
  toggle.textContent = hidden ? "پنهان" : "نمایش";
  toggle.setAttribute("aria-label", hidden ? "پنهان کردن رمز" : "نمایش رمز");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  result.textContent = "";
  const emailOk = validateEmail();
  const passOk = validatePassword();
  if (emailOk && passOk) {
    // اینجا هنوز سرور نداریم؛ فقط ظاهر و اعتبارسنجی رو نشون می‌دیم
    result.textContent = "ورود موفق بود. خوش اومدی!";
  }
});
