import { Test } from '@/types';
//import { loadTemplate } from '@/main';
import { loadTestPage } from '@/components/questionsPage';

export async function loadDescriptionPage(test: Test) {
   const pageContent = document.getElementById('page-content') as HTMLElement;
      if (pageContent) {
         const url = './components/templates/description.html';
         const descriptionTemplate = await loadTemplate(url);
         if (descriptionTemplate) {
            pageContent.innerHTML = descriptionTemplate;
            const testDescription = document.getElementById('test-description');
            if (testDescription) testDescription.innerHTML = test.description;

            document.getElementById('start-test-button')?.addEventListener('click', () => {
                loadTestPage(test, pageContent);
            });

            document.getElementById('cancel-button')?.addEventListener('click', () => {
                pageContent.innerHTML = '';
            });
         } else {
            console.error('Failed to load description template');
         }
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