$(document).ready(function(){
    // Smooth scroll
    $(".navbar .nav-link").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });

    // Navbar toggle
    $('#nav-toggle').click(function(){
        $(this).toggleClass('is-active')
        $('ul.nav').toggleClass('show');
    });




//slideshow FOR images of about 
// List of your images
    const images = [
        "assets/imgs/man1.jpg",
        "assets/imgs/man2.jpg",
        "assets/imgs/man3.jpg",
        "assets/imgs/man4.jpg"
    ];

    let index = 0;
    const aboutImage = document.getElementById("aboutImage");

    // Function to change image every 3 seconds
    setInterval(() => {
        index = (index + 1) % images.length; // cycle through 0–3
        aboutImage.src = images[index];
    }, 3000); // 3000ms = 3 seconds



    // 🔥 Typing Animation for Roles
    const roles = ["Frontend Developer", "Blockchain Innovator", "Problem Solver", "Problem Solver"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // typing speed (ms)
    let pauseTime = 1500;  // pause before deleting (ms)

    function typeEffect() {
        const currentRole = roles[roleIndex];
        const displayedText = isDeleting 
            ? currentRole.substring(0, charIndex--) 
            : currentRole.substring(0, charIndex++);

        $("#typed-role").text(displayedText);

        if (!isDeleting && charIndex === currentRole.length) {
            setTimeout(() => isDeleting = true, pauseTime);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(typeEffect, isDeleting ? typingSpeed / 2 : typingSpeed);
    }

    typeEffect();
});
