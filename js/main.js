const step1 = document.querySelector(".step1"),
  step2 = document.querySelector(".step2"),
  step3 = document.querySelector(".step3"),
  step4 = document.querySelector(".step4"),
  step5 = document.querySelector(".step5"),
  emailAddress = document.getElementById("email-address"),
  verEmail = document.getElementById("ver-email"),
  inputs = document.querySelectorAll(".otp-group input"),
  nextButton = document.querySelector(".nextButton"),
  verButton = document.querySelector(".verButton"),
  progressBar = document.querySelector(".progress"),
  labels = document.querySelectorAll(".progress-labels .label"),
  form = document.getElementById("form"),
  inputControl = document.querySelector(".input-control"),
  emailMsg = document.querySelector(".msg"),
  nextButton2 = document.querySelector(".nextButton2");

const serviceID = "service_qrj9js9";
const templateID = "template_y0cm5a2";

function updateProgressBar(step) {
  let progressPercentage = 0;

  if (step === 1) {
    progressPercentage = 25;
  } else if (step === 2) {
    progressPercentage = 50;
  } else if (step === 3) {
    progressPercentage = 75;
  } else if (step === 4) {
    progressPercentage = 100;
  }

  progressBar.style.width = `${progressPercentage}%`;
  labels.forEach((label, index) => {
    label.classList.toggle("active", index + 1 === step);
  });
}

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

let OTP = generateOTP();

const validateEmail = (email) => {
  let re = /^[\w.+\-]+@gmail\.com$/;
  if (re.test(email)) {
    nextButton.classList.remove("disable");
    inputControl.classList.remove("error");
    inputControl.classList.add("success");
    emailMsg.classList.add("success");
    emailMsg.classList.remove("error");
    emailMsg.innerHTML = "بريد متاح للتسجيل";
  } else {
    nextButton.classList.add("disable");
    inputControl.classList.remove("success");
    inputControl.classList.add("error");
    emailMsg.classList.add("error");
    emailMsg.classList.remove("success");
    emailMsg.innerHTML = "بريد غير متاح للتسجيل";
  }
};

window.addEventListener("load", () => {
  emailjs.init("p_nPtn-XX6BsBr2WD");
  step2.style.display = "none";
  step3.style.display = "none";
  step4.style.display = "none";
  step5.style.display = "none";
  nextButton.classList.add("disable");
  verButton.classList.add("disable");
  updateProgressBar(1);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

inputs.forEach((input, index) => {
  input.addEventListener("keyup", (e) => {
    if (e.target.value.length >= 1) {
      e.target.value = e.target.value.substr(0, 1);
      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    }
    validateOTPInputs();
  });

  input.addEventListener("paste", (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    if (/^\d{4}$/.test(pastedData)) {
      const rtlData = pastedData.split("").reverse().join("");
      inputs.forEach((input, idx) => {
        input.value = rtlData[idx];
      });
      validateOTPInputs();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputs[index - 1].focus();
    }
  });
});

function validateOTPInputs() {
  const isComplete = Array.from(inputs).every((input) => input.value !== "");
  if (isComplete) {
    verButton.classList.remove("disable");
  } else {
    verButton.classList.add("disable");
  }
}

nextButton.addEventListener("click", () => {
  nextButton.innerHTML = "يتم الإرسال...";
  let templateParameter = {
    from_name: "مرسم",
    OTP: OTP,
    message: "",
    reply_to: emailAddress.value,
  };
  emailjs.send(serviceID, templateID, templateParameter).then(
    (res) => {
      nextButton.innerHTML = "التحقق";
      step1.style.display = "none";
      step2.style.display = "block";
      step3.style.display = "none";
      step4.style.display = "none";
      updateProgressBar(2);
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  );
});

nextButton2.addEventListener("click", () => {
  step1.style.display = "none";
  step2.style.display = "none";
  step3.style.display = "none";
  step4.style.display = "block";
  updateProgressBar(4);
});

verButton.addEventListener("click", () => {
  let values = "";
  inputs.forEach((input) => {
    values += input.value.trim();
  });
  values = values.split("").reverse().join("");
  console.log("v", values);
  console.log("O", OTP);

  if (OTP === values) {
    step1.style.display = "none";
    step2.style.display = "none";
    step3.style.display = "block";
    step4.style.display = "none";
    updateProgressBar(3);
  } else {
    verButton.classList.add("error-shake");
    setTimeout(() => {
      verButton.classList.remove("error-shake");
    }, 1000);
  }
});

function changeMyEmail() {
  step1.style.display = "block";
  step2.style.display = "none";
  step3.style.display = "none";
  step4.style.display = "none";
  updateProgressBar(1);
}

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
});

nextButton2.addEventListener("click", (e) => {
  e.preventDefault();
  step1.style.display = "none";
  step2.style.display = "none";
  step3.style.display = "none";
  step4.style.display = "block";
  updateProgressBar(4);
});

function skipOptional() {
  step4.style.display = "none";
  step5.style.display = "block";
  updateProgressBar(5);
}
