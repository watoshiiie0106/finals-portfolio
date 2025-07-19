// Projects Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Project filtering functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            const filterValue = this.dataset.filter;

            projectCards.forEach(card => {
                const cardCategories = card.dataset.category.split(' ');
                
                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.classList.remove('hidden');
                    card.classList.add('visible');
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('visible');
                }
            });
        });
    });

    // Initialize all cards as visible
    projectCards.forEach(card => {
        card.classList.add('visible');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animation for project cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Initially hide cards for animation
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Add loading animation for images
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for images
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });

    // Add click handlers for project actions (placeholder functionality)
    document.querySelectorAll('.btn-icon').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // For demo purposes - in a real implementation, these would link to actual projects
            if (this.title === 'View Live' || this.title === 'View Details' || this.title === 'View Code') {
                e.preventDefault();
                showNotification('Project link coming soon!');
            }
        });
    });

    // Notification function
    function showNotification(message) {
        // Create notification element if it doesn't exist
        let notification = document.getElementById('notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'notification';
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #64ffda;
                color: #1a1a1a;
                padding: 15px 20px;
                border-radius: 8px;
                font-weight: 600;
                z-index: 1000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            `;
            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.style.transform = 'translateX(0)';

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
        }, 3000);
    }

    // Add parallax effect to hero section
    const hero = document.querySelector('.projects-hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add hover effect to project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Page preview functionality
    const pageItems = document.querySelectorAll('.page-item');
    
    pageItems.forEach(pageItem => {
        pageItem.addEventListener('click', function() {
            const pageIframe = this.querySelector('.page-iframe');
            const projectCard = this.closest('.project-card');
            const mainIframe = projectCard.querySelector('.project-preview');
            
            if (pageIframe && mainIframe) {
                // Update main preview to show selected page
                mainIframe.src = pageIframe.src;
                
                // Visual feedback - highlight selected page
                const allPages = projectCard.querySelectorAll('.page-item');
                allPages.forEach(page => page.classList.remove('active-page'));
                this.classList.add('active-page');
                
                // Scroll to main preview
                mainIframe.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                // Add loading animation to main preview
                const previewIndicator = projectCard.querySelector('.preview-indicator');
                if (previewIndicator) {
                    const originalText = previewIndicator.innerHTML;
                    previewIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                    
                    setTimeout(() => {
                        previewIndicator.innerHTML = originalText;
                    }, 2000);
                }
            }
        });
        
        // Add hover effect to show page title
        pageItem.addEventListener('mouseenter', function() {
            const label = this.querySelector('.page-label');
            if (label) {
                label.style.transform = 'scale(1.1)';
                label.style.fontWeight = '600';
            }
        });
        
        pageItem.addEventListener('mouseleave', function() {
            const label = this.querySelector('.page-label');
            if (label) {
                label.style.transform = 'scale(1)';
                label.style.fontWeight = 'normal';
            }
        });
    });
    
    // Add loading delay for page iframes
    const pageIframes = document.querySelectorAll('.page-iframe');
    pageIframes.forEach((iframe, index) => {
        // Stagger loading to prevent overwhelming the browser
        setTimeout(() => {
            iframe.style.opacity = '1';
        }, index * 200);
        
        iframe.style.opacity = '0.7';
        iframe.style.transition = 'opacity 0.5s ease';
    });
});
