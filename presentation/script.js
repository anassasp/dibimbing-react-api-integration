document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentSlideEl = document.getElementById('current-slide');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Each slide can have multiple steps inside it
    // We track step index per slide
    let currentStepIndices = new Array(totalSlides).fill(0);

    function updatePresentation() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        currentSlideEl.textContent = currentSlide + 1;
        prevBtn.disabled = (currentSlide === 0 && currentStepIndices[currentSlide] === 0);
        
        const currentSlideElDom = slides[currentSlide];
        const steps = currentSlideElDom.querySelectorAll('.step');
        
        nextBtn.disabled = (currentSlide === totalSlides - 1 && currentStepIndices[currentSlide] >= steps.length);
    }

    function revealStep() {
        const slide = slides[currentSlide];
        const steps = slide.querySelectorAll('.step');
        
        if (currentStepIndices[currentSlide] < steps.length) {
            steps[currentStepIndices[currentSlide]].classList.add('visible');
            currentStepIndices[currentSlide]++;
            updatePresentation();
            return true; // Step was revealed
        }
        return false; // No more steps
    }

    function hideLastStep() {
        const slide = slides[currentSlide];
        const steps = slide.querySelectorAll('.step');
        
        if (currentStepIndices[currentSlide] > 0) {
            currentStepIndices[currentSlide]--;
            steps[currentStepIndices[currentSlide]].classList.remove('visible');
            updatePresentation();
            return true; // Step was hidden
        }
        return false; // No more steps to hide
    }

    function nextAction() {
        const hasMoreSteps = revealStep();
        if (!hasMoreSteps) {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updatePresentation();
            }
        }
    }

    function prevAction() {
        const hasHiddenStep = hideLastStep();
        if (!hasHiddenStep) {
            if (currentSlide > 0) {
                currentSlide--;
                // Jump to the end of the previous slide's steps
                const prevSlideSteps = slides[currentSlide].querySelectorAll('.step');
                currentStepIndices[currentSlide] = prevSlideSteps.length;
                prevSlideSteps.forEach(s => s.classList.add('visible'));
                updatePresentation();
            }
        }
    }

    nextBtn.addEventListener('click', nextAction);
    prevBtn.addEventListener('click', prevAction);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === ' ') {
            nextAction();
        } else if (e.key === 'ArrowLeft') {
            prevAction();
        }
    });

    // Initialize first view
    updatePresentation();
});
