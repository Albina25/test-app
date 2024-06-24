export async function loadTemplate(url: string, pageContent: HTMLElement) {
    const response = await fetch(url);
    if (response.ok) {
        pageContent.innerHTML = await response.text();
        return true;
    }
    pageContent.innerHTML = `<p class="first-content">Непредвиденная ошибка</p>`;
    return false;
}

export function loadMainPage(pageContentElement: HTMLElement) {
    const navbarTitle = document.querySelector('.navbar__title') as HTMLElement;
    navbarTitle.innerHTML = 'ТЕСТЫ';
    pageContentElement.innerHTML = '<p class="first-content">Выберите тест из списка</p>';
}