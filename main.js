const openBtn = document.getElementById('openModalBtn');
const closeBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('mobileModal');

openBtn.addEventListener('click', () => {
  modal.classList.remove('translate-x-full');
  modal.classList.add('translate-x-0');
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('translate-x-0');
  modal.classList.add('translate-x-full');
});