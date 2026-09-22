/**
 * QUANTIFORM PREMIUM GLOBAL SYSTEM CONTROLLER JS
 * Core Functionality: Live Theming, Telemetry Tracker, Portfolio Sorting Filter Engine
 */

// Color Token Constants Configuration
const sectionAccents = {
    services: '#2F6BFF',     // Blue
    projects: '#0FA58F',     // Teal
    resources: '#F0A020',    // Amber
    company: '#EE5A3C'       // Coral
};

/**
 * Switch Site Custom Variables and Graphic Curve Accent Paths
 */
function switchSectionAccent(sectionKey) {
    const targetColor = sectionAccents[sectionKey] || sectionAccents.services;
    
    // Inject accent token to root variable context cleanly
    document.documentElement.style.setProperty('--clr-accent', targetColor);
    
    // Update SVG active line stroke array
    const linePath = document.getElementById('dynamic-curve');
    if (linePath) {
        linePath.setAttribute('stroke', targetColor);
    }
    
    // Sync graphical legend indicators
    const dotElement = document.getElementById('legend-dot');
    if (dotElement) {
        dotElement.style.backgroundColor = targetColor;
    }

    // Sync header navigation link active flags
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${sectionKey}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Update monogram color letter mark highlight
    const monoAccentText = document.getElementById('mono-accent');
    if (monoAccentText) {
        monoAccentText.style.color = targetColor;
    }
}

/**
 * Case Portfolios Live Filtering Loop Framework
 */
function filterPortfolio(category) {
    // Sync active color style dynamically to project palette tracking
    switchSectionAccent('projects');
    
    // Sync target control buttons active tags UI states
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(`'${category}'`)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Toggle card matching items configuration visibility states
    const items = document.querySelectorAll('.case-card');
    items.forEach(card => {
        const serviceAttr = card.getAttribute('data-service');
        if (category === 'all' || serviceAttr === category) {
            card.style.display = 'flex';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
}

/**
 * Automate Device Timezone Synchronization Logging
 */
function trackClientTimezone() {
    try {
        const detectedZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
        const tzLogBox = document.getElementById('client-tz-log');
        if (tzLogBox) {
            tzLogBox.textContent = `TZ_CONTEXT: ${detectedZone}`;
        }
    } catch (err) {
        console.warn("Timezone calculation pipeline exception logged:", err);
    }
}

/**
 * Request Logs Form Transmit Submission Pipeline Interceptor
 */
function processRequestLog(event) {
    event.preventDefault();
    const identityInput = document.getElementById('corp-identity').value;
    const selectedDomain = document.getElementById('domain-scope').value;
    
    alert(`TRANSMISSION SUCCESSFUL.\n\nRequest metrics recorded for ${identityInput}. The leading partner managing the [${selectedDomain.toUpperCase()}] division has logged your sync sprint ticket.`);
    event.target.reset();
    trackClientTimezone();
}

// Global Lifecycle Initializer Core Hooks
document.addEventListener('DOMContentLoaded', () => {
    trackClientTimezone();
    
    // Wire intersection visibility observers to seamlessly match accents during scrolling actions
    const observableSections = ['services', 'projects', 'resources', 'company'];
    const observerConfiguration = {
        root: null,
        rootMargin: '-25% 0px -55% 0px',
        threshold: 0
    };
    
    const layoutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                switchSectionAccent(entry.target.id);
            }
        });
    }, observerConfiguration);

    observableSections.forEach(sectionId => {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            layoutObserver.observe(targetElement);
        }
    });
});
