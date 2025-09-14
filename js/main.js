// ==================== Mobile Menu Functionality ====================

// Handle mobile menu toggle
const handleMobileMenuToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const menuToggle = document.querySelector('.header__menu-toggle');
    const headerRight = document.querySelector('.header__right');
    const body = document.body;
    
    if (!menuToggle || !headerRight) return;
    
    const isOpen = headerRight.classList.contains('header__right--open');
    
    if (isOpen) {
        // Close menu
        headerRight.classList.remove('header__right--open');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
    } else {
        // Open menu
        headerRight.classList.add('header__right--open');
        menuToggle.setAttribute('aria-expanded', 'true');
        body.style.overflow = 'hidden';
    }
};

// Handle mobile menu link clicks
const handleMobileMenuLinkClick = (event) => {
    const headerRight = document.querySelector('.header__right');
    const menuToggle = document.querySelector('.header__menu-toggle');
    const body = document.body;
    
    // Close mobile menu when link is clicked
    if (headerRight && headerRight.classList.contains('header__right--open')) {
        headerRight.classList.remove('header__right--open');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
    }
};

// Handle click outside mobile menu to close it
const handleClickOutsideMobileMenu = (event) => {
    const headerRight = document.querySelector('.header__right');
    const menuToggle = document.querySelector('.header__menu-toggle');
    const body = document.body;
    
    if (!headerRight || !headerRight.classList.contains('header__right--open')) return;
    
    // Check if click is outside the menu
    if (!headerRight.contains(event.target) && !menuToggle.contains(event.target)) {
        headerRight.classList.remove('header__right--open');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
    }
};

// Handle escape key to close mobile menu
const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
        const headerRight = document.querySelector('.header__right');
        const menuToggle = document.querySelector('.header__menu-toggle');
        const body = document.body;
        
        if (headerRight && headerRight.classList.contains('header__right--open')) {
            headerRight.classList.remove('header__right--open');
            menuToggle.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        }
    }
};

// Initialize mobile menu functionality
const initMobileMenu = () => {
    const menuToggle = document.querySelector('.header__menu-toggle');
    const navLinks = document.querySelectorAll('.header__nav-link');
    
    // Add event listener to menu toggle button
    if (menuToggle) {
        menuToggle.addEventListener('click', handleMobileMenuToggle);
        menuToggle.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleMobileMenuToggle(event);
            }
        });
    }
    
    // Add event listeners to navigation links for mobile menu
    navLinks.forEach(link => {
        link.addEventListener('click', handleMobileMenuLinkClick);
    });
    
    // Add event listener for clicks outside menu
    document.addEventListener('click', handleClickOutsideMobileMenu);
    
    // Add event listener for escape key
    document.addEventListener('keydown', handleEscapeKey);
};

// ==================== Header Functionality ====================

// Handle navigation link clicks with smooth scroll
const handleNavLinkClick = (event) => {
    const link = event.target;
    const href = link.getAttribute('href');
    
    // Check if it's an anchor link
    if (href && href.startsWith('#')) {
        event.preventDefault();
        
        // Remove # from href to get the id
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Smooth scroll to the target element
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Update URL without page reload
        history.pushState(null, null, href);
    }
};

// Handle contact button click
const handleContactButtonClick = (event) => {
    event.preventDefault();
    if (window.ModalContact && typeof window.ModalContact.open === 'function') {
        window.ModalContact.open();
        return;
    }
    // Fallback: smooth scroll if a contact section exists
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

// Handle hero request button click
const handleHeroRequestClick = (event) => {
    event.preventDefault();
    if (window.ModalContact && typeof window.ModalContact.open === 'function') {
        window.ModalContact.open();
        return;
    }
};

// Handle keyboard navigation for accessibility
const handleKeyboardNavigation = (event) => {
    // Handle Enter key for buttons and links
    if (event.key === 'Enter' || event.key === ' ') {
        const element = event.target;
        
        if (element.classList.contains('header__button')) {
            event.preventDefault();
            handleContactButtonClick(event);
        } else if (element.classList.contains('hero__button')) {
            event.preventDefault();
            handleHeroRequestClick(event);
        }
    }
};

// Initialize header functionality
const initHeader = () => {
    // Get header elements
    const navLinks = document.querySelectorAll('.header__nav-link');
    const contactButton = document.querySelector('.header__button');
    
    // Add event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });
    
    // Add event listener to contact button
    if (contactButton) {
        contactButton.addEventListener('click', handleContactButtonClick);
        contactButton.addEventListener('keydown', handleKeyboardNavigation);
    }
    
    // Add active state to current page link
    const currentHash = window.location.hash;
    if (currentHash) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentHash) {
                link.classList.add('header__nav-link--active');
            }
        });
    }
};

