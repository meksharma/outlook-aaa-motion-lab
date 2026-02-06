/**
 * ============================================================
 * iOS-INSPIRED PATTERN DEMOS
 *
 * Contains demos for:
 * - ios-pull-refresh: iOS Mail pull-to-refresh
 * - ios-search-reveal: iOS Mail search bar reveal
 * - ios-event-creation: iOS Calendar event creation slide
 * - ios-message-preview: iOS Mail message preview pop
 * - ios-today-bounce: iOS Calendar today button bounce
 * - ios-thread-stack: iOS Mail thread stack collapse
 * ============================================================
 */

(function() {
    'use strict';

    // ============================================================
    // iOS PULL-TO-REFRESH DEMO
    // ============================================================

    let pullState = {
        isPulling: false,
        pullDistance: 0,
        isRefreshing: false
    };

    window.DemoRegistry.register('ios-pull-refresh', {
        render: function(reducedMotion) {
            return `
                <div class="demo-mail-container" id="pull-refresh-demo">
                    <div class="demo-refresh-indicator" id="refresh-indicator">
                        <div class="demo-refresh-spinner"></div>
                    </div>
                    <div class="demo-mail-list" id="mail-list">
                        <div class="demo-mail-item">
                            <div class="demo-mail-sender">Apple</div>
                            <div class="demo-mail-subject">Your App Store receipt</div>
                            <div class="demo-mail-preview">Thank you for your purchase...</div>
                        </div>
                        <div class="demo-mail-item">
                            <div class="demo-mail-sender">GitHub</div>
                            <div class="demo-mail-subject">Security alert</div>
                            <div class="demo-mail-preview">A new SSH key was added to your account...</div>
                        </div>
                        <div class="demo-mail-item">
                            <div class="demo-mail-sender">LinkedIn</div>
                            <div class="demo-mail-subject">Weekly digest</div>
                            <div class="demo-mail-preview">Your professional update for this week...</div>
                        </div>
                    </div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            pullState = { isPulling: false, pullDistance: 0, isRefreshing: false };
            this.updateTransitions(params, reducedMotion);
            this.attachPullGesture(params, reducedMotion);
        },

        play: function(params, reducedMotion) {
            this.startRefresh(params, reducedMotion);
        },

        startRefresh: function(params, reducedMotion) {
            const indicator = document.getElementById('refresh-indicator');
            const mailList = document.getElementById('mail-list');
            if (!indicator || !mailList) return;

            pullState.isRefreshing = true;
            const threshold = params.activationThreshold || 80;

            // Show refresh indicator
            indicator.style.opacity = '1';
            indicator.style.transform = `translateY(${threshold}px)`;
            mailList.style.transform = `translateY(${threshold}px)`;

            // Start spinning animation
            const spinner = indicator.querySelector('.demo-refresh-spinner');
            if (spinner) {
                spinner.classList.add('spinning');
            }

            // Simulate refresh completion
            setTimeout(() => {
                this.endRefresh(params, reducedMotion);
            }, 2000);
        },

        endRefresh: function(params, reducedMotion) {
            const indicator = document.getElementById('refresh-indicator');
            const mailList = document.getElementById('mail-list');
            if (!indicator || !mailList) return;

            pullState.isRefreshing = false;

            // Hide refresh indicator with spring animation
            indicator.style.opacity = '0';
            indicator.style.transform = 'translateY(-60px)';
            mailList.style.transform = 'translateY(0)';

            // Stop spinning
            const spinner = indicator.querySelector('.demo-refresh-spinner');
            if (spinner) {
                spinner.classList.remove('spinning');
            }

            setTimeout(() => {
                indicator.style.transform = 'translateY(-60px)';
            }, 350);
        },

        attachPullGesture: function(params, reducedMotion) {
            const container = document.getElementById('pull-refresh-demo');
            if (!container) return;

            let startY = 0;
            let currentY = 0;

            container.addEventListener('mousedown', (e) => {
                if (pullState.isRefreshing) return;
                startY = e.clientY;
                pullState.isPulling = true;
                container.style.cursor = 'grabbing';
            });

            document.addEventListener('mousemove', (e) => {
                if (!pullState.isPulling || pullState.isRefreshing) return;

                currentY = e.clientY;
                const deltaY = Math.max(0, currentY - startY);
                const resistance = params.elasticResistance || 0.6;
                const maxPull = 120;

                // Apply elastic resistance
                pullState.pullDistance = deltaY * (1 - deltaY / maxPull) * resistance;
                this.updatePullVisuals(params);
            });

            document.addEventListener('mouseup', () => {
                if (!pullState.isPulling) return;

                pullState.isPulling = false;
                container.style.cursor = '';

                const threshold = params.activationThreshold || 80;
                if (pullState.pullDistance > threshold) {
                    this.startRefresh(params, reducedMotion);
                } else {
                    this.snapBack(params, reducedMotion);
                }
            });
        },

        updatePullVisuals: function(params) {
            const indicator = document.getElementById('refresh-indicator');
            const mailList = document.getElementById('mail-list');
            if (!indicator || !mailList) return;

            const opacity = Math.min(1, pullState.pullDistance / 60);
            indicator.style.opacity = opacity;
            indicator.style.transform = `translateY(${pullState.pullDistance - 60}px)`;
            mailList.style.transform = `translateY(${pullState.pullDistance}px)`;
        },

        snapBack: function(params, reducedMotion) {
            const indicator = document.getElementById('refresh-indicator');
            const mailList = document.getElementById('mail-list');
            if (!indicator || !mailList) return;

            indicator.style.opacity = '0';
            indicator.style.transform = 'translateY(-60px)';
            mailList.style.transform = 'translateY(0)';
            pullState.pullDistance = 0;
        },

        reset: function(reducedMotion) {
            pullState = { isPulling: false, pullDistance: 0, isRefreshing: false };
            this.snapBack({}, reducedMotion);
        },

        updateTransitions: function(params, reducedMotion) {
            const duration = reducedMotion ? '0.15s' : `${params.snapBackDuration || 0.35}s`;
            const timing = reducedMotion ? 'ease' : 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

            const container = document.getElementById('pull-refresh-demo');
            if (container) {
                container.style.setProperty('--transition-duration', duration);
                container.style.setProperty('--transition-timing', timing);
            }
        }
    });

    // ============================================================
    // iOS SEARCH BAR REVEAL DEMO
    // ============================================================

    let searchState = {
        isRevealed: false
    };

    window.DemoRegistry.register('ios-search-reveal', {
        render: function(reducedMotion) {
            return `
                <div class="demo-search-container" id="search-demo">
                    <div class="demo-nav-bar">
                        <div class="demo-nav-title">Mail</div>
                        <button class="demo-search-button" id="search-button">🔍</button>
                    </div>
                    <div class="demo-search-bar" id="search-bar">
                        <input type="text" placeholder="Search mail" class="demo-search-input">
                        <button class="demo-cancel-button" id="cancel-button">Cancel</button>
                    </div>
                    <div class="demo-mail-content">
                        <div class="demo-mail-item">
                            <div class="demo-mail-sender">Design Team</div>
                            <div class="demo-mail-subject">Motion Guidelines Update</div>
                        </div>
                        <div class="demo-mail-item">
                            <div class="demo-mail-sender">Product</div>
                            <div class="demo-mail-subject">Q1 Roadmap Review</div>
                        </div>
                    </div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            searchState.isRevealed = false;
            this.updateTransitions(params, reducedMotion);
            this.attachEvents(params, reducedMotion);
        },

        play: function(params, reducedMotion) {
            this.toggleSearch(params, reducedMotion);
        },

        toggleSearch: function(params, reducedMotion) {
            searchState.isRevealed = !searchState.isRevealed;
            this.updateSearchVisibility(params, reducedMotion);
        },

        updateSearchVisibility: function(params, reducedMotion) {
            const searchBar = document.getElementById('search-bar');
            const searchInput = searchBar?.querySelector('.demo-search-input');

            if (!searchBar) return;

            if (searchState.isRevealed) {
                searchBar.classList.add('revealed');
                if (searchInput) {
                    setTimeout(() => searchInput.focus(), reducedMotion ? 50 : 300);
                }
            } else {
                searchBar.classList.remove('revealed');
                if (searchInput) {
                    searchInput.blur();
                    searchInput.value = '';
                }
            }
        },

        attachEvents: function(params, reducedMotion) {
            const searchButton = document.getElementById('search-button');
            const cancelButton = document.getElementById('cancel-button');

            if (searchButton) {
                searchButton.addEventListener('click', () => {
                    searchState.isRevealed = true;
                    this.updateSearchVisibility(params, reducedMotion);
                });
            }

            if (cancelButton) {
                cancelButton.addEventListener('click', () => {
                    searchState.isRevealed = false;
                    this.updateSearchVisibility(params, reducedMotion);
                });
            }
        },

        reset: function(reducedMotion) {
            searchState.isRevealed = false;
            this.updateSearchVisibility({}, reducedMotion);
        },

        updateTransitions: function(params, reducedMotion) {
            const duration = reducedMotion ? '0.15s' : `${params.revealDuration || 0.3}s`;

            const searchBar = document.getElementById('search-bar');
            if (searchBar) {
                searchBar.style.setProperty('--reveal-duration', duration);
            }
        }
    });

    // ============================================================
    // iOS TODAY BOUNCE DEMO
    // ============================================================

    window.DemoRegistry.register('ios-today-bounce', {
        render: function(reducedMotion) {
            return `
                <div class="demo-calendar-header">
                    <div class="demo-calendar-nav">
                        <button class="demo-today-button" id="today-button">Today</button>
                        <div class="demo-calendar-title">March 2026</div>
                    </div>
                    <div class="demo-calendar-grid">
                        <div class="demo-calendar-day">1</div>
                        <div class="demo-calendar-day">2</div>
                        <div class="demo-calendar-day today">5</div>
                        <div class="demo-calendar-day">6</div>
                    </div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            this.updateTransitions(params, reducedMotion);
            this.attachEvents(params, reducedMotion);
        },

        play: function(params, reducedMotion) {
            this.bounceToday(params, reducedMotion);
        },

        bounceToday: function(params, reducedMotion) {
            const button = document.getElementById('today-button');
            if (!button) return;

            const intensity = params.bounceIntensity || 1.12;

            if (reducedMotion) {
                // Simple highlight for reduced motion
                button.style.backgroundColor = '#007AFF';
                button.style.color = 'white';
                setTimeout(() => {
                    button.style.backgroundColor = '';
                    button.style.color = '';
                }, 200);
            } else {
                // Full bounce animation
                button.style.transform = `scale(${intensity})`;
                button.style.backgroundColor = '#007AFF';
                button.style.color = 'white';

                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                    button.style.backgroundColor = '';
                    button.style.color = '';
                }, 500);
            }

            // Highlight today in calendar
            const todayCell = document.querySelector('.demo-calendar-day.today');
            if (todayCell) {
                todayCell.style.backgroundColor = '#007AFF';
                todayCell.style.color = 'white';
                setTimeout(() => {
                    todayCell.style.backgroundColor = '#E3F2FD';
                    todayCell.style.color = '#007AFF';
                }, 800);
            }
        },

        attachEvents: function(params, reducedMotion) {
            const button = document.getElementById('today-button');
            if (button) {
                button.addEventListener('click', () => {
                    this.bounceToday(params, reducedMotion);
                });
            }
        },

        reset: function(reducedMotion) {
            const button = document.getElementById('today-button');
            if (button) {
                button.style.transform = '';
                button.style.backgroundColor = '';
                button.style.color = '';
            }

            const todayCell = document.querySelector('.demo-calendar-day.today');
            if (todayCell) {
                todayCell.style.backgroundColor = '#E3F2FD';
                todayCell.style.color = '#007AFF';
            }
        },

        updateTransitions: function(params, reducedMotion) {
            const button = document.getElementById('today-button');
            if (!button) return;

            if (reducedMotion) {
                button.style.transition = 'all 0.15s ease';
            } else {
                const duration = params.bounceDuration || 0.5;
                const damping = params.damping || 0.5;
                const timing = `cubic-bezier(${0.68 - damping * 0.5}, -0.55, 0.265, 1.55)`;
                button.style.transition = `transform ${duration}s ${timing}, background-color 0.2s ease, color 0.2s ease`;
            }
        }
    });

    // ============================================================
    // iOS CALENDAR EVENT CREATION DEMO
    // ============================================================

    let eventState = {
        isVisible: false
    };

    window.DemoRegistry.register('ios-event-creation', {
        render: function(reducedMotion) {
            return `
                <div class="demo-event-container" id="event-demo">
                    <div class="demo-calendar-view">
                        <div class="demo-calendar-toolbar">
                            <span class="demo-calendar-date">March 5, 2026</span>
                            <button class="demo-add-button" id="add-event-button">+</button>
                        </div>
                        <div class="demo-calendar-today">
                            <div class="demo-time-slot">9:00 AM</div>
                            <div class="demo-time-slot">10:00 AM</div>
                            <div class="demo-time-slot">11:00 AM</div>
                        </div>
                    </div>
                    <div class="demo-event-panel" id="event-panel">
                        <div class="demo-panel-handle"></div>
                        <div class="demo-panel-content">
                            <input type="text" placeholder="Event title" class="demo-event-input">
                            <div class="demo-event-time">10:00 AM - 11:00 AM</div>
                            <button class="demo-save-button">Add Event</button>
                        </div>
                    </div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            eventState.isVisible = false;
            this.updateTransitions(params, reducedMotion);
            this.attachEvents(params, reducedMotion);
        },

        play: function(params, reducedMotion) {
            this.togglePanel(params, reducedMotion);
        },

        togglePanel: function(params, reducedMotion) {
            eventState.isVisible = !eventState.isVisible;
            const panel = document.getElementById('event-panel');
            if (!panel) return;

            if (eventState.isVisible) {
                panel.classList.add('visible');
                const input = panel.querySelector('.demo-event-input');
                if (input) {
                    setTimeout(() => input.focus(), reducedMotion ? 50 : 450);
                }
            } else {
                panel.classList.remove('visible');
            }
        },

        attachEvents: function(params, reducedMotion) {
            const addButton = document.getElementById('add-event-button');
            const saveButton = document.querySelector('.demo-save-button');

            if (addButton) {
                addButton.addEventListener('click', () => {
                    eventState.isVisible = true;
                    this.togglePanel(params, reducedMotion);
                });
            }

            if (saveButton) {
                saveButton.addEventListener('click', () => {
                    eventState.isVisible = false;
                    this.togglePanel(params, reducedMotion);
                });
            }
        },

        reset: function(reducedMotion) {
            eventState.isVisible = false;
            const panel = document.getElementById('event-panel');
            if (panel) {
                panel.classList.remove('visible');
            }
        },

        updateTransitions: function(params, reducedMotion) {
            const panel = document.getElementById('event-panel');
            if (!panel) return;

            const duration = reducedMotion ? '0.15s' : `${params.slideUpDuration || 0.45}s`;
            panel.style.setProperty('--slide-duration', duration);
        }
    });

    // ============================================================
    // iOS MAIL MESSAGE PREVIEW DEMO
    // ============================================================

    let previewState = {
        isActive: false
    };

    window.DemoRegistry.register('ios-message-preview', {
        render: function(reducedMotion) {
            return `
                <div class="demo-preview-container" id="preview-demo">
                    <div class="demo-mail-preview-list" id="mail-list">
                        <div class="demo-preview-mail-item" data-preview="true">
                            <div class="demo-preview-sender">Design Team</div>
                            <div class="demo-preview-subject">Motion Guidelines Update</div>
                            <div class="demo-preview-snippet">New animation patterns for Q2...</div>
                        </div>
                        <div class="demo-preview-mail-item">
                            <div class="demo-preview-sender">Product</div>
                            <div class="demo-preview-subject">Roadmap Review</div>
                            <div class="demo-preview-snippet">Quarterly planning session...</div>
                        </div>
                    </div>
                    <div class="demo-preview-overlay" id="preview-overlay">
                        <div class="demo-preview-card" id="preview-card">
                            <div class="demo-preview-header">
                                <span class="demo-preview-from">Design Team</span>
                                <span class="demo-preview-date">Today, 2:30 PM</span>
                            </div>
                            <div class="demo-preview-title">Motion Guidelines Update</div>
                            <div class="demo-preview-body">
                                New animation patterns for Q2 are ready for review. These include iOS-inspired micro-interactions and enhanced loading states...
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            previewState.isActive = false;
            this.updateTransitions(params, reducedMotion);
            this.attachEvents(params, reducedMotion);
        },

        play: function(params, reducedMotion) {
            this.showPreview(params, reducedMotion);
        },

        showPreview: function(params, reducedMotion) {
            const overlay = document.getElementById('preview-overlay');
            const mailList = document.getElementById('mail-list');

            if (!overlay || !mailList) return;

            previewState.isActive = true;
            overlay.classList.add('active');
            mailList.classList.add('blurred');

            setTimeout(() => {
                this.hidePreview(params, reducedMotion);
            }, 2000);
        },

        hidePreview: function(params, reducedMotion) {
            const overlay = document.getElementById('preview-overlay');
            const mailList = document.getElementById('mail-list');

            if (!overlay || !mailList) return;

            previewState.isActive = false;
            overlay.classList.remove('active');
            mailList.classList.remove('blurred');
        },

        attachEvents: function(params, reducedMotion) {
            const previewItem = document.querySelector('[data-preview="true"]');
            const overlay = document.getElementById('preview-overlay');

            if (previewItem) {
                previewItem.addEventListener('click', () => {
                    this.showPreview(params, reducedMotion);
                });
            }

            if (overlay) {
                overlay.addEventListener('click', () => {
                    this.hidePreview(params, reducedMotion);
                });
            }
        },

        reset: function(reducedMotion) {
            previewState.isActive = false;
            this.hidePreview({}, reducedMotion);
        },

        updateTransitions: function(params, reducedMotion) {
            const duration = reducedMotion ? '0.15s' : `${params.previewDuration || 0.25}s`;
            const overlay = document.getElementById('preview-overlay');

            if (overlay) {
                overlay.style.setProperty('--preview-duration', duration);
            }
        }
    });

    // ============================================================
    // iOS MAIL THREAD STACK DEMO
    // ============================================================

    let threadState = {
        isStacked: false
    };

    window.DemoRegistry.register('ios-thread-stack', {
        render: function(reducedMotion) {
            return `
                <div class="demo-thread-container" id="thread-demo">
                    <div class="demo-thread-header">
                        <span>Email Thread (3)</span>
                        <button class="demo-stack-toggle" id="stack-toggle">Stack</button>
                    </div>
                    <div class="demo-thread-emails" id="thread-emails">
                        <div class="demo-thread-email" data-index="0">
                            <div class="demo-thread-sender">Design Team</div>
                            <div class="demo-thread-content">Initial motion guidelines...</div>
                        </div>
                        <div class="demo-thread-email" data-index="1">
                            <div class="demo-thread-sender">Product Manager</div>
                            <div class="demo-thread-content">Great work! Let's add more patterns...</div>
                        </div>
                        <div class="demo-thread-email" data-index="2">
                            <div class="demo-thread-sender">Engineering</div>
                            <div class="demo-thread-content">Implementation timeline looks good...</div>
                        </div>
                    </div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            threadState.isStacked = false;
            this.updateTransitions(params, reducedMotion);
            this.attachEvents(params, reducedMotion);
        },

        play: function(params, reducedMotion) {
            this.toggleStack(params, reducedMotion);
        },

        toggleStack: function(params, reducedMotion) {
            threadState.isStacked = !threadState.isStacked;
            const emails = document.querySelectorAll('.demo-thread-email');
            const toggle = document.getElementById('stack-toggle');

            emails.forEach((email, index) => {
                if (threadState.isStacked) {
                    const offset = index * (params.cardSpacing || 4);
                    const scale = 1 - (index * (params.scaleReduction || 0.04));

                    email.style.transform = `translateY(${offset}px) scale(${scale})`;
                    email.style.zIndex = emails.length - index;
                } else {
                    email.style.transform = '';
                    email.style.zIndex = '';
                }
            });

            if (toggle) {
                toggle.textContent = threadState.isStacked ? 'Expand' : 'Stack';
            }
        },

        attachEvents: function(params, reducedMotion) {
            const toggle = document.getElementById('stack-toggle');
            if (toggle) {
                toggle.addEventListener('click', () => {
                    this.toggleStack(params, reducedMotion);
                });
            }
        },

        reset: function(reducedMotion) {
            threadState.isStacked = false;
            const emails = document.querySelectorAll('.demo-thread-email');
            const toggle = document.getElementById('stack-toggle');

            emails.forEach(email => {
                email.style.transform = '';
                email.style.zIndex = '';
            });

            if (toggle) {
                toggle.textContent = 'Stack';
            }
        },

        updateTransitions: function(params, reducedMotion) {
            const duration = reducedMotion ? '0.15s' : `${params.stackDuration || 0.45}s`;
            const emails = document.querySelectorAll('.demo-thread-email');

            emails.forEach(email => {
                email.style.transition = `all ${duration} cubic-bezier(0.2, 0.8, 0.2, 1)`;
            });
        }
    });

})();