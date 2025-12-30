// VSL2 - Combined Scripts
// ==========================================================================

(function () {
  'use strict';

  // Constants for SessionStorage Keys
  const STORAGE = {
    STYLE: 'selectedStyle',
    ETHNICITY: 'selectedEthnicity',
    AGE: 'selectedAge',
    BODY_TYPE: 'selectedBodyType',
    BREAST_SIZE: 'selectedBreastSize',
    BOOTY_SIZE: 'selectedBootySize',
    HAIRSTYLE: 'selectedHairstyle',
    HAIR_COLOR: 'selectedHairColor',
    EYE_COLOR: 'selectedEyeColor',
    VOICE: 'selectedVoice',
    RELATIONSHIP: 'selectedRelationship'
  };

  // Voice Audio Files Map
  const VOICE_AUDIO_MAP = {
    'cute': './cute.mp3',
    'teen': './teen.mp3',
    'soft': './soft.mp3',
    'dominant': './dominant.mp3'
  };

  // Current playing audio instance
  let currentAudio = null;

  // Image Assets Configuration
  const IMAGE_MAP = {
    'style': {
      'realistic': './assets/model-realistic.webp?v=2',
      'anime': './assets/model-anime.webp?v=2'
    },
    'origin': {
      'european': './assets/model-european.webp?v=2',
      'asian': './assets/model-asian.webp?v=2',
      'arab': './assets/model-arab.webp?v=2',
      'black': './assets/model-black.webp?v=2',
      'latina': './assets/model-latina.webp?v=2'
    },
    'origin-anime': {
      'european': './assets/model-anime-european.webp?v=2',
      'asian': './assets/model-anime-asian.webp?v=2',
      'arab': './assets/model-anime-arab.webp?v=2',
      'black': './assets/model-anime-black.webp?v=2',
      'latina': './assets/model-anime-latina.webp?v=2'
    },
    'body-type': {
      'slim': './assets/body-realistic-slim.webp?v=2',
      'athletic': './assets/body-realistic-athletic.webp?v=2',
      'average': './assets/body-realistic-average.webp?v=2',
      'curvy': './assets/body-realistic-curvy.webp?v=2'
    },
    'body-type-anime': {
      'slim': './assets/body-anime-slim.webp?v=2',
      'athletic': './assets/body-anime-athletic.webp?v=2',
      'average': './assets/body-anime-average.webp?v=2',
      'curvy': './assets/body-anime-curvy.webp?v=2'
    },
    'breast-size': {
      'small': './assets/breast-realistic-small.webp?v=2',
      'medium': './assets/breast-realistic-medium.webp?v=2',
      'large': './assets/breast-realistic-large.webp?v=2',
      'huge': './assets/breast-realistic-huge.webp?v=2'
    },
    'breast-size-anime': {
      'small': './assets/breast-anime-small.webp?v=2',
      'medium': './assets/breast-anime-medium.webp?v=2',
      'large': './assets/breast-anime-large.webp?v=2',
      'huge': './assets/breast-anime-huge.webp?v=2'
    },
    'booty-size': {
      'small': './assets/booty-realistic-small.webp?v=2',
      'athletic': './assets/booty-realistic-athletic.webp?v=2',
      'medium': './assets/booty-realistic-medium.webp?v=2',
      'large': './assets/booty-realistic-large.webp?v=2'
    },
    'booty-size-anime': {
      'small': './assets/booty-anime-small.webp?v=2',
      'athletic': './assets/booty-anime-athletic.webp?v=2',
      'medium': './assets/booty-anime-medium.webp?v=2',
      'large': './assets/booty-anime-large.webp?v=2'
    },
    'hairstyle': {
      'straight': './assets/face-realistic-hairstyle-straight.webp?v=2',
      'wavy': './assets/face-realistic-hairstyle-wavy.webp?v=2',
      'braids': './assets/face-realistic-hairstyle-braids.webp?v=2',
      'bun': './assets/face-realistic-hairstyle-bun.webp?v=2',
      'curly': './assets/face-realistic-hairstyle-curly.webp?v=2',
      'ponytail': './assets/face-realistic-hairstyle-ponytail.webp?v=2'
    },
    'hairstyle-anime': {
      'straight': './assets/face-anime-hairstyle-straight.webp?v=2',
      'wavy': './assets/face-anime-hairstyle-wavy.webp?v=2',
      'braids': './assets/face-anime-hairstyle-braids.webp?v=2',
      'bun': './assets/face-anime-hairstyle-bun.webp?v=2',
      'curly': './assets/face-anime-hairstyle-curly.webp?v=2',
      'ponytail': './assets/face-anime-hairstyle-ponytail.webp?v=2'
    },
    'haircolor': {
      'black': './assets/face-realistic-haircolor-black.webp?v=2',
      'brunette': './assets/face-realistic-haircolor-brunette.webp?v=2',
      'blonde': './assets/face-realistic-haircolor-blonde.webp?v=2',
      'pink': './assets/face-realistic-haircolor-pink.webp?v=2',
      'redhead': './assets/face-realistic-haircolor-redhead.webp?v=2'
    },
    'haircolor-anime': {
      'black': './assets/face-anime-haircolor-black.webp?v=2',
      'brunette': './assets/face-anime-haircolor-brunette.webp?v=2',
      'blonde': './assets/face-anime-haircolor-blonde.webp?v=2',
      'pink': './assets/face-anime-haircolor-pink.webp?v=2',
      'redhead': './assets/face-anime-haircolor-redhead.webp?v=2'
    },
    'eyecolor': {
      'brown': './assets/face-realistic-eyecolor-brown.webp?v=2',
      'blue': './assets/face-realistic-eyecolor-blue.webp?v=2',
      'green': './assets/face-realistic-eyecolor-green.webp?v=2'
    },
    'eyecolor-anime': {
      'brown': './assets/face-anime-eyecolor-brown.webp?v=2',
      'blue': './assets/face-anime-eyecolor-blue.webp?v=2',
      'green': './assets/face-anime-eyecolor-green.webp?v=2'
    },
    'relationship': {
      'step-sister': './assets/relationship-step-sister.svg',
      'step-mom': './assets/relationship-step-mom.svg',
      'girlfriend': './assets/relationship-girlfriend.svg',
      'fuck-buddy': './assets/relationship-fuck-buddy.svg'
    }
  };

  /**
   * Helper: Capitalize first letter
   */
  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Helper: Get image path (for summary page)
   */
  function getImagePath(type, value, style) {
    if (type === 'style') {
      return IMAGE_MAP.style[value] || IMAGE_MAP.style.realistic;
    }

    if (type === 'origin') {
      const mapKey = style === 'anime' ? 'origin-anime' : 'origin';
      return IMAGE_MAP[mapKey] && IMAGE_MAP[mapKey][value] ? IMAGE_MAP[mapKey][value] : IMAGE_MAP.origin.european;
    }

    if (type === 'relationship') {
      return IMAGE_MAP.relationship[value] || IMAGE_MAP.relationship.girlfriend;
    }

    const mapKey = style === 'anime' ? type + '-anime' : type;
    return IMAGE_MAP[mapKey] && IMAGE_MAP[mapKey][value] ? IMAGE_MAP[mapKey][value] : '';
  }

  /**
   * Shared: Initialize style-based image switching
   * Used in: Origin, Body, Face pages
   * Optimized: Only loads images for selected style to reduce memory usage on mobile
   */
  function initStyleSwitching() {
    const selectedStyle = sessionStorage.getItem(STORAGE.STYLE) || 'realistic';

    // Select all potential image types across pages
    const realisticImages = document.querySelectorAll('.vsl2-ethnicity-image--realistic, .vsl2-body-image--realistic, .vsl2-face-image--realistic');
    const animeImages = document.querySelectorAll('.vsl2-ethnicity-image--anime, .vsl2-body-image--anime, .vsl2-face-image--anime');

    // Helper: Check if img has a valid src attribute (not empty, not page URL)
    function hasValidSrc(img) {
      return img.hasAttribute('src') && img.getAttribute('src') && img.getAttribute('src') !== '';
    }

    // Update button styles based on style selection
    // Also handle data-src for lazy loading - only load images for active style
    if (selectedStyle === 'anime') {
      realisticImages.forEach(img => {
        img.style.display = 'none';
        // Store src in data-src and remove to free memory
        if (hasValidSrc(img)) {
          img.dataset.src = img.getAttribute('src');
          img.removeAttribute('src');
        }
      });
      animeImages.forEach(img => {
        img.style.display = 'block';
        // Load from data-src if available
        if (img.dataset.src && !hasValidSrc(img)) {
          img.src = img.dataset.src;
        }
      });
    } else {
      realisticImages.forEach(img => {
        img.style.display = 'block';
        // Load from data-src if available
        if (img.dataset.src && !hasValidSrc(img)) {
          img.src = img.dataset.src;
        }
      });
      animeImages.forEach(img => {
        img.style.display = 'none';
        // Store src in data-src and remove to free memory
        if (hasValidSrc(img)) {
          img.dataset.src = img.getAttribute('src');
          img.removeAttribute('src');
        }
      });
    }
  }

  /**
   * Play voice audio when voice card is selected
   */
  function playVoiceAudio(voiceType) {
    const audioPath = VOICE_AUDIO_MAP[voiceType];
    if (!audioPath) {
      console.error('Audio file not found for voice:', voiceType);
      return;
    }

    // Stop current audio if playing
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Create and play new audio
    currentAudio = new Audio(audioPath);
    currentAudio.play()
      .then(() => {
        console.log('Playing voice:', voiceType);
      })
      .catch(error => {
        console.error('Error playing audio:', error);
      });

    // Clean up when audio ends
    currentAudio.addEventListener('ended', () => {
      currentAudio = null;
    });
  }

  /**
   * Shared: Generic Selection Logic for Cards
   * @param {string} selector - CSS selector for the cards
   * @param {string} storageKey - Key to save/load from sessionStorage
   * @param {string} dataAttr - Data attribute name to read value from
   * @param {string} activeClass - Class to add to selected card
   * @param {string} defaultVal - Default value if nothing saved
   * @param {function} onUpdate - Callback after selection (e.g., to update Next button)
   */
  function setupSelectionGroup(selector, storageKey, dataAttr, activeClass, defaultVal, onUpdate) {
    const cards = document.querySelectorAll(selector);
    if (cards.length === 0) return;

    const savedVal = sessionStorage.getItem(storageKey);

    cards.forEach(card => {
      const val = card.dataset[dataAttr];
      const label = card.querySelector('[class*="-label"]'); // Try to find label generically

      // Initial state
      let isSelected = false;
      if (savedVal) {
        isSelected = (val === savedVal);
      } else if (defaultVal) {
        isSelected = (val === defaultVal);
      }

      if (isSelected) {
        card.classList.add(activeClass);
        if (label) label.classList.remove(label.classList[0] + '--inactive');

        // If applying default value (and nothing was saved previously), save to storage to ensure validation passes
        if (!savedVal && defaultVal && val === defaultVal) {
          sessionStorage.setItem(storageKey, val);
        }
      } else {
        card.classList.remove(activeClass);
        if (label) label.classList.add(label.classList[0] + '--inactive');
      }

      // Click handler
      card.addEventListener('click', () => {
        // Deselect all
        cards.forEach(c => {
          c.classList.remove(activeClass);
          const l = c.querySelector('[class*="-label"]');
          if (l) l.classList.add(l.classList[0] + '--inactive');

          // Special case for Soul page labels outside
          const wrapper = c.closest('.vsl2-soul-voice-wrapper');
          if (wrapper) {
            const outsideLabel = wrapper.querySelector('.vsl2-soul-label--outside');
            if (outsideLabel) outsideLabel.classList.add('vsl2-soul-label--inactive');
          }
        });

        // Select clicked
        card.classList.add(activeClass);
        if (label) label.classList.remove(label.classList[0] + '--inactive');

        // Special case for Soul page labels outside
        const wrapper = card.closest('.vsl2-soul-voice-wrapper');
        if (wrapper) {
          const outsideLabel = wrapper.querySelector('.vsl2-soul-label--outside');
          if (outsideLabel) outsideLabel.classList.remove('vsl2-soul-label--inactive');
        }

        // Save
        sessionStorage.setItem(storageKey, val);
        console.log(`Selected ${storageKey}:`, val);

        // Auto-play voice if selecting voice card
        if (storageKey === STORAGE.VOICE) {
          playVoiceAudio(val);
        }

        if (onUpdate) onUpdate();
      });
    });
  }

  /**
   * Shared: Update Next Button State
   */
  function updateNextButton(isValid) {
    const nextBtn = document.querySelector('.vsl2-btn--next');
    if (!nextBtn) return;

    if (isValid) {
      nextBtn.disabled = false;
      nextBtn.style.opacity = '1';
      nextBtn.style.cursor = 'pointer';
      nextBtn.style.pointerEvents = 'auto';
    } else {
      nextBtn.disabled = true;
      nextBtn.style.opacity = '0.5';
      nextBtn.style.cursor = 'not-allowed';
      nextBtn.style.pointerEvents = 'none';
    }
  }

  /**
   * Shared: Setup Navigation Buttons
   */
  function setupNavigation(backUrl, nextUrl, checkValidation) {
    const nextBtn = document.querySelector('.vsl2-btn--next');
    const backBtn = document.querySelector('.vsl2-btn--back');

    if (nextBtn) {
      // Check initial state
      if (checkValidation) {
        updateNextButton(checkValidation());
      }

      nextBtn.addEventListener('click', (e) => {
        if (checkValidation && !checkValidation()) {
          e.preventDefault();
          return;
        }
        if (nextBtn.disabled) {
          e.preventDefault();
          return;
        }
        window.location.href = nextUrl;
      });
    }

    if (backBtn && backUrl) {
      backBtn.addEventListener('click', () => {
        window.location.href = backUrl;
      });
    }
  }

  /**
   * Shared: Setup multiple selection groups for a page
   * @param {Array} groups - Array of config objects for setupSelectionGroup
   * @param {Object} navConfig - { backUrl, nextUrl, validationKeys }
   */
  function setupPageSelections(groups, navConfig) {
    // Only run style switching if we are on a page that needs it (has images to switch)
    if (document.querySelector('.vsl2-ethnicity-image--realistic, .vsl2-body-image--realistic, .vsl2-face-image--realistic')) {
      initStyleSwitching();
    }

    const validationKeys = navConfig.validationKeys || [];
    const validate = () => {
      if (validationKeys.length === 0) return true;
      return validationKeys.every(key => sessionStorage.getItem(key));
    };

    const onUpdate = () => updateNextButton(validate());

    groups.forEach(g => {
      setupSelectionGroup(g.selector, g.key, g.attr, g.activeClass, g.defaultVal, onUpdate);
    });

    setupNavigation(navConfig.backUrl, navConfig.nextUrl, validate);
  }


  // ==========================================================================
  // PAGE SPECIFIC INITIALIZATIONS
  // ==========================================================================

  /**
   * Style Page Initialization
   */
  function initStylePage() {
    // Extract and save tracker token from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('_token');
    if (token) {
      sessionStorage.setItem('trackerToken', token);
      console.log('Tracker token saved:', token);
    }

    setupPageSelections([
      { selector: '.vsl2-style-card', key: STORAGE.STYLE, attr: 'style', activeClass: 'vsl2-style-card--selected', defaultVal: 'realistic' }
    ], {
      backUrl: null,
      nextUrl: 'vsl2-origin.html'
    });
  }

  /**
   * Origin Page Initialization
   */
  function initOriginPage() {
    initAgeSlider();

    setupPageSelections([
      { selector: '.vsl2-ethnicity-card', key: STORAGE.ETHNICITY, attr: 'ethnicity', activeClass: 'vsl2-ethnicity-card--selected', defaultVal: null }
    ], {
      backUrl: 'index.html',
      nextUrl: './vsl2-body.html',
      validationKeys: [STORAGE.ETHNICITY]
    });
  }

  function initAgeSlider() {
    const sliderTrack = document.querySelector('.vsl2-age-slider-track');
    const sliderFill = document.querySelector('.vsl2-age-slider-fill');
    const sliderThumb = document.querySelector('.vsl2-age-slider-thumb');
    const ageValue = document.querySelector('.vsl2-age-value');

    if (!sliderTrack || !sliderFill || !sliderThumb || !ageValue) return;

    const minAge = 18;
    const maxAge = 55;
    let currentAge = parseInt(sessionStorage.getItem(STORAGE.AGE)) || 36;
    let isDragging = false;

    function updateSlider(age) {
      currentAge = Math.max(minAge, Math.min(maxAge, age));
      const percentage = ((currentAge - minAge) / (maxAge - minAge)) * 100;

      sliderFill.style.width = percentage + '%';
      sliderThumb.style.left = percentage + '%';
      ageValue.textContent = currentAge + ' years';
      sessionStorage.setItem(STORAGE.AGE, currentAge);
    }

    function getAgeFromPosition(clientX) {
      const rect = sliderTrack.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      return Math.round(minAge + (percentage / 100) * (maxAge - minAge));
    }

    function handleMouseDown(e) {
      isDragging = true;
      updateSlider(getAgeFromPosition(e.clientX));
      e.preventDefault();
    }

    function handleMouseMove(e) {
      if (!isDragging) return;
      updateSlider(getAgeFromPosition(e.clientX));
      e.preventDefault();
    }

    function handleMouseUp() {
      isDragging = false;
    }

    function handleTouchStart(e) {
      isDragging = true;
      updateSlider(getAgeFromPosition(e.touches[0].clientX));
      // Don't prevent default to allow smooth scrolling on iOS
    }

    function handleTouchMove(e) {
      if (!isDragging) return;
      updateSlider(getAgeFromPosition(e.touches[0].clientX));
      // Only prevent default when actively dragging the slider
      if (isDragging) {
        e.preventDefault();
      }
    }

    sliderTrack.addEventListener('mousedown', handleMouseDown);
    sliderThumb.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);

    // Use passive: false only for touchmove to allow preventDefault when dragging
    sliderTrack.addEventListener('touchstart', handleTouchStart, { passive: true });
    sliderThumb.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleMouseUp, { passive: true });

    updateSlider(currentAge);
  }

  /**
   * Body Page Initialization
   */
  function initBodyPage() {
    setupPageSelections([
      { selector: '[data-body-type]', key: STORAGE.BODY_TYPE, attr: 'bodyType', activeClass: 'vsl2-body-card--selected', defaultVal: 'slim' },
      { selector: '[data-breast-size]', key: STORAGE.BREAST_SIZE, attr: 'breastSize', activeClass: 'vsl2-body-card--selected', defaultVal: 'medium' },
      { selector: '[data-booty-size]', key: STORAGE.BOOTY_SIZE, attr: 'bootySize', activeClass: 'vsl2-body-card--selected', defaultVal: 'athletic' }
    ], {
      backUrl: './vsl2-origin.html',
      nextUrl: './vsl2-face.html',
      validationKeys: [STORAGE.BODY_TYPE, STORAGE.BREAST_SIZE, STORAGE.BOOTY_SIZE]
    });
  }

  /**
   * Face Page Initialization
   */
  function initFacePage() {
    setupPageSelections([
      { selector: '[data-hairstyle]', key: STORAGE.HAIRSTYLE, attr: 'hairstyle', activeClass: 'vsl2-face-card--selected', defaultVal: 'wavy' },
      { selector: '[data-haircolor]', key: STORAGE.HAIR_COLOR, attr: 'haircolor', activeClass: 'vsl2-face-card--selected', defaultVal: 'blonde' },
      { selector: '[data-eyecolor]', key: STORAGE.EYE_COLOR, attr: 'eyecolor', activeClass: 'vsl2-face-card--selected', defaultVal: 'blue' }
    ], {
      backUrl: './vsl2-body.html',
      nextUrl: './vsl2-soul.html',
      validationKeys: [STORAGE.HAIRSTYLE, STORAGE.HAIR_COLOR, STORAGE.EYE_COLOR]
    });
  }

  /**
   * Soul Page Initialization
   */
  function initSoulPage() {
    setupPageSelections([
      { selector: '[data-voice]', key: STORAGE.VOICE, attr: 'voice', activeClass: 'vsl2-soul-card--selected', defaultVal: 'soft' },
      { selector: '[data-relationship]', key: STORAGE.RELATIONSHIP, attr: 'relationship', activeClass: 'vsl2-soul-card--selected', defaultVal: 'girlfriend' }
    ], {
      backUrl: './vsl2-face.html',
      nextUrl: './vsl2-summary.html',
      validationKeys: [STORAGE.VOICE, STORAGE.RELATIONSHIP]
    });
  }

  /**
   * Summary Page Initialization
   */
  function initSummaryPage() {
    const style = sessionStorage.getItem(STORAGE.STYLE) || 'realistic';
    const ethnicity = sessionStorage.getItem(STORAGE.ETHNICITY) || 'european';
    const age = sessionStorage.getItem(STORAGE.AGE) || '36';
    const bodyType = sessionStorage.getItem(STORAGE.BODY_TYPE) || 'slim';
    const breastSize = sessionStorage.getItem(STORAGE.BREAST_SIZE) || 'medium';
    const bootySize = sessionStorage.getItem(STORAGE.BOOTY_SIZE) || 'athletic';
    const hairstyle = sessionStorage.getItem(STORAGE.HAIRSTYLE) || 'wavy';
    const hairColor = sessionStorage.getItem(STORAGE.HAIR_COLOR) || 'blonde';
    const eyeColor = sessionStorage.getItem(STORAGE.EYE_COLOR) || 'blue';
    const voice = sessionStorage.getItem(STORAGE.VOICE) || 'teen';
    const relationship = sessionStorage.getItem(STORAGE.RELATIONSHIP) || 'girlfriend';

    const setText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    const setImage = (id, type, value) => {
      const el = document.getElementById(id);
      if (el) el.src = getImagePath(type, value, style);
    };

    setImage('summary-main-image', 'style', style);
    setText('summary-style-label', capitalize(style));

    setImage('summary-origin-image', 'origin', ethnicity);
    setText('summary-origin-label', capitalize(ethnicity));

    setImage('summary-body-type-image', 'body-type', bodyType);
    setText('summary-body-type-label', capitalize(bodyType));

    setImage('summary-breast-size-image', 'breast-size', breastSize);
    setText('summary-breast-size-label', capitalize(breastSize));

    setImage('summary-booty-size-image', 'booty-size', bootySize);
    setText('summary-booty-size-label', capitalize(bootySize));

    setImage('summary-hairstyle-image', 'hairstyle', hairstyle);
    setText('summary-hairstyle-label', capitalize(hairstyle));

    setImage('summary-haircolor-image', 'haircolor', hairColor);
    setText('summary-haircolor-label', capitalize(hairColor));

    setImage('summary-eyecolor-image', 'eyecolor', eyeColor);
    setText('summary-eyecolor-label', capitalize(eyeColor));

    setImage('summary-relationship-icon', 'relationship', relationship);
    setText('summary-relationship-label', relationship === 'fuck-buddy' ? 'Fuck Buddy' : capitalize(relationship.replace('-', ' ')));

    setText('summary-voice-label', capitalize(voice));
    setText('summary-age-value', age);

    // Voice Player
    const playBtn = document.querySelector('.vsl2-summary-voice-play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => console.log('Play voice:', voice));
    }

    // Setup Back button navigation
    const backBtn = document.querySelector('.vsl2-btn--back');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.location.href = './vsl2-soul.html';
      });
    }

    // Setup final "Bring my AI to life" button with tracker token
    const nextBtn = document.querySelector('.vsl2-btn--summary');
    if (nextBtn) {
      const token = sessionStorage.getItem('trackerToken') || '';
      const finalUrl = `https://tr.gentlyx.me/?_lp=1&_token=${encodeURIComponent(token)}`;

      nextBtn.addEventListener('click', () => {
        console.log('Redirecting to:', finalUrl);
        window.location.href = finalUrl;
      });
    }
  }

  /**
   * Register Page Initialization
   */
  function initRegisterPage() {
    // Close Button
    const closeBtn = document.querySelector('.vsl2-form-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        window.location.href = './vsl2-summary.html';
      });
    }

    // Google Button
    const googleBtn = document.querySelector('.vsl2-form-google-btn');
    if (googleBtn) {
      googleBtn.addEventListener('click', () => console.log('Google Sign In'));
    }

    // Form Submit
    const form = document.getElementById('register-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form Submitted');
      });
    }
  }


  /**
   * Main Router
   */
  function init() {
    if (document.querySelector('.vsl2-style-card')) {
      initStylePage();
    } else if (document.querySelector('.vsl2-ethnicity-card')) {
      initOriginPage();
    } else if (document.querySelector('[data-body-type]')) {
      initBodyPage();
    } else if (document.querySelector('[data-hairstyle]')) {
      initFacePage();
    } else if (document.querySelector('.vsl2-soul-card--voice')) {
      initSoulPage();
    } else if (document.getElementById('summary-main-image')) {
      initSummaryPage();
    } else if (document.getElementById('register-form')) {
      initRegisterPage();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
