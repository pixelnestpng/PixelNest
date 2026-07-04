// ======================
// Image Viewer
// ======================

const viewer = document.getElementById("imageViewer");
const viewerImg = document.getElementById("viewerImg");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".card img").forEach(img => {
    img.addEventListener("click", function () {
        viewer.style.display = "flex";
        viewerImg.src = this.src;
    });
});

closeBtn.addEventListener("click", function () {
    viewer.style.display = "none";
});

viewer.addEventListener("click", function (e) {
    if (e.target === viewer) {
        viewer.style.display = "none";
    }
});


// ======================
// Search + Filter
// ======================

const search = document.getElementById("search");
const cards = document.querySelectorAll(".card");
const filterButtons = document.querySelectorAll(".place a");
const noResults = document.getElementById("noResults");

let currentFilter = "all";

function updateGallery() {

    const value = search ? search.value.toLowerCase() : "";

    let visibleCards = 0;

    cards.forEach(card => {

        const title = card.querySelector(".image-title").textContent.toLowerCase();

        const matchSearch = title.includes(value);
        const matchFilter =
            currentFilter === "all" || card.classList.contains(currentFilter);

        if (matchSearch && matchFilter) {
            card.style.display = "block";
            visibleCards++;
        } else {
            card.style.display = "none";
        }

    });

    if (noResults) {
        if (visibleCards === 0) {
            noResults.style.display = "block";
        } else {
            noResults.style.display = "none";
        }
    }

}


// ======================
// Search
// ======================

if (search) {

    search.addEventListener("keyup", updateGallery);

}


// ======================
// Filter
// ======================

filterButtons.forEach(button => {

    button.addEventListener("click", function (e) {

        e.preventDefault();

        filterButtons.forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        currentFilter = this.dataset.filter;

        updateGallery();

    });

});


// ======================
// First Load
// ======================

updateGallery();

// ======================
// Theme
// ======================

const themeToggle = document.getElementById("theme-toggle");
const icon = themeToggle.querySelector("i");

// تحميل الوضع المحفوظ
if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark");

    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");

}

themeToggle.addEventListener("click", function(e){

    e.preventDefault();

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    }else{

        localStorage.setItem("theme","light");

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }

});


window.addEventListener("load", function () {

    const gallery = document.querySelector(".gallery");
    const cards = Array.from(gallery.children);

    // خلط عشوائي (Shuffle)
    cards.sort(() => Math.random() - 0.5);

    // إعادة ترتيبهم في الصفحة
    cards.forEach(card => gallery.appendChild(card));

});
