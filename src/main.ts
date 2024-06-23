import { tests } from '@/data/tests';
import { loadDescriptionPage } from './components/descriptionPage';

const navbarButton = document.getElementById('navbar-button') as HTMLButtonElement;
const navbar = document.querySelector('.navbar') as HTMLElement;
const navbarTitle = document.querySelector('.navbar__title') as HTMLElement;
const navbarContent = document.querySelector('.navbar__content') as HTMLElement;
const content = document.querySelector('.content') as HTMLElement;
const testList = document.getElementById('test-list') as HTMLElement;
//const pageContent = document.getElementById('page-content') as HTMLElement;

tests.forEach(test => {
    const li = document.createElement('li');
    li.textContent = test.title;
    //li.setAttribute('data-test-id', test.id.toString());
    //li.setAttribute('data-test-description', test.description);
    testList?.appendChild(li);

    li.addEventListener('click', async () => {
        await loadDescriptionPage(test).then();
    });
});

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

window.addEventListener('resize', handleResize);

function handleResize() {
    if (window.innerWidth > 768) {
        console.log('handleResize');
        navbar.classList.remove('collapsed');
        navbarContent.classList.remove('visible');
        const icon = navbarButton.querySelector('i') as HTMLElement;
        icon.classList.remove('fa-arrow-left');
        icon.classList.add('fa-bars');
    }
}

handleResize();

export async function loadTemplate(url: string): Promise<string> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            return `<p style="padding: 16px">Error loading template</p>`;
        }
        return await response.text();
    } catch (error) {
        return `<p style="padding: 16px">Error loading template</p>`;
    }
}