// Initialize hero functionality
const initHero = () => {
    // Get hero elements
    const heroButton = document.querySelector('.hero__button');
    
    // Add event listener to hero request button
    if (heroButton) {
        heroButton.addEventListener('click', handleHeroRequestClick);
        heroButton.addEventListener('keydown', handleKeyboardNavigation);
    }
};

// Handle scroll events for header
const handleScroll = () => {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
};

// Debounce function for scroll performance
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Initialize CTA functionality
const initCTA = () => {
    const ctaButtonWrapper = document.querySelector('.cta__button-wrapper');
    const ctaButton = document.querySelector('.cta__button');
    const ctaForm = document.querySelector('.cta__form');
    const ctaInput = document.querySelector('.cta__input');
    
    if (ctaButtonWrapper && ctaButton) {
        // При клике на wrapper передаем клик на кнопку
        ctaButtonWrapper.addEventListener('click', (event) => {
            // Если клик не по самой кнопке, передаем его на кнопку
            if (event.target !== ctaButton) {
                ctaButton.click();
            }
        });
    }
    
    // Handle CTA form submission
    if (ctaForm) {
        ctaForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const email = ctaInput ? ctaInput.value.trim() : '';
            const submitBtn = ctaForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : '';
            
            // Basic email validation
            if (!email || !isValidEmail(email)) {
                if (ctaInput) {
                    ctaInput.style.borderColor = '#E05252';
                    ctaInput.placeholder = 'Введите корректный email';
                }
                return;
            }
            
            // Reset input styling
            if (ctaInput) {
                ctaInput.style.borderColor = '';
                ctaInput.placeholder = 'Email для связи';
            }
            
            try {
                // Show loading state
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Отправляем...';
                }
                
                // Send to backend
                const isLocal = ['localhost','127.0.0.1'].includes(window.location.hostname);
                const endpoint = isLocal ? 'http://localhost:3001/api/notify' : '/api/notify';
                
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ 
                        email,
                        intent: 'newsletter',
                        source: 'cta_form'
                    })
                });
                
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || `HTTP ${response.status}`);
                }
                
                const result = await response.json();
                
                if (result.ok) {
                    // Success state
                    if (ctaInput) {
                        ctaInput.value = '';
                        ctaInput.placeholder = 'Спасибо! Мы свяжемся с вами';
                    }
                    if (submitBtn) {
                        submitBtn.textContent = 'Отправлено!';
                    }
                    
                    // Reset after 3 seconds
                    setTimeout(() => {
                        if (ctaInput) ctaInput.placeholder = 'Email для связи';
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.textContent = originalText;
                        }
                    }, 3000);
                } else {
                    throw new Error(result.message || 'Ошибка отправки');
                }
                
            } catch (error) {
                console.error('CTA form error:', error);
                
                // Reset button state
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
                
                // Show error
                if (ctaInput) {
                    ctaInput.style.borderColor = '#E05252';
                    ctaInput.placeholder = 'Ошибка отправки. Попробуйте позже.';
                }
                
                // Reset error state after 3 seconds
                setTimeout(() => {
                    if (ctaInput) {
                        ctaInput.style.borderColor = '';
                        ctaInput.placeholder = 'Email для связи';
                    }
                }, 3000);
            }
            
            // Dispatch custom event for analytics
            const customEvent = new CustomEvent('cta:submit', { 
                detail: { email } 
            });
            document.dispatchEvent(customEvent);
        });
    }
};

// Email validation helper
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// ==================== Reviews Slider Functionality ====================

// Reviews slider state
let currentSlide = 0;
const totalSlides = 2; // Based on actual review cards count

// Handle reviews indicator click
const handleReviewsIndicatorClick = (event) => {
    const indicator = event.target;
    const slideIndex = Array.from(document.querySelectorAll('.reviews__indicator')).indexOf(indicator);
    
    if (slideIndex !== -1 && slideIndex !== currentSlide) {
        // Update active indicator
        document.querySelectorAll('.reviews__indicator').forEach((ind, index) => {
            const isActive = index === slideIndex;
            ind.classList.toggle('reviews__indicator--active', isActive);
            ind.setAttribute('aria-selected', isActive.toString());
            ind.setAttribute('tabindex', isActive ? '0' : '-1');
        });
        
        currentSlide = slideIndex;
        
        // Update review cards content (simulate different reviews)
        updateReviewCards(slideIndex);
    }
};

