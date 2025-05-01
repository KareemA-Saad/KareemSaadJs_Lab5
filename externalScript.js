// imgs
let slideImage = document.images[0];
let caption = document.getElementById('caption');

// Buttons
let prevBtn = document.getElementById('prevBtn');
let nextBtn = document.getElementById('nextBtn');
let slideshowBtn = document.getElementById('slideshowBtn');
let stopBtn = document.getElementById('stopBtn');

let slideshowInterval
let currentIndex = 0;


// Set up image information
let imagePaths = [
    "imgs/1.png",
    "imgs/2.png",
    "imgs/3.jpg"
];

let imageCaptions = [
    "Image 1",
    "Image 2",
    "Image 3"
];

// NEXT BUTTON function
function nextImage() {
    currentIndex++;
    if (currentIndex >= imagePaths.length) {
        currentIndex = 0;
    }
    slideImage.src = imagePaths[currentIndex];
    caption.textContent = imageCaptions[currentIndex];
}

// PREVIOUS BUTTON function
function prevImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = imagePaths.length - 1;
    }
    slideImage.src = imagePaths[currentIndex];
    caption.textContent = imageCaptions[currentIndex];
}

// SLIDESHOW function
function startSlideshow() {
    stopSlideshow();
    slideshowInterval = setInterval(nextImage, 2000);
}

// STOP SLIDESHOW function
function stopSlideshow() {
    clearInterval(slideshowInterval);
}

//event listeners for connecting buttons to functions
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);
slideshowBtn.addEventListener('click', startSlideshow);
stopBtn.addEventListener('click', stopSlideshow);





//================================================================================================//


// Question 2

//handling student data and validation
let studs = [];
let sName= document.getElementById("studentName");
let sGrade= document.getElementById("studentGrade");
let nameError = document.getElementById("nameError");
let gradeError = document.getElementById("gradeError");

//submit button
let sButton= document.getElementById("addbtn");

//sorting selection
let studentsortable= document.getElementById("sortSelect");
//filter selection
let filterSelect = document.getElementById("filterSelect");

//table of values
let sTable = document.getElementById("studentTable");
let studentTBody = document.getElementById("tBodies");

// Function to update the table
sButton.addEventListener("click", function(event) {
    event.preventDefault();
    // Get input values and Capitalize the first letter of the name
    let rawName = sName.value.trim();
    let name = rawName.slice(0,1).toUpperCase() + rawName.slice(1).toLowerCase();
    let grade = sGrade.value;
    let deptValue = document.getElementById("dept").value; // Add this line
    
    // Validate inputs
    let valid = true;
//Name  empty and repetead validation
    if (name === "") {
        nameError.textContent = "Name is required";
        console.log(nameError.textContent);
        
        return;
    } else if (studs.find(s => s.name === name)) {
        nameError.textContent = "Name already exists."
    valid = false;}
        else {
            nameError.textContent = "";
        }
    

//grade empty validation
    if (grade === "" || isNaN(grade) || grade < 0 || grade > 100) {
        gradeError.textContent = "Grade must be a number between 0 and 100";
        valid = false;
        console.log(gradeError.textContent);
        
    } else {
        gradeError.textContent = "";
    }

    if (valid) {
        studs.push({ name: name, grade: parseInt(grade), dept: deptValue });
        sName.value = "";
        sGrade.value = "";
        renderTable();
        
      }
});


// Delete student function
function deleteStudent(index) {
    studs.splice(index, 1);
    renderTable();
}

studentsortable.addEventListener("change", renderTable);
filterSelect.addEventListener("change", renderTable);

// Render table based on data, filter, and sort
function renderTable() {
    let data = [...studs];

    // Filter
    const filter = filterSelect.value;
    if (filter === "failed") {
        data = data.filter(s => s.grade < 60);
    } else if (filter === "success") {
        data = data.filter(s => s.grade >= 60);
    }

    // Sort
    const sort = studentsortable.value;
    if (sort === "name") {
        data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "grade") {
        data.sort((a, b) => a.grade - b.grade);
    }

    // Clear existing table rows
    studentTBody.innerHTML = "";

    // Add rows to table
    data.forEach((student, index) => {
        let row = document.createElement("tr");
        
        // Add grade-based coloring
        if (student.grade >= 75) {
            row.style.backgroundColor = "green";
        } else if (student.grade >= 60) {
            row.style.backgroundColor = "yellow"; // Light yellow
        } else {
            row.style.backgroundColor = "red"; // Light red
        }

        let nameCell = document.createElement("td");
        let gradeCell = document.createElement("td");
        let deptCell = document.createElement("td");
        let optionCell = document.createElement("td");

        nameCell.textContent = student.name;
        gradeCell.textContent = student.grade;
        deptCell.textContent = student.dept;
        
        // Create delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function() {
            deleteStudent(studs.indexOf(student));
        });
        
        optionCell.appendChild(deleteBtn);
        
        row.appendChild(nameCell);
        row.appendChild(gradeCell);
        row.appendChild(deptCell);
        row.appendChild(optionCell);
        
        studentTBody.appendChild(row);
    });
}