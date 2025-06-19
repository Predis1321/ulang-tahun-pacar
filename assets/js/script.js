// assets/js/script.js
document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // ELEMENTS
    // ======================
    const musicControl = document.getElementById('musicControl');
    const bgMusic = document.getElementById('bgMusic');
    const showMessageBtn = document.getElementById('showMessage');
    const hiddenMessage = document.getElementById('hiddenMessage');
    const loveButton = document.getElementById('loveButton');
    
    let isPlaying = false;
    let hasInteracted = false;

    // ======================
    // TOUCH-FRIENDLY AUDIO HANDLING
    // ======================
    function initAudio() {
        if (!hasInteracted) {
            bgMusic.volume = 0.5;
            bgMusic.play().then(() => {
                isPlaying = true;
                musicControl.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(e => {
                musicControl.style.backgroundColor = '#ff6b81';
                musicControl.innerHTML = '<i class="fas fa-exclamation"></i>';
                setTimeout(() => {
                    musicControl.innerHTML = '<i class="fas fa-music"></i>';
                    musicControl.style.backgroundColor = 'white';
                }, 1500);
            });
            hasInteracted = true;
        }
    }

    // Mobile-friendly interaction handlers
    document.body.addEventListener('touchstart', initAudio, { once: true });
    document.body.addEventListener('click', initAudio, { once: true });

    // ======================
    // MUSIC CONTROL
    // ======================
    musicControl.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            this.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            bgMusic.play().catch(e => {
                this.innerHTML = '<i class="fas fa-exclamation"></i>';
                setTimeout(() => this.innerHTML = '<i class="fas fa-music"></i>', 1500);
            });
            this.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });

    // ======================
    // MESSAGE TOGGLE
    // ======================
    showMessageBtn.addEventListener('click', function() {
        hiddenMessage.classList.toggle('show');
        this.textContent = hiddenMessage.classList.contains('show') 
            ? 'Tutup Pesan' 
            : 'Buka Pesan Khusus';
    });

    // ======================
    // LOVE BUTTON EFFECTS
    // ======================
    loveButton.addEventListener('click', function() {
        createMobileHearts();
        if (!isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicControl.innerHTML = '<i class="fas fa-pause"></i>';
            });
        }
    });

    // ======================
    // MOBILE-OPTIMIZED ANIMATIONS
    // ======================
    function createMobileHearts() {
        const colors = ['#ff6b81', '#ff4757', '#ff7f50'];
        const container = document.querySelector('.container');
        
        for (let i = 0; i < 8; i++) { // Reduced number for mobile
            const heart = document.createElement('div');
            heart.innerHTML = '❤';
            heart.className = 'heart';
            heart.style.left = Math.random() * 80 + 10 + '%';
            heart.style.top = Math.random() * 20 + '%';
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.fontSize = (Math.random() * 16 + 12) + 'px';
            heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 4000); // Shorter duration for mobile
        }
    }

    // Lightweight confetti for mobile
    function createMobileConfetti() {
        const colors = ['#ff0000', '#00ff00', '#0000ff'];
        
        for (let i = 0; i < 30; i++) { // Reduced amount
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 6 + 3) + 'px';
            confetti.style.height = (Math.random() * 6 + 3) + 'px';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }
    }

    // ======================
    // INITIAL LOAD
    // ======================
    // Start with a few hearts
    setTimeout(createMobileHearts, 500);
});
