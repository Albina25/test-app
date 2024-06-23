import { Test, UserAnswer } from '@/types';
import { loadResultPage } from '@/components/resultPage';
import { formatTimer } from "@/composables/timer";
import { loadTemplate } from '@/app';

let totalQuestions: number = 0;
let answeredQuestions: Array<UserAnswer> = [];
let timerInterval: number = 0;
let time: number = 0;
const maxTime: number = 600;
let currentTest: Test;
let pageContentElement: HTMLElement;

export async function loadQuestionPage(test: Test, pageContent: HTMLElement) {
    time = 0;
    answeredQuestions = [];
    if (pageContent) {
        pageContentElement = pageContent;
        currentTest = test;
        startTimer();

        const isLoadQuestionsTemplate: boolean = await loadTemplate('./components/templates/questions.html', pageContent);
        if (!isLoadQuestionsTemplate) {
            return;
        }
        const testTitle = document.querySelector('.questions-header__title');
        if (testTitle && window.innerWidth >= 768) testTitle.innerHTML = test.title;

        const questionsContainer = document.querySelector('.questions-content');
        if (questionsContainer) {
            test.questions.forEach(question => {
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

                questionElement.addEventListener('click', (event) => {
                    const target = event.target as HTMLInputElement;
                    if (!target.value) {
                        return;
                    }
                    if (target.closest('.question__answers_item')) {
                        answerQuestion(question.id, Number(target.value));
                    }
                });
            });
        }

        setTotalQuestions(test);

        document.getElementById('complete-test-button')?.addEventListener('click', () => {
            completeTest(test);
        });

        document.querySelector('.button_cancel-answers')?.addEventListener('click', () => {
            answeredQuestions = [];
            resetAllInputs();
            updateProgress();
        });

        document.querySelector('.button_exit')?.addEventListener('click', openModal);
    }
}

function openModal() {
    const modal = document.querySelector('.modal') as HTMLElement;
    const background = document.querySelector('.modal .background') as HTMLElement;
    if (modal) {
        modal.style.display = 'block';
        stopTimer();

        const modalExitButton = document.getElementById('confirm-modal-exit');
        const modalCancelButton = document.getElementById('cancel-modal-exit');

        if (modalExitButton && modalCancelButton) {
            modalExitButton.addEventListener('click', () => {
                pageContentElement.innerHTML = '<p class="first-content">Выберите тест из списка</p>';
                modal.style.display = 'none';
            });

            modalCancelButton.addEventListener('click', () => {
                clodeModal(modal);
            });

            window.addEventListener('click', function(event) {
                if (event.target === background) {
                    clodeModal(modal);
                }
            });
        }
    }
}

function clodeModal(modal: HTMLElement) {
    modal.style.display = 'none';
    startTimer();
}

function answerQuestion(questionId: number, answerId: number) {
    const isAnsweredThisQuestion = answeredQuestions.findIndex(question => question.questionId === questionId);
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

function setTotalQuestions(test: Test) {
    const totalAnswersElement= document.querySelector('.questions-header__progress_total');
    if (totalAnswersElement) {
        totalQuestions = test.questions.length;
        totalAnswersElement.innerHTML = String(totalQuestions);
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
    loadResultPage(test, answeredQuestions, time);
}
