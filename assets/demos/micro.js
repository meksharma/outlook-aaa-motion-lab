/**
 * ============================================================
 * MICRO-INTERACTION DEMOS
 *
 * Contains demos for:
 * - tab-switch: Tab switch indicator animation
 * - button-press: Button press micro-interaction
 * - context-menu: Context menu reveal
 * ============================================================
 */

(function() {
    'use strict';

    // ============================================================
    // TAB SWITCH DEMO
    // ============================================================

    let tabState = {
        activeIndex: 0
    };

    window.DemoRegistry.register('tab-switch', {
        render: function(reducedMotion) {
            return `
                <div class="demo-tabs-container" id="tabs-container">
                    <div class="demo-tabs-bar">
                        <div class="demo-tab active" data-index="0">Inbox</div>
                        <div class="demo-tab" data-index="1">Sent</div>
                        <div class="demo-tab" data-index="2">Drafts</div>
                        <div class="demo-tab-indicator" id="tab-indicator" style="left: 0; width: 33.33%;"></div>
                    </div>
                    <div style="padding: 16px; background: white; min-width: 200px;">
                        <div class="demo-nav-row" style="width: 80%;"></div>
                        <div class="demo-nav-row"></div>
                    </div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            tabState.activeIndex = 0;
            this.updateTransitions(params, reducedMotion);

            // Add click handlers to tabs
            const tabs = document.querySelectorAll('.demo-tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    this.selectTab(index, params, reducedMotion);
                });
            });
        },

        play: function(params, reducedMotion) {
            // Cycle through tabs
            const nextIndex = (tabState.activeIndex + 1) % 3;
            this.selectTab(nextIndex, params, reducedMotion);
        },

        selectTab: function(index, params, reducedMotion) {
            const tabs = document.querySelectorAll('.demo-tab');
            const indicator = document.getElementById('tab-indicator');
            if (!indicator) return;

            // Update active tab
            tabs.forEach((tab, i) => {
                tab.classList.toggle('active', i === index);
            });

            // Move indicator
            const tabWidth = 100 / 3;
            indicator.style.left = `${index * tabWidth}%`;
            indicator.style.width = `${tabWidth}%`;

            tabState.activeIndex = index;
        },

        reset: function(reducedMotion) {
            tabState.activeIndex = 0;
            const tabs = document.querySelectorAll('.demo-tab');
            const indicator = document.getElementById('tab-indicator');

            tabs.forEach((tab, i) => {
                tab.classList.toggle('active', i === 0);
            });

            if (indicator) {
                indicator.style.transition = 'none';
                indicator.style.left = '0';
                indicator.style.width = '33.33%';
                requestAnimationFrame(() => {
                    indicator.style.transition = '';
                });
            }
        },

        updateTransitions: function(params, reducedMotion) {
            const indicator = document.getElementById('tab-indicator');
            if (!indicator) return;

            const duration = params.duration || 0.25;
            const damping = params.springDamping || 0.8;
            const height = params.indicatorHeight || 3;

            const bezier = reducedMotion
                ? 'ease-out'
                : `cubic-bezier(0.2, ${1 - damping}, 0.2, 1)`;

            indicator.style.height = `${height}px`;
            indicator.style.transition = reducedMotion
                ? `left ${duration}s ease-out, width ${duration}s ease-out`
                : `left ${duration}s ${bezier}, width ${duration}s ${bezier}`;
        }
    });

    // ============================================================
    // BUTTON PRESS DEMO
    // ============================================================

    window.DemoRegistry.register('button-press', {
        render: function(reducedMotion) {
            return `
                <div class="demo-button-container">
                    <button class="demo-press-button" id="press-button-1">
                        Primary Button
                    </button>
                    <button class="demo-press-button" id="press-button-2" style="background: #34C759;">
                        Success
                    </button>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            this.updateStyles(params, reducedMotion);
        },

        play: function(params, reducedMotion) {
            const button = document.getElementById('press-button-1');
            if (!button) return;

            const scale = params.scaleAmount || 0.96;
            const duration = params.duration || 0.1;

            // Animate press
            button.style.transform = `scale(${scale})`;
            button.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.2)';

            setTimeout(() => {
                button.style.transform = 'scale(1)';
                button.style.boxShadow = 'none';
            }, duration * 1000);
        },

        reset: function(reducedMotion) {
            const buttons = document.querySelectorAll('.demo-press-button');
            buttons.forEach(button => {
                button.style.transform = 'scale(1)';
                button.style.boxShadow = 'none';
            });
        },

        updateStyles: function(params, reducedMotion) {
            const buttons = document.querySelectorAll('.demo-press-button');
            const duration = params.duration || 0.1;

            buttons.forEach(button => {
                button.style.transition = reducedMotion
                    ? 'none'
                    : `transform ${duration}s ease-out, box-shadow ${duration}s ease-out`;
            });
        }
    });

    // ============================================================
    // CONTEXT MENU DEMO
    // ============================================================

    let menuState = {
        isOpen: false
    };

    window.DemoRegistry.register('context-menu', {
        render: function(reducedMotion) {
            return `
                <div class="demo-menu-container" id="menu-container">
                    <div class="demo-menu-trigger" id="menu-trigger">⋯</div>
                    <div class="demo-context-menu" id="context-menu">
                        <div class="demo-menu-item">Reply</div>
                        <div class="demo-menu-item">Forward</div>
                        <div class="demo-menu-item">Archive</div>
                        <div class="demo-menu-item" style="color: #FF3B30;">Delete</div>
                    </div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            menuState.isOpen = false;
            this.updateTransitions(params, reducedMotion);

            // Click handlers
            const trigger = document.getElementById('menu-trigger');
            const menu = document.getElementById('context-menu');
            const container = document.getElementById('menu-container');

            if (trigger) {
                trigger.addEventListener('click', () => {
                    this.play(params, reducedMotion);
                });
            }

            if (container) {
                container.addEventListener('click', (e) => {
                    if (e.target.classList.contains('demo-menu-item')) {
                        this.close(params, reducedMotion);
                    }
                });
            }
        },

        play: function(params, reducedMotion) {
            const menu = document.getElementById('context-menu');
            if (!menu) return;

            this.updateTransitions(params, reducedMotion);

            if (!menuState.isOpen) {
                menu.classList.add('active');
                menuState.isOpen = true;
            } else {
                menu.classList.remove('active');
                menuState.isOpen = false;
            }
        },

        close: function(params, reducedMotion) {
            const menu = document.getElementById('context-menu');
            if (!menu) return;

            menu.classList.remove('active');
            menuState.isOpen = false;
        },

        reset: function(reducedMotion) {
            const menu = document.getElementById('context-menu');
            if (!menu) return;

            menu.style.transition = 'none';
            menu.classList.remove('active');
            menuState.isOpen = false;

            requestAnimationFrame(() => {
                menu.style.transition = '';
            });
        },

        updateTransitions: function(params, reducedMotion) {
            const menu = document.getElementById('context-menu');
            if (!menu) return;

            const duration = params.duration || 0.2;
            const startScale = params.startScale || 0.95;

            const bezier = reducedMotion
                ? 'ease-out'
                : 'cubic-bezier(0.2, 0.8, 0.2, 1)';

            // Update the transform start scale via CSS custom property
            const style = document.getElementById('menu-style') || document.createElement('style');
            style.id = 'menu-style';
            style.textContent = `
                .demo-context-menu {
                    transform: translate(-50%, -50%) scale(${startScale});
                    transition: ${reducedMotion
                        ? `opacity ${duration}s ease-out`
                        : `all ${duration}s ${bezier}`};
                }
                .demo-context-menu.active {
                    transform: translate(-50%, -50%) scale(1);
                }
            `;
            if (!document.getElementById('menu-style')) {
                document.head.appendChild(style);
            }
        }
    });

})();
