const openBtn = document.getElementById('openModalBtn');
const closeBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('mobileModal');

openBtn.addEventListener('click', () => {
  modal.classList.remove('translate-x-full');
  modal.classList.add('translate-x-0');
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('translate-x-0');
  modal.classList.add('translate-x-full');
});

// 
const counters = document.querySelectorAll('.count');

  const animateCounter = (el, target) => {
    let current = 0;
    const increment = target / 100;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        el.textContent = Math.floor(current).toLocaleString("ru-RU"); // format with spaces
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target.toLocaleString("ru-RU"); // final number
      }
    };

    updateCounter();
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.getAttribute('data-target');
        animateCounter(el, target);
        observer.unobserve(el); // faqat bir marta ishlasin
      }
    });
  }, {
    threshold: 0.5 // 50% ko‘ringanda ishga tushadi
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });
  // timer
  class CountdownTimer {
    constructor() {
        // Set initial countdown time (6 days, 17 hours, 25 minutes, 19 seconds)
        this.initialTime = 6 * 24 * 60 * 60 + 17 * 60 * 60 + 25 * 60 + 19;
        this.timeLeft = this.initialTime;
        
        // Get DOM elements
        this.daysElement = document.getElementById('days');
        this.hoursElement = document.getElementById('hours');
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        
        // Start the countdown
        this.start();
    }

    formatTime(seconds) {
        const days = Math.floor(seconds / (24 * 60 * 60));
        const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((seconds % (60 * 60)) / 60);
        const secs = seconds % 60;

        return {
            days: days.toString().padStart(2, '0'),
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: secs.toString().padStart(2, '0')
        };
    }

    updateDisplay() {
        const time = this.formatTime(this.timeLeft);
        
        this.daysElement.textContent = time.days;
        this.hoursElement.textContent = time.hours;
        this.minutesElement.textContent = time.minutes;
        this.secondsElement.textContent = time.seconds;
    }

    start() {
        // Update display immediately
        this.updateDisplay();
        
        // Set up interval to update every second
        this.timer = setInterval(() => {
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                return;
            }
            
            this.timeLeft--;
            this.updateDisplay();
        }, 1000);
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    reset() {
        this.stop();
        this.timeLeft = this.initialTime;
        this.updateDisplay();
        this.start();
    }
}

// Initialize countdown timer when page loads
document.addEventListener('DOMContentLoaded', function() {
    const countdown = new CountdownTimer();
    
    // Optional: Add reset functionality (uncomment if needed)
    // document.addEventListener('keydown', function(e) {
    //     if (e.key === 'r' || e.key === 'R') {
    //         countdown.reset();
    //     }
    // });
});

// modal swiper
 // Initialize Swiper
 const swiper = new Swiper('.swiper', {
  allowTouchMove: false,
  spaceBetween: 0,
  on: {
      slideChange: function () {
          updateStepCounter();
          updateProgressBar();
          updateNavigation();
      }
  }
});

// DOM Elements
const modals = document.getElementById('modal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const stepCounter = document.getElementById('stepCounter');
const progressBar = document.getElementById('progressBar');
const tireOptions = document.querySelectorAll('.tire-option');

let selectedTireType = '';
let currentStep = 0;

// Modal controls
openModalBtn.addEventListener('click', () => {
  modals.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
});

closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

function closeModal() {
  modals.classList.add('hidden');
  document.body.style.overflow = 'auto';
  resetModal();
}

function resetModal() {
  swiper.slideTo(0);
  currentStep = 0;
  selectedTireType = '';
  document.getElementById('wheelSize').value = '';
  document.getElementById('city').value = '';
  document.getElementById('phone').value = '';
  tireOptions.forEach(option => {
      option.classList.remove('selected');
      const checkbox = option.querySelector('.w-3');
      if (checkbox) checkbox.classList.add('hidden');
  });
  updateStepCounter();
  updateProgressBar();
  updateNavigation();
}

// Tire selection
tireOptions.forEach(option => {
  option.addEventListener('click', () => {
      // Remove previous selection
      tireOptions.forEach(opt => {
          opt.classList.remove('selected');
          const checkbox = opt.querySelector('.w-3');
          if (checkbox) checkbox.classList.add('hidden');
      });

      // Add selection to clicked option
      option.classList.add('selected');
      const checkbox = option.querySelector('.w-3');
      if (checkbox) checkbox.classList.remove('hidden');
      
      selectedTireType = option.dataset.type;
  });
});

// Navigation
prevBtn.addEventListener('click', () => {
  if (currentStep > 0) {
      currentStep--;
      swiper.slideTo(currentStep);
  }
});

nextBtn.addEventListener('click', () => {
  if (validateCurrentStep()) {
      if (currentStep < 3) {
          currentStep++;
          swiper.slideTo(currentStep);
      }
  }
});

submitBtn.addEventListener('click', () => {
  if (validateCurrentStep()) {
      alert('Форма отправлена! Мы свяжемся с вами в ближайшее время.');
      closeModal();
  }
});

// Validation
function validateCurrentStep() {
  switch (currentStep) {
      case 0:
          return selectedTireType !== '';
      case 1:
          return document.getElementById('wheelSize').value.trim() !== '';
      case 2:
          return document.getElementById('city').value.trim() !== '';
      case 3:
          return document.getElementById('phone').value.trim() !== '';
      default:
          return true;
  }
}

// Update functions
function updateStepCounter() {
  stepCounter.textContent = `${currentStep + 1}/4`;
}

function updateProgressBar() {
  const progress = ((currentStep + 1) / 4) * 100;
  progressBar.style.width = `${progress}%`;
}

function updateNavigation() {
  prevBtn.disabled = currentStep === 0;
  
  if (currentStep === 3) {
      nextBtn.classList.add('hidden');
      submitBtn.classList.remove('hidden');
  } else {
      nextBtn.classList.remove('hidden');
      submitBtn.classList.add('hidden');
  }
}

// Phone input formatting
document.getElementById('phone').addEventListener('input', function(e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length > 0) {
      value = value.substring(0, 10);
      const formatted = value.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1) $2-$3-$4');
      e.target.value = formatted;
  }
});

// Initialize
updateStepCounter();
updateProgressBar();
updateNavigation();