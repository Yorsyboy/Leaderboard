import storageAvailable from './storageAvailable.js';

export default class Scoreboard {
  // scoreboard class consists of a list of students
  students = [];

  constructor() {
    this.students = [];
    const localStudentsData = localStorage.getItem('students');
    if (localStudentsData) {
      this.students = JSON.parse(localStudentsData);
    }
  }

  studentExists(student) {
    // Check if a student exists
    for (let i = 0; i < this.students.length; i += 1) {
      if (this.students[i].title === student.title && this.students[i].score === student.score) {
        return true;
      }
    }
    return false;
  }

  addStudent(student) {
    // Add a new student to the list of students
    if (!this.studentExists(student)) {
      this.students.push(student);
      this.updateLocalStorage();
      return student;
    }
    // eslint-disable-next-line no-alert
    alert('The Name exist');
    return null;
  }

  updateLocalStorage() {
    // Updates the Local Storage
    if (storageAvailable('localStorage')) {
      localStorage.setItem('students', JSON.stringify(this.students));
    }
  }
}