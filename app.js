/* ============================================
   SYNAPSE - First Principles Thinking Engine
   ============================================ */

// ============================================
// Configuration
// ============================================

const CONFIG = {
    // API Key: Set this manually, or pass via URL parameter (?api_key=YOUR_KEY)
    // For production, consider using a backend proxy to keep keys secure
    API_KEY: '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', 
    API_URL: 'https://api.openai.com/v1/chat/completions',
    MODEL: 'gpt-4',
    MIN_THINKERS: 3,
    MAX_THINKERS: 5,
    TYPEWRITER_DELAY: 20, // milliseconds per character
};

// ============================================
// Translations (Greek/English)
// ============================================

const translations = {
    EN: {
        placeholder: "Describe your dilemma or strategic challenge...",
        magic_button: "Magic Start",
        analyze_button: "Analyze",
        about_title: "ABOUT SYNAPSE",
        mission_title: "MISSION",
        mission_text: "To accelerate human decision-making by synthesizing classical wisdom with modern strategic thought.",
        process_title: "THE PROCESS",
        process_text: "1. Input Dilemma. 2. Select Council. 3. Synthesize Verdict.",
        settings_title: "API SETTINGS",
        save_key: "Save Key",
        clear_key: "Clear",
        key_status: "Status",
        new_inquiry: "New Inquiry",
        export_pdf: "Export PDF",
        final_verdict: "Final Verdict"
    },
    GR: {
        placeholder: "ΠΕΡΙΓΡΑΨΤΕ ΤΟ ΔΙΛΗΜΜΑ Η ΤΗ ΣΤΡΑΤΗΓΙΚΗ ΣΑΣ ΠΡΟΚΛΗΣΗ...",
        magic_button: "ΑΥΤΟΜΑΤΗ ΕΠΙΛΟΓΗ",
        analyze_button: "ΑΝΑΛΥΣΗ",
        about_title: "ΣΧΕΤΙΚΑ ΜΕ ΤΟ SYNAPSE",
        mission_title: "ΑΠΟΣΤΟΛΗ",
        mission_text: "Η ΕΠΙΤΑΧΥΝΣΗ ΤΗΣ ΑΝΘΡΩΠΙΝΗΣ ΛΗΨΗΣ ΑΠΟΦΑΣΕΩΝ ΜΕΣΩ ΤΗΣ ΣΥΝΘΕΣΗΣ ΤΗΣ ΚΛΑΣΙΚΗΣ ΣΟΦΙΑΣ ΜΕ ΤΗ ΣΥΓΧΡΟΝΗ ΣΤΡΑΤΗΓΙΚΗ ΣΚΕΨΗ.",
        process_title: "Η ΔΙΑΔΙΚΑΣΙΑ",
        process_text: "1. ΕΙΣΑΓΩΓΗ ΔΙΛΗΜΜΑΤΟΣ. 2. ΕΠΙΛΟΓΗ ΣΥΜΒΟΥΛΙΟΥ. 3. ΣΥΝΘΕΣΗ ΕΤΥΜΗΓΟΡΙΑΣ.",
        settings_title: "ΡΥΘΜΙΣΕΙΣ API",
        save_key: "ΑΠΟΘΗΚΕΥΣΗ",
        clear_key: "ΔΙΑΓΡΑΦΗ",
        key_status: "ΚΑΤΑΣΤΑΣΗ",
        new_inquiry: "ΝΕΑ ΕΡΩΤΗΣΗ",
        export_pdf: "ΕΞΑΓΩΓΗ PDF",
        final_verdict: "ΤΕΛΙΚΗ ΕΤΥΜΗΓΟΡΙΑ"
    }
};

// Current language state
let currentLang = localStorage.getItem('selectedLang') || 'EN';

// ============================================
// Language Management
// ============================================

function setLanguage(lang) {
    // Update global variable and save to localStorage
    currentLang = lang;
    localStorage.setItem('selectedLang', lang);
    
    // Update UI elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
                el.placeholder = translations[lang][key];
            } else {
                el.innerText = translations[lang][key];
            }
        }
    });
    
    // Visual toggle state
    const langEn = document.getElementById('lang-en');
    const langGr = document.getElementById('lang-gr');
    
    if (langEn && langGr) {
        langEn.style.fontWeight = lang === 'EN' ? '800' : '400';
        langEn.style.opacity = lang === 'EN' ? '1' : '0.5';
        langGr.style.fontWeight = lang === 'GR' ? '800' : '400';
        langGr.style.opacity = lang === 'GR' ? '1' : '0.5';
    }
}

function updateAboutModal(lang) {
    const t = translations[lang];
    if (!t) return;
    
    const aboutTitle = document.querySelector('.about-title');
    if (aboutTitle) aboutTitle.textContent = t.aboutTitle;
    
    const aboutSubheadline = document.querySelector('.about-subheadline');
    if (aboutSubheadline) aboutSubheadline.textContent = t.aboutSubheadline;
    
    const aboutBody = document.querySelector('.about-body p');
    if (aboutBody) aboutBody.textContent = t.aboutMission;
    
    const processTitle = document.querySelector('.about-process-title');
    if (processTitle) processTitle.textContent = t.processTitle;
    
    const stepTitles = document.querySelectorAll('.process-step-title');
    const stepTexts = document.querySelectorAll('.process-step-text');
    if (stepTitles.length >= 3 && stepTexts.length >= 3) {
        stepTitles[0].textContent = t.step1Title;
        stepTexts[0].textContent = t.step1Text;
        stepTitles[1].textContent = t.step2Title;
        stepTexts[1].textContent = t.step2Text;
        stepTitles[2].textContent = t.step3Title;
        stepTexts[2].textContent = t.step3Text;
    }
    
    const finalTagline = document.querySelector('.about-final-tagline');
    if (finalTagline) finalTagline.textContent = t.finalTagline;
    
    const aboutSignature = document.querySelector('.about-signature');
    if (aboutSignature) {
        const link = aboutSignature.querySelector('a');
        if (link) {
            aboutSignature.innerHTML = `${t.aboutSignature} <a href="https://www.linkedin.com/in/jorgis-chatzivantsidis-81a053110/" target="_blank" rel="noopener noreferrer" class="about-signature-link">Georgios Chatzivantsidis</a>`;
        }
    }
}

function updateSettingsModal(lang) {
    const t = translations[lang];
    if (!t) return;
    
    const settingsTitle = document.querySelector('.settings-modal-title');
    if (settingsTitle) settingsTitle.textContent = t.settingsTitle;
    
    const apiKeyLabel = document.querySelector('.settings-label');
    if (apiKeyLabel) apiKeyLabel.textContent = t.apiKeyLabel;
    
    const apiKeyInput = document.getElementById('api-key-input');
    if (apiKeyInput) apiKeyInput.placeholder = t.apiKeyPlaceholder;
    
    const saveBtn = document.getElementById('save-api-key');
    if (saveBtn) saveBtn.textContent = t.save;
    
    const clearBtn = document.getElementById('clear-api-key');
    if (clearBtn) clearBtn.textContent = t.clear;
    
    const statusLabel = document.querySelector('.status-label');
    if (statusLabel) statusLabel.textContent = t.keyStatus;
    
    const statusValue = document.getElementById('api-key-status');
    if (statusValue) {
        const storedKey = localStorage.getItem('synapse_api_key');
        statusValue.textContent = storedKey && storedKey.trim() ? t.keyLinked : t.keyNotLinked;
    }
    
    const settingsNote = document.querySelector('.settings-note');
    if (settingsNote) settingsNote.textContent = t.settingsNote;
}

// ============================================
// Thinkers Database (18 Diverse Thinkers)
// ============================================

const THINKERS = [
    { id: 1, name: 'Marcus Aurelius', era: '121-180 CE', field: 'Stoic Philosophy', color: 'var(--color-1)', quote: 'You have power over your mind - not outside events. Realize this, and you will find strength.' },
    { id: 2, name: 'Leonardo da Vinci', era: '1452-1519', field: 'Renaissance Polymath', color: 'var(--color-2)', quote: 'Learning never exhausts the mind.' },
    { id: 3, name: 'Artemisia Gentileschi', era: '1593-1656', field: 'Baroque Art & Feminism', color: 'var(--color-3)', quote: 'As long as I live, I will have control over my being.' },
    { id: 4, name: 'Isaac Newton', era: '1643-1727', field: 'Physics & Mathematics', color: 'var(--color-4)', quote: 'If I have seen further, it is by standing on the shoulders of giants.' },
    { id: 5, name: 'Carl Jung', era: '1875-1961', field: 'Analytical Psychology', color: 'var(--color-5)', quote: 'Until you make the unconscious conscious, it will direct your life and you will call it fate.' },
    { id: 6, name: 'Richard Feynman', era: '1918-1988', field: 'Quantum Physics', color: 'var(--color-6)', quote: 'I would rather have questions that cannot be answered than answers that cannot be questioned.' },
    { id: 7, name: 'Charlie Munger', era: '1924-2023', field: 'Investing & Mental Models', color: 'var(--color-7)', quote: 'The best thing a human being can do is to help another human being know more.' },
    { id: 8, name: 'Nassim Taleb', era: '1960-present', field: 'Risk & Antifragility', color: 'var(--color-8)', quote: 'The most intolerant wins: the minority rule.' },
    { id: 9, name: 'Elon Musk', era: '1971-present', field: 'First Principles Thinking', color: 'var(--color-9)', quote: 'When something is important enough, you do it even if the odds are not in your favor.' },
    { id: 10, name: 'Naval Ravikant', era: '1974-present', field: 'Philosophy & Wealth', color: 'var(--color-10)', quote: 'The best way to get what you want is to deserve what you want.' },
    { id: 11, name: 'Sun Tzu', era: '544-496 BCE', field: 'Military Strategy', color: 'var(--color-11)', quote: 'The supreme art of war is to subdue the enemy without fighting.' },
    { id: 12, name: 'Steve Jobs', era: '1955-2011', field: 'Design & Innovation', color: 'var(--color-12)', quote: 'Innovation distinguishes between a leader and a follower.' },
    { id: 13, name: 'Marie Curie', era: '1867-1934', field: 'Physics & Chemistry', color: 'var(--color-13)', quote: 'Nothing in life is to be feared, it is only to be understood.' },
    { id: 14, name: 'Alan Turing', era: '1912-1954', field: 'Computer Science', color: 'var(--color-14)', quote: 'We can only see a short distance ahead, but we can see plenty there that needs to be done.' },
    { id: 16, name: 'Ada Lovelace', era: '1815-1852', field: 'Computer Programming', color: 'var(--color-16)', quote: 'The analytical engine weaves algebraic patterns just as the Jacquard loom weaves flowers and leaves.' },
    { id: 17, name: 'Buckminster Fuller', era: '1895-1983', field: 'Systems Thinking', color: 'var(--color-17)', quote: 'You never change things by fighting the existing reality. To change something, build a new model.' },
    { id: 18, name: 'Hypatia', era: '350-415 CE', field: 'Mathematics & Philosophy', color: 'var(--color-18)', quote: 'Reserve your right to think, for even to think wrongly is better than not to think at all.' },
    { id: 19, name: 'David Deutsch', era: '1953-present', field: 'Quantum Computing & Knowledge', color: 'var(--color-19)', quote: 'Problems are inevitable. Problems are soluble.' },
];

