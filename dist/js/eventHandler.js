// button learn more 

const hiddenInfo = document.querySelector('.learn-more');
document.querySelector('.learn-more-btn').addEventListener('click', () => {
    hiddenInfo.classList.toggle('show');
});