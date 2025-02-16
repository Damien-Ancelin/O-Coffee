const burgerButton = document.getElementById('burgerButton');
const headerNav = document.querySelector('.header__nav');

const handleClickMenu = function() {
    headerNav.classList.toggle('active');
}

export const init = function (){
    burgerButton.addEventListener('click', handleClickMenu);
}