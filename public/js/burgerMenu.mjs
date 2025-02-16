const burgerButton = document.querySelector('#burgerButton');
const crossButton = document.querySelector('#crossButton');
const sideNav = document.querySelector('.sidebar__nav-list');

const showSideBar = function() {
    sideNav.classList.remove('sidebar__nav-list--hidden');
    sideNav.classList.add('sidebar__nav-list--show');
}
const hideSideBar = function() {
    sideNav.classList.remove('sidebar__nav-list--show');
    sideNav.classList.add('sidebar__nav-list--hidden');
}

export const init = function (){
    burgerButton.addEventListener('click', showSideBar);
    crossButton.addEventListener('click', hideSideBar);
}