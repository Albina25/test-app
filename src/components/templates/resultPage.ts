import { Test } from '@/types';
//import { loadTemplate } from '@/main';

export async function loadResultPage(test: Test, pageContent: HTMLElement) {
    if (pageContent) {

    }
}

async function loadTemplate(url: string): Promise<string> {
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