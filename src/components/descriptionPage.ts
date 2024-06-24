import { Test } from '@/types';
import {loadMainPage, loadTemplate} from '@/app';
import { loadQuestionPage } from '@/components/questionsPage';

let currentTest: Test;

let pageContent: HTMLElement | null;
let startTestButton: HTMLElement | null;
let cancelButton: HTMLElement | null;

export async function loadDescriptionPage(test: Test) {
   currentTest = test;
   pageContent = document.getElementById('page-content') as HTMLElement;
      if (pageContent) {
         const url = './components/templates/description.html';
         const isLoadDescriptionTemplate = await loadTemplate(url, pageContent);
         if (!isLoadDescriptionTemplate) return;

         const testDescription = document.getElementById('test-description');
         if (testDescription) testDescription.innerHTML = test.description;

         startTestButton = document.getElementById('start-test-button');
         startTestButton?.addEventListener('click', () => {
            loadQuestionPage(test, pageContent!);
         });

         cancelButton = document.getElementById('cancel-button');
         cancelButton?.addEventListener('click', handleCancel);
     }
}

function handleCancel() {
   if (pageContent) {
      removeListening();
      loadMainPage(pageContent);
   }
}

function removeListening() {
   startTestButton?.removeEventListener('click', () => {
      loadQuestionPage(currentTest, pageContent!);
   });
   cancelButton?.removeEventListener('click', handleCancel);
}