// ============================================
// State Management
// ============================================

const state = {
    question: '',
    selectedThinkers: [],
    debateMessages: [],
    verdict: '',
    isPaused: false,
    userHasScrolled: false,
    lastScrollTop: 0,
    isAnalysisComplete: false,
    autoStartTimeout: null, // Track auto-start timeout for cancellation
};

// ============================================
// DOM Elements
// ============================================

const elements = {
    // Phases
    questionPhase: document.getElementById('question-phase'),
    selectionPhase: document.getElementById('selection-phase'),
    debatePhase: document.getElementById('debate-phase'),
    verdictPhase: document.getElementById('verdict-phase'),
    
    // Question Phase
    questionInput: document.getElementById('question-input'),
    questionSubmit: document.getElementById('question-submit'),
    
    // Selection Phase
    thinkersGrid: document.getElementById('thinkers-grid'),
    selectedCount: document.getElementById('selected-count'),
    selectionBack: document.getElementById('selection-back'),
    selectionProceed: document.getElementById('selection-proceed'),
    
    // Debate Phase
    arena: document.getElementById('arena'),
    pauseDebate: document.getElementById('pause-debate'),
    debateBack: document.getElementById('debate-back'),
    currentSpeaker: document.getElementById('current-speaker'),
    
    // Verdict Phase
    verdictContent: document.getElementById('verdict-content'),
    verdictExport: document.getElementById('verdict-export'),
    logoReset: document.getElementById('logo-reset'),
    
    // Footer
    currentYear: document.getElementById('current-year'),
    eraDisplay: document.getElementById('era-display'),
    
    // PDF Container
    pdfContainer: document.getElementById('pdf-container'),
    
    // Main Content (for print footer)
    mainContent: document.querySelector('.main-content'),
    
    // Consensus Bar
    consensusBar: document.getElementById('consensus-bar'),
    statusMessage: document.getElementById('status-message'),
    consensusPercentage: document.getElementById('consensus-percentage'),
    
    // Insight Chart
    insightChart: document.getElementById('insightChart'),
    
    // About Modal
    aboutBtn: document.getElementById('about-btn'),
    aboutBtnFooter: document.getElementById('about-btn-footer'),
    aboutModal: document.getElementById('aboutModal'),
    aboutClose: document.getElementById('about-close'),
    
    // Settings Modal
    apiKeyBtn: document.getElementById('api-key-btn'),
    apiKeyBtnFooter: document.getElementById('api-key-btn-footer'),
    settingsModal: document.getElementById('settingsModal'),
    settingsClose: document.getElementById('settings-close'),
};

// ============================================
// Utility Functions
// ============================================

function sanitizeInput(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function getApiKey() {
    // Priority: localStorage > CONFIG.API_KEY > null
    const storedKey = localStorage.getItem('synapse_api_key');
    if (storedKey && storedKey.trim()) {
        return storedKey.trim();
    }
    // Fallback to CONFIG.API_KEY if set (for development)
    if (CONFIG.API_KEY && CONFIG.API_KEY.trim()) {
        return CONFIG.API_KEY.trim();
    }
    return null;
}

// ============================================
// Era Mapping & Time-Traveler Footer
// ============================================

function getThinkerEra(thinkerName) {
    const thinker = THINKERS.find(t => {
        const normalizedName = t.name.toLowerCase().trim();
        const normalizedInput = thinkerName.toLowerCase().trim();
        return normalizedName === normalizedInput || 
               normalizedInput.includes(normalizedName) || 
               normalizedName.includes(normalizedInput);
    });
    
    if (!thinker) return null;
    
    // Extract year from era string (e.g., "121-180 CE" -> "180 CE", "1971-present" -> "2026 AD")
    const era = thinker.era;
    
    // Handle BCE dates
    if (era.includes('BCE')) {
        const match = era.match(/(\d+)\s*BCE/);
        if (match) {
            return `${match[1]} BC`;
        }
    }
    
    // Handle CE dates
    if (era.includes('CE')) {
        const match = era.match(/(\d+)\s*CE/);
        if (match) {
            return `${match[1]} AD`;
        }
        // Handle range like "121-180 CE"
        const rangeMatch = era.match(/(\d+)-(\d+)\s*CE/);
        if (rangeMatch) {
            return `${rangeMatch[2]} AD`;
        }
    }
    
    // Handle year ranges (e.g., "1452-1519")
    const rangeMatch = era.match(/(\d{4})-(\d{4})/);
    if (rangeMatch) {
        return `${rangeMatch[2]} AD`;
    }
    
    // Handle single year (e.g., "1971-present")
    const singleYearMatch = era.match(/(\d{4})/);
    if (singleYearMatch) {
        if (era.includes('present')) {
            return '2026 AD';
        }
        return `${singleYearMatch[1]} AD`;
    }
    
    return null;
}

function updateEraDisplay(thinkerName) {
    if (!elements.eraDisplay) return;
    
    const era = getThinkerEra(thinkerName);
    if (era) {
        // Add flicker animation class
        elements.eraDisplay.classList.add('era-flicker');
        
        // Update text
        elements.eraDisplay.textContent = `CURRENT ERA: ${era}`;
        
        // Remove flicker class after animation
        setTimeout(() => {
            elements.eraDisplay.classList.remove('era-flicker');
        }, 600);
    }
}

function setFutureEra() {
    if (!elements.eraDisplay) return;
    
    elements.eraDisplay.classList.add('era-flicker');
    elements.eraDisplay.textContent = 'SYNAPSE ERA: CONVERGENCE';
    
    setTimeout(() => {
        elements.eraDisplay.classList.remove('era-flicker');
    }, 600);
}

function updateConsensus(progress) {
    // Clamp progress between 0 and 100
    const clampedProgress = Math.min(100, Math.max(0, progress));
    
    if (elements.consensusBar) {
        // Get or create the fill element
        let fillElement = elements.consensusBar.querySelector('.consensus-bar-fill');
        if (!fillElement) {
            fillElement = document.createElement('div');
            fillElement.className = 'consensus-bar-fill';
            elements.consensusBar.appendChild(fillElement);
        }
        fillElement.style.width = `${clampedProgress}%`;
    }
    
    // Update status message based on progress
    if (elements.statusMessage) {
        if (clampedProgress < 33) {
            elements.statusMessage.textContent = 'Council is debating...';
        } else if (clampedProgress < 66) {
            elements.statusMessage.textContent = 'Analyzing historical context...';
        } else if (clampedProgress < 100) {
            elements.statusMessage.textContent = 'Drafting final verdict...';
        } else {
            elements.statusMessage.textContent = 'Consensus reached';
        }
    }
    
    if (elements.consensusPercentage) {
        elements.consensusPercentage.textContent = `${Math.round(clampedProgress)}%`;
    }
    
    // Trigger success effect when reaching 100%
    if (clampedProgress >= 100) {
        const consensusContainer = document.querySelector('.consensus-container');
        if (consensusContainer && !consensusContainer.classList.contains('complete')) {
            consensusContainer.classList.add('complete');
            // Remove the class after animation completes
            setTimeout(() => {
                consensusContainer.classList.remove('complete');
            }, 600);
        }
    }
}

async function typewriterEffect(element, text, delay = CONFIG.TYPEWRITER_DELAY) {
    // Clean text: remove triple or quadruple dashes
    const cleanedText = text.replace(/---+/g, '');
    
    element.textContent = '';
    const words = cleanedText.split(' ');
    const totalWords = words.length;
    
    // Track scroll position for smart auto-scroll
    const arena = elements.arena;
    const initialScrollTop = arena.scrollTop;
    const initialScrollHeight = arena.scrollHeight;
    
    for (let i = 0; i < words.length; i++) {
        if (state.isPaused) {
            await waitForResume();
        }
        
        const word = words[i];
        element.textContent += (i > 0 ? ' ' : '') + word;
        
        // Smart auto-scroll: only if user hasn't manually scrolled up
        const currentScrollTop = arena.scrollTop;
        const currentScrollHeight = arena.scrollHeight;
        const scrollThreshold = 100; // pixels from bottom
        const isNearBottom = (currentScrollTop + arena.clientHeight) >= (currentScrollHeight - scrollThreshold);
        
        // Only auto-scroll if user is near bottom (hasn't scrolled up to read)
        // Reset userHasScrolled if they scroll back to bottom
        if (isNearBottom) {
            state.userHasScrolled = false;
            arena.scrollTop = arena.scrollHeight;
        }
        
        // Variable delay: shorter for punctuation, longer for spaces
        const wordDelay = word.match(/[.,!?;:]/) ? delay * 0.5 : delay;
        await sleep(wordDelay);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function waitForResume() {
    return new Promise(resolve => {
        const checkResume = () => {
            if (!state.isPaused) {
                resolve();
            } else {
                setTimeout(checkResume, 100);
            }
        };
        checkResume();
    });
}

// ============================================
// Phase Management
// ============================================

function showPhase(phaseName) {
    // Hide all phases
    elements.questionPhase.classList.remove('active');
    elements.selectionPhase.classList.remove('active');
    elements.debatePhase.classList.remove('active');
    elements.verdictPhase.classList.remove('active');
    
    // Show target phase
    const phaseMap = {
        'question': elements.questionPhase,
        'selection': elements.selectionPhase,
        'debate': elements.debatePhase,
        'verdict': elements.verdictPhase,
    };
    
    if (phaseMap[phaseName]) {
        phaseMap[phaseName].classList.add('active');
    }
}

// ============================================
// Question Phase
// ============================================

function initQuestionPhase() {
    // Auto-focus textarea on page load
    if (elements.questionInput) {
        elements.questionInput.focus();
    }
    
    // Initialize era display
    if (elements.eraDisplay) {
        elements.eraDisplay.textContent = 'CURRENT ERA: —';
    }
    
    elements.questionSubmit.addEventListener('click', () => {
        const question = elements.questionInput.value.trim();
        if (question) {
            state.question = sanitizeInput(question);
            showPhase('selection');
            renderThinkers();
        }
    });
    
    // Allow Enter key (with Shift for new line)
    elements.questionInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            elements.questionSubmit.click();
        }
    });
}

