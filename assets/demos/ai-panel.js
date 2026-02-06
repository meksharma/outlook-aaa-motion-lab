/**
 * ============================================================
 * AI PANEL DEMO
 *
 * Contains demos for:
 * - ai-panel: AI assistant panel reveal
 * ============================================================
 */

(function() {
    'use strict';

    // ============================================================
    // AI PANEL REVEAL DEMO
    // ============================================================

    let aiState = {
        isVisible: false
    };

    window.DemoRegistry.register('ai-panel', {
        render: function(reducedMotion) {
            return `
                <div class="demo-ai-container" id="ai-container">
                    <div style="padding: 16px;">
                        <div class="demo-nav-row" style="width: 60%;"></div>
                        <div class="demo-nav-row"></div>
                        <div class="demo-nav-row demo-nav-row--short"></div>
                    </div>
                    <div class="demo-ai-panel" id="ai-panel">
                        <div class="demo-ai-header">
                            <div class="demo-ai-icon"></div>
                            <span style="font-weight: 500; font-size: 14px;">Copilot</span>
                            <span style="margin-left: auto; color: #999; font-size: 12px;">✕</span>
                        </div>
                        <div style="padding: 12px 16px;">
                            <div style="font-size: 13px; color: #666; margin-bottom: 8px;">
                                Here's a suggested reply:
                            </div>
                            <div class="demo-nav-row"></div>
                            <div class="demo-nav-row demo-nav-row--short"></div>
                        </div>
                    </div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            aiState.isVisible = false;
            this.updateTransitions(params, reducedMotion);
        },

        play: function(params, reducedMotion) {
            const panel = document.getElementById('ai-panel');
            if (!panel) return;

            this.updateTransitions(params, reducedMotion);

            if (!aiState.isVisible) {
                panel.classList.add('active');
                aiState.isVisible = true;
            } else {
                panel.classList.remove('active');
                aiState.isVisible = false;
            }
        },

        reset: function(reducedMotion) {
            const panel = document.getElementById('ai-panel');
            if (!panel) return;

            panel.style.transition = 'none';
            panel.classList.remove('active');
            aiState.isVisible = false;

            requestAnimationFrame(() => {
                panel.style.transition = '';
            });
        },

        updateTransitions: function(params, reducedMotion) {
            const panel = document.getElementById('ai-panel');
            if (!panel) return;

            // Use Liquid Glass tokens - calm spring for surfaces only
            const duration = params.duration || window.LiquidGlass?.tokens.motion.duration.smooth || 300;

            // No overshoot - use gentle spring for Liquid Glass calm feel
            const easing = window.LiquidGlass?.tokens.motion.easing.gentleSpring || 'cubic-bezier(0.175, 0.885, 0.32, 1)';

            panel.style.transition = reducedMotion
                ? `opacity ${duration}ms ease-out`
                : `transform ${duration}ms ${easing}`;
        }
    });

})();
