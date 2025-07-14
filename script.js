document.addEventListener('DOMContentLoaded', function() {
  // Page Loader
  const pageLoader = document.querySelector('.page-loader');
  setTimeout(() => {
    pageLoader.classList.add('fade-out');
    setTimeout(() => {
      pageLoader.style.display = 'none';
    }, 500);
  }, 1000);

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  
  menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Close menu when clicking on a link
  const menuLinks = document.querySelectorAll('.menu a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (menu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        menu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  });

  // Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Back to Top Button
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  });

  backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Testimonial Slider
  const testimonials = document.querySelectorAll('.testimonial');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  let currentIndex = 0;

  // Create dots
  testimonials.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.slider-dot');

  function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentIndex = index;
  }

  function goToTestimonial(index) {
    showTestimonial(index);
  }

  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }

  function prevTestimonial() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
  }

  nextBtn.addEventListener('click', nextTestimonial);
  prevBtn.addEventListener('click', prevTestimonial);

  // Auto slide
  let slideInterval = setInterval(nextTestimonial, 5000);

  // Pause on hover
  const slider = document.querySelector('.testimonial-slider');
  slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
  slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextTestimonial, 5000);
  });

  // Animate stats counter
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsSection = document.querySelector('.intro');

  function animateStats() {
    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos) {
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const speed = 200;
        const increment = target / speed;
        let current = 0;

        const updateNumber = () => {
          current += increment;
          if (current < target) {
            stat.textContent = Math.floor(current);
            setTimeout(updateNumber, 1);
          } else {
            stat.textContent = target;
          }
        };

        updateNumber();
      });

      // Remove event listener after animation
      window.removeEventListener('scroll', animateStats);
    }
  }

  window.addEventListener('scroll', animateStats);

  // Smooth scrolling for all links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});