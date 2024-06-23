export async function loadTemplate(url: string, pageContent: HTMLElement) {
    const response = await fetch(url);
    if (response.ok) {
        pageContent.innerHTML = await response.text();
        return true;
    }
    pageContent.innerHTML = `<p class="first-content">Непредвиденная ошибка</p>`;
    return false;
}