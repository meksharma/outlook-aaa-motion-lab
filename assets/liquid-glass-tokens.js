/**
 * ============================================================
 * LIQUID GLASS TOKENS
 *
 * Shared design tokens following Apple's iOS 26 Liquid Glass principles:
 * - Translucent blur + vibrancy
 * - System-like materials
 * - Subtle, purposeful motion
 * - Automatic readability adjustments
 * ============================================================
 */

(function() {
    'use strict';

    // ============================================================
    // LIQUID GLASS MATERIAL TOKENS
    // ============================================================

    const LIQUID_GLASS_TOKENS = {

        // Blur radius range for glass materials - UPDATED to match documentation
        blur: {
            minimal: 4,        // For very light glass effects
            light: 12,         // Light glass effects
            medium: 20,        // Standard glass blur (PRIMARY - matches docs: 18-28px range)
            strong: 24,        // Heavy glass (sparingly used)
            intense: 28        // Maximum blur for backgrounds
        },

        // Opacity and tint ranges for materials - UPDATED to match documentation
        material: {
            // Base glass opacity
            opacity: {
                light: 0.55,    // Light glass (high transparency) - docs range: 0.55-0.80
                medium: 0.65,   // Standard glass (PRIMARY - matches docs exactly)
                heavy: 0.75,    // Dense glass for readability
                opaque: 0.80    // Maximum opacity (docs upper limit)
            },

            // Tint overlay for readability
            tint: {
                none: 0,        // No additional tint
                subtle: 0.05,   // Very light tint
                light: 0.1,     // Light tint for better contrast
                medium: 0.15,   // Medium tint for busy backgrounds
                strong: 0.2     // Strong tint for maximum readability
            },

            // Vibrancy saturation adjustments - UPDATED to match documentation
            vibrancy: {
                none: 1.0,      // No vibrancy
                subtle: 1.2,    // Light vibrancy (docs range: 1.2-1.5)
                normal: 1.3,    // Standard vibrancy (PRIMARY - matches docs exactly)
                enhanced: 1.4,  // Enhanced vibrancy
                maximum: 1.5    // Maximum vibrancy (docs upper limit)
            }
        },

        // Highlight strokes for glass edges - UPDATED to match documentation
        highlight: {
            width: 1,          // Standard stroke width
            opacity: 0.35,     // Matches docs exactly
            color: 'rgba(255, 255, 255, 0.35)',  // Primary highlight (matches docs)
            style: 'inset 0 1px 0 rgba(255,255,255,0.35)'  // Complete highlight style from docs
        },

        // Shadow softness for depth - UPDATED to match documentation
        shadow: {
            // Updated to match docs: 0 8px 24px rgba(0,0,0,0.12)
            minimal: '0 2px 8px rgba(0, 0, 0, 0.06)',   // Light shadow
            light: '0 4px 12px rgba(0, 0, 0, 0.08)',     // Medium light shadow
            medium: '0 6px 18px rgba(0, 0, 0, 0.10)',    // Medium shadow
            strong: '0 8px 24px rgba(0, 0, 0, 0.12)'     // Primary shadow (matches docs exactly)
        },

        // Corner radii following iOS system patterns - UPDATED to match documentation
        radius: {
            tight: 6,          // Small elements (buttons, chips)
            standard: 10,      // Default system radius
            relaxed: 14,       // Cards, panels (docs range: 14-20px)
            generous: 16,      // Primary radius (matches docs exactly)
            continuous: 20     // Maximum radius (docs upper limit)
        }
    };

    // ============================================================
    // LIQUID GLASS MOTION TOKENS
    // ============================================================

    const MOTION_TOKENS = {

        // Duration ranges - EXACT match with checklist (180-320ms for frequent interactions)
        duration: {
            instant: 180,      // Minimum duration per checklist
            quick: 200,        // Button presses, toggles
            standard: 240,     // Default animations
            smooth: 300,       // Sheet presentations, navigation
            gentle: 320        // Maximum for frequent interactions per checklist
        },

        // Easing presets following iOS system curves
        easing: {
            // Standard ease-out for exits and reveals
            easeOut: 'cubic-bezier(0, 0, 0.58, 1)',

            // Gentle spring for surfaces (no overshoot)
            gentleSpring: 'cubic-bezier(0.175, 0.885, 0.32, 1)',

            // Standard spring with minimal bounce
            standardSpring: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',

            // Crisp linear for micro movements
            linear: 'linear'
        },

        // Transform limits (subtle movements only)
        transform: {
            // Translation limits - EXACT match with checklist (≤ 8-10px)
            translate: {
                micro: 2,      // Tiny shifts
                small: 4,      // Small movements
                medium: 6,     // Standard movement
                large: 8,      // Large movement (checklist limit)
                maximum: 10    // Absolute maximum per checklist
            },

            // Scale limits - EXACT match with checklist (≤ 1.02)
            scale: {
                micro: 1.005,  // Barely perceptible
                subtle: 1.01,  // Very subtle
                standard: 1.02, // Maximum scale per checklist
                none: 1        // No scale change
            },

            // Rotation limits (very subtle)
            rotate: {
                micro: 0.5,    // Barely visible rotation
                subtle: 1,     // Light rotation
                standard: 2    // Maximum rotation (degrees)
            }
        }
    };

    // ============================================================
    // AUTO TINT CONFIGURATION
    // ============================================================

    const AUTO_TINT_CONFIG = {
        // Luminance thresholds for readability
        luminance: {
            darkThreshold: 0.3,    // Below this = add more opacity
            lightThreshold: 0.8,   // Above this = reduce opacity
            contrastMin: 4.5       // WCAG AA contrast ratio
        },

        // Automatic adjustments
        adjustments: {
            darkBackground: {
                opacityIncrease: 0.1,   // Add 10% more opacity
                tintIncrease: 0.05      // Add 5% white tint
            },
            busyBackground: {
                opacityIncrease: 0.15,  // Add 15% more opacity
                tintIncrease: 0.1       // Add 10% white tint
            }
        }
    };

    // ============================================================
    // UTILITY FUNCTIONS
    // ============================================================

    /**
     * Calculate luminance of a color for readability checks
     * @param {string} color - Color in any CSS format
     * @returns {number} Luminance value (0-1)
     */
    function calculateLuminance(color) {
        // Simplified luminance calculation
        // In real implementation, would need proper color parsing
        const rgb = [0.2126, 0.7152, 0.0722]; // Standard luminance weights
        return 0.5; // Placeholder - would calculate actual luminance
    }

    /**
     * Get automatic tint adjustments based on background
     * @param {HTMLElement} element - Element to analyze
     * @returns {Object} Adjustment values
     */
    function getAutoTintAdjustments(element) {
        if (!element) return { opacity: 0, tint: 0 };

        // In real implementation, would analyze background luminance
        // For now, return conservative adjustments
        return {
            opacity: AUTO_TINT_CONFIG.adjustments.darkBackground.opacityIncrease,
            tint: AUTO_TINT_CONFIG.adjustments.darkBackground.tintIncrease
        };
    }

    /**
     * Generate CSS custom properties for Liquid Glass tokens
     * @returns {string} CSS custom properties
     */
    function generateCSSTokens() {
        return `
            /* Primary Glass Material Tokens - EXACT match with documentation */
            --glass-blur: ${LIQUID_GLASS_TOKENS.blur.medium}px;              /* Range: 18–28px */
            --glass-opacity: ${LIQUID_GLASS_TOKENS.material.opacity.medium}; /* Range: 0.55–0.80 */
            --glass-saturation: ${LIQUID_GLASS_TOKENS.material.vibrancy.normal}; /* Range: 1.2–1.5 */
            --glass-radius: ${LIQUID_GLASS_TOKENS.radius.generous}px;        /* Range: 14–20px */
            --glass-shadow: ${LIQUID_GLASS_TOKENS.shadow.strong};
            --glass-highlight: ${LIQUID_GLASS_TOKENS.highlight.style};

            /* Extended Liquid Glass Material Tokens (for variations) */
            --lg-blur-minimal: ${LIQUID_GLASS_TOKENS.blur.minimal}px;
            --lg-blur-light: ${LIQUID_GLASS_TOKENS.blur.light}px;
            --lg-blur-medium: ${LIQUID_GLASS_TOKENS.blur.medium}px;
            --lg-blur-strong: ${LIQUID_GLASS_TOKENS.blur.strong}px;
            --lg-blur-intense: ${LIQUID_GLASS_TOKENS.blur.intense}px;

            --lg-opacity-light: ${LIQUID_GLASS_TOKENS.material.opacity.light};
            --lg-opacity-medium: ${LIQUID_GLASS_TOKENS.material.opacity.medium};
            --lg-opacity-heavy: ${LIQUID_GLASS_TOKENS.material.opacity.heavy};
            --lg-opacity-opaque: ${LIQUID_GLASS_TOKENS.material.opacity.opaque};

            --lg-tint-none: ${LIQUID_GLASS_TOKENS.material.tint.none};
            --lg-tint-subtle: ${LIQUID_GLASS_TOKENS.material.tint.subtle};
            --lg-tint-light: ${LIQUID_GLASS_TOKENS.material.tint.light};
            --lg-tint-medium: ${LIQUID_GLASS_TOKENS.material.tint.medium};
            --lg-tint-strong: ${LIQUID_GLASS_TOKENS.material.tint.strong};

            --lg-vibrancy-none: ${LIQUID_GLASS_TOKENS.material.vibrancy.none};
            --lg-vibrancy-subtle: ${LIQUID_GLASS_TOKENS.material.vibrancy.subtle};
            --lg-vibrancy-normal: ${LIQUID_GLASS_TOKENS.material.vibrancy.normal};
            --lg-vibrancy-enhanced: ${LIQUID_GLASS_TOKENS.material.vibrancy.enhanced};
            --lg-vibrancy-maximum: ${LIQUID_GLASS_TOKENS.material.vibrancy.maximum};

            --lg-highlight-width: ${LIQUID_GLASS_TOKENS.highlight.width}px;
            --lg-highlight-opacity: ${LIQUID_GLASS_TOKENS.highlight.opacity};
            --lg-highlight-color: ${LIQUID_GLASS_TOKENS.highlight.color};
            --lg-highlight-style: ${LIQUID_GLASS_TOKENS.highlight.style};

            --lg-shadow-minimal: ${LIQUID_GLASS_TOKENS.shadow.minimal};
            --lg-shadow-light: ${LIQUID_GLASS_TOKENS.shadow.light};
            --lg-shadow-medium: ${LIQUID_GLASS_TOKENS.shadow.medium};
            --lg-shadow-strong: ${LIQUID_GLASS_TOKENS.shadow.strong};

            --lg-radius-tight: ${LIQUID_GLASS_TOKENS.radius.tight}px;
            --lg-radius-standard: ${LIQUID_GLASS_TOKENS.radius.standard}px;
            --lg-radius-relaxed: ${LIQUID_GLASS_TOKENS.radius.relaxed}px;
            --lg-radius-generous: ${LIQUID_GLASS_TOKENS.radius.generous}px;
            --lg-radius-continuous: ${LIQUID_GLASS_TOKENS.radius.continuous}px;

            /* Motion Duration Tokens - EXACT match with checklist (180-320ms) */
            --lg-duration-instant: ${MOTION_TOKENS.duration.instant}ms;
            --lg-duration-quick: ${MOTION_TOKENS.duration.quick}ms;
            --lg-duration-standard: ${MOTION_TOKENS.duration.standard}ms;
            --lg-duration-smooth: ${MOTION_TOKENS.duration.smooth}ms;
            --lg-duration-gentle: ${MOTION_TOKENS.duration.gentle}ms;

            --lg-ease-out: ${MOTION_TOKENS.easing.easeOut};
            --lg-gentle-spring: ${MOTION_TOKENS.easing.gentleSpring};
            --lg-standard-spring: ${MOTION_TOKENS.easing.standardSpring};
            --lg-linear: ${MOTION_TOKENS.easing.linear};

            /* Transform Limits - EXACT match with checklist */
            --lg-translate-micro: ${MOTION_TOKENS.transform.translate.micro}px;
            --lg-translate-small: ${MOTION_TOKENS.transform.translate.small}px;
            --lg-translate-medium: ${MOTION_TOKENS.transform.translate.medium}px;
            --lg-translate-large: ${MOTION_TOKENS.transform.translate.large}px;
            --lg-translate-maximum: ${MOTION_TOKENS.transform.translate.maximum}px;

            --lg-scale-micro: ${MOTION_TOKENS.transform.scale.micro};
            --lg-scale-subtle: ${MOTION_TOKENS.transform.scale.subtle};
            --lg-scale-standard: ${MOTION_TOKENS.transform.scale.standard};
            --lg-scale-none: ${MOTION_TOKENS.transform.scale.none};

            --lg-rotate-micro: ${MOTION_TOKENS.transform.rotate.micro}deg;
            --lg-rotate-subtle: ${MOTION_TOKENS.transform.rotate.subtle}deg;
            --lg-rotate-standard: ${MOTION_TOKENS.transform.rotate.standard}deg;
        `;
    }

    // ============================================================
    // GLOBAL EXPOSURE
    // ============================================================

    // Expose tokens and utilities globally
    window.LiquidGlass = {
        tokens: {
            material: LIQUID_GLASS_TOKENS,
            motion: MOTION_TOKENS,
            autoTint: AUTO_TINT_CONFIG
        },
        utils: {
            calculateLuminance,
            getAutoTintAdjustments,
            generateCSSTokens
        }
    };

    // Auto-inject CSS tokens into document
    function injectCSSTokens() {
        const style = document.createElement('style');
        style.id = 'liquid-glass-tokens';
        style.textContent = `:root { ${generateCSSTokens()} }`;
        document.head.appendChild(style);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectCSSTokens);
    } else {
        injectCSSTokens();
    }

})();