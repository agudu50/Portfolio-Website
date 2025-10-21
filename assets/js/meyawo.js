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
        "assets/imgs/man4.jpg",
        "assets/imgs/man5.JPG",
        "assets/imgs/man6.jpg",
        "assets/imgs/man7.JPG"
    ];

    let index = 0;
    const aboutImage = document.getElementById("aboutImage");

    // Function to change image every 3 seconds
    setInterval(() => {
        index = (index + 1) % images.length; // cycle through 0–3
        aboutImage.src = images[index];
    }, 3000); // 3000ms = 3 seconds



    // 🔥 Typing Animation for Roles
    const roles = ["Frontend Developer", "Blockchain Innovator", "Machine Learning & AI Enthusiast", "Problem Solver"];
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


    


// Contact Form Submission using EmailJS

  document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    emailjs.sendForm('service_zlhfoc5', 'template_u9iy82j', this)
      .then(function () {
        showMessage('Your message was sent successfully!', 'success');
        document.getElementById('contact-form').reset();
      }, function () {
        showMessage('Oops! Something went wrong. Please try again.', 'danger');
      });
  });




function showMessage(message, type) {
  const formMessages = document.getElementById('form-messages');
  formMessages.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show text-center mx-auto" 
         role="alert" style="max-width: 500px;">
      <span>${message}</span>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;

  // Auto-hide after 5 seconds
  setTimeout(() => {
    const alertElement = formMessages.querySelector('.alert');
    if (alertElement) {
      // Trigger fade-out
      alertElement.classList.remove("show"); 

      // Wait for fade transition then remove from DOM
      setTimeout(() => {
        alertElement.remove();
      }, 150); // Bootstrap's fade animation is ~150ms
    }
  }, 5000);
}










    
});