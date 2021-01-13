'use strict';

// Make navbar transparent when it is on the top

const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
const arrowBtn = document.querySelector(".arrow_btn");
document.addEventListener('scroll', () => {
    if(window.scrollY > navbarHeight){
        navbar.classList.add('sticky');
        arrowBtn.classList.add('sticky');
    } else{
        navbar.classList.remove('sticky');
        arrowBtn.classList.remove('sticky');
    }
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar_toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});

// Show "arrow" button when scrolling down
arrowBtn.addEventListener('click', (event) => {
    scrollIntoView('#home');
});

// Handle scrolling when tapping on the navbar menu

const navbarMenu = document.querySelector('.navbar_menu');
navbarMenu.addEventListener('click', (event) => {
    
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return;
    }
    navbarMenu.classList.remove('open'); 
    scrollIntoView(link);
    
    // target.classList.remove('active');
    // target.classList.add('active');
    console.log(target);
});

// Handle click on "contact me" button on home

const homeContactBtn = document.querySelector('.home_contact');
homeContactBtn.addEventListener('click', (event) => {
    scrollIntoView('#contact');
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector(".home_container");
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    // console.log(1 - window.scrollY / homeHeight);
    home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Projects

const workBtnContainer = document.querySelector('.work_categories');
const projectContainer = document.querySelector('.work_projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null){
        return;
    }
    // Remove selection from the previous item and select the new one
    const active = document.querySelector('.category_btn.active');
    active.classList.remove('active');
    const target = 
        e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('active');
    

    // console.log(filter);

    projectContainer.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach((project) => {
            console.log(project.dataset.type);
            if(filter === '*' || filter === project.dataset.type){
                project.classList.remove('invisible');
            } else{
                project.classList.add('invisible');
            }
        });
    
        projectContainer.classList.remove('anim-out');
    }, 300);


});

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
};

