const teachersCarousel = document.querySelector(".teachers-carousel");
const studentsCarousel = document.querySelector(".students-carousel");
const exStudentsCarousel = document.querySelector(".ex-students-carousel");

const leftTeachersBtn = document.getElementById("leftTeachers");
const rightTeachersBtn = document.getElementById("rightTeachers");
const leftStudentsBtn = document.getElementById("leftStudents");
const rightStudentsBtn = document.getElementById("rightStudents");
const leftExStudentsBtn = document.getElementById("leftExStudents");
const rightExStudentsBtn = document.getElementById("rightExStudents");

// Lógica para Teachers
leftTeachersBtn.addEventListener("click", () => {
    teachersCarousel.scrollLeft -= teachersCarousel.offsetWidth;
});
rightTeachersBtn.addEventListener("click", () => {
    teachersCarousel.scrollLeft += teachersCarousel.offsetWidth;
});

// Lógica para Students
leftStudentsBtn.addEventListener("click", () => {
    studentsCarousel.scrollLeft -= studentsCarousel.offsetWidth;
});
rightStudentsBtn.addEventListener("click", () => {
    studentsCarousel.scrollLeft += studentsCarousel.offsetWidth;
});

// Lógica para Ex Students
leftExStudentsBtn.addEventListener("click", () => {
    exStudentsCarousel.scrollLeft -= exStudentsCarousel.offsetWidth;
});
rightExStudentsBtn.addEventListener("click", () => {
    exStudentsCarousel.scrollLeft += exStudentsCarousel.offsetWidth;
});

// Función para verificar la visibilidad de los botones de flecha
const checkArrowVisibility = (carousel, leftBtn, rightBtn) => {
    if (carousel.scrollLeft === 0) {
        leftBtn.style.display = "none"; // Oculta el botón izquierdo al principio
    } else {
        leftBtn.style.display = "block";
    }

    if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth) {
        rightBtn.style.display = "none"; // Oculta el botón derecho al final
    } else {
        rightBtn.style.display = "block";
    }
};

// Verifica la visibilidad de los botones de flecha al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    checkArrowVisibility(teachersCarousel, leftTeachersBtn, rightTeachersBtn);
    checkArrowVisibility(studentsCarousel, leftStudentsBtn, rightStudentsBtn);
    checkArrowVisibility(exStudentsCarousel, leftExStudentsBtn, rightExStudentsBtn);
});

// Añade event listeners para verificar la visibilidad al hacer scroll
teachersCarousel.addEventListener("scroll", () => {
    checkArrowVisibility(teachersCarousel, leftTeachersBtn, rightTeachersBtn);
});
studentsCarousel.addEventListener("scroll", () => {
    checkArrowVisibility(studentsCarousel, leftStudentsBtn, rightStudentsBtn);
});
exStudentsCarousel.addEventListener("scroll", () => {
    checkArrowVisibility(exStudentsCarousel, leftExStudentsBtn, rightExStudentsBtn);
});
