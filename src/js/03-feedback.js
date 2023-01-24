import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[name="email"]'),
  message: document.querySelector('textarea[name="message"]'),
  LOCALSTORAGE_KEY: 'feedback-form-state',
};

console.log(refs);

refs.form.addEventListener(
  'input',
  throttle(() => {
    const objectToSave = {
      email: refs.email.value,
      message: refs.message.value,
    };
    localStorage.setItem(refs.LOCALSTORAGE_KEY, JSON.stringify(objectToSave));
  }, 500)
);

refs.form.addEventListener('submit', evt => {
  evt.preventDefault();
  console.log({ email: refs.email.value, message: refs.message.value });
  refs.form.reset();
  localStorage.removeItem(refs.LOCALSTORAGE_KEY);
});

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error:', error.message);
  }
};

const storageData = load(refs.LOCALSTORAGE_KEY);
if (storageData) {
  refs.email.value = storageData.email;
  refs.message.value = storageData.message;
}
