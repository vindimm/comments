const container = document.querySelector('.comments');
const form = document.querySelector('.form');
const submitButton = form.querySelector('.form__submit');
const message = form.querySelector('.form__textarea');
const author = form.querySelector('.form__author');
const date = form.querySelector('.form__date');

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  const newComment = document.getElementById('comment-template').content.cloneNode(true);
  const formattedDate = getFormattedDate(date.value);

  newComment.querySelector('.comment__text').textContent = message.value;
  newComment.querySelector('.comment__author').textContent = author.value;
  newComment.querySelector('.comment__date').textContent = formattedDate;

  container.append(newComment);
  form.reset();
};

const handleEnterPress = (evt) => {
  if (evt.key === 'Enter' && !evt.shiftKey) {
    handleFormSubmit(evt);
  }
};

// Возвращает дату в формате
// 'сегодня, hh-mm' или
// 'вчера, hh-mm' или
// 'dd-mm-yyyy, hh-mm'
const getFormattedDate = (date) => {
  const dateNow = new Date();

  if (!date) {
    return (`сегодня, ${dateNow.getHours()}:${dateNow.getMinutes()}`);
  }

  const dateMessage = new Date(date);
  const dateMessageString = dateMessage.toDateString();

  if (dateMessageString === dateNow.toDateString()) {
    return (`сегодня, ${dateNow.getHours()}:${dateNow.getMinutes()}`);
  }

  let dateYesterday = new Date();
  dateYesterday.setDate(dateNow.getDate() - 1);

  if (dateMessageString === dateYesterday.toDateString()) {
    return (`вчера, ${dateNow.getHours()}:${dateNow.getMinutes()}`);
  }

  return `${dateMessage.toLocaleDateString('ru-RU')}, ${dateNow.getHours()}:${dateNow.getMinutes()}`
};

form.addEventListener('submit', handleFormSubmit);
form.addEventListener('keypress', handleEnterPress);