// ============================================
// Selection Phase
// ============================================

function renderThinkers() {
    elements.thinkersGrid.innerHTML = '';
    
    THINKERS.forEach(thinker => {
        const card = document.createElement('div');
        card.className = 'thinker-card';
        card.style.color = thinker.color;
        card.style.borderColor = thinker.color;
        
        const isSelected = state.selectedThinkers.some(t => t.id === thinker.id);
        if (isSelected) {
            card.classList.add('selected');
        }
        
        card.innerHTML = `
            <div class="thinker-name">${escapeHtml(thinker.name)}</div>
            <div class="thinker-era">${escapeHtml(thinker.era)}</div>
            <div class="thinker-field">${escapeHtml(thinker.field)}</div>
        `;
        
        // Haptic-like feedback: Scale-up on hover and click effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('selected') && !card.classList.contains('speaking')) {
                card.style.transform = 'scale(1)';
            }
        });
        
        card.addEventListener('click', () => {
            // Click visual effect with brand colors
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = card.classList.contains('selected') ? 'scale(1.05)' : 'scale(1)';
            }, 100);
        });
        
        // Add tooltip with famous quote
        if (thinker.quote) {
            card.setAttribute('title', `"${thinker.quote}"`);
        }
        
        card.addEventListener('click', () => toggleThinker(thinker, card));
        elements.thinkersGrid.appendChild(card);
    });
    
    updateSelectionCounter();
}

function toggleThinker(thinker, cardElement) {
    const index = state.selectedThinkers.findIndex(t => t.id === thinker.id);
    
    if (index > -1) {
        // Deselect
        state.selectedThinkers.splice(index, 1);
        cardElement.classList.remove('selected');
        
        // Cancel auto-start if user deselects before delay ends
        if (state.autoStartTimeout) {
            clearTimeout(state.autoStartTimeout);
            state.autoStartTimeout = null;
            
            // Remove pulse animation from grid
            if (elements.thinkersGrid) {
                elements.thinkersGrid.classList.remove('magic-start-pulse');
            }
            
            // Show Analyze button again
            if (elements.selectionProceed) {
                elements.selectionProceed.style.opacity = '1';
                elements.selectionProceed.style.transform = 'translateY(0)';
                elements.selectionProceed.style.pointerEvents = 'auto';
            }
        }
    } else {
        // Select (if under limit)
        if (state.selectedThinkers.length < CONFIG.MAX_THINKERS) {
            state.selectedThinkers.push(thinker);
            cardElement.classList.add('selected');
            // Add selection animation
            cardElement.style.animation = 'none';
            setTimeout(() => {
                cardElement.style.animation = '';
            }, 10);
            
            // Magic Start: Auto-trigger when 5 thinkers are selected
            if (state.selectedThinkers.length === 5) {
                // Visual feedback: Pulse animation on grid
                if (elements.thinkersGrid) {
                    elements.thinkersGrid.classList.add('magic-start-pulse');
                }
                
                // Hide/fade out Analyze button
                if (elements.selectionProceed) {
                    elements.selectionProceed.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    elements.selectionProceed.style.opacity = '0';
                    elements.selectionProceed.style.transform = 'translateY(-10px)';
                    elements.selectionProceed.style.pointerEvents = 'none';
                }
                
                // Auto-start after elegant delay
                state.autoStartTimeout = setTimeout(() => {
                    if (state.selectedThinkers.length === 5) {
                        triggerDebateStart();
                    }
                    state.autoStartTimeout = null;
                }, 600);
            }
        }
    }
    
    updateSelectionCounter();
}

function updateSelectionCounter() {
    const selectedCount = state.selectedThinkers.length;
    // Counter is now handled by setLanguage via data-i18n attributes
    if (elements.selectedCount) {
        elements.selectedCount.textContent = selectedCount;
    }
    
    // Enable/disable proceed button (but keep it visible as fallback)
    elements.selectionProceed.disabled = 
        selectedCount < CONFIG.MIN_THINKERS || selectedCount > CONFIG.MAX_THINKERS;
    
    // Reset button visibility if count drops below 5 (Magic Start threshold)
    if (selectedCount < 5 && elements.selectionProceed) {
        elements.selectionProceed.style.opacity = '1';
        elements.selectionProceed.style.transform = 'translateY(0)';
        elements.selectionProceed.style.pointerEvents = 'auto';
    }
}

