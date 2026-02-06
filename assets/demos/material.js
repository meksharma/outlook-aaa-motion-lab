/**
 * ============================================================
 * MATERIAL & GLASS DEMOS
 *
 * Contains demos for:
 * - glass-header: Glass header collapse on scroll
 * ============================================================
 */

(function() {
    'use strict';

    // ============================================================
    // GLASS HEADER COLLAPSE DEMO
    // ============================================================

    let glassState = {
        isCollapsed: false
    };

    window.DemoRegistry.register('glass-header', {
        render: function(reducedMotion) {
            return `
                <div class="demo-glass-container" id="glass-container">
                    <div class="demo-glass-header" id="glass-header">
                        <span id="glass-title" style="font-size: 20px;">Inbox</span>
                    </div>
                    <div style="padding: 70px 12px 12px; display: flex; flex-direction: column; gap: 8px;">
                        <div class="demo-nav-row" style="background: rgba(255,255,255,0.7);"></div>
                        <div class="demo-nav-row" style="background: rgba(255,255,255,0.7);"></div>
                        <div class="demo-nav-row demo-nav-row--short" style="background: rgba(255,255,255,0.7);"></div>
                        <div class="demo-nav-row" style="background: rgba(255,255,255,0.7);"></div>
                        <div class="demo-nav-row" style="background: rgba(255,255,255,0.7);"></div>
                    </div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            glassState.isCollapsed = false;
            this.updateTransitions(params, reducedMotion);
        },

        play: function(params, reducedMotion) {
            const header = document.getElementById('glass-header');
            const title = document.getElementById('glass-title');
            if (!header || !title) return;

            this.updateTransitions(params, reducedMotion);

            if (!glassState.isCollapsed) {
                header.classList.add('collapsed');
                title.style.fontSize = '17px';
                glassState.isCollapsed = true;
            } else {
                header.classList.remove('collapsed');
                title.style.fontSize = '20px';
                glassState.isCollapsed = false;
            }
        },

        reset: function(reducedMotion) {
            const header = document.getElementById('glass-header');
            const title = document.getElementById('glass-title');
            if (!header || !title) return;

            header.style.transition = 'none';
            title.style.transition = 'none';

            header.classList.remove('collapsed');
            title.style.fontSize = '20px';
            glassState.isCollapsed = false;

            requestAnimationFrame(() => {
                header.style.transition = '';
                title.style.transition = '';
            });
        },

        updateTransitions: function(params, reducedMotion) {
            const header = document.getElementById('glass-header');
            const title = document.getElementById('glass-title');
            if (!header || !title) return;

            // Use Liquid Glass tokens for blur and opacity
            const blur = params.blurAmount || window.LiquidGlass?.tokens.material.blur.medium || 12;
            const opacity = params.materialOpacity || window.LiquidGlass?.tokens.material.opacity.heavy || 0.9;

            header.style.backdropFilter = `blur(${blur}px)`;
            header.style.webkitBackdropFilter = `blur(${blur}px)`;

            // Update glass styles using Liquid Glass motion tokens
            const style = document.getElementById('glass-style') || document.createElement('style');
            style.id = 'glass-style';

            const duration = window.LiquidGlass?.tokens.motion.duration.smooth || 300;
            const easing = window.LiquidGlass?.tokens.motion.easing.easeOut || 'cubic-bezier(0, 0, 0.58, 1)';

            style.textContent = `
                .demo-glass-header {
                    background: rgba(255, 255, 255, 0.7);
                    transition: ${reducedMotion ? `opacity ${duration}ms ${easing}` : `all ${duration}ms ${easing}`};
                }
                .demo-glass-header.collapsed {
                    height: 44px;
                    background: rgba(255, 255, 255, ${opacity});
                }
                #glass-title {
                    transition: font-size ${duration}ms ${easing};
                }
            `;
            if (!document.getElementById('glass-style')) {
                document.head.appendChild(style);
            }
        }
    });

})();
