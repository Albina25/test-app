import { tests } from '@/data/tests';
import { loadDescriptionPage } from './components/descriptionPage';
import {loadMainPage} from "@/app";

const navbarButton = document.getElementById('navbar-button') as HTMLButtonElement;
const navbar = document.querySelector('.navbar') as HTMLElement;
const navbarTitle = document.querySelector('.navbar__title') as HTMLElement;
const navbarContent = document.querySelector('.navbar__content') as HTMLElement;
const testList = document.querySelector('.test-list') as HTMLElement;
const icon = navbarButton.querySelector('i') as HTMLElement;

const pageContent = document.getElementById('page-content') as HTMLElement;
if (pageContent) {
    loadMainPage(pageContent);
}

tests.forEach(test => {
    const li = document.createElement('li');
    li.textContent = test.title;
    li.classList.add('test-list__item');
    testList?.appendChild(li);

    li.addEventListener('click', async () => {
        navbarContent.classList.remove('visible');
        setActiveListItem(li);
        if (window.innerWidth < 768) {
            icon.classList.remove('fa-arrow-left');
            icon.classList.add('fa-bars');
            navbarTitle.innerHTML = `${test.title}`;
        }
        await loadDescriptionPage(test);
    });
});

function setActiveListItem(li: HTMLElement) {
    document.querySelectorAll('.test-list__item').forEach(item => {
        item.classList.remove('active');
    });

    li.classList.add('active');
}

navbarButton.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
        navbarContent.classList.toggle('visible');
    } else {
        navbar.classList.toggle('collapsed');
    }

    const icon = navbarButton.querySelector('i') as HTMLElement;

    if (navbar.classList.contains('collapsed') || navbarContent.classList.contains('visible')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-arrow-left');
        navbarTitle.innerHTML = 'ТЕСТЫ';
    } else {
        icon.classList.remove('fa-arrow-left');
        icon.classList.add('fa-bars');
        navbarTitle.innerHTML = '';
    }
});

handleResize();
window.addEventListener('resize', handleResize);

function handleResize() {
    if (window.innerWidth < 768) {
        console.log(window.screen.width)
        navbar.classList.remove('collapsed');
        navbarContent.classList.remove('visible');
        const icon = navbarButton.querySelector('i') as HTMLElement;
        icon.classList.remove('fa-arrow-left');
        icon.classList.add('fa-bars');
        navbarTitle.innerHTML = '';
    } else {
        navbarTitle.innerHTML = '';
    }
}

handleResize();