// Consolidated function to trigger debate start (used by both Magic Start and manual button)
function triggerDebateStart() {
    const selectionContainer = document.querySelector('.selection-container');
    const header = document.querySelector('.header');
    
    // Immersive Arena: Fade out selection grid and header
    if (selectionContainer) {
        selectionContainer.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        selectionContainer.style.opacity = '0';
        selectionContainer.style.transform = 'translateY(-20px)';
    }
    
    if (header) {
        header.style.transition = 'opacity 0.5s ease-out';
        header.style.opacity = '0.3';
    }
    
    showPhase('debate');
    
    // Auto-scroll to top of debate phase
    setTimeout(() => {
        const debatePhase = document.getElementById('debate-phase');
        if (debatePhase) {
            debatePhase.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    
    startDebate();
}

function selectPresetThinkers(thinkerIds) {
    // Clear current selection
    state.selectedThinkers = [];
    
    // Select preset thinkers
    thinkerIds.forEach(id => {
        const thinker = THINKERS.find(t => t.id === id);
        if (thinker) {
            state.selectedThinkers.push(thinker);
        }
    });
    
    // Re-render grid to show selections
    renderThinkers();
    updateSelectionCounter();
}

function initSelectionPhase() {
    elements.selectionBack.addEventListener('click', () => {
        showPhase('question');
    });
    
    // Preset buttons
    const presetDisruptor = document.getElementById('preset-disruptor');
    const presetWisdom = document.getElementById('preset-wisdom');
    const presetLogic = document.getElementById('preset-logic');
    
    if (presetDisruptor) {
        presetDisruptor.addEventListener('click', () => {
            // Disruptor Mode: Elon Musk, Nassim Taleb, Steve Jobs
            selectPresetThinkers([9, 8, 12]);
        });
    }
    
    if (presetWisdom) {
        presetWisdom.addEventListener('click', () => {
            // Wisdom Mode: Marcus Aurelius, Carl Jung, Naval Ravikant
            selectPresetThinkers([1, 5, 10]);
        });
    }
    
    if (presetLogic) {
        presetLogic.addEventListener('click', () => {
            // Logic Mode: Richard Feynman, Isaac Newton, David Deutsch
            selectPresetThinkers([6, 4, 19]);
        });
    }
    
    elements.selectionProceed.addEventListener('click', () => {
        if (state.selectedThinkers.length >= CONFIG.MIN_THINKERS && 
            state.selectedThinkers.length <= CONFIG.MAX_THINKERS) {
            triggerDebateStart();
        }
    });
}

// ============================================
// Debate Phase
// ============================================

async function startDebate() {
    state.isPaused = false;
    state.debateMessages = [];
    state.userHasScrolled = false;
    elements.arena.innerHTML = '';
    elements.currentSpeaker.textContent = 'Initializing debate...';
    
    // Hide selection grid and show Change Council button
    const selectionContainer = document.querySelector('.selection-container');
    if (selectionContainer) {
        selectionContainer.style.display = 'none';
    }
    
    // Create or show Change Council button
    let changeCouncilBtn = document.getElementById('change-council-btn');
    if (!changeCouncilBtn) {
        changeCouncilBtn = document.createElement('button');
        changeCouncilBtn.id = 'change-council-btn';
        changeCouncilBtn.className = 'btn-secondary';
        changeCouncilBtn.textContent = 'Change Council';
        changeCouncilBtn.style.marginBottom = '1rem';
        changeCouncilBtn.addEventListener('click', () => {
            showPhase('selection');
            if (selectionContainer) {
                selectionContainer.style.display = 'flex';
            }
            changeCouncilBtn.style.display = 'none';
        });
        const debateContainer = document.querySelector('.debate-container');
        if (debateContainer) {
            debateContainer.insertBefore(changeCouncilBtn, debateContainer.firstChild);
        }
    }
    changeCouncilBtn.style.display = 'block';
    
    // Track user scroll to disable auto-scroll if they scroll up
    elements.arena.addEventListener('scroll', () => {
        const currentScrollTop = elements.arena.scrollTop;
        if (currentScrollTop < state.lastScrollTop - 10) {
            // User scrolled up
            state.userHasScrolled = true;
        } else if ((elements.arena.scrollTop + elements.arena.clientHeight) >= (elements.arena.scrollHeight - 50)) {
            // User scrolled back to bottom
            state.userHasScrolled = false;
        }
        state.lastScrollTop = currentScrollTop;
    });
    
    try {
        const debateText = await generateDebate();
        await displayDebate(debateText);
        
        // Ensure debate is 100% complete and consensus is at 100%
        updateConsensus(100);
        await sleep(500); // Wait for any final animations
        
        // Clear verdict content before generating new verdict
        if (elements.verdictContent) {
            elements.verdictContent.innerHTML = '';
        }
        
        // Hide analytical dimensions initially for Big Reveal effect
        const analyticalDimensions = document.querySelector('.analytical-dimensions');
        if (analyticalDimensions) {
            analyticalDimensions.style.opacity = '0';
            analyticalDimensions.style.transform = 'translateY(20px)';
            analyticalDimensions.style.transition = 'none';
        }
        
        elements.currentSpeaker.textContent = 'Generating verdict...';
        const verdict = await generateVerdict();
        
        // Show verdict phase (fade-in animation handled by CSS)
        showPhase('verdict');
        
        // Display verdict and trigger Insight Map reveal
        displayVerdict(verdict);
        
        // Set data attribute for print footer
        if (elements.mainContent) {
            elements.mainContent.setAttribute('data-year', new Date().getFullYear().toString());
        }
        
    } catch (error) {
        // Critical error handling - show user-friendly message
        elements.arena.innerHTML += `
            <div class="debate-message" style="border-color: var(--error);">
                <div class="debate-speaker" style="color: var(--error);">Error</div>
                <div class="debate-text">${escapeHtml(error.message || 'An error occurred during the debate. Please try again.')}</div>
            </div>
        `;
    }
}

async function generateDebate() {
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error('Please enter your API Key in the About section to proceed.');
    }
    
    // Ensure we read the current language from localStorage or global variable
    const activeLang = localStorage.getItem('selectedLang') || currentLang || 'EN';
    
    const thinkers = state.selectedThinkers;
    const thinkerNames = thinkers.map(t => t.name).join(', ');
    const thinkerDetails = thinkers.map(t => `${t.name} (${t.era}, ${t.field})`).join('\n');
    
    const langInstruction = activeLang === 'GR' 
        ? 'CRITICAL LANGUAGE RULE: Respond STRICTLY in Greek (Ελληνικά). All thinker arguments, responses, and dialogue must be in Greek. Keep thinker names in their original form (e.g., "Marcus Aurelius", "Leonardo da Vinci"), but all their spoken content must be in Greek.'
        : 'CRITICAL LANGUAGE RULE: Respond STRICTLY in English. All thinker arguments, responses, and dialogue must be in English. Keep thinker names in their original form.';
    
    const systemPrompt = `You are orchestrating a LIVE, DYNAMIC debate between these thinkers: ${thinkerNames}.

${langInstruction}

CRITICAL RULES:
1. This is NOT a series of initial statements. This is a TRUE DEBATE with multiple rounds.
2. Each thinker must RESPOND to what others have said, not just repeat their initial perspective.
3. Thinkers should challenge, agree, build upon, or refute each other's points.
4. Create at least 2-3 rounds where thinkers engage with each other's ideas.
5. Each thinker should speak multiple times throughout the debate.
6. Avoid repetition - if a thinker has already stated their core view, they must now engage with others.
7. Thinkers should reference specific points made by others (e.g., "As [Name] mentioned..." or "I disagree with [Name]'s point about...").
8. The debate should evolve and deepen with each round.
9. DEVIL'S ADVOCATE: Near the end of the debate (in the final 1-2 rounds), one thinker must play the 'Devil's Advocate', challenging the emerging consensus and raising critical counterarguments before the Final Verdict is reached. This thinker should question assumptions, point out potential flaws, and force the group to consider alternative perspectives.

Format each statement EXACTLY as: [THINKER_NAME]: [Their response]

Each response should be 2-4 sentences. Make it feel like a real-time intellectual exchange.`;

    const userPrompt = `Question: ${state.question}

Thinkers participating:
${thinkerDetails}

Generate a DYNAMIC, MULTI-ROUND debate where:
- Round 1: Each thinker gives their initial perspective (one statement each)
- Round 2+: Thinkers respond to each other, building on, challenging, or refining ideas
- Minimum 2 rounds, ideally 3-4 rounds
- Each thinker speaks 2-3 times total
- Thinkers directly reference and engage with each other's points
- The conversation evolves and deepens, not just repeats
- DEVIL'S ADVOCATE: In the final 1-2 rounds, one thinker must challenge the emerging consensus, playing the 'Devil's Advocate' role to ensure all perspectives are critically examined before the Final Verdict

Format: [THINKER_NAME]: [Response that engages with the debate]

Example structure:
[Thinker 1]: Initial perspective...
[Thinker 2]: Initial perspective...
[Thinker 3]: Initial perspective...
[Thinker 1]: Response to Thinker 2's point about...
[Thinker 3]: Building on Thinker 1's idea, I would add...
[Thinker 2]: I disagree with Thinker 3 because...

Generate the debate now. Make it dynamic, engaging, and ensure thinkers are responding to each other, not just stating their views once.`;
    
    const response = await fetch(CONFIG.API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: CONFIG.MODEL,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            temperature: 0.85,
            max_tokens: 4000,
        }),
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
        const errorMessage = errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`;
        
        // Provide helpful error messages
        if (response.status === 401) {
            throw new Error('Invalid API key. Please check your OpenAI API key.');
        } else if (response.status === 429) {
            throw new Error('Rate limit exceeded. Please try again in a moment.');
        } else if (response.status === 500) {
            throw new Error('OpenAI server error. Please try again.');
        } else {
            throw new Error(`Failed to generate debate: ${errorMessage}`);
        }
    }
    
    const data = await response.json();
    // Clean text: remove triple or quadruple dashes
    return data.choices[0].message.content.replace(/---+/g, '');
}

function findThinkerByName(speakerName) {
    const normalized = speakerName.toLowerCase().trim();
    return state.selectedThinkers.find(t => {
        const thinkerName = t.name.toLowerCase();
        // Exact match
        if (thinkerName === normalized) return true;
        // Partial match (handles "Leonardo da Vinci" vs "da Vinci")
        if (normalized.includes(thinkerName) || thinkerName.includes(normalized)) return true;
        // Handle common variations
        const variations = {
            'leonardo da vinci': ['leonardo', 'da vinci'],
            'marcus aurelius': ['marcus', 'aurelius'],
            'richard feynman': ['feynman'],
            'charlie munger': ['munger'],
            'nassim taleb': ['taleb'],
            'elon musk': ['musk'],
            'naval ravikant': ['naval', 'ravikant'],
            'steve jobs': ['jobs'],
            'sun tzu': ['sun tzu', 'suntzu'],
        };
        const thinkerVariations = variations[thinkerName];
        if (thinkerVariations) {
            return thinkerVariations.some(v => normalized.includes(v));
        }
        return false;
    });
}

async function displayDebate(debateText) {
    // Parse debate into messages by thinker
    // Handle multiple formats: [Name]: text or Name: text
    const lines = debateText.split('\n');
    const messages = [];
    let currentSpeaker = null;
    let currentText = [];
    
    for (const line of lines) {
        // Match [THINKER_NAME]: or THINKER_NAME: formats
        const match = line.match(/^\[?([^\]:\]]+)\]?:\s*(.+)$/);
        if (match) {
            // Save previous message
            if (currentSpeaker && currentText.length > 0) {
                const text = currentText.join('\n').trim().replace(/---+/g, '');
                messages.push({
                    speaker: currentSpeaker,
                    text: text,
                });
            }
            // Start new message
            currentSpeaker = match[1].trim();
            const textPart = match[2].trim().replace(/---+/g, '');
            currentText = textPart ? [textPart] : [];
        } else if (currentSpeaker && line.trim() && !line.match(/^\[/)) {
            // Continue current message (ignore lines that look like new speaker tags)
            currentText.push(line.trim().replace(/---+/g, ''));
        }
    }
    
    // Save last message
    if (currentSpeaker && currentText.length > 0) {
        const text = currentText.join('\n').trim().replace(/---+/g, '');
        messages.push({
            speaker: currentSpeaker,
            text: text,
        });
    }
    
    // Validate that we found messages
    if (messages.length === 0) {
        throw new Error('Could not parse debate format. Please ensure the API returns messages in [THINKER_NAME]: format.');
    }
    
    // Store messages in state for verdict generation
    state.debateMessages = messages;
    
    // Track rounds for visual feedback
    const speakerCounts = new Map();
    
    // Initialize consensus bar
    updateConsensus(0);
    
    // Display messages with typewriter effect
    const totalMessages = messages.length;
    for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
        const thinker = findThinkerByName(message.speaker);
        
        const count = (speakerCounts.get(message.speaker) || 0) + 1;
        speakerCounts.set(message.speaker, count);
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'debate-message';
        // Set 2px left border with thinker's color
        messageDiv.style.borderLeft = `2px solid ${thinker?.color || 'var(--text-secondary)'}`;
        messageDiv.style.borderColor = thinker?.color || 'var(--text-secondary)';
        
        // Name appears only once inside the bubble
        const speakerDiv = document.createElement('div');
        speakerDiv.className = 'debate-speaker';
        speakerDiv.style.color = thinker?.color || 'var(--text-secondary)';
        speakerDiv.textContent = count > 1 ? `${message.speaker} (Round ${count})` : message.speaker;
        
        const textDiv = document.createElement('div');
        textDiv.className = 'debate-text';
        
        messageDiv.appendChild(speakerDiv);
        messageDiv.appendChild(textDiv);
        elements.arena.appendChild(messageDiv);
        
        // Update current speaker
        elements.currentSpeaker.textContent = `Speaking: ${message.speaker}`;
        
        // Update era display for time-traveler footer
        updateEraDisplay(message.speaker);
        
        // Highlight thinker card
        highlightThinkerCard(message.speaker);
        
        // Typewriter effect with progress tracking
        const messageStartProgress = (i / totalMessages) * 100;
        const messageEndProgress = ((i + 1) / totalMessages) * 100;
        
        // Update consensus at start of message
        updateConsensus(messageStartProgress);
        
        // Typewriter effect
        await typewriterEffect(textDiv, message.text);
        
        // Update consensus at end of message
        updateConsensus(messageEndProgress);
        
        // Remove highlight
        removeThinkerCardHighlight();
        
        // Small pause between speakers
        await sleep(500);
    }
    
    // Set consensus to 100% when debate completes
    updateConsensus(100);
    elements.currentSpeaker.textContent = 'Debate complete';
}

function highlightThinkerCard(speakerName) {
    const cards = document.querySelectorAll('.thinker-card');
    const normalizedSpeaker = speakerName.toLowerCase().trim();
    
    cards.forEach(card => {
        const nameElement = card.querySelector('.thinker-name');
        if (nameElement) {
            const cardName = nameElement.textContent.toLowerCase().trim();
            // Exact match or partial match
            if (cardName === normalizedSpeaker || 
                normalizedSpeaker.includes(cardName) || 
                cardName.includes(normalizedSpeaker)) {
                card.classList.add('speaking', 'active-thinker');
            }
        }
    });
}

function removeThinkerCardHighlight() {
    const cards = document.querySelectorAll('.thinker-card');
    cards.forEach(card => {
        card.classList.remove('speaking', 'active-thinker');
    });
}

async function generateVerdict() {
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error('Please enter your API Key in the Settings section to proceed.');
    }
    
    // Ensure we read the current language from localStorage or global variable
    const activeLang = localStorage.getItem('selectedLang') || currentLang || 'EN';
    
    const thinkerNames = state.selectedThinkers.map(t => t.name).join(', ');
    
    // Get debate text from arena if messages aren't stored
    let debateSummary = '';
    if (state.debateMessages.length > 0) {
        debateSummary = state.debateMessages.map(m => 
            `${m.speaker}: ${m.text}`
        ).join('\n\n');
    } else {
        // Fallback: extract from arena
        const messages = Array.from(elements.arena.querySelectorAll('.debate-message'));
        debateSummary = messages.map(msg => {
            const speaker = msg.querySelector('.debate-speaker').textContent;
            const text = msg.querySelector('.debate-text').textContent;
            return `${speaker}: ${text}`;
        }).join('\n\n');
    }
    
    const langInstruction = activeLang === 'GR' 
        ? 'CRITICAL LANGUAGE RULE: Respond STRICTLY in Greek (Ελληνικά). The entire verdict must be in Greek, including all analysis, insights, and conclusions.'
        : 'CRITICAL LANGUAGE RULE: Respond STRICTLY in English. The entire verdict must be in English.';
    
    const systemPrompt = `You are a synthesizer of great ideas. Provide clear, actionable insights. ${langInstruction}`;
    
    const prompt = `Based on this debate between ${thinkerNames}:\n\n${debateSummary}\n\nQuestion: ${state.question}\n\nProvide a concise, insightful verdict that synthesizes the key insights from the debate. Highlight the most valuable perspectives and actionable takeaways.\n\nIMPORTANT: Format your response with a clear "FINAL VERDICT:" section header followed by the verdict text.`;
    
    const response = await fetch(CONFIG.API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: CONFIG.MODEL,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: prompt },
            ],
            temperature: 0.7,
            max_tokens: 1000,
        }),
    });
    
    if (!response.ok) {
        throw new Error('Failed to generate verdict');
    }
    
    const data = await response.json();
    let verdictText = data.choices[0].message.content.replace(/---+/g, '');
    
    // Extract verdict text if it has a "FINAL VERDICT:" marker
    const verdictMatch = verdictText.match(/FINAL\s+VERDICT[:\-]?\s*(.+)/is);
    if (verdictMatch) {
        verdictText = verdictMatch[1].trim();
    }
    
    return verdictText;
}

function initDebatePhase() {
    elements.pauseDebate.addEventListener('click', () => {
        state.isPaused = !state.isPaused;
        elements.pauseDebate.textContent = state.isPaused ? '▶' : '⏸';
        elements.pauseDebate.title = state.isPaused ? 'Resume' : 'Pause';
    });
    
    elements.debateBack.addEventListener('click', () => {
        if (confirm('Are you sure you want to go back? The current debate will be lost.')) {
            state.isPaused = false;
            showPhase('selection');
        }
    });
    
}

// ============================================
// Verdict Phase
// ============================================

function analyzeDebateDimensions() {
    // Analyze debate messages to calculate dimension scores
    let logicScore = 0;
    let ethicsScore = 0;
    let empathyScore = 0;
    let actionScore = 0;
    
    const logicKeywords = ['logic', 'rational', 'systematic', 'analysis', 'reason', 'evidence', 'data', 'proof', 'calculate', 'method', 'system', 'structure', 'framework', 'model', 'theorem'];
    const ethicsKeywords = ['ethics', 'moral', 'value', 'right', 'wrong', 'justice', 'fair', 'principle', 'virtue', 'duty', 'good', 'bad', 'should', 'ought', 'responsibility'];
    const empathyKeywords = ['empathy', 'emotion', 'feel', 'understand', 'human', 'compassion', 'care', 'connection', 'relationship', 'heart', 'people', 'experience', 'suffering', 'joy', 'love'];
    const actionKeywords = ['action', 'execute', 'implement', 'do', 'act', 'practice', 'apply', 'build', 'create', 'make', 'start', 'begin', 'move', 'change', 'transform'];
    
    // Analyze all debate messages
    const messagesToAnalyze = state.debateMessages.length > 0 
        ? state.debateMessages 
        : Array.from(elements.arena.querySelectorAll('.debate-message')).map(msg => ({
            text: msg.querySelector('.debate-text')?.textContent || ''
        }));
    
    messagesToAnalyze.forEach(msg => {
        const text = (msg.text || '').toLowerCase();
        const wordCount = text.split(/\s+/).length;
        
        // Count keyword matches (weighted)
        const logicMatches = logicKeywords.reduce((sum, kw) => sum + (text.split(kw).length - 1), 0);
        const ethicsMatches = ethicsKeywords.reduce((sum, kw) => sum + (text.split(kw).length - 1), 0);
        const empathyMatches = empathyKeywords.reduce((sum, kw) => sum + (text.split(kw).length - 1), 0);
        const actionMatches = actionKeywords.reduce((sum, kw) => sum + (text.split(kw).length - 1), 0);
        
        // Weight by word count and matches
        logicScore += (logicMatches * 15) + (wordCount * 0.2);
        ethicsScore += (ethicsMatches * 15) + (wordCount * 0.2);
        empathyScore += (empathyMatches * 15) + (wordCount * 0.2);
        actionScore += (actionMatches * 15) + (wordCount * 0.2);
    });
    
    // Normalize scores to 0-100 range with better distribution
    const maxScore = Math.max(logicScore, ethicsScore, empathyScore, actionScore, 1);
    logicScore = Math.min(100, (logicScore / maxScore) * 100);
    ethicsScore = Math.min(100, (ethicsScore / maxScore) * 100);
    empathyScore = Math.min(100, (empathyScore / maxScore) * 100);
    actionScore = Math.min(100, (actionScore / maxScore) * 100);
    
    // Ensure minimum values for visibility (but allow natural variation)
    const minValue = 15;
    logicScore = Math.max(minValue, logicScore);
    ethicsScore = Math.max(minValue, ethicsScore);
    empathyScore = Math.max(minValue, empathyScore);
    actionScore = Math.max(minValue, actionScore);
    
    return {
        logic: Math.round(logicScore),
        ethics: Math.round(ethicsScore),
        empathy: Math.round(empathyScore),
        action: Math.round(actionScore)
    };
}

function createInsightChart() {
    if (!elements.insightChart || typeof Chart === 'undefined') {
        return null;
    }
    
    const dimensions = analyzeDebateDimensions();
    
    const ctx = elements.insightChart.getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.insightChartInstance) {
        window.insightChartInstance.destroy();
    }
    
    window.insightChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Logic', 'Ethics', 'Empathy', 'Action'],
            datasets: [{
                label: 'Analytical Dimensions',
                data: [dimensions.logic, dimensions.ethics, dimensions.empathy, dimensions.action],
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                borderColor: '#10b981',
                borderWidth: 3,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#ffffff',
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: '#10b981',
                pointRadius: 6,
                pointHoverRadius: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.2,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#10b981',
                    bodyColor: '#ffffff',
                    borderColor: '#10b981',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed.r + '%';
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    min: 0,
                    ticks: {
                        stepSize: 20,
                        color: 'rgba(255, 255, 255, 0.6)',
                        font: {
                            size: 11
                        },
                        backdropColor: 'transparent'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        lineWidth: 1
                    },
                    pointLabels: {
                        color: '#10b981',
                        font: {
                            size: 13,
                            weight: 'bold'
                        }
                    },
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            elements: {
                line: {
                    borderWidth: 3,
                    tension: 0.1
                }
            }
        }
    });
    
    return window.insightChartInstance;
}

function displayVerdict(verdict) {
    if (!verdict || verdict.trim() === '') {
        elements.verdictContent.innerHTML = `
            <div class="verdict-text">Unable to generate verdict. Please try again.</div>
        `;
        return;
    }
    
    if (!elements.verdictContent) {
        return;
    }
    
    // Clean and prepare verdict text - preserve line breaks
    const cleanedVerdict = verdict.trim().replace(/---+/g, '');
    const verdictText = escapeHtml(cleanedVerdict).replace(/\n/g, '<br>');
    
    elements.verdictContent.innerHTML = `
        <div class="verdict-header-actions">
            <button id="copy-verdict" class="btn-copy" title="Copy to Clipboard">
                <span class="copy-icon">📋</span>
                <span class="copy-text">Copy</span>
            </button>
        </div>
        <div class="verdict-text">${verdictText}</div>
        <div class="verdict-seal">
            <div>SYNAPSE COUNCIL</div>
            <div class="verdict-signature">CERTIFIED ANALYSIS</div>
        </div>
    `;
    
    // Show verdict actions (Export PDF and New Inquiry buttons)
    const verdictActions = document.getElementById('verdict-actions');
    if (verdictActions) {
        verdictActions.style.display = 'flex';
    }
    
    // Event delegation in initVerdictPhase handles new-inquiry-btn clicks
    
    // Add copy to clipboard functionality
    const copyButton = elements.verdictContent.querySelector('#copy-verdict');
    if (copyButton) {
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(cleanedVerdict);
                copyButton.classList.add('copied');
                copyButton.querySelector('.copy-text').textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.classList.remove('copied');
                    copyButton.querySelector('.copy-text').textContent = 'Copy';
                }, 2000);
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = cleanedVerdict;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                copyButton.classList.add('copied');
                copyButton.querySelector('.copy-text').textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.classList.remove('copied');
                    copyButton.querySelector('.copy-text').textContent = 'Copy';
                }, 2000);
            }
        });
    }
    
    // Force reflow to ensure height calculation
    elements.verdictContent.style.height = 'auto';
    elements.verdictContent.style.maxHeight = 'none';
    
    // Ensure the text element also expands
    const verdictTextElement = elements.verdictContent.querySelector('.verdict-text');
    if (verdictTextElement) {
        verdictTextElement.style.height = 'auto';
        verdictTextElement.style.maxHeight = 'none';
        verdictTextElement.style.overflow = 'visible';
    }
    
    state.verdict = cleanedVerdict;
    
    // Set future era when verdict is revealed
    setFutureEra();
    
    // Big Reveal: Hide Insight Map initially, then reveal it with verdict simultaneously
    const analyticalDimensions = document.querySelector('.analytical-dimensions');
    if (analyticalDimensions) {
        analyticalDimensions.style.opacity = '0';
        analyticalDimensions.style.transform = 'translateY(20px)';
        analyticalDimensions.style.transition = 'none';
    }
    
    // Create Insight Map immediately (chart creation is fast)
    createInsightChart();
    
    // Reveal both Verdict and Insight Map simultaneously after a brief moment
    // This ensures they appear together right after consensus hits 100%
    requestAnimationFrame(() => {
        if (analyticalDimensions) {
            analyticalDimensions.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            analyticalDimensions.style.opacity = '1';
            analyticalDimensions.style.transform = 'translateY(0)';
        }
        
        // Add fade-in-up animation to verdict content
        if (elements.verdictContent) {
            elements.verdictContent.style.animation = 'verdict-fade-in-up 1s ease forwards, verdict-shimmer 3s ease-in-out 1s infinite';
        }
        
        // Auto-scroll to Insight Map after reveal animation completes
        // Only happens once when analysis is complete
        setTimeout(() => {
            const insightChart = document.getElementById('insightChart');
            const analyticalDimensionsSection = document.querySelector('.analytical-dimensions');
            
            if (insightChart || analyticalDimensionsSection) {
                const targetElement = analyticalDimensionsSection || insightChart;
                const targetPosition = targetElement.offsetTop - 100; // 100px offset for breathing room
                
                // Mobile-friendly scroll: use smaller offset on mobile
                const isMobile = window.innerWidth <= 768;
                const scrollOffset = isMobile ? 50 : 100;
                const finalPosition = targetElement.offsetTop - scrollOffset;
                
                window.scrollTo({
                    top: finalPosition,
                    behavior: 'smooth'
                });
            }
        }, 1500); // Increased delay so user can see Consensus Bar at 100% for a satisfying moment
    });
}

function showConfirmationToast(message, callback) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'confirmation-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <p class="toast-message">${message}</p>
            <div class="toast-actions">
                <button class="toast-btn toast-confirm">Yes, Start Over</button>
                <button class="toast-btn toast-cancel">Cancel</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Handle confirm
    const confirmBtn = toast.querySelector('.toast-confirm');
    confirmBtn.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
            if (callback) callback();
        }, 300);
    });
    
    // Handle cancel
    const cancelBtn = toast.querySelector('.toast-cancel');
    cancelBtn.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    });
}

function resetApp(showConfirmation = false) {
    // Clear data
    state.selectedThinkers = [];
    
    // Clear textarea - using the correct ID
    const questionInput = document.getElementById('question-input');
    if (questionInput) {
        questionInput.value = '';
    }
    
    // Reset UI - Remove selected class from all thinker cards
    document.querySelectorAll('.thinker-card').forEach(card => {
        card.classList.remove('selected', 'suggested', 'speaking', 'active-thinker');
        card.style.transform = 'scale(1)';
        card.style.boxShadow = '';
        card.style.animation = '';
        card.style.opacity = '1';
    });
    
    // Hide analysis section and show input section
    const debatePhase = document.getElementById('debate-phase');
    const verdictPhase = document.getElementById('verdict-phase');
    const questionPhase = document.getElementById('question-phase');
    const selectionPhase = document.getElementById('selection-phase');
    
    if (debatePhase) debatePhase.style.display = 'none';
    if (verdictPhase) verdictPhase.style.display = 'none';
    if (questionPhase) questionPhase.style.display = 'flex';
    if (selectionPhase) selectionPhase.style.display = 'flex';
    
    // Hide verdict actions
    const verdictActions = document.getElementById('verdict-actions');
    if (verdictActions) {
        verdictActions.style.display = 'none';
    }
    
    // Clear arena and verdict content
    if (elements.arena) elements.arena.innerHTML = '';
    if (elements.verdictContent) elements.verdictContent.innerHTML = '';
    
    // Reset state
    state.question = '';
    state.debateMessages = [];
    state.verdict = '';
    state.isPaused = false;
    state.isAnalysisComplete = false;
    
    // Clear auto-start timeout
    if (state.autoStartTimeout) {
        clearTimeout(state.autoStartTimeout);
        state.autoStartTimeout = null;
    }
    
    // Re-render thinkers
    renderThinkers();
    updateSelectionCounter();
    
    // Reset consensus bar
    updateConsensus(0);
    
    // Show question phase
    showPhase('question');
    
    // Force scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function performReset() {
    // ============================================
    // Smooth Fade-Out Transition
    // ============================================
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
        appContainer.style.transition = 'opacity 0.3s ease-out';
        appContainer.style.opacity = '0';
    }
    
    setTimeout(() => {
        // ============================================
        // Clear Data
        // ============================================
        
        // 1. Clear userQuery textarea
        if (elements.questionInput) {
            elements.questionInput.value = '';
        }
        
        // 2. Reset selectedThinkers array to empty
        state.selectedThinkers = [];
        
        // 3. Clear finalVerdict container's HTML
        if (elements.verdictContent) {
            elements.verdictContent.innerHTML = '';
        }
        
        // 4. Clear arena content
        if (elements.arena) {
            elements.arena.innerHTML = '';
        }
        
        // 5. Reset all state variables
        state.question = '';
        state.debateMessages = [];
        state.verdict = '';
        state.isPaused = false;
        state.userHasScrolled = false;
        state.lastScrollTop = 0;
        state.isAnalysisComplete = false;
        
        // 6. Clear auto-start timeout if it exists
        if (state.autoStartTimeout) {
            clearTimeout(state.autoStartTimeout);
            state.autoStartTimeout = null;
        }
        
        // ============================================
        // UI Restoration
        // ============================================
        
        // 1. Remove 'selected', 'active', 'suggested', 'speaking' CSS classes from all thinker cards
        const allThinkerCards = document.querySelectorAll('.thinker-card');
        allThinkerCards.forEach(card => {
            card.classList.remove('selected', 'suggested', 'speaking', 'active-thinker');
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '';
            card.style.animation = '';
            card.style.opacity = '1';
        });
        
        // 2. Remove pulse animation from grid
        if (elements.thinkersGrid) {
            elements.thinkersGrid.classList.remove('magic-start-pulse');
        }
        
        // 3. Reset Analyze button visibility and state
        if (elements.selectionProceed) {
            elements.selectionProceed.style.opacity = '1';
            elements.selectionProceed.style.transform = 'translateY(0)';
            elements.selectionProceed.style.pointerEvents = 'auto';
            elements.selectionProceed.disabled = true;
        }
        
        // 4. Hide Arena/Analysis section
        if (elements.debatePhase) {
            elements.debatePhase.style.display = 'none';
        }
        
        // 5. Hide Verdict section
        if (elements.verdictPhase) {
            elements.verdictPhase.style.display = 'none';
        }
        
        // 6. Hide verdict actions (Export PDF and New Inquiry buttons)
        const verdictActions = document.getElementById('verdict-actions');
        if (verdictActions) {
            verdictActions.style.display = 'none';
        }
        
        // 7. Hide analytical dimensions
        const analyticalDimensions = document.querySelector('.analytical-dimensions');
        if (analyticalDimensions) {
            analyticalDimensions.style.display = 'none';
            analyticalDimensions.style.opacity = '0';
            analyticalDimensions.style.transform = 'translateY(20px)';
        }
        
        // 8. Hide Change Council button if it exists
        const changeCouncilBtn = document.getElementById('change-council-btn');
        if (changeCouncilBtn) {
            changeCouncilBtn.style.display = 'none';
        }
        
        // 9. Show selection grid and input area
        if (elements.questionPhase) {
            elements.questionPhase.style.display = 'flex';
        }
        if (elements.selectionPhase) {
            elements.selectionPhase.style.display = 'flex';
        }
        
        const selectionContainer = document.querySelector('.selection-container');
        if (selectionContainer) {
            selectionContainer.style.display = 'flex';
            selectionContainer.style.opacity = '1';
            selectionContainer.style.transform = 'translateY(0)';
        }
        
        const header = document.querySelector('.header');
        if (header) {
            header.style.display = 'block';
            header.style.opacity = '1';
        }
        
        const thinkersGrid = document.querySelector('.thinkers-grid');
        if (thinkersGrid) {
            thinkersGrid.style.display = 'grid';
        }
        
        // 10. Re-render thinkers to clear any visual state
        renderThinkers();
        updateSelectionCounter();
        
        // 11. Clear thinker suggestions
        clearThinkerSuggestions();
        
        // 12. Reset era display
        if (elements.eraDisplay) {
            elements.eraDisplay.textContent = 'CURRENT ERA: —';
        }
        
        // 13. Reset Consensus Bar
        updateConsensus(0);
        if (elements.statusMessage) {
            elements.statusMessage.textContent = 'Council is debating...';
        }
        if (elements.consensusPercentage) {
            elements.consensusPercentage.textContent = '0%';
        }
        
        // Clear consensus bar fill
        if (elements.consensusBar) {
            const fillElement = elements.consensusBar.querySelector('.consensus-bar-fill');
            if (fillElement) {
                fillElement.style.width = '0%';
            }
            elements.consensusBar.classList.remove('complete');
        }
        
        // 14. Destroy chart if it exists
        if (window.insightChartInstance) {
            window.insightChartInstance.destroy();
            window.insightChartInstance = null;
        }
        
        // 15. Reset current speaker display
        if (elements.currentSpeaker) {
            elements.currentSpeaker.textContent = '';
        }
        
        // 16. Show question phase
        showPhase('question');
        
        // ============================================
        // Smooth Transition - Fade Back In
        // ============================================
        if (appContainer) {
            setTimeout(() => {
                appContainer.style.transition = 'opacity 0.3s ease-in';
                appContainer.style.opacity = '1';
            }, 50);
        }
        
        // ============================================
        // Smooth Scroll to Top
        // ============================================
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // ============================================
        // Auto-Focus Input
        // ============================================
        setTimeout(() => {
            if (elements.questionInput) {
                elements.questionInput.focus();
            }
        }, 500);
    }, 300);
}

function initVerdictPhase() {
    // Use event delegation for dynamically created buttons
    // This ensures the New Inquiry button works even if created after page load
    document.addEventListener('click', (e) => {
        const target = e.target;
        
        // Handle New Inquiry button (can be clicked directly or on child elements)
        const isNewInquiryBtn = target.id === 'new-inquiry-btn' || 
                                target.closest('#new-inquiry-btn') ||
                                (target.closest('.btn-secondary') && target.closest('.btn-secondary').id === 'new-inquiry-btn');
        
        if (isNewInquiryBtn) {
            e.preventDefault();
            e.stopPropagation();
            // Call resetApp directly - no confirmation needed
            resetApp();
            return;
        }
        
        // Handle PDF export
        if (target.id === 'verdict-export' || target.closest('#verdict-export')) {
            e.preventDefault();
            exportToPDF();
        }
    });
    
    // Also add direct event listener as backup
    const newInquiryBtn = document.getElementById('new-inquiry-btn');
    if (newInquiryBtn) {
        newInquiryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            resetApp();
        });
    }
}

// ============================================
// PDF Export (Virtual Window Approach)
// ============================================

function exportToPDF(event) {
    // Ensure verdict is rendered before printing
    if (!state.verdict && elements.verdictContent && !elements.verdictContent.querySelector('.verdict-text')) {
        alert('Please wait for the Final Verdict to be generated before printing.');
        return;
    }
    
    try {
        // ============================================
        // CAPTURE CONTENT
        // ============================================
        
        // Get user query
        const userQuery = (state.question || '').replace(/---+/g, '');
        
        // Extract debate messages for structured PDF display
        const debateMessages = [];
        if (elements.arena) {
            const arenaMessages = elements.arena.querySelectorAll('.debate-message');
            
            for (const msg of arenaMessages) {
                let speaker = msg.querySelector('.debate-speaker')?.textContent || 'Unknown';
                const text = msg.querySelector('.debate-text')?.textContent || '';
                if (speaker && text) {
                    // Clean dashes from text
                    const cleanText = text.replace(/---+/g, '');
                    // Remove "(Round X)" from speaker name if present
                    const cleanSpeaker = speaker.replace(/\s*\(Round\s+\d+\)/i, '').trim();
                    // Get era for this thinker
                    const era = getThinkerEra(cleanSpeaker);
                    // Format speaker with era for PDF
                    const speakerWithEra = era ? `${cleanSpeaker.toUpperCase()} (${era})` : cleanSpeaker.toUpperCase();
                    debateMessages.push({
                        speaker: speakerWithEra,
                        text: cleanText.trim()
                    });
                }
            }
        }
        
        // Get final verdict - explicit content capture
        let finalVerdict = '';
        if (state.verdict) {
            finalVerdict = state.verdict;
        } else if (elements.verdictContent) {
            const verdictDiv = elements.verdictContent.querySelector('.verdict-text');
            if (verdictDiv) {
                // Use innerText for better text extraction (strips HTML)
                finalVerdict = verdictDiv.innerText || verdictDiv.textContent || '';
            }
        }
        // Clean dashes and ensure we have content
        finalVerdict = (finalVerdict || '').replace(/---+/g, '').trim();
        
        if (!finalVerdict) {
            finalVerdict = 'Verdict not available.';
        }
        
        // ============================================
        // CREATE PRINT WINDOW
        // ============================================
        
        // Get chart image if available - will be converted to grayscale via CSS filter in PDF
        let chartImage = '';
        if (window.insightChartInstance && window.insightChartInstance.canvas) {
            try {
                // Get the canvas element directly
                const canvas = window.insightChartInstance.canvas;
                chartImage = canvas.toDataURL('image/png');
                } catch (e) {
                    // Fallback to Chart.js method
                    try {
                        chartImage = window.insightChartInstance.toBase64Image();
                    } catch (e2) {
                        // Chart export failed - continue without image
                    }
                }
        }
        
        // Embed logo SVG for PDF (base64 encoded)
        const logoSVG = `<svg class="logo-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <g transform="scale(1, -1) translate(0, -48)">
        <defs>
            <linearGradient id="synapseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
            </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="3" fill="url(#synapseGradient)"/>
        <circle cx="24" cy="8" r="2.5" fill="url(#synapseGradient)"/>
        <circle cx="36" cy="12" r="3" fill="url(#synapseGradient)"/>
        <circle cx="12" cy="24" r="2.5" fill="url(#synapseGradient)"/>
        <circle cx="24" cy="24" r="4" fill="url(#synapseGradient)"/>
        <circle cx="36" cy="24" r="2.5" fill="url(#synapseGradient)"/>
        <circle cx="12" cy="36" r="3" fill="url(#synapseGradient)"/>
        <circle cx="24" cy="40" r="2.5" fill="url(#synapseGradient)"/>
        <circle cx="36" cy="36" r="3" fill="url(#synapseGradient)"/>
        <path d="M 12 12 Q 18 8 24 8 Q 30 8 36 12" stroke="url(#synapseGradient)" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M 36 12 Q 30 18 24 24 Q 18 30 12 36" stroke="url(#synapseGradient)" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M 12 36 Q 18 40 24 40 Q 30 40 36 36" stroke="url(#synapseGradient)" stroke-width="2" fill="none" stroke-linecap="round"/>
    </g>
</svg>`;
        const logoBase64 = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(logoSVG)));
        
        // Get current era from footer
        let currentEra = '—';
        if (elements.eraDisplay) {
            const eraText = elements.eraDisplay.textContent || '';
            // Extract era from "CURRENT ERA: 180 AD" or "SYNAPSE ERA: CONVERGENCE"
            const eraMatch = eraText.match(/CURRENT ERA:\s*(.+)|SYNAPSE ERA:\s*(.+)/i);
            if (eraMatch) {
                currentEra = (eraMatch[1] || eraMatch[2] || '—').trim();
            }
        }
        
        // Generate session ID
        const sessionId = `SYN-${Date.now().toString(36).toUpperCase()}`;
        const currentDate = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const printWindow = window.open('', '_blank');
        
        if (!printWindow) {
            alert('Please allow popups to print the document.');
            return;
        }
        
        printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
    <title>SYNAPSE Analysis Report</title>
    <style>
        @page {
            size: auto;
            margin: 20mm;
        }
        html, body {
            height: auto !important;
            overflow: visible !important;
            margin: 0 !important;
            padding: 0 !important;
        }
        * {
            page-break-inside: avoid;
        }
        html {
            display: block;
        }
        body { 
            font-family: 'Arial', sans-serif; 
            padding: 0; 
            margin: 0;
            color: #000; 
            line-height: 1.6;
            background: #ffffff;
            height: auto;
            overflow: visible;
            display: block;
        }
        .header-container,
        .content-wrapper,
        .section,
        .chart-section,
        .verdict-box,
        .certified-seal {
            display: block;
        }
        @media print {
            body { 
                margin: 0 !important; 
                padding: 0 !important; 
                height: auto !important;
                overflow: visible !important;
            }
            /* Hide browser-generated headers/footers via @page margins only */
            .section { 
                page-break-inside: avoid; 
                margin-bottom: 20px; 
            }
            h1, h2, h3 { 
                page-break-after: avoid; 
            }
            .debate-message-pdf {
                page-break-inside: avoid;
                break-inside: avoid;
            }
            .verdict-box {
                page-break-inside: avoid;
            }
            .certified-seal {
                page-break-inside: avoid;
            }
        }
        .header-container {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #000;
            padding-bottom: 15px;
            margin-bottom: 30px;
        }
        .header-left {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .pdf-logo {
            max-height: 50px;
            height: auto;
            width: auto;
            margin: 0;
        }
        .header-right {
            text-align: right;
            font-size: 10pt;
            color: #666;
        }
        h1 { 
            color: #000; 
            margin: 0;
            font-size: 24pt;
            font-weight: bold;
        }
        .session-info {
            margin-top: 5px;
            font-size: 9pt;
        }
        .section { 
            margin-top: 25px;
            page-break-inside: avoid;
            break-inside: avoid;
        }
        .label { 
            font-weight: bold; 
            text-transform: uppercase; 
            font-size: 11pt; 
            color: #000;
            display: block;
            margin-bottom: 8px;
        }
        .content { 
            margin-top: 5px; 
            white-space: pre-wrap;
            color: #000;
            font-size: 10pt;
            line-height: 1.7;
        }
        .debate-message-pdf {
            margin-bottom: 20px;
            padding: 12px;
            border-left: 3px solid #000;
            background: #fafafa;
            page-break-inside: avoid;
            break-inside: avoid;
            -webkit-region-break-inside: avoid;
        }
        .debate-speaker-pdf {
            font-weight: bold;
            margin-bottom: 5px;
            font-size: 10pt;
        }
        .verdict-box { 
            background: #f4f4f4; 
            padding: 25px; 
            border: 2px solid #000; 
            margin-top: 30px;
            page-break-inside: avoid;
        }
        .verdict-text-pdf {
            font-family: 'Georgia', 'Times New Roman', serif;
            font-size: 11pt;
            line-height: 1.8;
            color: #000;
            white-space: pre-wrap;
        }
        .chart-section {
            margin: 30px 0;
            page-break-inside: avoid;
            text-align: center;
        }
        .chart-image {
            max-width: 100%;
            height: auto;
            margin: 15px 0;
            filter: grayscale(100%);
            -webkit-filter: grayscale(100%);
        }
        .dimension-legend-pdf {
            margin-top: 15px;
            font-size: 9pt;
            color: #666;
            text-align: left;
        }
        .legend-item-pdf {
            margin: 5px 0;
        }
        footer { 
            position: relative;
            margin-top: 50px; 
            font-size: 9pt; 
            text-align: center; 
            border-top: 1px solid #eee; 
            padding: 20px 0;
            color: #666;
            background: #ffffff;
            page-break-inside: avoid;
        }
        .content-wrapper {
            margin-bottom: 40px;
            padding-bottom: 20px;
        }
        .certified-seal {
            margin-top: 50px;
            margin-bottom: 30px;
            padding-top: 30px;
            border-top: 2px solid #000;
            text-align: center;
            page-break-inside: avoid;
        }
        .certified-seal-icon {
            font-size: 24pt;
            margin-bottom: 10px;
            color: #000;
        }
        .certified-seal-text {
            font-size: 10pt;
            letter-spacing: 3px;
            text-transform: uppercase;
            font-weight: bold;
            color: #000;
            margin: 5px 0;
        }
        .certified-seal-subtext {
            font-size: 9pt;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #666;
            margin-top: 5px;
            font-family: 'Courier New', monospace;
        }
    </style>
</head>
<body>
    <div class="header-container">
        <div class="header-left">
            <img src="${logoBase64}" alt="SYNAPSE Logo" class="pdf-logo">
            <h1>SYNAPSE REPORT</h1>
        </div>
        <div class="header-right">
            <div>${currentDate}</div>
            <div class="session-info">Session: ${sessionId}</div>
            <div class="session-info" style="margin-top: 5px; font-family: 'Courier New', monospace;">Era: ${currentEra}</div>
        </div>
    </div>
    
    <div class="content-wrapper">
        <div class='section'>
            <span class='label'>The Challenge:</span>
            <div class='content'>${escapeHtml(userQuery)}</div>
        </div>
        
        ${chartImage ? `
        <div class="chart-section">
            <span class="label">Analytical Dimensions</span>
            <img src="${chartImage}" alt="Insight Chart" class="chart-image" style="max-width: 100%; height: auto; display: block; margin: 15px auto;" />
            <div class="dimension-legend-pdf">
                <div class="legend-item-pdf"><strong>Logic:</strong> Rational analysis and systematic thinking</div>
                <div class="legend-item-pdf"><strong>Ethics:</strong> Moral reasoning and value-based judgment</div>
                <div class="legend-item-pdf"><strong>Empathy:</strong> Emotional intelligence and human understanding</div>
                <div class="legend-item-pdf"><strong>Action:</strong> Practical application and decisive execution</div>
            </div>
        </div>
        ` : ''}
        
        <div class='section'>
            <span class='label'>The Debate:</span>
            ${debateMessages.length > 0 ? debateMessages.map(msg => `
                <div class="debate-message-pdf">
                    <div class="debate-speaker-pdf">${escapeHtml(msg.speaker)}</div>
                    <div class="content">${escapeHtml(msg.text)}</div>
                </div>
            `).join('') : '<div class="content">No debate content available.</div>'}
        </div>
        
        <div class='verdict-box'>
            <span class='label'>The Final Verdict:</span>
            <div class='verdict-text-pdf'>${escapeHtml(finalVerdict)}</div>
        </div>
    </div>
    
    <div class="certified-seal">
        <div class="certified-seal-icon">✓</div>
        <div class="certified-seal-text">SYNAPSE COUNCIL</div>
        <div class="certified-seal-subtext">CERTIFIED ANALYSIS</div>
    </div>
    
    <footer>
        <div style="margin-bottom: 10px; font-family: 'Courier New', monospace; font-size: 9pt; color: #666;">
            Era: ${currentEra}
        </div>
        <div>© ${new Date().getFullYear()} <a href="https://www.linkedin.com/in/jorgis-chatzivantsidis-81a053110/" target="_blank" rel="noopener noreferrer" style="color: #666; text-decoration: none;">Georgios Chatzivantsidis</a> | SYNAPSE COUNCIL</div>
    </footer>
</body>
</html>
        `);
        
        printWindow.document.close();
        
        // Wait for document to fully render and logo image to load, then print
        const waitForLogoAndPrint = () => {
            const logoImg = printWindow.document.querySelector('.pdf-logo');
            if (logoImg) {
                if (logoImg.complete) {
                    // Image already loaded (base64 should be instant)
                    setTimeout(() => {
                        printWindow.print();
                    }, 500);
                } else {
                    // Wait for image to load
                    logoImg.onload = () => {
                        setTimeout(() => {
                            printWindow.print();
                        }, 500);
                    };
                    logoImg.onerror = () => {
                        // If image fails, print anyway after delay
                        setTimeout(() => {
                            printWindow.print();
                        }, 500);
                    };
                }
            } else {
                // No logo found, print anyway
                setTimeout(() => {
                    printWindow.print();
                }, 500);
            }
        };
        
        printWindow.document.addEventListener('DOMContentLoaded', waitForLogoAndPrint);
        
        // Fallback: if DOMContentLoaded already fired, check immediately
        if (printWindow.document.readyState === 'complete' || printWindow.document.readyState === 'interactive') {
            waitForLogoAndPrint();
        }
        
    } catch (error) {
        alert('Failed to generate print document. Please try again.');
    }
}

