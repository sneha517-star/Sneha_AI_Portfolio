const nav = document.getElementById("navLinks");
const menuToggle = document.querySelector(".menu-toggle");
const topBtn = document.getElementById("topBtn");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

menuToggle?.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

window.addEventListener("scroll", () => {
  topBtn.classList.toggle("show", window.scrollY > 600);
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");

    const recipient = "snehamurugesan672@gmail.com";
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (event) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Articles are now loaded by Django!



// Network Particle Background
const canvas = document.getElementById('network-canvas');
const isMobile = window.innerWidth < 768;
if(canvas && !isMobile) {
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = document.querySelector('.hero').offsetHeight;

  const particles = [];
  const properties = {
    bgColor: 'transparent',
    particleColor: 'rgba(168, 85, 247, 0.8)',
    particleRadius: 2.5,
    particleCount: 60,
    particleMaxVelocity: 0.5,
    lineLength: 150,
    particleLife: 6
  };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = document.querySelector('.hero').offsetHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
      this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
      this.life = Math.random() * properties.particleLife * 60;
    }
    position() {
      this.x + this.velocityX > width && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
      this.y + this.velocityY > height && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
      this.x += this.velocityX;
      this.y += this.velocityY;
    }
    reDraw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = properties.particleColor;
      ctx.fill();
      
      // Glow
      // removed glow for mobile performance
      ;
    }
    reCalculateLife() {
      if(this.life < 1) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
        this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
        this.life = Math.random() * properties.particleLife * 60;
      }
      this.life--;
    }
  }

  function reDrawBackground() {
    ctx.clearRect(0, 0, width, height);
  }

  function drawLines() {
    let x1, y1, x2, y2, length, opacity;
    for(let i in particles) {
      for(let j in particles) {
        x1 = particles[i].x;
        y1 = particles[i].y;
        x2 = particles[j].x;
        y2 = particles[j].y;
        length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        if(length < properties.lineLength) {
          opacity = 1 - length / properties.lineLength;
          ctx.lineWidth = '0.5';
          ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
  }

  function reDrawParticles() {
    for(let i in particles) {
      particles[i].reCalculateLife();
      particles[i].position();
      particles[i].reDraw();
    }
  }

  function loop() {
    reDrawBackground();
    reDrawParticles();
    drawLines();
    requestAnimationFrame(loop);
  }

  function init() {
    for(let i = 0 ; i < properties.particleCount ; i++) {
      particles.push(new Particle);
    }
    loop();
  }
  
  init();
}
