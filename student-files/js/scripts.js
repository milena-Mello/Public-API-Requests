async function getStudentData() {
  const response = await fetch('https://randomuser.me/api/?results=12');
  const data = await response.json();
  displayStudentData(data);
}

function displayStudentData(data) {
    const students = data.results;
    let studentHTML = students.map(student => 
        `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${student.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${student.name.first} ${student.name.last}</h3>
            <p class="card-text">${student.email}</p>
            <p class="card-text cap">${student.location.city}, ${student.location.state}</p>
        </div>
    </div>`).join('');
    document.querySelector('.gallery').insertAdjacentHTML('beforeend', studentHTML);
};

getStudentData();