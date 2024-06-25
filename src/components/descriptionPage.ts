import { Test, storageTest } from '@/types';
import {loadMainPage, loadTemplate} from '@/app';
import { loadQuestionPage } from '@/components/questionsPage';
import {loadResultPage} from "@/components/resultPage";

let currentTest: Test;
let previousResultTest: storageTest | null;

let pageContent: HTMLElement | null;
let startTestButton: HTMLElement | null;
let cancelButton: HTMLElement | null;
let previousResultButton: HTMLElement | null;

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

         previousResultButton = document.getElementById('previous-result-button');
         if (previousResultButton) {
            const hasPreviousResultTest: boolean = getStorageTest(currentTest.title);
            if (hasPreviousResultTest) {
               previousResultButton?.addEventListener('click', showPreviousResultTest);
            } else {
               previousResultButton.style.display = 'none';
            }
         }
     }
}

function handleCancel() {
   if (pageContent) {
      removeListening();
      loadMainPage('Выберите тест из списка', pageContent);
   }
}

function getStorageTest(testName: string) {
   const storedTest = sessionStorage.getItem(testName);
   if (storedTest) {
      previousResultTest = JSON.parse(storedTest);
      return true;
   }
   return false;
}

function showPreviousResultTest() {
   if (previousResultTest && previousResultTest.userAnswers.length) {
      loadResultPage(currentTest, previousResultTest?.userAnswers, previousResultTest?.spentTime);
   }
}

function removeListening() {
   startTestButton?.removeEventListener('click', () => {
      loadQuestionPage(currentTest, pageContent!);
   });
   cancelButton?.removeEventListener('click', handleCancel);
   previousResultButton?.removeEventListener('click', handleCancel);
}