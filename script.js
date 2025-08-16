// Smooth Scrolling para links de navegação
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para links internos (apenas para links de navegação)
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header-fixed').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header-fixed');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(45, 80, 22, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--primary-green)';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer para animações
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll(".benefit-item, .testimonial-item, .product-category, .section-header h2, .section-header p");
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Contador de desconto animado
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current + '% OFF';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Animar contadores quando visíveis
    const discountElements = document.querySelectorAll('.discount');
    const discountObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target, 0, 45, 2000);
                discountObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    discountElements.forEach(el => {
        discountObserver.observe(el);
    });
    
    // Efeito de hover nos cards de produto
    const productCards = document.querySelectorAll('.product-category');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Efeito de hover nos benefícios
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.benefit-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.background = 'var(--dark-gold)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.benefit-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.background = 'var(--gold)';
        });
    });
    
    // Lazy loading para imagens
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = function() {
                    this.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Efeito de digitação no título principal
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Aplicar efeito de digitação ao título hero após um delay
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }, 500);
    
    // Adicionar efeito de parallax sutil ao hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        const rate = scrolled * -0.5;
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Adicionar ripple effect aos botões
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
    
    // Aplicar ripple effect aos botões CTA
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-large, .cta-button-giant');
    ctaButtons.forEach(button => {
        button.addEventListener('click', createRipple);
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
    });
    
    // CSS para o efeito ripple
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    

});

// Função para detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar comportamento para mobile
if (isMobile()) {
    // Reduzir animações em dispositivos móveis para melhor performance
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
    
    // Adicionar classe mobile ao body
    document.body.classList.add('mobile');
}

// Função para otimizar performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce ao scroll
const debouncedScroll = debounce(function() {
    // Lógica de scroll otimizada
}, 10);

window.addEventListener("scroll", debouncedScroll);


});

// Efeito de digitação no título principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = "";
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efeito de digitação ao título hero após um delay
setTimeout(() => {
    const heroTitle = document.querySelector(".hero-title");
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 80);
}, 500);

// Função para rolar suavemente para a próxima seção
function scrollToSection() {
    const conceptSection = document.querySelector('#conceito');
    if (conceptSection) {
        conceptSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        // Se não encontrar a seção conceito, rola para baixo uma tela
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    }
}