// Review data for different slides
const reviewData = [
    [
        {
            name: "Justin Lee",
            position: "Дизайнер продуктов в Ito",
            text: "Хороший риелтор не исчезает после подписания договора. Покупка большего дома не обязательно означает трату больше денег. Прошли через это. Продали. Купили. Собрали всё воедино."
        },
        {
            name: "Angel Cathe", 
            position: "Дизайнер продуктов в Ito",
            text: "Хороший риелтор не исчезает после подписания договора. Покупка большего дома не обязательно означает трату больше денег. Прошли через это. Продали. Купили. Собрали всё воедино."
        }
    ],
    [
        {
            name: "Maria Rodriguez",
            position: "Менеджер по недвижимости",
            text: "Отличный сервис! Помогли найти идеальный дом для нашей семьи. Профессиональный подход и внимание к деталям. Рекомендую всем, кто ищет недвижимость."
        },
        {
            name: "David Chen",
            position: "Инвестор в недвижимость",
            text: "Быстро и эффективно помогли с продажей квартиры. Отличная команда профессионалов. Цены справедливые, процесс прозрачный. Остался очень доволен результатом."
        }
    ]
];

// Update review cards based on slide
const updateReviewCards = (slideIndex) => {
    const reviewCards = document.querySelectorAll('.review-card');
    const currentData = reviewData[slideIndex] || reviewData[0];
    
    // Update first card
    if (reviewCards[0] && currentData[0]) {
        const nameEl = reviewCards[0].querySelector('.review-card__name');
        const positionEl = reviewCards[0].querySelector('.review-card__position');
        const textEl = reviewCards[0].querySelector('.review-card__text');
        
        if (nameEl) nameEl.textContent = currentData[0].name;
        if (positionEl) positionEl.textContent = currentData[0].position;
        if (textEl) textEl.textContent = currentData[0].text;
    }
    
    // Update second card
    if (reviewCards[1] && currentData[1]) {
        const nameEl = reviewCards[1].querySelector('.review-card__name');
        const positionEl = reviewCards[1].querySelector('.review-card__position');
        const textEl = reviewCards[1].querySelector('.review-card__text');
        
        if (nameEl) nameEl.textContent = currentData[1].name;
        if (positionEl) positionEl.textContent = currentData[1].position;
        if (textEl) textEl.textContent = currentData[1].text;
    }
    
    // Announce slide change for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Слайд ${slideIndex + 1} из ${totalSlides}`;
    document.body.appendChild(announcement);
    
    // Remove announcement after screen reader has time to read it
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
};

// Handle keyboard navigation for reviews slider
const handleReviewsKeyboard = (event) => {
    const indicators = document.querySelectorAll('.reviews__indicator');
    const activeIndicator = document.querySelector('.reviews__indicator--active');
    const activeIndex = Array.from(indicators).indexOf(activeIndicator);
    
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        const prevIndex = activeIndex > 0 ? activeIndex - 1 : totalSlides - 1;
        indicators[prevIndex].click();
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        const nextIndex = activeIndex < totalSlides - 1 ? activeIndex + 1 : 0;
        indicators[nextIndex].click();
    }
};

// Initialize reviews slider
const initReviewsSlider = () => {
    const indicators = document.querySelectorAll('.reviews__indicator');
    const reviewsSection = document.querySelector('.reviews');
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', handleReviewsIndicatorClick);
        indicator.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleReviewsIndicatorClick(event);
            }
        });
    });
    
    // Add keyboard navigation to the reviews section
    if (reviewsSection) {
        reviewsSection.addEventListener('keydown', handleReviewsKeyboard);
        reviewsSection.setAttribute('tabindex', '0');
        reviewsSection.setAttribute('aria-label', 'Слайдер отзывов. Используйте стрелки для навигации');
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initHeader();
    initHero();
    initCTA();
    initReviewsSlider();
    
    // Add scroll listener with debounce for performance
    window.addEventListener('scroll', debounce(handleScroll, 10));
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Re-initialize when page becomes visible
        initHeader();
        initHero();
    }
});