// ============================================
// Initialization
// ============================================

function initAboutModal() {
    // Reset animations function
    function resetAnimations() {
        if (elements.aboutModal) {
            const processSteps = elements.aboutModal.querySelectorAll('.process-step');
            const finalTagline = elements.aboutModal.querySelector('.about-final-tagline');
            
            // Reset step animations
            processSteps.forEach(step => {
                step.style.animation = 'none';
                step.style.opacity = '0';
                step.style.transform = 'translateY(20px)';
                void step.offsetWidth; // Force reflow
                step.style.animation = '';
            });
            
            // Reset tagline animation
            if (finalTagline) {
                finalTagline.style.animation = 'none';
                finalTagline.style.opacity = '0';
                finalTagline.style.transform = 'translateY(20px)';
                void finalTagline.offsetWidth; // Force reflow
                finalTagline.style.animation = '';
            }
        }
    }
    
    // Open modal function
    function openAboutModal() {
        if (elements.aboutModal) {
            // Reset animations first (while modal is hidden)
            resetAnimations();
            
            // Show modal
            elements.aboutModal.classList.add('active');
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
            
            // Trigger animations after modal is visible
            setTimeout(() => {
                resetAnimations(); // This will restart animations
            }, 50);
        }
    }
    
    // Close modal function
    function closeAboutModal() {
        if (elements.aboutModal) {
            elements.aboutModal.classList.remove('active');
            // Restore body scroll
            document.body.style.overflow = '';
            // Reset animations for next open (after close animation completes)
            setTimeout(() => {
                resetAnimations();
            }, 350); // Wait for close animation to complete
        }
    }
    
    // Consolidated event listeners for About modal
    [elements.aboutBtn, elements.aboutBtnFooter].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', openAboutModal);
        }
    });
    
    if (elements.aboutClose) {
        elements.aboutClose.addEventListener('click', closeAboutModal);
    }
    
    // Close on backdrop click
    if (elements.aboutModal) {
        const backdrop = elements.aboutModal.querySelector('.about-modal-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) {
                    closeAboutModal();
                }
            });
        }
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.aboutModal?.classList.contains('active')) {
            closeAboutModal();
        }
    });
}

