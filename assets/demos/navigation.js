/**
 * ============================================================
 * NAVIGATION DEMOS
 *
 * Contains demos for:
 * - navigation-push: Context-preserving push transition
 * - navigation-pop: Navigation pop/back transition
 * ============================================================
 */

(function() {
    'use strict';

    console.log('📱 Loading navigation demos...');

    // Check if DemoRegistry is available
    if (typeof window.DemoRegistry === 'undefined') {
        console.error('❌ DemoRegistry not available when loading navigation demos');
        return;
    }

    // ============================================================
    // NAVIGATION PUSH DEMO
    // ============================================================

    let pushState = {
        isPushed: false,
        isAnimating: false
    };

    try {
        window.DemoRegistry.register('navigation-push', {
        render: function(reducedMotion) {
            return `
                <div class="demo-nav-container" id="nav-push-container">
                    <div class="demo-nav-screen" id="nav-push-screen1" style="z-index: 1;">
                        <div class="demo-nav-header">
                            <span style="color: #007AFF;">←</span>
                            <span style="margin-left: 8px;">Inbox</span>
                        </div>
                        <div class="demo-nav-content">
                            <div class="demo-nav-row" style="background: #007AFF20; cursor: pointer;" id="nav-push-trigger"></div>
                            <div class="demo-nav-row"></div>
                            <div class="demo-nav-row demo-nav-row--short"></div>
                        </div>
                    </div>
                    <div class="demo-nav-screen" id="nav-push-screen2" style="z-index: 2; transform: translateX(100%);">
                        <div class="demo-nav-header">
                            <span style="color: #007AFF;">← Inbox</span>
                            <span style="margin-left: 8px;">Message</span>
                        </div>
                        <div class="demo-nav-content">
                            <div class="demo-nav-row" style="width: 40%;"></div>
                            <div class="demo-nav-row"></div>
                            <div class="demo-nav-row"></div>
                            <div class="demo-nav-row demo-nav-row--short"></div>
                        </div>
                    </div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            pushState.isPushed = false;
            pushState.isAnimating = false;
            this.updateTransitions(params, reducedMotion);
        },

        play: function(params, reducedMotion) {
            if (pushState.isAnimating) return;

            const screen1 = document.getElementById('nav-push-screen1');
            const screen2 = document.getElementById('nav-push-screen2');
            if (!screen1 || !screen2) return;

            pushState.isAnimating = true;
            this.updateTransitions(params, reducedMotion);

            if (!pushState.isPushed) {
                // Push forward
                if (reducedMotion) {
                    screen1.style.opacity = '0';
                    screen2.style.opacity = '1';
                    screen2.style.transform = 'translateX(0)';
                } else {
                    screen1.style.transform = `translateX(-${Math.min(params.parallaxOffset || 20, 30)}%)`;
                    screen1.style.opacity = '0.8';
                    screen2.style.transform = 'translateX(0)';
                }
                pushState.isPushed = true;
            } else {
                // Pop back
                if (reducedMotion) {
                    screen1.style.opacity = '1';
                    screen2.style.opacity = '0';
                    screen2.style.transform = 'translateX(100%)';
                } else {
                    screen1.style.transform = 'translateX(0)';
                    screen1.style.opacity = '1';
                    screen2.style.transform = 'translateX(100%)';
                }
                pushState.isPushed = false;
            }

            const timeoutDuration = Math.min((params.duration || 0.25) * 1000, 320); // Cap at 320ms
            setTimeout(() => {
                pushState.isAnimating = false;
            }, timeoutDuration);
        },

        reset: function(reducedMotion) {
            const screen1 = document.getElementById('nav-push-screen1');
            const screen2 = document.getElementById('nav-push-screen2');
            if (!screen1 || !screen2) return;

            screen1.style.transition = 'none';
            screen2.style.transition = 'none';

            screen1.style.transform = 'translateX(0)';
            screen1.style.opacity = '1';
            screen2.style.transform = 'translateX(100%)';

            pushState.isPushed = false;
            pushState.isAnimating = false;

            // Re-enable transitions after reset
            requestAnimationFrame(() => {
                screen1.style.transition = '';
                screen2.style.transition = '';
            });
        },

        updateTransitions: function(params, reducedMotion) {
            const screen1 = document.getElementById('nav-push-screen1');
            const screen2 = document.getElementById('nav-push-screen2');
            if (!screen1 || !screen2) return;

            // Use Liquid Glass motion tokens - within 240-300ms range
            const duration = Math.min(params.duration || 0.25, 0.32); // Cap at 320ms max
            const easing = window.LiquidGlass?.tokens.motion.easing.standardSpring || 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

            if (reducedMotion) {
                screen1.style.transition = `opacity ${duration}s ease-out`;
                screen2.style.transition = `opacity ${duration}s ease-out`;
            } else {
                screen1.style.transition = `transform ${duration}s ${easing}, opacity ${duration}s ${easing}`;
                screen2.style.transition = `transform ${duration}s ${easing}`;
            }
        }
    });
    console.log('✅ navigation-push demo registered');
    } catch (error) {
        console.error('❌ Error registering navigation-push demo:', error);
    }

    // ============================================================
    // NAVIGATION POP DEMO
    // ============================================================

    let popState = {
        isPopped: true,
        isAnimating: false
    };

    try {
        window.DemoRegistry.register('navigation-pop', {
        render: function(reducedMotion) {
            return `
                <div class="demo-nav-container" id="nav-pop-container">
                    <div class="demo-nav-screen" id="nav-pop-screen1" style="z-index: 1; transform: translateX(-30%); opacity: 0.8;">
                        <div class="demo-nav-header">
                            <span style="color: #007AFF;">←</span>
                            <span style="margin-left: 8px;">Inbox</span>
                        </div>
                        <div class="demo-nav-content">
                            <div class="demo-nav-row"></div>
                            <div class="demo-nav-row"></div>
                            <div class="demo-nav-row demo-nav-row--short"></div>
                        </div>
                    </div>
                    <div class="demo-nav-screen" id="nav-pop-screen2" style="z-index: 2; transform: translateX(0);">
                        <div class="demo-nav-header">
                            <span style="color: #007AFF; cursor: pointer;" id="nav-pop-back">← Inbox</span>
                        </div>
                        <div class="demo-nav-content">
                            <div class="demo-nav-row" style="width: 40%;"></div>
                            <div class="demo-nav-row"></div>
                            <div class="demo-nav-row demo-nav-row--short"></div>
                        </div>
                    </div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            popState.isPopped = false;
            popState.isAnimating = false;
            this.updateTransitions(params, reducedMotion);
        },

        play: function(params, reducedMotion) {
            if (popState.isAnimating) return;

            const screen1 = document.getElementById('nav-pop-screen1');
            const screen2 = document.getElementById('nav-pop-screen2');
            if (!screen1 || !screen2) return;

            popState.isAnimating = true;
            this.updateTransitions(params, reducedMotion);

            if (!popState.isPopped) {
                // Pop back
                if (reducedMotion) {
                    screen1.style.opacity = '1';
                    screen2.style.opacity = '0';
                } else {
                    screen1.style.transform = 'translateX(0)';
                    screen1.style.opacity = '1';
                    screen2.style.transform = 'translateX(100%)';
                }
                popState.isPopped = true;
            } else {
                // Push forward again
                if (reducedMotion) {
                    screen1.style.opacity = '0.8';
                    screen2.style.opacity = '1';
                } else {
                    screen1.style.transform = `translateX(-${Math.min(30, 30)}%)`;  // Capped at 30%
                    screen1.style.opacity = '0.8';
                    screen2.style.transform = 'translateX(0)';
                }
                popState.isPopped = false;
            }

            const timeoutDuration = Math.min((params.duration || 0.25) * 1000, 320); // Cap at 320ms
            setTimeout(() => {
                popState.isAnimating = false;
            }, timeoutDuration);
        },

        reset: function(reducedMotion) {
            const screen1 = document.getElementById('nav-pop-screen1');
            const screen2 = document.getElementById('nav-pop-screen2');
            if (!screen1 || !screen2) return;

            screen1.style.transition = 'none';
            screen2.style.transition = 'none';

            screen1.style.transform = 'translateX(-30%)';
            screen1.style.opacity = '0.8';
            screen2.style.transform = 'translateX(0)';
            screen2.style.opacity = '1';

            popState.isPopped = false;
            popState.isAnimating = false;

            requestAnimationFrame(() => {
                screen1.style.transition = '';
                screen2.style.transition = '';
            });
        },

        updateTransitions: function(params, reducedMotion) {
            const screen1 = document.getElementById('nav-pop-screen1');
            const screen2 = document.getElementById('nav-pop-screen2');
            if (!screen1 || !screen2) return;

            // Use Liquid Glass motion tokens - within 240-300ms range
            const duration = Math.min(params.duration || 0.25, 0.32); // Cap at 320ms max
            const easing = window.LiquidGlass?.tokens.motion.easing.standardSpring || 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

            if (reducedMotion) {
                screen1.style.transition = `opacity ${duration}s ease-out`;
                screen2.style.transition = `opacity ${duration}s ease-out`;
            } else {
                screen1.style.transition = `transform ${duration}s ${easing}, opacity ${duration}s ${easing}`;
                screen2.style.transition = `transform ${duration}s ${easing}`;
            }
        }
    });
    console.log('✅ navigation-pop demo registered');
    } catch (error) {
        console.error('❌ Error registering navigation-pop demo:', error);
    }

    console.log('📱 Navigation demos loading complete');

})();
