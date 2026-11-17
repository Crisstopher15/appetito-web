// Efecto de Confeti interactivo usando los colores del logo de APPETITO
document.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.getElementById('downloadBtn');
  const feedbackMsg = document.getElementById('downloadFeedback');
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');

  let particles = [];
  let animationId = null;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Colores exactos del logo: Menta, Azul, Celeste, Chocolate, Lavanda y Blanco
  const logoColors = ['#AEE1D0', '#79A1E2', '#4871BC', '#52291E', '#E6E7F6', '#86CBB3', '#ffffff'];

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 8 + 5;
      this.speedX = (Math.random() - 0.5) * 14;
      this.speedY = Math.random() * -13 - 3;
      this.gravity = 0.45;
      this.color = logoColors[Math.floor(Math.random() * logoColors.length)];
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 10;
      this.opacity = 1;
      this.decay = Math.random() * 0.016 + 0.009;
    }

    update() {
      this.speedY += this.gravity;
      this.x += this.speedX;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;
      this.opacity -= this.decay;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.7);
      ctx.restore();
    }
  }

  function launchConfetti(originX, originY) {
    for (let i = 0; i < 85; i++) {
      particles.push(new Particle(originX, originY));
    }
    if (!animationId) {
      animateConfetti();
    }
  }

  function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();

      if (particles[i].opacity <= 0 || particles[i].y > canvas.height) {
        particles.splice(i, 1);
      }
    }

    if (particles.length > 0) {
      animationId = requestAnimationFrame(animateConfetti);
    } else {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  // Interacción al hacer click en el botón de descarga
  downloadBtn.addEventListener('click', () => {
    const rect = downloadBtn.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    launchConfetti(originX, originY);

    if (feedbackMsg) {
      feedbackMsg.textContent = '¡Iniciando tu descarga! 🎉';
      feedbackMsg.classList.add('show');

      setTimeout(() => {
        feedbackMsg.classList.remove('show');
      }, 4000);
    }
  });
});
