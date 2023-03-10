const container = document.querySelector('.comments');
const form = document.querySelector('.form');
const textarea = form.querySelector('.form__textarea');
const textareaError = form.querySelector('.form__error--textarea');
const author = form.querySelector('.form__author');
const authorError = form.querySelector('.form__error--author');
const date = form.querySelector('.form__date');

const handleFormSubmit = (evt) => {
  evt.preventDefault();

  if (validateForm(evt.target)) {
    const newComment = document.getElementById('comment-template').content.cloneNode(true);
    const formattedDate = getFormattedDate(date.value);

    newComment.querySelector('.comment__text').textContent = textarea.value;
    newComment.querySelector('.comment__author').textContent = author.value;
    newComment.querySelector('.comment__date').textContent = formattedDate;

    container.append(newComment);
    form.reset();
  }
};

const handleDeleteButtonClick = (evt) => {
  if (evt.target.className.includes('comment__remove')) {
    const comment = evt.target.closest('.comment');
    comment.remove();
  }
};

const handleLikeButtonClick = (evt) => {
  if (evt.target.className.includes('comment__like')) {
    const comment = evt.target.closest('.comment');
    comment.querySelector('.comment__like').classList.toggle('comment__like--active');
  }
};

const handleTextareaInput = () => {
  textareaError.textContent = '';
};

const handleAuthorInput = () => {
  authorError.textContent = '';
};

// Возвращает дату в формате "сегодня, hh:mm" или "вчера, hh:mm" или "dd.mm.yyyy, hh:mm"
const getFormattedDate = (date) => {
  const dateNow = new Date();

  if (!date) {
    return (`сегодня, ${dateNow.getHours().toString().padStart(2, '0')}:${dateNow.getMinutes().toString().padStart(2, '0')}`);
  }

  const dateMessage = new Date(date);
  const dateMessageString = dateMessage.toDateString();

  if (dateMessageString === dateNow.toDateString()) {
    return (`сегодня, ${dateNow.getHours().toString().padStart(2, '0')}:${dateNow.getMinutes().toString().padStart(2, '0')}`);
  }

  let dateYesterday = new Date();
  dateYesterday.setDate(dateNow.getDate() - 1);

  if (dateMessageString === dateYesterday.toDateString()) {
    return (`вчера, ${dateNow.getHours().toString().padStart(2, '0')}:${dateNow.getMinutes().toString().padStart(2, '0')}`);
  }

  return `${dateMessage.toLocaleDateString('ru-RU')}, ${dateNow.getHours().toString().padStart(2, '0')}:${dateNow.getMinutes().toString().padStart(2, '0')}`
};

const validateForm = () => {
  let isFormValid = true;

  if (textarea.value.trim().length === 0) {
    isFormValid = false;
    textareaError.textContent = 'Нужно ввести текст комментария';
  } else if (textarea.value.trim().length <= 10) {
    isFormValid = false;
    textareaError.textContent = 'Длина комментария должна быть больше 10 символов';
  }

  if (author.value.trim().length === 0) {
    isFormValid = false;
    authorError.textContent = 'Нужно ввести имя автора';
  } else if (author.value.trim().length <= 4) {
    isFormValid = false;
    authorError.textContent = 'Имя автора должно быть длиннее 4 символов';
  }
  return isFormValid;
};

form.addEventListener('submit', handleFormSubmit);
textarea.addEventListener('input', handleTextareaInput);
author.addEventListener('input', handleAuthorInput);
container.addEventListener('click', handleDeleteButtonClick);
container.addEventListener('click', handleLikeButtonClick);
