/**
 * ============================================================
 * MODALS DEMOS
 *
 * Contains demos for:
 * - bottom-sheet: Bottom sheet presentation
 * - card-expand: Card to full screen expansion
 * ============================================================
 */

(function() {
    'use strict';

    // ============================================================
    // BOTTOM SHEET DEMO
    // ============================================================

    let sheetState = {
        isOpen: false,
        isAnimating: false
    };

    window.DemoRegistry.register('bottom-sheet', {
        render: function(reducedMotion) {
            return `
                <div class="demo-sheet-container" id="sheet-container">
                    <div class="demo-nav-content" style="padding: 16px;">
                        <div class="demo-nav-row" style="width: 80%;"></div>
                        <div class="demo-nav-row"></div>
                        <div class="demo-nav-row demo-nav-row--short"></div>
                    </div>
                    <div class="demo-sheet-backdrop" id="sheet-backdrop"></div>
                    <div class="demo-sheet" id="sheet-panel">
                        <div class="demo-sheet-handle"></div>
                        <div class="demo-sheet-content">
                            <div class="demo-nav-row" style="width: 40%; margin-bottom: 12px;"></div>
                            <div class="demo-nav-row"></div>
                            <div class="demo-nav-row demo-nav-row--short"></div>
                        </div>
                    </div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            sheetState.isOpen = false;
            sheetState.isAnimating = false;
            this.updateTransitions(params, reducedMotion);
        },

        play: function(params, reducedMotion) {
            if (sheetState.isAnimating) return;

            const backdrop = document.getElementById('sheet-backdrop');
            const panel = document.getElementById('sheet-panel');
            if (!backdrop || !panel) return;

            sheetState.isAnimating = true;
            this.updateTransitions(params, reducedMotion);

            if (!sheetState.isOpen) {
                backdrop.classList.add('active');
                panel.classList.add('active');
                sheetState.isOpen = true;
            } else {
                backdrop.classList.remove('active');
                panel.classList.remove('active');
                sheetState.isOpen = false;
            }

            const duration = (params.duration || 0.35) * 1000;
            setTimeout(() => {
                sheetState.isAnimating = false;
            }, duration);
        },

        reset: function(reducedMotion) {
            const backdrop = document.getElementById('sheet-backdrop');
            const panel = document.getElementById('sheet-panel');
            if (!backdrop || !panel) return;

            backdrop.style.transition = 'none';
            panel.style.transition = 'none';

            backdrop.classList.remove('active');
            panel.classList.remove('active');

            sheetState.isOpen = false;
            sheetState.isAnimating = false;

            requestAnimationFrame(() => {
                backdrop.style.transition = '';
                panel.style.transition = '';
            });
        },

        updateTransitions: function(params, reducedMotion) {
            const backdrop = document.getElementById('sheet-backdrop');
            const panel = document.getElementById('sheet-panel');
            if (!backdrop || !panel) return;

            const duration = params.duration || 0.35;
            const damping = params.springDamping || 0.8;
            const opacity = params.backdropOpacity || 0.3;

            const bezier = reducedMotion
                ? 'ease-out'
                : `cubic-bezier(0.2, ${1 - damping}, 0.2, 1)`;

            backdrop.style.transition = `background-color ${duration}s ease-out`;
            panel.style.transition = reducedMotion
                ? `opacity ${duration}s ease-out`
                : `transform ${duration}s ${bezier}`;

            // Update backdrop opacity
            const style = document.getElementById('sheet-style') || document.createElement('style');
            style.id = 'sheet-style';
            style.textContent = `.demo-sheet-backdrop.active { background: rgba(0, 0, 0, ${opacity}); }`;
            if (!document.getElementById('sheet-style')) {
                document.head.appendChild(style);
            }
        }
    });

    // ============================================================
    // CARD EXPAND DEMO
    // ============================================================

    let expandState = {
        isExpanded: false,
        isAnimating: false
    };

    window.DemoRegistry.register('card-expand', {
        render: function(reducedMotion) {
            return `
                <div class="demo-expand-container" id="expand-container">
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <div class="demo-nav-row" style="width: 60px; height: 60px; border-radius: 8px;"></div>
                        <div class="demo-nav-row" style="width: 60px; height: 60px; border-radius: 8px;"></div>
                    </div>
                    <div class="demo-expand-card" id="expand-card">
                        <div style="padding: 8px;">
                            <div class="demo-nav-row" style="width: 50%; height: 8px; margin-bottom: 6px;"></div>
                            <div class="demo-nav-row" style="height: 6px;"></div>
                        </div>
                    </div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            expandState.isExpanded = false;
            expandState.isAnimating = false;
            this.updateTransitions(params, reducedMotion);
        },

        play: function(params, reducedMotion) {
            if (expandState.isAnimating) return;

            const card = document.getElementById('expand-card');
            if (!card) return;

            expandState.isAnimating = true;
            this.updateTransitions(params, reducedMotion);

            if (!expandState.isExpanded) {
                card.classList.add('expanded');
                expandState.isExpanded = true;
            } else {
                card.classList.remove('expanded');
                expandState.isExpanded = false;
            }

            const duration = (params.duration || 0.45) * 1000;
            setTimeout(() => {
                expandState.isAnimating = false;
            }, duration);
        },

        reset: function(reducedMotion) {
            const card = document.getElementById('expand-card');
            if (!card) return;

            card.style.transition = 'none';
            card.classList.remove('expanded');

            expandState.isExpanded = false;
            expandState.isAnimating = false;

            requestAnimationFrame(() => {
                card.style.transition = '';
            });
        },

        updateTransitions: function(params, reducedMotion) {
            const card = document.getElementById('expand-card');
            if (!card) return;

            const duration = params.duration || 0.45;
            const damping = params.springDamping || 0.85;
            const cornerRadius = params.cornerRadiusStart || 12;

            const bezier = reducedMotion
                ? 'ease-out'
                : `cubic-bezier(0.2, ${1 - damping}, 0.2, 1)`;

            card.style.borderRadius = `${cornerRadius}px`;
            card.style.transition = reducedMotion
                ? `opacity ${duration}s ease-out`
                : `all ${duration}s ${bezier}`;
        }
    });

})();
