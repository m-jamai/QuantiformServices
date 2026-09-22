// Dynamic UI Color Configurations
const sectionColors = {
    services: '#2F6BFF',
    projects: '#0FA58F',
    company: '#EE5A3C',
    resources: '#F0A020'
};

function setAccent(sectionKey) {
    const hexColor = sectionColors[sectionKey] || sectionColors.services;
    document.documentElement.style.setProperty('--clr-accent-current', hexColor);
    
    const simCurve = document.getElementById('simulated-curve');
    if (simCurve) simCurve.setAttribute('stroke', hexColor);
    
    const legendDot = document.getElementById('legend-sim-dot');
    if (legendDot) legendDot.style.backgroundColor = hexColor;

    const navItems = document.querySelectorAll('.nav-links li');
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('onclick') && link.getAttribute('onclick').includes(sectionKey)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function switchService(serviceId) {
    setAccent('services');
    
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        if (btn.getAttribute('onclick').includes(serviceId)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const panels = document.querySelectorAll('.service-panel');
    panels.forEach(panel => {
        if (panel.id === `panel-${serviceId}`) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });
}

function filterProjects(tag) {
    setAccent('projects');
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        if (btn.getAttribute('onclick').includes(tag)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const service = card.getAttribute('data-service');
        if (tag === 'all' || service === tag) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function initTimezone() {
    try {
        const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
        const display = document.getElementById('tz-display');
        if (display) display.textContent = zone;
    } catch (e) {
        console.warn("Timezone initialization failed", e);
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('client-name').value;
    alert(`Scoping Request Transmitted Successfully.\n\nThank you ${name}. An engineer from the designated specialization branch will follow up within 48 hours.`);
    event.target.reset();
    initTimezone();
}

document.addEventListener('DOMContentLoaded', () => {
    initTimezone();
});
