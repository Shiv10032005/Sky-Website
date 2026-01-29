// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    mobileMenuBtn.classList.toggle("active");
  });
}

// Close mobile menu when clicking on a link
const navLinkItems = document.querySelectorAll(".nav-link");
navLinkItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
  });
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && href !== "") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
  ".service-card, .feature-box, .testimonial-card",
);
animateElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
  observer.observe(el);
});

// Active navigation link based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      if (navLink) {
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active");
        });
        navLink.classList.add("active");
      }
    }
  });
});

// Form validation (for contact page)
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !phone || !message) {
      alert("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!isValidPhone(phone)) {
      alert("Please enter a valid phone number");
      return;
    }

    // Success message
    alert("Thank you for contacting us! We will get back to you soon.");
    contactForm.reset();
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ""));
}

// Page Loader logic
// Page Loader logic
function hideLoader() {
  const loader = document.getElementById("pageLoader");
  if (loader && !loader.classList.contains("hide")) {
    // Add a delay to show the loading animation longer
    setTimeout(() => {
      loader.classList.add("hide");
      
      // Optional: remove from DOM after transition completes to free memory
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }, 1500); // Increased from 800ms to 1500ms for longer display
  }
}

window.addEventListener("load", hideLoader);

// Fallback: hide loader after 4 seconds even if page is not fully loaded
setTimeout(hideLoader, 4000);



// Lazy Loading for Images (for browsers that don't support native lazy loading)
document.addEventListener("DOMContentLoaded", () => {
  // Check if browser supports native lazy loading
  if ("loading" in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach((img) => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  } else {
    // Fallback: use Intersection Observer for lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: "50px 0px",
      threshold: 0.01
    });

    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });
  }
});

// GSAP Windmill Animation
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    scrub: 1,
    pin: true,
    trigger: "#pin-windmill",
    start: "50% 50%",
    endTrigger: "#pin-windmill-wrap",
    end: "bottom 50%",
  },
});

tl.to("#pin-windmill-svg", {
  rotateZ: 900,
});

// Visitor Counter
if (document.getElementById("count") && document.getElementById("info")) {
  Promise.all([
    fetch("https://api.countapi.xyz/hit/sky-electricals-website/visits").then(r => r.json()),
    fetch("https://ipapi.co/json/").then(r => r.json())
  ]).then(([countData, locationData]) => {
    document.getElementById("count").innerText = countData.value;
    document.getElementById("info").innerText =
      `Visited from ${locationData.city}, ${locationData.country_name} at ${new Date().toLocaleString()}`;
  }).catch(err => {
    console.log("Visitor counter error:", err);
    document.getElementById("count").innerText = "---";
  });
}
