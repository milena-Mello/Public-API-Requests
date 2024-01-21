const searchContainer = document.querySelector('.search-container');
const gallery = document.querySelector('.gallery');
let studentData = [];

// Request data from API:
async function getStudentData() {
  const response = await fetch('https://randomuser.me/api/?results=12&nat=us');
  const data = await response.json();
  studentData = data;
  displayStudentData(data);
  searchBar();
}

// Search bar:
function searchBar() {
    const searchHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
    searchContainer.insertAdjacentHTML('beforeend', searchHTML);
    const searchInput = document.querySelector('#search-input');
    const searchSubmit = document.querySelector('#search-submit');
    searchSubmit.addEventListener('click', (event) => {
        event.preventDefault();
        const searchValue = searchInput.value.toLowerCase();
        const studentCards = document.querySelectorAll('.card');
        for(let i = 0; i < studentCards.length; i++) {
            const studentName = studentCards[i].querySelector('#name').textContent.toLowerCase();
            if(studentName.includes(searchValue)) {
                studentCards[i].style.display = '';
            } else {
                studentCards[i].style.display = 'none';
            }
        }
    });

}

// Display student data:
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
    gallery.insertAdjacentHTML('beforeend', studentHTML);
};

// Event Listener for click into student card:
gallery.addEventListener('click', (event) => {
    const galleryCard = event.target.closest('.card');
    if(galleryCard){
     const galleryCardName = event.target.closest('.card').querySelector('#name').textContent;
     const studentName = studentData.results.find(student => student.name.first + ' ' + student.name.last === galleryCardName);
     displayStudentModal(studentName);
} else {
    return;
}
});

// Display student modal:
function displayStudentModal(studentName) {
    const birthdayDate = new Date(studentName.dob.date);
    const formattedDate = birthdayDate.toLocaleDateString("en-US", { day: '2-digit', month: '2-digit', year: 'numeric' });
    const modalHTML = `
    <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${studentName.picture.medium}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${studentName.name.first} ${studentName.name.last}</h3>
                        <p class="modal-text">${studentName.email}</p>
                        <p class="modal-text cap">${studentName.location.city}</p>
                        <hr>
                        <p class="modal-text">${studentName.phone}</p>
                        <p class="modal-text">${studentName.location.street.number} ${studentName.location.street.name}, ${studentName.location.state}, ${studentName.location.postcode}</p>
                        <p class="modal-text">Birthday: ${formattedDate}</p>
                    </div>
                </div>`;
    gallery.insertAdjacentHTML('afterend', modalHTML);
    const modal = document.querySelector('.modal-container');
    const btnClose = document.querySelector('.modal-close-btn');
    modal.style.display = 'block';

    // Close modal:
    btnClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// Call API function:
getStudentData();