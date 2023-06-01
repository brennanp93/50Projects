const sections = document.querySelectorAll(".section");

sections.forEach((section) => {
  section.addEventListener("click", () => {
    removeActiveClasses();
    section.classList.add("active");
  });
});

function removeActiveClasses() {
  sections.forEach((section) => {
    section.classList.remove("active");
  });
}
console.log(sections)