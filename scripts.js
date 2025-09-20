document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle for mobile
    const hamburger = document.querySelector('.hamburger');
    const header = document.querySelector('header');

    if (hamburger && header) {
        hamburger.addEventListener('click', () => {
            header.classList.toggle('active');
        });
    }

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const activeBtn = document.querySelector('.filter-btn.active');
            if (activeBtn) activeBtn.classList.remove('active');
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentImageIndex = 0;
    let galleryArray = [];

    // Populate galleryArray with all images
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            galleryArray.push(img.src);
            // Add click event to each gallery item
            item.addEventListener('click', () => {
                currentImageIndex = index;
                openLightbox(galleryArray[currentImageIndex]);
            });
        }
    });

    function openLightbox(src) {
        lightbox.classList.add('open');
        lightboxImg.src = src;
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
    }

    // Close on click outside image or close button
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Previous image
    if (prevBtn) prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + galleryArray.length) % galleryArray.length;
        openLightbox(galleryArray[currentImageIndex]);
    });

    // Next image
    if (nextBtn) nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % galleryArray.length;
        openLightbox(galleryArray[currentImageIndex]);
    });
});