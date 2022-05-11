export const studentsList = document.getElementById('students-list');
export const addNewButton = document.getElementById('add-new-button');

export const displayNewElement = (student, scoreboard) => {
  // Shows the added student in html
  const studentDiv = document.createElement('div');
  studentDiv.classList.add('student');

  studentDiv.innerHTML = `
  <div class="student-store">
    <h2 class="student-title">${student.title}:</h2>
    <p class="student-score"> ${student.score}</p>
  </div>
  `;

  studentsList.appendChild(studentDiv);

  if (scoreboard.students.length === 0) {
    studentsList.innerHTML = `
        <p class="empty-scoreboard">No Score Yet.</p>
      `;
  }
};