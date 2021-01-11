'use strict';

const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    if(window.scrollY > navbarHeight){
        navbar.classList.add('sticky');
    } else{
        navbar.classList.remove('sticky');
    }
});


// window.onscroll = function sticky(){
//     if(window.pageYOffset > navbar[0].offsetTop){
//         navbar[0].classList.add('sticky');
//     } else{
//         navbar[0].classList.remove('sticky');
//     }
// }