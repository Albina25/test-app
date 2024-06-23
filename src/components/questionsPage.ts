import {Test, UserAnswer} from '@/types';
import { loadResultPage } from '@/components/resultPage';
import { formatTimer } from "@/composables/timer";
//import { loadTemplate } from '@/main';

let totalQuestions: number = 0;
let answeredQuestions: Array<UserAnswer> = [];
let timerInterval: number = 0;
let time: number = 0;
const maxTime: number = 600;
let currentTest: Test;

export async function loadQuestionPage(test: Test, pageContent: HTMLElement) {
    time = 0;
    if (pageContent) {
        startTimer();
        currentTest = test;
        const questionsTemplate = await loadTemplate('./components/templates/questions.html');
        pageContent.innerHTML = questionsTemplate;
        const testTitle = document.querySelector('.questions-header__title');
        if (testTitle) testTitle.innerHTML = test.title;

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
    }
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