// ============================================
// Settings Modal (API Key Management)
// ============================================

function initSettingsModal() {
    const apiKeyInput = document.getElementById('api-key-input');
    const saveApiKeyBtn = document.getElementById('save-api-key');
    const clearApiKeyBtn = document.getElementById('clear-api-key');
    const apiKeyStatus = document.getElementById('api-key-status');
    
    // Update API key status indicator
    function updateApiKeyStatus() {
        if (!apiKeyStatus) return;
        const storedKey = localStorage.getItem('synapse_api_key');
        if (storedKey && storedKey.trim()) {
            apiKeyStatus.textContent = 'Linked';
            apiKeyStatus.classList.remove('status-not-linked');
            apiKeyStatus.classList.add('status-linked');
        } else {
            apiKeyStatus.textContent = 'Not Linked';
            apiKeyStatus.classList.remove('status-linked');
            apiKeyStatus.classList.add('status-not-linked');
        }
    }
    
    // Load existing key into input (masked)
    function loadApiKeyToInput() {
        if (!apiKeyInput) return;
        const storedKey = localStorage.getItem('synapse_api_key');
        if (storedKey && storedKey.trim()) {
            // Show masked version (first 7 chars + ...)
            const maskedKey = storedKey.substring(0, 7) + '...' + storedKey.substring(storedKey.length - 4);
            apiKeyInput.value = maskedKey;
            apiKeyInput.setAttribute('data-has-key', 'true');
        } else {
            apiKeyInput.value = '';
            apiKeyInput.removeAttribute('data-has-key');
        }
    }
    
    // Open settings modal
    function openSettingsModal() {
        if (elements.settingsModal) {
            elements.settingsModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            updateApiKeyStatus();
            loadApiKeyToInput();
        }
    }
    
    // Close settings modal
    function closeSettingsModal() {
        if (elements.settingsModal) {
            elements.settingsModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Event listeners for opening modal
    [elements.apiKeyBtn, elements.apiKeyBtnFooter].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', openSettingsModal);
        }
    });
    
    // Close button
    if (elements.settingsClose) {
        elements.settingsClose.addEventListener('click', closeSettingsModal);
    }
    
    // Close on backdrop click
    if (elements.settingsModal) {
        const backdrop = elements.settingsModal.querySelector('.settings-modal-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) {
                    closeSettingsModal();
                }
            });
        }
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.settingsModal?.classList.contains('active')) {
            closeSettingsModal();
        }
    });
    
    // Save API key
    if (saveApiKeyBtn && apiKeyInput) {
        saveApiKeyBtn.addEventListener('click', () => {
            const keyValue = apiKeyInput.value.trim();
            
            // If input shows masked key, don't overwrite
            if (apiKeyInput.getAttribute('data-has-key') === 'true' && keyValue.includes('...')) {
                updateApiKeyStatus();
                return;
            }
            
            if (!keyValue || keyValue.length < 10) {
                alert('Please enter a valid API key.');
                return;
            }
            
            try {
                localStorage.setItem('synapse_api_key', keyValue);
                updateApiKeyStatus();
                loadApiKeyToInput();
                
                // Visual feedback
                saveApiKeyBtn.textContent = 'Saved!';
                setTimeout(() => {
                    saveApiKeyBtn.textContent = 'Save';
                }, 2000);
            } catch (err) {
                alert('Failed to save API key. Please try again.');
            }
        });
    }
    
    // Clear API key
    if (clearApiKeyBtn && apiKeyInput) {
        clearApiKeyBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear your API key?')) {
                try {
                    localStorage.removeItem('synapse_api_key');
                    apiKeyInput.value = '';
                    apiKeyInput.removeAttribute('data-has-key');
                    updateApiKeyStatus();
                    
                    // Visual feedback
                    clearApiKeyBtn.textContent = 'Cleared!';
                    setTimeout(() => {
                        clearApiKeyBtn.textContent = 'Clear';
                    }, 2000);
                } catch (err) {
                    alert('Failed to clear API key. Please try again.');
                }
            }
        });
    }
    
    // Initialize status on page load
    updateApiKeyStatus();
}

