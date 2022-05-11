import './index.css';
import Scoreboard from './modules/scoreboard.js';
import Student from './modules/student.js';
import {displayNewElement, studentsList} from './modules/scoreList.js';

const scoreboard = new Scoreboard();

// Display all students when the page is loaded
if (scoreboard.students.length === 0) {
  studentsList.innerHTML = `
        <p class="empty-scoreboard">No Score Yet.</p>
      `;
} else {
  scoreboard.students.forEach((student) => {
    displayNewElement(student, scoreboard);
  });
}

// Add Event Listener on Add student button
const addStudentForm = document.getElementById('add-student-form');
addStudentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (scoreboard.students.length === 0) {
    studentsList.innerHTML = '';
  }
  const result = scoreboard.addStudent(
    new Student(addStudentForm.elements.title.value, addStudentForm.elements.score.value),
  );
  if (result) {
    displayNewElement(result, scoreboard);
  }
  addStudentForm.elements.title.value = '';
  addStudentForm.elements.score.value = '';
});