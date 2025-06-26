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