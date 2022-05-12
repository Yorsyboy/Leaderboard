import './index.css';
import GameID from './modules/gameID.js';
import Student from './modules/student.js';
import callAPI from './modules/api.js';

const gameID = new GameID();

const addRecentStudent = (gameID, {
  title, score,
}) => {
  const studentsList = document.getElementById('students-list');

  const newStudentsList = document.createElement('li');
  newStudentsList.innerHTML = `
    <p>${title}: ${score}</p>
  `;

  if (gameID.scores.length === 0) {
    studentsList.innerHTML = '';
  }

  studentsList.appendChild(newStudentsList);
  gameID.addNewScore(new Student(title, score));
};

const studentListener = async (gameID) => {
  const studentForm = document.getElementById('add-student-form');
  const newScore = new Student(studentForm.elements.title.value, studentForm.elements.score.value);
  const isAPI = await callAPI.addNewScore(gameID.gameID, {
    user: newScore.title,
    score: newScore.score,
  });
  if (isAPI === null) {
    return;
  }

  addRecentStudent(gameID, {
    title: newScore.title,
    score: newScore.score,
  });

  studentForm.reset();
};

const refreshButtonEventListener = async (gameID) => {
  const studentsList = document.getElementById('students-list');
  studentsList.innerHTML = `
    <p class="inner-text">Hold on Refresh in progress...</p>
  `;

  const data = await callAPI.getScores(gameID.gameID);
  if (data === null) {
    return;
  }

  data.sort((a, b) => b.score - a.score);

  gameID.clearArray();
  studentsList.innerHTML = '';

  data.forEach((score) => {
    addRecentStudent(gameID, {
      title: score.user,
      score: score.score,
    });
  });

  if (gameID.scores.length === 0) {
    document.getElementById('students-list').innerHTML = `
      <p class="inner-text">No Scores yet.</p>
    `;
  }
};

document.getElementById('students-list').innerHTML = `
  <p class="inner-text">No Scores Yet.</p>
`;

document.getElementById('add-student-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  await studentListener(gameID);
});

document.getElementById('refresh-score').addEventListener('click', async (e) => {
  e.preventDefault();
  await refreshButtonEventListener(gameID);
});