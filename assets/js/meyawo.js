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








// Typing Effect for Roles
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

      
      setTimeout(() => {
        alertElement.remove();
      }, 150); 
    }
  }, 5000);
}


// Counter Animation
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const animateCounter = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounter, 10);
        } else {
            counter.innerText = target + '+';
        }
    });
};

// Trigger counter when visible
const statsSection = document.getElementById('stats');
let hasAnimated = false;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            animateCounter();
            hasAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    observer.observe(statsSection);
}

// Testimonial Carousel Auto-play with Enhanced Controls
const testimonialCarousel = document.getElementById('testimonialCarousel');
if (testimonialCarousel) {
    // Initialize Bootstrap carousel with auto-play
    const carousel = new bootstrap.Carousel(testimonialCarousel, {
        interval: 6000, // Change slide every 6 seconds
        wrap: true, // Loop continuously
        touch: true, // Enable touch swipe on mobile
        pause: 'hover' // Pause on hover
    });
    
    // Optional: Add custom timer indicator
    let carouselTimer;
    
    // Start carousel automatically
    carousel.cycle();
    
    // Pause on hover for better UX
    testimonialCarousel.addEventListener('mouseenter', () => {
        carousel.pause();
    });
    
    testimonialCarousel.addEventListener('mouseleave', () => {
        carousel.cycle();
    });
}

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Certificate Modal Functionality
const certModal = document.getElementById('certModal');
if (certModal) {
    certModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        
        // Extract data attributes
        const title = button.getAttribute('data-cert-title');
        const issuer = button.getAttribute('data-cert-issuer');
        const date = button.getAttribute('data-cert-date');
        const image = button.getAttribute('data-cert-image');
        const link = button.getAttribute('data-cert-link');
        
        // Update modal content
        document.getElementById('certModalLabel').textContent = title;
        document.getElementById('certModalTitle').textContent = title;
        document.getElementById('certModalIssuer').textContent = 'Issued by: ' + issuer;
        document.getElementById('certModalDate').textContent = date;
        document.getElementById('certModalImage').src = image;
        document.getElementById('certModalImage').alt = title + ' Certificate';
        
        // Show verify link only if it exists and is not '#'
        const modalLink = document.getElementById('certModalLink');
        if (link && link !== '#') {
            modalLink.href = link;
            modalLink.style.display = 'inline-block';
        } else {
            modalLink.style.display = 'none';
        }
        
        // Handle image load error (show placeholder)
        document.getElementById('certModalImage').onerror = function() {
            this.src = 'assets/imgs/certificate-placeholder.png';
            this.alt = 'Certificate image coming soon';
        };
        
        // Reset zoom state
        const wrapper = document.querySelector('.cert-image-wrapper');
        if (wrapper) wrapper.classList.remove('zoomed');
        const zoomBtn = document.getElementById('certZoomBtn');
        if (zoomBtn) {
            zoomBtn.innerHTML = '<i class="fas fa-search-plus"></i> Zoom In';
        }
    });
    
    // Zoom functionality
    const zoomBtn = document.getElementById('certZoomBtn');
    if (zoomBtn) {
        zoomBtn.addEventListener('click', function() {
            const wrapper = document.querySelector('.cert-image-wrapper');
            if (wrapper.classList.contains('zoomed')) {
                wrapper.classList.remove('zoomed');
                this.innerHTML = '<i class="fas fa-search-plus"></i> Zoom In';
            } else {
                wrapper.classList.add('zoomed');
                this.innerHTML = '<i class="fas fa-search-minus"></i> Zoom Out';
            }
        });
    }
}

// Additional protection: Disable right-click and keyboard shortcuts on certificate images
document.addEventListener('contextmenu', function(e) {
    if (e.target.classList.contains('cert-protected-image')) {
        e.preventDefault();
        return false;
    }
});

document.addEventListener('keydown', function(e) {
    // Prevent Ctrl+S, Ctrl+Shift+S (save)
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        const modal = document.getElementById('certModal');
        if (modal && modal.classList.contains('show')) {
            e.preventDefault();
            return false;
        }
    }
});










    
});