function init() {
    // Set current year
    elements.currentYear.textContent = new Date().getFullYear();
    
    // Initialize phases
    initQuestionPhase();
    initSelectionPhase();
    initDebatePhase();
    initVerdictPhase();
    
    // Initialize About modal
    initAboutModal();
    
    // Initialize Settings modal
    initSettingsModal();
    
    // ============================================
    // Language Switcher - Direct Event Listeners
    // ============================================
    const langEn = document.getElementById('lang-en');
    const langGr = document.getElementById('lang-gr');
    
    if (langEn) {
        langEn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            setLanguage('EN');
        });
    }
    
    if (langGr) {
        langGr.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            setLanguage('GR');
        });
    }
    
    // Logo click handler for reset (acts as Home button)
    if (elements.logoReset) {
        elements.logoReset.addEventListener('click', (e) => {
            e.preventDefault();
            // Show confirmation if analysis is in progress, otherwise reset immediately
            resetApp(true);
        });
    }
    
    // Initialize language on page load
    const savedLang = localStorage.getItem('selectedLang') || 'EN';
    setLanguage(savedLang);
    
    // Show initial phase
    showPhase('question');
    
    // Check for API key in URL params (for development) - only if no localStorage key exists
    const storedKey = localStorage.getItem('synapse_api_key');
    if (!storedKey) {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('api_key')) {
            // Save URL param to localStorage for consistency
            localStorage.setItem('synapse_api_key', urlParams.get('api_key'));
        }
    }
}

// Start the application
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

