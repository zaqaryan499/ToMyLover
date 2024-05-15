document.addEventListener("DOMContentLoaded", function () {
    let audio = document.getElementById("audio");

    document.addEventListener("click", function () {
        audio.play();
    });
});

// Prompt Password
// Define the correct password
const correctPassword = "080523";

// Function to prompt user for password and show papers if correct
function requestPasswordAndShowPapers() {
    // Prompt the user for a password
    const enteredPassword = prompt("Our first meeting day 🫣🤭");

    // Check if the entered password is correct
    if (enteredPassword === correctPassword) {
        // If correct, show the papers
        const papers = document.querySelectorAll(".paper-item");
        papers.forEach(paper => {
            paper.style.display = "block";
        });
        alert("Correct password! You can reveal the Surprise 😃 !");
    } else {
        // If incorrect, display an error message and reload the page
        alert("Incorrect password! Please try again 😟.");
        window.location.reload();
    }
}

// Call the function when the page loads
window.onload = requestPasswordAndShowPapers;
