// Elementos del DOM
const nameForm = document.getElementById('name-form');
const invitation = document.getElementById('invitation');
const visitorNameInput = document.getElementById('visitor-name');
const submitNameBtn = document.getElementById('submit-name');
const guestNameSpan = document.getElementById('guest-name');
const confirmYesBtn = document.getElementById('confirm-yes');
const confirmMaybeBtn = document.getElementById('confirm-maybe');
const confettiContainer = document.getElementById('confetti');

// Mostrar la invitación cuando se ingresa el nombre
submitNameBtn.addEventListener('click', () => {
  const visitorName = visitorNameInput.value.trim();
  
  if (visitorName) {
    // Guardar el nombre y mostrar la invitación
    guestNameSpan.textContent = visitorName;
    
    // Ocultar el formulario y mostrar la invitación con animación
    nameForm.classList.add('hidden');
    setTimeout(() => {
      invitation.classList.remove('hidden');
      invitation.classList.add('fade-in');
      
      // Añadir efecto de partículas flotantes
      createFloatingParticles();
    }, 300);
  } else {
    // Animar el input si está vacío
    visitorNameInput.classList.add('shake');
    setTimeout(() => {
      visitorNameInput.classList.remove('shake');
    }, 500);
  }
});

// También permitir enviar con Enter
visitorNameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    submitNameBtn.click();
  }
});

// Manejar confirmaciones
confirmYesBtn.addEventListener('click', () => {
  // Mostrar confeti y mensaje positivo
  showConfetti();
  showEmojiRain(['🎉', '🥳', '🎊', '🎈', '🎁']);
  
  // Crear y mostrar mensaje de respuesta
  const responseDiv = document.createElement('div');
  responseDiv.className = 'response-message positive-response';
  responseDiv.textContent = '¡Que rico mi loco nos vemos!';
  responseDiv.style.transform = 'scale(0)';
  
  // Reemplazar el botón con el mensaje
  confirmYesBtn.parentNode.appendChild(responseDiv);
  confirmYesBtn.style.display = 'none';
  confirmMaybeBtn.style.display = 'none';
  
  // Animar la aparición del mensaje
  setTimeout(() => {
    responseDiv.style.transition = 'transform 0.5s cubic-bezier(0.17, 0.89, 0.32, 1.49)';
    responseDiv.style.transform = 'scale(1)';
  }, 50);
});

confirmMaybeBtn.addEventListener('click', () => {
  // Crear efecto de fuego
  const fireContainer = document.createElement('div');
  fireContainer.className = 'fire-container';
  const fire = document.createElement('div');
  fire.className = 'fire';
  fireContainer.appendChild(fire);
  invitation.appendChild(fireContainer);
  
  // Crear y mostrar mensaje de respuesta con animación de enojo
  const responseDiv = document.createElement('div');
  responseDiv.className = 'response-message negative-response shake-hard';
  responseDiv.textContent = '¡MÁS TE VALE IR GRAN PUTA!';
  
  // Reemplazar el botón con el mensaje
  confirmMaybeBtn.parentNode.appendChild(responseDiv);
  confirmYesBtn.style.display = 'none';
  confirmMaybeBtn.style.display = 'none';
  
  // Mostrar el fuego
  setTimeout(() => {
    fireContainer.classList.add('show');
  }, 100);
  
  // Sacudir toda la invitación
  invitation.classList.add('shake-hard');
  setTimeout(() => {
    invitation.classList.remove('shake-hard');
  }, 800);
});

// Función para crear confeti
function showConfetti() {
  const colors = ['#1a73e8', '#34a853', '#00c2cb', '#fbbc05', '#ea4335', '#121212'];
  const shapes = ['confetti-square', 'confetti-circle', 'confetti-triangle'];
  
  for (let i = 0; i < 150; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    createConfettiPiece(color, shape);
  }
}

