import { Question, Test, UserAnswer } from '@/types';
import { loadResultPage } from '@/components/resultPage';
import { formatTimer } from "@/composables/timer";
import { loadMainPage, loadTemplate } from '@/app';

let totalQuestions: number = 0;
let answeredQuestions: Array<UserAnswer> = [];
let timerInterval: number = 0;
let time: number = 0;
const maxTime: number = 600;
let currentTest: Test;

let pageContentElement: HTMLElement;
let completeTestButton: HTMLElement | null;
let cancelAnswersButton: HTMLElement | null;
let exitButton: HTMLElement | null;
let modalExitButton: HTMLElement | null;
let modalCancelButton: HTMLElement | null;
let modal: HTMLElement | null;
let background : HTMLElement | null;

export async function loadQuestionPage(test: Test, pageContent: HTMLElement) {
    time = 0;
    answeredQuestions = [];
    if (pageContent) {
        pageContentElement = pageContent;
        currentTest = test;

        const isLoadQuestionsTemplate: boolean = await loadTemplate('./components/templates/questions.html', pageContent);
        if (!isLoadQuestionsTemplate) {
            return;
        }

        startTimer();
        setTitle();
        displayQuestions();
        setTotalQuestions(test);
        setListening();
    }
}

function setTitle() {
    const testTitle = document.querySelector('.questions-header__title');
    if (testTitle && window.innerWidth >= 768) testTitle.innerHTML = currentTest.title;
}

function displayQuestions() {
    const questionsContainer = document.querySelector('.questions-content');
    if (questionsContainer) {
        currentTest.questions.forEach(question => {
            const questionElement = document.createElement('div');
            questionElement.innerHTML = `
                    <div class="question">
                        <p class="question__title">${question.id}. ${question.value}</p>
                        <div class="question__answers">
                            ${question.answers.map(answer => `
                                <label class="question__answers_item">
                                    <input 
                                        type="radio" 
                                        class="question__answers_input" 
                                        name="question-${question.id}" 
                                        value="${answer.id}"
                                    >
                                ${answer.value}
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `;
            questionsContainer.appendChild(questionElement);

            questionElement.addEventListener('click', (event) => handleAnswerClick(event, question));
        });
    }
}

function setTotalQuestions(test: Test) {
    const totalAnswersElement= document.querySelector('.questions-header__progress_total');
    if (totalAnswersElement) {
        totalQuestions = test.questions.length;
        totalAnswersElement.innerHTML = String(totalQuestions);
    }
}

function setListening() {
    completeTestButton = document.getElementById('complete-test-button')
    completeTestButton?.addEventListener('click', () => {
        completeTest(currentTest);
    });

    cancelAnswersButton = document.querySelector('.button_cancel-answers');
    cancelAnswersButton?.addEventListener('click', cancelAnswers);

    exitButton = document.querySelector('.button_exit');
    exitButton?.addEventListener('click', openModal);
}

function cancelAnswers() {
    answeredQuestions = [];
    resetAllInputs();
    updateProgress();
}

function handleAnswerClick(event: MouseEvent, question: Question) {
    const target = event?.target as HTMLInputElement;
    if (!target.value) {
        return;
    }
    const closestItem = target.closest('.question__answers_item');
    if (closestItem) {
        answerQuestion(question.id, Number(target.value));
    }
}

function openModal() {
    modal = document.querySelector('.modal') as HTMLElement;
    background = document.querySelector('.modal .background') as HTMLElement;
    if (modal) {
        modal.style.display = 'block';
        stopTimer();

        modalExitButton = document.getElementById('confirm-modal-exit');
        modalCancelButton = document.getElementById('cancel-modal-exit');

        if (modalExitButton && modalCancelButton) {
            modalExitButton.addEventListener('click', handleExit);
            modalCancelButton.addEventListener('click', stayInThisPage);
            background.addEventListener('click', stayInThisPage);
        }
    }
}

function stayInThisPage() {
    closeModal();
    startTimer();
}

function closeModal() {
    if (modal) {
        modal.style.display = 'none';
    }
    removeListeningModalButtons();
}

function handleExit() {
    removeListening();
    removeListeningModalButtons();
    closeModal();
    loadMainPage(pageContentElement);
}

function answerQuestion(questionId: number, answerId: number) {
    const isAnsweredThisQuestion: number = answeredQuestions.findIndex(question => question.questionId === questionId);
    if (isAnsweredThisQuestion < 0) {
        const answer: UserAnswer = {
            questionId: questionId,
            answerId: answerId,
        }
        answeredQuestions.push(answer);
    }
    updateProgress();
}

function updateProgress() {
    const progressAnsweredElement= document.querySelector('.questions-header__progress_answered');
    const totalAnswersElement= document.querySelector('.questions-header__progress_total');
    if (progressAnsweredElement && totalAnswersElement) {
        progressAnsweredElement.textContent = String(answeredQuestions.length);
        totalAnswersElement.textContent = String(totalQuestions);
    }
}

function resetAllInputs() {
    const inputs = document.querySelectorAll('input[type="radio"]');
    inputs.forEach(input  => {
        if (input instanceof HTMLInputElement) {
            input.checked = false;
        }
    });
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = 0;
}

function updateTimer() {
    time++;
    if (time >= maxTime) {
        completeTest(currentTest);
    } else {
        updateTimerDisplay();
    }
}

function updateTimerDisplay() {
    const formattedTimer = formatTimer(time);
    const timerElement  = document.querySelector('.questions-header__time');
    if (timerElement && timerElement instanceof HTMLElement) {
        timerElement.innerText = formattedTimer;
    }
}

function completeTest(test: Test) {
    sessionStorage.setItem(String(test.title), JSON.stringify(answeredQuestions));
    removeListening();
    loadResultPage(test, answeredQuestions, time);
}

function removeListening() {
    completeTestButton?.removeEventListener('click', () => {
        completeTest(currentTest);
    });
    cancelAnswersButton?.removeEventListener('click', cancelAnswers);
    exitButton?.removeEventListener('click', openModal);
}

function removeListeningModalButtons() {
    modalCancelButton?.removeEventListener('click', () => {
        closeModal();
    });
    modalExitButton?.removeEventListener('click', handleExit);
    background?.removeEventListener('click', stayInThisPage);
}
