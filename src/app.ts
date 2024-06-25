export async function loadTemplate(url: string, pageContent: HTMLElement) {
    const response = await fetch(url);
    if (response.ok) {
        pageContent.innerHTML = await response.text();
        return true;
    }
    const text: string = 'Непредвиденная ошибка';
    loadMainPage(text, pageContent);
    return false;
}

export function loadMainPage(text: string, pageContentElement: HTMLElement) {
    const navbarTitle = document.querySelector('.navbar__title') as HTMLElement;

    if (navbarTitle) {
        navbarTitle.innerHTML = 'ТЕСТЫ';
    }

    pageContentElement.innerHTML = `<p class="first-content">${text}</p>`;
    clearActiveNavbarItem();
}

function clearActiveNavbarItem() {
    document.querySelectorAll('.test-list__item').forEach(item => {
        item.classList.remove('active');
    });
}