function createConfettiPiece(color, shape) {
  const confetti = document.createElement('div');
  confetti.className = `confetti ${shape}`;
  
  if (shape === 'confetti-triangle') {
    confetti.style.borderBottomColor = color;
  } else {
    confetti.style.backgroundColor = color;
  }
  
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.top = -20 + 'px';
  confetti.style.transform = 'scale(' + (Math.random() * 0.6 + 0.4) + ')';
  confettiContainer.appendChild(confetti);
  
  // Animación de caída
  const animation = confetti.animate(
    [
      { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
      { transform: `translate(${Math.random() * 200 - 100}px, ${window.innerHeight + 100}px) rotate(${Math.random() * 720 - 360}deg)`, opacity: 0 }
    ],
    {
      duration: Math.random() * 3000 + 2000,
      easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
    }
  );
  
  animation.onfinish = () => {
    confetti.remove();
  };
}

// Función para crear lluvia de emojis
function showEmojiRain(emojis) {
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      createEmojiPiece(emojis[Math.floor(Math.random() * emojis.length)]);
    }, i * 150);
  }
}

function createEmojiPiece(emoji) {
  const emojiElement = document.createElement('div');
  emojiElement.className = 'emoji';
  emojiElement.textContent = emoji;
  emojiElement.style.left = Math.random() * 100 + 'vw';
  emojiElement.style.top = -30 + 'px';
  emojiElement.style.transform = 'scale(' + (Math.random() * 0.5 + 0.5) + ')';
  confettiContainer.appendChild(emojiElement);
  
  // Animación de caída
  const animation = emojiElement.animate(
    [
      { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
      { transform: `translate(${Math.random() * 100 - 50}px, ${window.innerHeight + 50}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ],
    {
      duration: Math.random() * 2000 + 3000,
      easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
    }
  );
  
  animation.onfinish = () => {
    emojiElement.remove();
  };
}

// Función para crear partículas flotantes en el fondo
function createFloatingParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.style.position = 'absolute';
  particlesContainer.style.top = '0';
  particlesContainer.style.left = '0';
  particlesContainer.style.width = '100%';
  particlesContainer.style.height = '100%';
  particlesContainer.style.overflow = 'hidden';
  particlesContainer.style.zIndex = '-1';
  particlesContainer.style.pointerEvents = 'none';
  invitation.appendChild(particlesContainer);
  
  const colors = ['rgba(26, 115, 232, 0.2)', 'rgba(52, 168, 83, 0.2)', 'rgba(0, 194, 203, 0.2)', 'rgba(18, 18, 18, 0.1)'];
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 10 + 5;
    
    particle.style.position = 'absolute';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = '50%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.left = Math.random() * 100 + '%';
    
    particlesContainer.appendChild(particle);
    
    // Animación flotante
    const keyframes = [
      { transform: `translate(0, 0) rotate(0deg)`, opacity: Math.random() * 0.5 + 0.3 },
      { transform: `translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(${Math.random() * 360}deg)`, opacity: Math.random() * 0.5 + 0.5 },
      { transform: `translate(0, 0) rotate(0deg)`, opacity: Math.random() * 0.5 + 0.3 }
    ];
    
    particle.animate(keyframes, {
      duration: Math.random() * 10000 + 15000,
      iterations: Infinity,
      direction: 'alternate',
      easing: 'ease-in-out'
    });
  }
}

// Agregar efecto de shake al input
document.head.insertAdjacentHTML('beforeend', `
  <style>
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      50% { transform: translateX(10px); }
      75% { transform: translateX(-10px); }
    }
    
    .shake {
      animation: shake 0.5s ease-in-out;
      border-color: #ea4335 !important;
    }
  </style>
`);

// Añadir efecto de hover 3D a los elementos de detalle
const detailItems = document.querySelectorAll('.detail-item');
detailItems.forEach(item => {
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = x / rect.width - 0.5;
    const yPercent = y / rect.height - 0.5;
    
    item.style.transform = `perspective(500px) rotateX(${yPercent * -10}deg) rotateY(${xPercent * 10}deg) translateZ(10px)`;
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'perspective(500px) rotateX(0) rotateY(0) translateZ(0)';
    setTimeout(() => {
      item.style.transition = 'transform 0.3s ease';
    }, 100);
  });
  
  item.addEventListener('mouseenter', () => {
    item.style.transition = 'none';
  });
});