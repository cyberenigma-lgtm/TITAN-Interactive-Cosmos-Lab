document.addEventListener('DOMContentLoaded', () => {
    // Generate stars for background
    const starContainer = document.getElementById('star-container');
    const numStars = 150;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size (0.5px to 3px)
        const size = Math.random() * 2.5 + 0.5;
        
        // Random animation duration
        const duration = Math.random() * 3 + 1;
        const delay = Math.random() * 3;
        
        star.style.left = `${x}vw`;
        star.style.top = `${y}vh`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
        
        starContainer.appendChild(star);
    }

    // Button interaction
    const exploreBtn = document.getElementById('start-exploration');
    exploreBtn.addEventListener('click', () => {
        exploreBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            exploreBtn.style.transform = '';
            alert('¡Iniciando secuencia de exploración espacial!');
        }, 150);
    });
});
