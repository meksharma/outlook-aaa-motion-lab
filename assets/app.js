/**
 * ============================================================
 * OUTLOOK MOTION LAB — Main Application
 *
 * This file handles:
 * - Loading patterns from JSON
 * - Rendering the UI (sidebar, cards, detail view)
 * - Search and filtering
 * - Reduced motion toggle
 * - Demo parameter controls
 *
 * Dependencies:
 * - patterns.json (data)
 * - demos/*.js (demo implementations via DemoRegistry)
 * ============================================================
 */

(function() {
    'use strict';

    // ============================================================
    // STATE
    // ============================================================

    const state = {
        patterns: [],
        categories: [],
        platforms: [],
        activePlatforms: new Set(),  // Empty = all platforms shown
        activeCategory: null,        // null = all categories
        searchQuery: '',
        reducedMotion: false,
        currentPatternId: null,
        demoParams: {}
    };

    // ============================================================
    // DOM REFERENCES
    // ============================================================

    const DOM = {
        searchInput: null,
        reducedMotionToggle: null,
        platformFilters: null,
        categoryNav: null,
        patternCount: null,
        patternsGrid: null,
        activeFilters: null,
        homeView: null,
        detailView: null,
        backButton: null,
        patternDetail: null
    };

    // ============================================================
    // INITIALIZATION
    // ============================================================

    /**
     * Initialize the application
     */
    async function init() {
        // Cache DOM references
        cacheDOM();

        // Check for system reduced motion preference
        checkReducedMotionPreference();

        // Load patterns data
        await loadPatterns();

        // Render initial UI
        renderPlatformFilters();
        renderCategories();
        renderPatternCards();
        updatePatternCount();

        // Attach event listeners
        attachEventListeners();

        // Check URL hash for direct pattern link
        handleHashChange();
    }

    /**
     * Cache commonly used DOM elements
     */
    function cacheDOM() {
        DOM.searchInput = document.getElementById('search-input');
        DOM.reducedMotionToggle = document.getElementById('reduced-motion-toggle');
        DOM.platformFilters = document.getElementById('platform-filters');
        DOM.categoryNav = document.getElementById('category-nav');
        DOM.patternCount = document.getElementById('pattern-count');
        DOM.patternsGrid = document.getElementById('patterns-grid');
        DOM.activeFilters = document.getElementById('active-filters');
        DOM.homeView = document.getElementById('home-view');
        DOM.detailView = document.getElementById('detail-view');
        DOM.backButton = document.getElementById('back-button');
        DOM.patternDetail = document.getElementById('pattern-detail');
    }

    /**
     * Check system preference for reduced motion
     */
    function checkReducedMotionPreference() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) {
            state.reducedMotion = true;
            document.body.classList.add('reduced-motion');
            if (DOM.reducedMotionToggle) {
                DOM.reducedMotionToggle.checked = true;
            }
        }

        // Listen for changes
        mediaQuery.addEventListener('change', (e) => {
            if (e.matches && !state.reducedMotion) {
                state.reducedMotion = true;
                document.body.classList.add('reduced-motion');
                DOM.reducedMotionToggle.checked = true;
            }
        });
    }

    /**
     * Load patterns from JSON file
     */
    async function loadPatterns() {
        try {
            const response = await fetch('assets/patterns.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            state.patterns = data.patterns || [];
            state.categories = data.categories || [];
            state.platforms = data.platforms || [];

            console.log(`Loaded ${state.patterns.length} motion patterns`);
        } catch (error) {
            console.error('Failed to load patterns:', error);
            showError('Failed to load motion patterns. Please try refreshing the page.');
        }
    }

    // ============================================================
    // RENDERING
    // ============================================================

    /**
     * Render platform filter checkboxes
     */
    function renderPlatformFilters() {
        // Platform filters completely removed - hide the entire section
        if (DOM.platformFilters) {
            const platformSection = DOM.platformFilters.closest('.sidebar-section');
            if (platformSection) {
                platformSection.style.display = 'none';
            }
        }
    }

    /**
     * Render category navigation
     */
    function renderCategories() {
        if (!DOM.categoryNav) return;

        // "All" option
        let html = `
            <button class="category-item active" data-category="all">
                <span class="category-icon">◎</span>
                <span>All Patterns</span>
                <span class="category-count">${state.patterns.length}</span>
            </button>
        `;

        // Category items
        html += state.categories.map(category => {
            const count = state.patterns.filter(p => p.category === category.id).length;
            return `
                <button class="category-item" data-category="${category.id}">
                    <span class="category-icon">${category.icon}</span>
                    <span>${category.label}</span>
                    <span class="category-count">${count}</span>
                </button>
            `;
        }).join('');

        DOM.categoryNav.innerHTML = html;
    }

    /**
     * Render pattern cards based on current filters
     */
    function renderPatternCards() {
        if (!DOM.patternsGrid) return;

        const filtered = getFilteredPatterns();

        if (filtered.length === 0) {
            DOM.patternsGrid.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <h3>No patterns found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            `;
            return;
        }

        const html = filtered.map(pattern => {
            const categoryInfo = state.categories.find(c => c.id === pattern.category);
            const categoryLabel = categoryInfo ? categoryInfo.label : pattern.category;

            const tagsHtml = pattern.tags.slice(0, 3).map(tag =>
                `<span class="tag tag--${pattern.category}">${tag}</span>`
            ).join('');

            const platformsHtml = pattern.platforms.map(p => {
                const platformInfo = state.platforms.find(pl => pl.id === p);
                return `<span class="platform-badge">${platformInfo ? platformInfo.label : p}</span>`;
            }).join('');

            return `
                <article class="pattern-card" data-pattern-id="${pattern.id}" tabindex="0" role="button">
                    <div class="pattern-card-header">
                        <h3 class="pattern-card-name">${pattern.name}</h3>
                        <span class="pattern-card-category">${categoryLabel}</span>
                    </div>
                    <p class="pattern-card-feels">${pattern.feelsLike}</p>
                    <div class="pattern-card-tags">${tagsHtml}</div>
                    <div class="pattern-card-platforms">${platformsHtml}</div>
                </article>
            `;
        }).join('');

        DOM.patternsGrid.innerHTML = html;
    }

    /**
     * Render active filter chips
     */
    function renderActiveFilters() {
        if (!DOM.activeFilters) return;

        let html = '';

        // Category filter chip
        if (state.activeCategory) {
            const categoryInfo = state.categories.find(c => c.id === state.activeCategory);
            if (categoryInfo) {
                html += `
                    <span class="filter-chip">
                        ${categoryInfo.icon} ${categoryInfo.label}
                        <button class="filter-chip-remove" data-clear="category">×</button>
                    </span>
                `;
            }
        }

        // Search filter chip
        if (state.searchQuery) {
            html += `
                <span class="filter-chip">
                    Search: "${state.searchQuery}"
                    <button class="filter-chip-remove" data-clear="search">×</button>
                </span>
            `;
        }

        DOM.activeFilters.innerHTML = html;
    }

    /**
     * Update pattern count display
     */
    function updatePatternCount() {
        if (!DOM.patternCount) return;
        const filtered = getFilteredPatterns();
        const total = state.patterns.length;
        DOM.patternCount.textContent = filtered.length === total
            ? `${total} patterns`
            : `${filtered.length} of ${total} patterns`;
    }

    /**
     * Render pattern detail view
     */
    function renderPatternDetail(pattern) {
        if (!DOM.patternDetail) return;

        // Initialize demo params with defaults
        state.demoParams = {};
        pattern.parameters.forEach(param => {
            state.demoParams[param.name] = param.default;
        });

        const useWhenHtml = pattern.useWhen.map(item =>
            `<li>${item}</li>`
        ).join('');

        const termsHtml = pattern.motionTerms.map(term =>
            `<li>${term}</li>`
        ).join('');

        const platformsHtml = pattern.platforms.map(p => {
            const platformInfo = state.platforms.find(pl => pl.id === p);
            return `<span class="platform-badge">${platformInfo ? platformInfo.label : p}</span>`;
        }).join('');

        const variationsHtml = pattern.parameters.map(param => `
            <div class="variation-control">
                <label class="variation-label">
                    <span>${param.label}</span>
                    <span class="variation-value" id="value-${param.name}">${param.default}${param.unit}</span>
                </label>
                <input
                    type="range"
                    id="param-${param.name}"
                    min="${param.min}"
                    max="${param.max}"
                    step="${param.step}"
                    value="${param.default}"
                    data-param="${param.name}"
                    data-unit="${param.unit}"
                >
            </div>
        `).join('');

        const html = `
            <header class="pattern-detail-header">
                <h1 class="pattern-detail-name">${pattern.name}</h1>
                <p class="pattern-detail-feels">"${pattern.feelsLike}"</p>

                <div class="pattern-detail-meta">
                    <div class="pattern-meta-section">
                        <h3 class="pattern-meta-title">Use When</h3>
                        <ul class="pattern-meta-list">${useWhenHtml}</ul>
                    </div>
                    <div class="pattern-meta-section">
                        <h3 class="pattern-meta-title">Motion Terms</h3>
                        <ul class="pattern-meta-list">${termsHtml}</ul>
                    </div>
                    <div class="pattern-meta-section">
                        <h3 class="pattern-meta-title">Platforms</h3>
                        <div style="display: flex; gap: 8px; flex-wrap: wrap;">${platformsHtml}</div>
                    </div>
                </div>
            </header>

            <section class="pattern-prompts">
                <div class="prompt-tabs">
                    <button class="prompt-tab active" data-prompt="swiftui">SwiftUI Prompt</button>
                    <button class="prompt-tab" data-prompt="web">Web (HTML/CSS/JS) Prompt</button>
                </div>

                <div class="prompt-content active" id="prompt-swiftui">
                    <div class="prompt-block">
                        <button class="copy-button" data-copy="swiftui">Copy</button>
                        <pre>${escapeHtml(pattern.prompts.swiftui)}</pre>
                    </div>
                </div>

                <div class="prompt-content" id="prompt-web">
                    <div class="prompt-block">
                        <button class="copy-button" data-copy="web">Copy</button>
                        <pre>${escapeHtml(pattern.prompts.web)}</pre>
                    </div>
                </div>
            </section>

            <section class="pattern-demo-section">
                <h2 class="demo-section-title">
                    <span>🎬</span>
                    Live Demo
                </h2>

                <div class="demo-container">
                    <div class="demo-viewport" id="demo-viewport">
                        <!-- Demo content rendered here by demo-registry -->
                    </div>
                    <div class="demo-controls">
                        <button class="demo-play-button" id="demo-play">▶ Play Animation</button>
                        <button class="demo-reset-button" id="demo-reset">↻ Reset</button>
                    </div>
                </div>

                <div class="variations-section">
                    <h3 class="variations-title">
                        <span>⚙️</span>
                        Try Variations
                    </h3>
                    <div class="variations-grid">
                        ${variationsHtml}
                    </div>
                </div>
            </section>
        `;

        DOM.patternDetail.innerHTML = html;

        // Initialize demo
        initializeDemo(pattern);

        // Attach detail view event listeners
        attachDetailEventListeners(pattern);
    }

    // ============================================================
    // FILTERING
    // ============================================================

    /**
     * Get filtered patterns based on current state
     */
    function getFilteredPatterns() {
        return state.patterns.filter(pattern => {
            // Platform filter removed - show all patterns regardless of platform

            // Category filter
            if (state.activeCategory && pattern.category !== state.activeCategory) {
                return false;
            }

            // Search filter
            if (state.searchQuery) {
                const query = state.searchQuery.toLowerCase();
                const searchableText = [
                    pattern.name,
                    pattern.feelsLike,
                    ...pattern.tags,
                    ...pattern.motionTerms,
                    pattern.category
                ].join(' ').toLowerCase();

                if (!searchableText.includes(query)) {
                    return false;
                }
            }

            return true;
        });
    }

    // ============================================================
    // EVENT HANDLERS
    // ============================================================

    /**
     * Attach main event listeners
     */
    function attachEventListeners() {
        // Search input
        if (DOM.searchInput) {
            DOM.searchInput.addEventListener('input', debounce(handleSearch, 200));
            DOM.searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    DOM.searchInput.value = '';
                    handleSearch({ target: { value: '' } });
                }
            });
        }

        // Reduced motion toggle
        if (DOM.reducedMotionToggle) {
            DOM.reducedMotionToggle.addEventListener('change', handleReducedMotionToggle);
        }

        // Platform filters
        if (DOM.platformFilters) {
            DOM.platformFilters.addEventListener('change', handlePlatformFilter);
        }

        // Category navigation
        if (DOM.categoryNav) {
            DOM.categoryNav.addEventListener('click', handleCategoryClick);
        }

        // Pattern cards (delegated)
        if (DOM.patternsGrid) {
            DOM.patternsGrid.addEventListener('click', handlePatternCardClick);
            DOM.patternsGrid.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handlePatternCardClick(e);
                }
            });
        }

        // Active filters
        if (DOM.activeFilters) {
            DOM.activeFilters.addEventListener('click', handleClearFilter);
        }

        // Back button
        if (DOM.backButton) {
            DOM.backButton.addEventListener('click', showHomeView);
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', handleKeyboardShortcuts);

        // Hash change for direct linking
        window.addEventListener('hashchange', handleHashChange);
    }

    /**
     * Attach event listeners for detail view
     */
    function attachDetailEventListeners(pattern) {
        // Prompt tabs
        const promptTabs = DOM.patternDetail.querySelectorAll('.prompt-tab');
        promptTabs.forEach(tab => {
            tab.addEventListener('click', handlePromptTabClick);
        });

        // Copy buttons
        const copyButtons = DOM.patternDetail.querySelectorAll('.copy-button');
        copyButtons.forEach(button => {
            button.addEventListener('click', () => handleCopyClick(button, pattern));
        });

        // Demo controls
        const playButton = document.getElementById('demo-play');
        const resetButton = document.getElementById('demo-reset');

        if (playButton) {
            playButton.addEventListener('click', () => playDemo(pattern));
        }
        if (resetButton) {
            resetButton.addEventListener('click', () => resetDemo(pattern));
        }

        // Parameter sliders
        const sliders = DOM.patternDetail.querySelectorAll('input[type="range"]');
        sliders.forEach(slider => {
            slider.addEventListener('input', handleParamChange);
        });
    }

    /**
     * Handle search input
     */
    function handleSearch(e) {
        state.searchQuery = e.target.value.trim();

        // If we're currently in detail view, go back to home view first
        if (state.currentPatternId) {
            showHomeView();
        }

        renderPatternCards();
        renderActiveFilters();
        updatePatternCount();
    }

    /**
     * Handle reduced motion toggle
     */
    function handleReducedMotionToggle(e) {
        state.reducedMotion = e.target.checked;
        document.body.classList.toggle('reduced-motion', state.reducedMotion);

        // Re-render demo if in detail view
        if (state.currentPatternId) {
            const pattern = state.patterns.find(p => p.id === state.currentPatternId);
            if (pattern) {
                initializeDemo(pattern);
            }
        }
    }

    /**
     * Handle platform filter change
     */
    function handlePlatformFilter(e) {
        // Platform filters removed - no longer needed
        return;
    }

    /**
     * Handle category navigation click
     */
    function handleCategoryClick(e) {
        const button = e.target.closest('.category-item');
        if (!button) return;

        const category = button.dataset.category;

        // Update active state
        DOM.categoryNav.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
        });
        button.classList.add('active');

        // Update state
        state.activeCategory = category === 'all' ? null : category;

        // If we're currently in detail view, go back to home view first
        if (state.currentPatternId) {
            showHomeView();
        }

        renderPatternCards();
        renderActiveFilters();
        updatePatternCount();
    }

    /**
     * Handle pattern card click
     */
    function handlePatternCardClick(e) {
        const card = e.target.closest('.pattern-card');
        if (!card) return;

        const patternId = card.dataset.patternId;
        showPatternDetail(patternId);
    }

    /**
     * Handle clear filter button click
     */
    function handleClearFilter(e) {
        const button = e.target.closest('.filter-chip-remove');
        if (!button) return;

        const clearType = button.dataset.clear;

        if (clearType === 'category') {
            state.activeCategory = null;
            DOM.categoryNav.querySelectorAll('.category-item').forEach(item => {
                item.classList.toggle('active', item.dataset.category === 'all');
            });
        } else if (clearType === 'search') {
            state.searchQuery = '';
            DOM.searchInput.value = '';
        }

        renderPatternCards();
        renderActiveFilters();
        updatePatternCount();
    }

    /**
     * Handle prompt tab click
     */
    function handlePromptTabClick(e) {
        const tab = e.target;
        const promptType = tab.dataset.prompt;

        // Update tab states
        DOM.patternDetail.querySelectorAll('.prompt-tab').forEach(t => {
            t.classList.toggle('active', t === tab);
        });

        // Update content visibility
        DOM.patternDetail.querySelectorAll('.prompt-content').forEach(content => {
            content.classList.toggle('active', content.id === `prompt-${promptType}`);
        });
    }

    /**
     * Handle copy button click
     */
    async function handleCopyClick(button, pattern) {
        const promptType = button.dataset.copy;
        const text = pattern.prompts[promptType];

        try {
            await navigator.clipboard.writeText(text);
            button.textContent = 'Copied!';
            button.classList.add('copied');

            setTimeout(() => {
                button.textContent = 'Copy';
                button.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            button.textContent = 'Failed';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        }
    }

    /**
     * Handle parameter slider change
     */
    function handleParamChange(e) {
        const slider = e.target;
        const paramName = slider.dataset.param;
        const unit = slider.dataset.unit;
        const value = parseFloat(slider.value);

        // Update state
        state.demoParams[paramName] = value;

        // Update displayed value
        const valueDisplay = document.getElementById(`value-${paramName}`);
        if (valueDisplay) {
            valueDisplay.textContent = `${value}${unit}`;
        }
    }

    /**
     * Handle keyboard shortcuts
     */
    function handleKeyboardShortcuts(e) {
        // Cmd/Ctrl + K for search focus
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            DOM.searchInput?.focus();
        }

        // Escape to go back
        if (e.key === 'Escape' && state.currentPatternId) {
            showHomeView();
        }
    }

    /**
     * Handle URL hash change for direct linking
     */
    function handleHashChange() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            const pattern = state.patterns.find(p => p.id === hash);
            if (pattern) {
                showPatternDetail(hash);
            }
        } else if (state.currentPatternId) {
            showHomeView();
        }
    }

    // ============================================================
    // VIEW MANAGEMENT
    // ============================================================

    /**
     * Show pattern detail view
     */
    function showPatternDetail(patternId) {
        const pattern = state.patterns.find(p => p.id === patternId);
        if (!pattern) return;

        state.currentPatternId = patternId;
        window.location.hash = patternId;

        renderPatternDetail(pattern);

        DOM.homeView.classList.remove('active');
        DOM.detailView.classList.add('active');

        // Scroll to top
        window.scrollTo(0, 0);
    }

    /**
     * Show home view
     */
    function showHomeView() {
        state.currentPatternId = null;
        window.location.hash = '';

        DOM.detailView.classList.remove('active');
        DOM.homeView.classList.add('active');
    }

    // ============================================================
    // DEMO MANAGEMENT
    // ============================================================

    /**
     * Initialize demo for a pattern
     */
    function initializeDemo(pattern) {
        const viewport = document.getElementById('demo-viewport');
        if (!viewport) return;

        // Check if demo registry exists
        if (typeof window.DemoRegistry === 'undefined') {
            viewport.innerHTML = '<p style="color: #999;">Demo not available</p>';
            return;
        }

        // Get demo implementation
        const demo = window.DemoRegistry.get(pattern.demoId);
        if (!demo) {
            viewport.innerHTML = `<p style="color: #999;">Demo "${pattern.demoId}" not found</p>`;
            return;
        }

        // Render demo HTML
        viewport.innerHTML = demo.render(state.reducedMotion);

        // Initialize demo
        if (demo.init) {
            demo.init(state.demoParams, state.reducedMotion);
        }
    }

    /**
     * Play demo animation
     */
    function playDemo(pattern) {
        if (typeof window.DemoRegistry === 'undefined') return;

        const demo = window.DemoRegistry.get(pattern.demoId);
        if (demo && demo.play) {
            demo.play(state.demoParams, state.reducedMotion);
        }
    }

    /**
     * Reset demo to initial state
     */
    function resetDemo(pattern) {
        if (typeof window.DemoRegistry === 'undefined') return;

        const demo = window.DemoRegistry.get(pattern.demoId);
        if (demo && demo.reset) {
            demo.reset(state.reducedMotion);
        }
    }

    // ============================================================
    // UTILITIES
    // ============================================================

    /**
     * Debounce function for search input
     */
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

    /**
     * Escape HTML for safe rendering
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Show error message
     */
    function showError(message) {
        if (DOM.patternsGrid) {
            DOM.patternsGrid.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">⚠️</div>
                    <h3>Error</h3>
                    <p>${message}</p>
                </div>
            `;
        }
    }

    // ============================================================
    // START APPLICATION
    // ============================================================

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
