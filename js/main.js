document.addEventListener("DOMContentLoaded", () => {
  // Mobil menü toggle
  const header = document.querySelector('header');
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const body = document.body;

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
  });

  // Mobil menüde link tıklandığında menüyü kapat
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      body.style.overflow = "";
      // Hamburger ikonunu da reset et
      navToggle.classList.remove("active");
    });
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const headerOffset = 80; // Header yüksekliği
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Add active class to navigation items on scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
        let current = '';

        document.querySelectorAll("section").forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        // Header arka plan rengini güncelle
        if (current === 'anasayfa' || current === '') {
            header.classList.remove('page-header');
        } else {
            header.classList.add('page-header');
        }

        // Menü itemlarını güncelle
        document.querySelectorAll("nav ul li a").forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
  });

  if (window.location.hash && window.location.hash !== "#anasayfa") {
    header.classList.add("page-header");
  }

  // Add scroll animation for elements
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".service-card, .news-card").forEach((el) => {
    observer.observe(el);
  });

  // Sayfa dışına tıklandığında menüyü kapat
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains("active")) {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
      body.style.overflow = "";
    }
  });
});
