// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Simulate form submission
                showSuccessMessage();
                this.reset();
                clearValidation();
            }
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                if (this.parentElement.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }

    // Form validation functions
    function validateForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    function validateField(field) {
        const formGroup = field.parentElement;
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Reset validation classes
        formGroup.classList.remove('error', 'success');

        // Validate based on field type
        switch (fieldName) {
            case 'name':
                if (fieldValue.length < 2) {
                    errorMessage = 'Name must be at least 2 characters long';
                    isValid = false;
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(fieldValue)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;

            case 'subject':
                if (!fieldValue) {
                    errorMessage = 'Please select a subject';
                    isValid = false;
                }
                break;

            case 'message':
                if (fieldValue.length < 10) {
                    errorMessage = 'Message must be at least 10 characters long';
                    isValid = false;
                }
                break;
        }

        // Apply validation result
        if (!isValid) {
            formGroup.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            formGroup.appendChild(errorDiv);
        } else if (fieldValue) {
            formGroup.classList.add('success');
        }

        return isValid;
    }

    function clearValidation() {
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error', 'success');
            const errorMessage = group.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    }

    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #4caf50;
            color: white;
            padding: 30px 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            text-align: center;
            font-weight: 600;
            font-size: 1.1rem;
        `;
        successMessage.innerHTML = `
            <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 15px; display: block;"></i>
            Thank you for your message!<br>
            <small style="opacity: 0.9; font-weight: normal;">I'll get back to you within 24-48 hours.</small>
        `;

        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(successMessage);

        // Remove after 3 seconds
        setTimeout(() => {
            document.body.removeChild(overlay);
            document.body.removeChild(successMessage);
        }, 3000);

        // Remove on click
        overlay.addEventListener('click', () => {
            document.body.removeChild(overlay);
            document.body.removeChild(successMessage);
        });
    }

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

    // Add scroll animation for elements
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

    // Elements to animate
    const animateElements = document.querySelectorAll('.contact-item, .contact-form-container, .contact-cta, .social-section');
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });

    // Add copy email functionality
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.href.replace('mailto:', '');
            
            // Try to copy to clipboard
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(() => {
                    showNotification('Email copied to clipboard!');
                }).catch(() => {
                    // Fallback: open email client
                    window.location.href = this.href;
                });
            } else {
                // Fallback: open email client
                window.location.href = this.href;
            }
        });
    });

    // Add social link tracking (for analytics purposes)
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.classList.contains('linkedin') ? 'LinkedIn' : 
                           this.classList.contains('github') ? 'GitHub' : 'Facebook';
            console.log(`Social link clicked: ${platform}`);
        });
    });

    // Add hover effects to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });

        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Notification function
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4caf50' : '#64ffda'};
            color: ${type === 'success' ? 'white' : '#1a1a1a'};
            padding: 15px 25px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            max-width: 300px;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Animate out
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Add parallax effect to hero section
    const hero = document.querySelector('.contact-hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add typing effect to availability status
    const availabilityText = document.querySelector('.availability-status span');
    if (availabilityText) {
        const originalText = availabilityText.textContent;
        availabilityText.textContent = '';
        
        let index = 0;
        const typeWriter = () => {
            if (index < originalText.length) {
                availabilityText.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        };

        // Start typing effect when element comes into view
        const typeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    typeObserver.unobserve(entry.target);
                }
            });
        });

        typeObserver.observe(availabilityText);
    }
});
