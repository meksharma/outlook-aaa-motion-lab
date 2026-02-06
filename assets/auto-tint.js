/**
 * ============================================================
 * AUTO TINT FOR READABILITY
 *
 * Automatically adjusts glass material opacity and tint based on background
 * luminance to ensure text readability per iOS 26 Liquid Glass principles.
 * ============================================================
 */

(function() {
    'use strict';

    // ============================================================
    // LUMINANCE CALCULATION UTILITIES
    // ============================================================

    /**
     * Convert RGB values to relative luminance
     * @param {number} r - Red value (0-255)
     * @param {number} g - Green value (0-255)
     * @param {number} b - Blue value (0-255)
     * @returns {number} Relative luminance (0-1)
     */
    function calculateLuminance(r, g, b) {
        // Convert to 0-1 range
        const [rs, gs, bs] = [r, g, b].map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });

        // Calculate relative luminance using sRGB weights
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }

    /**
     * Extract RGB values from various color formats
     * @param {string} color - CSS color value
     * @returns {Object|null} RGB object or null if parsing fails
     */
    function parseColor(color) {
        if (!color || color === 'transparent') return null;

        // Create temporary element to get computed color
        const temp = document.createElement('div');
        temp.style.color = color;
        document.body.appendChild(temp);
        const computed = window.getComputedStyle(temp).color;
        document.body.removeChild(temp);

        // Parse RGB values from computed style
        const matches = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (matches) {
            return {
                r: parseInt(matches[1]),
                g: parseInt(matches[2]),
                b: parseInt(matches[3])
            };
        }

        return null;
    }

    /**
     * Analyze background luminance of an element
     * @param {HTMLElement} element - Element to analyze
     * @returns {number} Background luminance (0-1)
     */
    function analyzeBackgroundLuminance(element) {
        if (!element) return 0.5; // Default neutral luminance

        const style = window.getComputedStyle(element);

        // Check background color
        const bgColor = parseColor(style.backgroundColor);
        if (bgColor) {
            return calculateLuminance(bgColor.r, bgColor.g, bgColor.b);
        }

        // If no background color, traverse up the DOM
        const parent = element.parentElement;
        if (parent && parent !== document.body) {
            return analyzeBackgroundLuminance(parent);
        }

        // Default to neutral luminance
        return 0.5;
    }

    // ============================================================
    // AUTO TINT ADJUSTMENT LOGIC
    // ============================================================

    /**
     * Calculate tint adjustments based on background luminance
     * @param {number} luminance - Background luminance (0-1)
     * @returns {Object} Adjustment values
     */
    function calculateTintAdjustments(luminance) {
        const config = window.LiquidGlass?.tokens.autoTint || {
            luminance: {
                darkThreshold: 0.3,
                lightThreshold: 0.8,
                contrastMin: 4.5
            },
            adjustments: {
                darkBackground: { opacityIncrease: 0.1, tintIncrease: 0.05 },
                busyBackground: { opacityIncrease: 0.15, tintIncrease: 0.1 }
            }
        };

        let opacityAdjustment = 0;
        let tintAdjustment = 0;

        // Dark background - needs more opacity for readability
        if (luminance < config.luminance.darkThreshold) {
            opacityAdjustment = config.adjustments.darkBackground.opacityIncrease;
            tintAdjustment = config.adjustments.darkBackground.tintIncrease;
        }
        // Very light background might need slight opacity reduction
        else if (luminance > config.luminance.lightThreshold) {
            opacityAdjustment = -0.05; // Slight reduction
            tintAdjustment = 0;
        }

        return {
            opacity: Math.max(0, Math.min(1, opacityAdjustment)),
            tint: Math.max(0, Math.min(1, tintAdjustment))
        };
    }

    /**
     * Apply auto-tint to a Liquid Glass element
     * @param {HTMLElement} element - Element with glass material
     * @param {Object} baseConfig - Base opacity and tint configuration
     */
    function applyAutoTint(element, baseConfig = {}) {
        if (!element) return;

        const luminance = analyzeBackgroundLuminance(element);
        const adjustments = calculateTintAdjustments(luminance);

        // Get base values from Liquid Glass tokens or config
        const baseOpacity = baseConfig.opacity ||
            parseFloat(getComputedStyle(element).getPropertyValue('--lg-opacity-medium')) || 0.8;
        const baseTint = baseConfig.tint || 0;

        // Calculate final values
        const finalOpacity = Math.max(0.6, Math.min(0.95, baseOpacity + adjustments.opacity));
        const finalTint = baseTint + adjustments.tint;

        // Apply adjustments to element
        const background = `rgba(255, 255, 255, ${finalOpacity})`;
        const tintOverlay = finalTint > 0 ?
            `, linear-gradient(rgba(255, 255, 255, ${finalTint}), rgba(255, 255, 255, ${finalTint}))` : '';

        element.style.setProperty('background', background + tintOverlay);

        // Store original values for restoration
        element.dataset.originalOpacity = baseOpacity;
        element.dataset.adjustedOpacity = finalOpacity;
        element.dataset.luminance = luminance.toFixed(3);
    }

    /**
     * Apply auto-tint to all glass elements with specific selector
     * @param {string} selector - CSS selector for glass elements
     */
    function autoTintGlassElements(selector = '.liquid-glass, .header, .sidebar, .pattern-card, .pattern-detail') {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            // Only apply to elements with backdrop-filter (glass materials)
            const style = window.getComputedStyle(element);
            if (style.backdropFilter && style.backdropFilter !== 'none') {
                applyAutoTint(element);
            }
        });
    }

    // ============================================================
    // GLOBAL EXPOSURE AND AUTO-INITIALIZATION
    // ============================================================

    // Expose auto-tint functionality
    if (!window.LiquidGlass) window.LiquidGlass = {};
    window.LiquidGlass.autoTint = {
        applyAutoTint,
        autoTintGlassElements,
        calculateTintAdjustments,
        analyzeBackgroundLuminance,
        calculateLuminance
    };

    // Auto-apply tint adjustments when DOM is ready
    function initAutoTint() {
        // Apply to initial elements
        autoTintGlassElements();

        // Set up observer for dynamic content
        const observer = new MutationObserver((mutations) => {
            let shouldUpdate = false;
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    shouldUpdate = true;
                }
            });
            if (shouldUpdate) {
                // Debounced update
                clearTimeout(initAutoTint.timeoutId);
                initAutoTint.timeoutId = setTimeout(() => {
                    autoTintGlassElements();
                }, 100);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Re-apply on window resize (layout changes might affect backgrounds)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                autoTintGlassElements();
            }, 250);
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAutoTint);
    } else {
        initAutoTint();
    }

})();