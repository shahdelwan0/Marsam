document.addEventListener("DOMContentLoaded", function () {
  const steps = [
    document.getElementById("step1"),
    document.getElementById("step2"),
    document.getElementById("step3"),
    document.getElementById("step4"),
    document.getElementById("step5"),
  ];
  const progressBar = document.getElementById("progress-bar-inner");
  const nextStep1 = document.getElementById("next-step1");
  const nextStep2 = document.getElementById("next-step2");
  const nextStep3 = document.getElementById("next-step3");
  const nextStep4 = document.getElementById("next-step4");
  const completeSignup = document.getElementById("complete-signup");
  const backStep2 = document.getElementById("back-step2");
  const backStep3 = document.getElementById("back-step3");
  const backStep4 = document.getElementById("back-step4");
  const backStep5 = document.getElementById("back-step5");
  const skipStep4 = document.getElementById("skip-step4");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("email-error");
  const displayEmail = document.getElementById("display-email");
  const verificationInputs = document.querySelectorAll(".verification-input");
  let currentStep = 0;
  function updateProgressBar(step) {
    const progress = ((step + 1) / steps.length) * 100;
    progressBar.style.width = progress + "%";
  }
  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      if (index === stepIndex) {
        step.style.display = "block";
        step.classList.remove("slide-in");
        void step.offsetWidth;
        step.classList.add("slide-in");
      } else {
        step.style.display = "none";
      }
    });
    currentStep = stepIndex;
    updateProgressBar(stepIndex);
  }
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
  nextStep1.addEventListener("click", function () {
    const email = emailInput.value.trim();
    if (!email) {
      emailError.textContent = "الرجاء إدخال البريد الإلكتروني";
      return;
    }
    if (!validateEmail(email)) {
      emailError.textContent = "الرجاء إدخال بريد إلكتروني صحيح";
      return;
    }
    emailError.textContent = "";
    displayEmail.textContent = email;
    showStep(1);
  });
  nextStep2.addEventListener("click", function () {
    let isValid = true;
    let code = "";
    verificationInputs.forEach((input) => {
      if (!input.value) {
        isValid = false;
      }
      code += input.value;
    });
    if (!isValid || code.length !== 4) {
      alert("الرجاء إدخال رمز التحقق المكون من 4 أرقام");
      return;
    }
    showStep(2);
  });
  nextStep3.addEventListener("click", function () {
    const username = document.getElementById("username").value.trim();
    const fullname = document.getElementById("fullname").value.trim();
    const password = document.getElementById("password").value.trim();
    if (!username || !fullname || !password) {
      alert("الرجاء إكمال جميع الحقول المطلوبة");
      return;
    }
    showStep(3);
  });
  nextStep4.addEventListener("click", function () {
    showStep(4);
  });
  skipStep4.addEventListener("click", function () {
    showStep(4);
  });
  completeSignup.addEventListener("click", function () {
    const agreeTerms = document.getElementById("agree-terms").checked;
    if (!agreeTerms) {
      alert("يجب الموافقة على شروط الاستخدام للمتابعة");
      return;
    }
    alert("تم تسجيل حسابك بنجاح!");
  });
  backStep2.addEventListener("click", function () {
    showStep(0);
  });
  backStep3.addEventListener("click", function () {
    showStep(1);
  });
  backStep4.addEventListener("click", function () {
    showStep(2);
  });
  backStep5.addEventListener("click", function () {
    showStep(3);
  });
  verificationInputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      if (this.value.length >= 1) {
        this.value = this.value.slice(0, 1);
        if (index < verificationInputs.length - 1) {
          verificationInputs[index + 1].focus();
        }
      }
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && !this.value && index > 0) {
        verificationInputs[index - 1].focus();
      }
    });
  });
  showStep(0);
});
