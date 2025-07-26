// When user clicks mobile button, toggle between hiding and showing the content
function navFunction() {
    document.getElementById("myDropdown").classList.toggle("show"); //class.List used to toggle a specific class 
}

// Hide Box when user clicks elsewhere on the screen
window.onclick = function(event) {
    // This function is used to check if the event target matches a specific CSS selector.
    if (!event.target.matches('.menu')) {
        var dropdowns = document.getElementsByClassName("content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function generateNavigation(currentPage) {
    let navItems = [
        ["Home", "index.html"],
        ["Gallery", "gallery.html"],
        ["About Me", "aboutme.html"],
        ["Contact Me", "contactme.html"],
        ["My Page", "mypage.html"]
    ];
    
    let navHTML = '<nav class="navigation"><div class="dropDown"><button onclick="navFunction()" class="menu">&#9776;</button></div><ul id="myDropdown" class="content">';
    
        // Loop through the navigation items
        for (let i = 0; i < navItems.length; i++) {
            let pageName = navItems[i][0];
            let pageLink = navItems[i][1];
    
            // If the current page matches, display without a hyperlink
            if (currentPage === pageLink) {
                navHTML += `<li><span class="current">${pageName}</span></li>`;
            } else {
                navHTML += `<li><a href="${pageLink}">${pageName}</a></li>`;
            }
        }
    
        navHTML += '</ul></nav>';
    
        // Inject into the page
        document.getElementById("navContainer").innerHTML = navHTML;
}

function footerGenerator(footerPage) {
    let footerItems = [
        ["Wireframes", "wireframes.html"],
        ["Comments", "comments.html"]
    ];

    let footerHTML = `<ul>`

    for (let i = 0; i < footerItems.length; i++) {
        let pageName = footerItems[i][0];
        let pageLink = footerItems[i][1];

        // If the current page matches, display without a hyperlink
        if (footerPage === pageLink) {
            footerHTML += ``;
        } else {
            footerHTML += `<li><a href="${pageLink}">${pageName}</a></li>`;
        }
    }

    footerHTML += '</ul>';
    
    // Inject into the page
    document.getElementById("footerContainer").innerHTML = footerHTML;
}

// Change aboutme.html image on mouseover
function changeImage(x, image) {
    image.style.opacity = 0;
    setTimeout(() => {
        if (x === 1) {
            image.src = "assets/images/AboutMe1.jpeg"
        } else if (x === 2) {
            image.src ="assets/images/AboutMe2.jpeg"
        }
      image.style.opacity = 1;
    }, 300);   
}

// Local Storage Name Function
window.addEventListener("DOMContentLoaded", () => {

    // Check if the user is currently on the homepage
    // This returns true if the URL path is '/' or ends in 'index.html'
    const isHome = location.pathname === "/" || location.pathname.endsWith("index.html");

    // If we are not on home page, skip message
    if(!isHome) return;

    // The HTML element where we will show message
    const welcome = document.getElementById("welcomeMessage");
    // The element only exists on homepage
    if(!welcome) return;

    // Get the users name from local storage if it is saved already
    let name = localStorage.getItem("userName");

    // Get the number of time they have visited the home page
    let visits = localStorage.getItem("visitCount");
  
    // If no name exists in local storage, prompt the user to enter one
    if (!name) {
    
        // First visit: ask for name
        name = prompt("Welcome! What is your name?");

        // If user does not enter a name, use "Guest" instead
        if (!name || name.trim() === "") name = "Guest";

        // Save the name in local storage
        localStorage.setItem("userName", name);

        // Save initial visit as 1
        localStorage.setItem("visitCount", "1");

        // Set variable so we can use it later
        visits = 1;

        // Display welcome message for first time visitor
        welcome.innerHTML = `Hello, <em><strong>${name}!</strong></em> Welcome to your first visit.`;
    
    // If user has entered name and been on the home page before
    } else {

        // Only increment if on home page
        if (isHome) {

            // Grab visit count from local storage and increment by 1
            visits = parseInt(visits) + 1;

            // Add the new value back to local storage
            localStorage.setItem("visitCount", visits);
        }

        // Show welcome back message and visit count
        welcome.innerHTML = `Welcome back, <em><strong>${name}!</strong></em> You've visited the home page <em><strong>${visits}</strong></em> times.`;
    }
});

// Check if we are on home page
document.addEventListener("DOMContentLoaded", () => {
    const clearBtn = document.getElementById("clearStorage");

    // Is there a clear data button?
    if (!clearBtn) return;

    // Clear Data
    clearBtn.addEventListener("click", () => {
      localStorage.clear();
      location.reload();
    });
});

// Carousel

// Get elements needed from HTML
const imageEl = document.getElementById("carouselImage");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// Validate that these elements are on page
if(imageEl && prevBtn && nextBtn) {
    // Array of image paths
    const images = [
        "./assets/images/visualizer.png",
        "./assets/images/toDoList.png",
        "./assets/images/ideaGenerator.png",
        "./assets/images/jobTracker.png",
        "./assets/images/colorPalette.png"
    ];

    // Keep track of which image is currently showing (start at 0)
    let currentIndex = 0;



    // auto change every 5 seconds
    let timer = setInterval(showNextImage, 5000); 

    // Update img element src attribute based on currentIndex
    function updateImage() {
        imageEl.src = images[currentIndex];
    }

    // Show next image (if at the last image wrap back around to first)
    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }

    // Show previous image (if at first wrap to the last)
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    }

    // Reset auto-timer whenever user manually navigates
    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(showNextImage, 5000);
    }

    // When next button click, move to the next image and reset timer for a new 5 seconds
    nextBtn.addEventListener("click", () => {
        showNextImage();
        resetTimer();
    });

    // When the button clicked, move to previous image and reset timer for a new 5 seconds
    prevBtn.addEventListener("click", () => {
        showPrevImage();
        resetTimer();
    });
}

