// Fungsi untuk membuat hati
function createHearts() {
    const colors = ['#ff6b81', '#ff4757', '#ff7f50', '#ff6348', '#ff69b4'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        heart.style.animationDuration = (Math.random() * 5 + 3) + 's';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(heart);
    }
}

// Fungsi untuk membuat confetti
function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 5 + 's';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        document.body.appendChild(confetti);
    }
}

// Kontrol musik
const musicControl = document.getElementById('musicControl');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

musicControl.addEventListener('click', function() {
    if (isPlaying) {
        bgMusic.pause();
        musicControl.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        bgMusic.play().catch(e => console.log("Autoplay prevented: ", e));
        musicControl.innerHTML = '<i class="fas fa-pause"></i>';
        createConfetti();
    }
    isPlaying = !isPlaying;
});

// Pesan tersembunyi
document.getElementById('showMessage').addEventListener('click', function() {
    const message = document.getElementById('hiddenMessage');
    message.classList.toggle('show');
    this.textContent = message.classList.contains('show') ? 'Tutup Pesan' : 'Buka Pesan Khusus';
});

// Tombol cinta
document.getElementById('loveButton').addEventListener('click', function() {
    if (!isPlaying) {
        bgMusic.play().catch(e => console.log("Autoplay prevented: ", e));
        musicControl.innerHTML = '<i class="fas fa-pause"></i>';
        isPlaying = true;
    }
    createFlyingHearts();
    createConfetti();
});

// Fungsi untuk membuat hati terbang
function createFlyingHearts() {
    const colors = ['#ff6b81', '#ff4757', '#ff7f50', '#ff6348', '#ff69b4', '#d23669'];
    const container = document.querySelector('.container');
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.classList.add('flying-heart');
        heart.style.left = `${centerX}px`;
        heart.style.top = `${centerY}px`;
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.fontSize = `${Math.random() * 20 + 15}px`;
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 200;
        heart.style.setProperty('--randomX', `${Math.cos(angle) * distance}px`);
        heart.style.setProperty('--randomY', `${Math.sin(angle) * distance}px`);
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }
}

// Inisialisasi saat halaman dimuat
window.addEventListener('load', () => {
    createHearts();
    
    // Handle autoplay policy
    document.body.addEventListener('click', () => {
        if (!isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicControl.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(e => console.log("Autoplay prevented: ", e));
        }
    }, { once: true });
});