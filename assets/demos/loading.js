/**
 * ============================================================
 * LOADING & FEEDBACK DEMOS
 *
 * Contains demos for:
 * - toast-reveal: Toast/snackbar notification
 * - skeleton-shimmer: Loading skeleton with shimmer
 * - content-crossfade: Crossfade between states
 * ============================================================
 */

(function() {
    'use strict';

    // ============================================================
    // TOAST REVEAL DEMO
    // ============================================================

    let toastState = {
        isVisible: false,
        timeout: null
    };

    window.DemoRegistry.register('toast-reveal', {
        render: function(reducedMotion) {
            return `
                <div class="demo-toast-container" id="toast-container">
                    <div style="padding: 16px;">
                        <div class="demo-nav-row" style="width: 60%;"></div>
                        <div class="demo-nav-row"></div>
                    </div>
                    <div class="demo-toast" id="toast-message">
                        ✓ Message archived successfully
                    </div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            toastState.isVisible = false;
            if (toastState.timeout) {
                clearTimeout(toastState.timeout);
                toastState.timeout = null;
            }
            this.updateTransitions(params, reducedMotion);
        },

        play: function(params, reducedMotion) {
            const toast = document.getElementById('toast-message');
            if (!toast) return;

            // Clear any existing timeout
            if (toastState.timeout) {
                clearTimeout(toastState.timeout);
            }

            this.updateTransitions(params, reducedMotion);

            // Show toast
            toast.classList.add('active');
            toastState.isVisible = true;

            // Auto-dismiss
            const displayTime = (params.displayTime || 3) * 1000;
            toastState.timeout = setTimeout(() => {
                toast.classList.remove('active');
                toastState.isVisible = false;
            }, displayTime);
        },

        reset: function(reducedMotion) {
            const toast = document.getElementById('toast-message');
            if (!toast) return;

            if (toastState.timeout) {
                clearTimeout(toastState.timeout);
                toastState.timeout = null;
            }

            toast.style.transition = 'none';
            toast.classList.remove('active');
            toastState.isVisible = false;

            requestAnimationFrame(() => {
                toast.style.transition = '';
            });
        },

        updateTransitions: function(params, reducedMotion) {
            const toast = document.getElementById('toast-message');
            if (!toast) return;

            const duration = params.duration || 0.3;
            const damping = params.springDamping || 0.8;

            const bezier = reducedMotion
                ? 'ease-out'
                : `cubic-bezier(0.2, ${1 - damping}, 0.2, 1)`;

            toast.style.transition = reducedMotion
                ? `opacity ${duration}s ease-out`
                : `all ${duration}s ${bezier}`;
        }
    });

    // ============================================================
    // SKELETON SHIMMER DEMO
    // ============================================================

    let shimmerState = {
        animationId: null
    };

    window.DemoRegistry.register('skeleton-shimmer', {
        render: function(reducedMotion) {
            const shimmerClass = reducedMotion ? '' : 'style="animation: shimmer 1.5s infinite;"';

            return `
                <div class="demo-skeleton-container" id="skeleton-container">
                    <div class="demo-skeleton-row demo-skeleton-row--avatar" ${shimmerClass}></div>
                    <div class="demo-skeleton-row" ${shimmerClass}></div>
                    <div class="demo-skeleton-row" ${shimmerClass}></div>
                    <div class="demo-skeleton-row demo-skeleton-row--short" ${shimmerClass}></div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            this.updateStyles(params, reducedMotion);
        },

        play: function(params, reducedMotion) {
            // Shimmer is continuous, play just restarts it
            this.updateStyles(params, reducedMotion);

            const rows = document.querySelectorAll('.demo-skeleton-row');
            rows.forEach(row => {
                row.style.animation = 'none';
                row.offsetHeight; // Trigger reflow
                row.style.animation = reducedMotion ? 'none' : `shimmer ${params.shimmerDuration || 1.5}s infinite`;
            });
        },

        reset: function(reducedMotion) {
            const rows = document.querySelectorAll('.demo-skeleton-row');
            rows.forEach(row => {
                row.style.animation = reducedMotion ? 'none' : 'shimmer 1.5s infinite';
            });
        },

        updateStyles: function(params, reducedMotion) {
            const rows = document.querySelectorAll('.demo-skeleton-row');
            const duration = params.shimmerDuration || 1.5;
            const baseColor = params.baseColor || 0.94;
            const highlightColor = params.highlightColor || 0.98;

            // Convert brightness values to hex
            const base = Math.round(baseColor * 255);
            const highlight = Math.round(highlightColor * 255);
            const baseHex = `rgb(${base}, ${base}, ${base})`;
            const highlightHex = `rgb(${highlight}, ${highlight}, ${highlight})`;

            rows.forEach(row => {
                if (reducedMotion) {
                    row.style.background = baseHex;
                    row.style.animation = 'none';
                } else {
                    row.style.background = `linear-gradient(90deg, ${baseHex} 25%, ${highlightHex} 50%, ${baseHex} 75%)`;
                    row.style.backgroundSize = '200% 100%';
                    row.style.animation = `shimmer ${duration}s infinite`;
                }
            });
        }
    });

    // ============================================================
    // CONTENT CROSSFADE DEMO
    // ============================================================

    let crossfadeState = {
        isLoading: true
    };

    window.DemoRegistry.register('content-crossfade', {
        render: function(reducedMotion) {
            return `
                <div class="demo-crossfade-container" id="crossfade-container">
                    <div class="demo-crossfade-state" id="crossfade-loading">
                        <div class="demo-crossfade-loading">
                            <div style="text-align: center;">
                                <div style="font-size: 24px; margin-bottom: 8px;">⏳</div>
                                <div>Loading content...</div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-crossfade-state hidden" id="crossfade-content">
                        <div class="demo-crossfade-content">
                            <div style="font-size: 24px; margin-bottom: 8px;">📧</div>
                            <div style="font-weight: 600; margin-bottom: 4px;">3 new messages</div>
                            <div style="color: #666; font-size: 13px;">Your inbox is ready</div>
                        </div>
                    </div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            crossfadeState.isLoading = true;
            this.updateTransitions(params, reducedMotion);
        },

        play: function(params, reducedMotion) {
            const loading = document.getElementById('crossfade-loading');
            const content = document.getElementById('crossfade-content');
            if (!loading || !content) return;

            this.updateTransitions(params, reducedMotion);

            if (crossfadeState.isLoading) {
                // Transition to content
                loading.classList.add('hidden');
                content.classList.remove('hidden');
                crossfadeState.isLoading = false;
            } else {
                // Transition back to loading
                content.classList.add('hidden');
                loading.classList.remove('hidden');
                crossfadeState.isLoading = true;
            }
        },

        reset: function(reducedMotion) {
            const loading = document.getElementById('crossfade-loading');
            const content = document.getElementById('crossfade-content');
            if (!loading || !content) return;

            loading.style.transition = 'none';
            content.style.transition = 'none';

            loading.classList.remove('hidden');
            content.classList.add('hidden');
            crossfadeState.isLoading = true;

            requestAnimationFrame(() => {
                loading.style.transition = '';
                content.style.transition = '';
            });
        },

        updateTransitions: function(params, reducedMotion) {
            const loading = document.getElementById('crossfade-loading');
            const content = document.getElementById('crossfade-content');
            if (!loading || !content) return;

            const duration = params.duration || 0.3;
            const scale = params.scaleEffect || 0.98;

            const transition = reducedMotion
                ? `opacity ${duration}s ease-out`
                : `opacity ${duration}s ease-out, transform ${duration}s ease-out`;

            loading.style.transition = transition;
            content.style.transition = transition;

            // Update scale effect via CSS
            const style = document.getElementById('crossfade-style') || document.createElement('style');
            style.id = 'crossfade-style';
            style.textContent = `
                .demo-crossfade-state {
                    transform: scale(1);
                }
                .demo-crossfade-state.hidden {
                    opacity: 0;
                    ${reducedMotion ? '' : `transform: scale(${scale});`}
                    pointer-events: none;
                }
            `;
            if (!document.getElementById('crossfade-style')) {
                document.head.appendChild(style);
            }
        }
    });

})();
