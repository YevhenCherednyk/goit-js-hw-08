import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

let formData = {};

const refs = {
  formRef: document.querySelector('.feedback-form'),
  emailRef: document.querySelector('.feedback-form input'),
  textareaRef: document.querySelector('.feedback-form textarea'),
};

refs.formRef.addEventListener('submit', onSubmit);
refs.formRef.addEventListener('input', throttle(onFormInput, 500));

populateInputForm();

function onSubmit(evt) {
  evt.preventDefault();

  const {
    elements: { email, message },
  } = evt.currentTarget;
  console.log({ email: email.value, message: message.value });

  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  const message = JSON.stringify(formData);

  localStorage.setItem(STORAGE_KEY, message);
}

function populateInputForm() {
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  try {
    if (savedFormData) {
      formData = savedFormData;
      refs.emailRef.value = formData.email || '';
      refs.textareaRef.value = formData.message || '';
    }
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}
