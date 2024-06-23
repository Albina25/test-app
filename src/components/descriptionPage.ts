import { Test } from '@/types';
import { loadTemplate } from '@/app';
import { loadQuestionPage } from '@/components/questionsPage';

export async function loadDescriptionPage(test: Test) {
   const pageContent = document.getElementById('page-content') as HTMLElement;
      if (pageContent) {
         const url = './components/templates/description.html';
         const isLoadDescriptionTemplate = await loadTemplate(url, pageContent);
         if (!isLoadDescriptionTemplate) return;

         const testDescription = document.getElementById('test-description');
         if (testDescription) testDescription.innerHTML = test.description;

         document.getElementById('start-test-button')?.addEventListener('click', () => {
            loadQuestionPage(test, pageContent);
         });

         document.getElementById('cancel-button')?.addEventListener('click', () => {
             pageContent.innerHTML = '<p class="first-content">Выберите тест из списка</p>';
         });
     }
}