// ==========================================================================
// ==========================================================================
// Instant Quote Estimator Logic (Feature #2)
// ==========================================================================

const prices = {
    'Removal': { min: 400, max: 2500, label: 'Tree Removal' },
    'Trimming': { min: 250, max: 1200, label: 'Tree Trimming / Pruning' },
    'Stump': { min: 150, max: 500, label: 'Stump Grinding' },
    'Clearing': { min: 1000, max: 5000, label: 'Land Clearing' }
};

function selectService(serviceKey) {
    // Hide step 1
    document.getElementById('step1').style.display = 'none';
    
    // Show step 2 (Loading)
    const step2 = document.getElementById('step2');
    step2.style.display = 'block';
    
    const priceResult = document.getElementById('price-result');
    const loadingText = step2.querySelector('h3');
    
    // Reset state
    priceResult.style.display = 'none';
    step2.querySelector('.loader').style.display = 'block';
    loadingText.innerText = 'Calculating AI Estimate...';
    
    // Simulate AI calculation delay
    setTimeout(() => {
        const service = prices[serviceKey];
        
        // Hide loader
        step2.querySelector('.loader').style.display = 'none';
        
        // Show result
        loadingText.innerText = `Estimated Cost: ${service.label}`;
        priceResult.innerText = `$${service.min} - $${service.max}`;
        priceResult.style.display = 'block';
        
    }, 1500); // 1.5 seconds loading simulation for dramatic effect
}

function resetWizard() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
}

// ==========================================================================
// Interactive Before/After Slider (Feature #4)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const beforeImage = document.querySelector('.img-before');
    const sliderHandle = document.querySelector('.slider-handle');
    
    if (!sliderContainer || !beforeImage || !sliderHandle) return;
    
    let isDragging = false;
    
    const updateSlider = (e) => {
        if (!isDragging) return;
        
        // Get mouse/touch position relative to container
        const rect = sliderContainer.getBoundingClientRect();
        let x;
        
        if (e.type === 'touchmove') {
            x = e.touches[0].clientX - rect.left;
        } else {
            x = e.clientX - rect.left;
        }
        
        // Clamp between 0 and 100%
        x = Math.max(0, Math.min(x, rect.width));
        
        const percentage = (x / rect.width) * 100;
        
        // Update DOM
        beforeImage.style.width = `${percentage}%`;
        sliderHandle.style.left = `${percentage}%`;
    };
    
    // Mouse events
    sliderHandle.addEventListener('mousedown', () => { isDragging = true; });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', updateSlider);
    
    // Touch events for mobile
    sliderHandle.addEventListener('touchstart', (e) => { isDragging = true; }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });
    window.addEventListener('touchmove', updateSlider, { passive: true });
});

// ==========================================================================
// Navbar Scroll Effect
// ==========================================================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});