// Email Validation
const email = document.getElementById("email");

// Check if email form is on page
if (email) {

    // Listen for input
    email.addEventListener("input", function () {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        // Get reference to email valid indicator
        const validIndicator = document.getElementById("emailValid");
    
        // Store the current value of the email input
        const val = this.value;
    
        // Check is the email matches the required format
    
        // Strong
        if (emailRegex.test(val)) {
            validIndicator.innerHTML = `Valid Email`;
            validIndicator.style.border = '.2em solid #ccc';
            validIndicator.style.backgroundColor = "green";
        }
            else {
            validIndicator.innerHTML = `Please enter a valid Email`;
            validIndicator.style.border = '.2em solid #ccc';
            validIndicator.style.backgroundColor = "red";
        }
    });
}

// Password Validation

const passwordInput = document.getElementById('password');

const strengthBar = document.getElementById('strengthBar');

// Ensure element is on page
if (passwordInput && strengthBar) {
    // Password strength meter
    // Listen for any typing/input in password field
    passwordInput.addEventListener("input", function () {

    // Store the current value of the password input
    const val = this.value;

    const numbers = val.match(/\d/g) || [];
    const specialChars = val.match(/[\W_]/g) || [];
    const upperCase = val.match(/[A-Z]/g) || [];
    const lowerCase = val.match(/[a-z]/g) || [];

    // Default unacceptable
    let strength = 0

    if (val.length < 6) {
            strength = 0; // Unacceptable
        } else if (
            numbers.length >= 1 &&
            specialChars.length >= 1 &&
            (upperCase.length >= 1 || lowerCase.length >= 1)
        ) {
            strength = 1; // Weak
        }
    
        if (
            val.length >= 6 &&
            numbers.length >= 1 &&
            specialChars.length >= 1 &&
            upperCase.length >= 1 &&
            lowerCase.length >= 1
        ) {
            strength = 2; // Fair
        }
    
        if (
            val.length >= 6 &&
            numbers.length >= 2 &&
            specialChars.length >= 1 &&
            upperCase.length >= 1 &&
            lowerCase.length >= 1
        ) {
            strength = 3; // Strong
        }
    
        if (
            val.length >= 8 &&
            numbers.length >= 2 &&
            specialChars.length >= 2 &&
            upperCase.length >= 1 &&
            lowerCase.length >= 1
        ) {
            strength = 4; // Very Secure
        }
    
        // Set bar width and color based on strength
        const widths = ["10%", "30%", "50%", "70%", "100%"];
        const colors = ["red", "orange", "yellow", "lightgreen", "green"];
        const labels = ["Unacceptable", "Weak", "Fair", "Strong", "Very Secure"];
    
        strengthBar.style.width = widths[strength];
        strengthBar.style.background = colors[strength];
        strengthBar.innerText = labels[strength]; // optional: show text inside bar
    });
}

const comments = document.getElementById("comments");

if(comments) {
    // Listen for input in the comments area
    comments.addEventListener("input", function () {
        // Get the number of characters typed so far
        const count = this.value.length;

        // Update the display text with current count
        document.getElementById("charCount").textContent = `${count} / 500`;
    });
}

//particles.js
//v2.0.0
//A lightweight JavaScript library for creating particles
//https://vincentgarreau.com/particles.js/
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 50
        },
        "color": {
            "value": "#FE16D0"
        },
        "size": {
            "value": 3
        },
        "move": {
            "speed": 1
        },
        "line_linked": {
            "enable": true,
            "color": "#FE16D0"
        }
    }
});

