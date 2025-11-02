document.addEventListener("DOMContentLoaded", () => {
  // ************************************* about secton

  const paragraph = document.querySelector(".about-section p");

  // Collect text segments separated by <br>
  const lines = [];
  let currentLine = "";

  paragraph.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      currentLine += node.textContent;
    } else if (node.nodeName === "BR") {
      lines.push(currentLine.trim());
      currentLine = "";
    }
  });
  if (currentLine.trim()) lines.push(currentLine.trim());

  // Replace HTML with span-wrapped lines
  paragraph.innerHTML = lines.map((line) => `<span>${line}</span>`).join("");

  const spans = paragraph.querySelectorAll("span");

  const startColor = "#cccccc";
  const endColor = "#000000";

  function lerpColor(color1, color2, t) {
    const c1 = parseInt(color1.slice(1), 16);
    const c2 = parseInt(color2.slice(1), 16);
    const r1 = (c1 >> 16) & 255;
    const g1 = (c1 >> 8) & 255;
    const b1 = c1 & 255;
    const r2 = (c2 >> 16) & 255;
    const g2 = (c2 >> 8) & 255;
    const b2 = c2 & 255;
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function updateTextColors() {
    const viewHeight = window.innerHeight;
    const centerY = viewHeight / 2;

    spans.forEach((span) => {
      const rect = span.getBoundingClientRect();
      const lineCenter = rect.top + rect.height / 2;

      // Smooth transition near the center (50px buffer)
      const buffer = 50;
      const distance = lineCenter - centerY;

      if (distance <= -buffer) {
        // Line has passed above center — keep dark
        span.style.color = endColor;
        span.dataset.active = "true";
      } else if (distance >= buffer) {
        // Line is below center — keep light
        span.style.color = startColor;
        span.dataset.active = "false";
      } else {
        // Within buffer range around center — smooth transition
        const t = 1 - Math.abs(distance / buffer);
        const color = lerpColor(startColor, endColor, t);
        span.style.color = color;
      }
    });
  }

  window.addEventListener("scroll", updateTextColors);
  window.addEventListener("resize", updateTextColors);
  updateTextColors();

  //   product section


  //   Image hover animation
  const animatedImages = document.querySelectorAll(".hover-image-animation");

  animatedImages.forEach((img) => {
    const imageSet = JSON.parse(img.dataset.imageSets.replace(/'/g, '"'));
    let currentIndex = 0;
    let intervalId = null;

    const startAnimation = () => {
      if (intervalId) return; // prevent multiple intervals
      intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % imageSet.length;
        img.src = `/images/product/${imageSet[currentIndex]}`;
      }, 300); // change speed here (milliseconds)
    };

    const stopAnimation = () => {
      clearInterval(intervalId);
      intervalId = null;
      currentIndex = 0;
      img.src = `/images/product/${imageSet[0]}`; // reset to first image
    };

    img.closest(".image-animate-card").addEventListener("mouseenter", startAnimation);
    img.closest(".image-animate-card").addEventListener("mouseleave", stopAnimation);
  });

  // project counters
     const counters = document.querySelectorAll(".project-count");

  function animateCount(el) {
    const target = +el.dataset.countValue;
    const duration = 1500; // in ms
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // smooth ease-out
      const value = Math.floor(eased * (target - start) + start);
      el.textContent = value + "+";

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // Observe when counters enter/exit viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;

        if (entry.isIntersecting) {
          // Only start animation if not already done for this visible cycle
          if (!el.dataset.animated || el.dataset.animated === "false") {
            el.dataset.animated = "true";
            animateCount(el);
          }
        } else {
          // Reset when leaving viewport
          el.textContent = "0";
          el.dataset.animated = "false";
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    counter.dataset.animated = "false";
    observer.observe(counter);
  });
});

// product slider code

document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  const swiper = new Swiper('.my-swiper', {
    // Disable looping so we can toggle Prev/Next
    loop: false,

    // Default slides per view (mobile)
    slidesPerView: 1,
    spaceBetween: 30,

    // Responsive breakpoints
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 40
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 50
      }
    },

    // Center the active slide
    centeredSlides: true,

    // Coverflow effect to highlight active
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: false
    },

    // No built-in pagination/navigation here
  });

  // Attach our custom buttons
  prevBtn.addEventListener('click', () => swiper.slidePrev());
  nextBtn.addEventListener('click', () => swiper.slideNext());

  // Function to toggle disabled state
  function updateButtons() {
    prevBtn.disabled = swiper.isBeginning;
    nextBtn.disabled = swiper.isEnd;
  }

  // Update on init & on every slide change
  swiper.on('init', updateButtons);
  swiper.on('slideChange', updateButtons);

  // Manually initialize Swiper (because we bound 'init' event)
  swiper.init();
});