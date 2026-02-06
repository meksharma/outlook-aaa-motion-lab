/**
 * ============================================================
 * OUTLOOK-SPECIFIC DEMOS
 *
 * Contains demos for Outlook-specific motion patterns:
 * - outlook-header: Header collapse with liquid glass
 * - outlook-footer: Footer morphing nav bar
 * - outlook-compose: Compose sheet slide-up
 * - outlook-thread: Email thread expansion
 * - outlook-swipe: Mail item swipe actions
 * - outlook-calendar: Calendar view transitions
 * ============================================================
 */

(function() {
    'use strict';

    // ============================================================
    // OUTLOOK HEADER COLLAPSE DEMO
    // ============================================================

    let outlookHeaderState = {
        isCollapsed: false
    };

    window.DemoRegistry.register('outlook-header', {
        render: function(reducedMotion) {
            return `
                <div class="demo-outlook-header-container" id="outlook-header-container">
                    <div class="demo-outlook-header" id="outlook-header">
                        <div class="demo-outlook-header-content">
                            <div class="demo-outlook-avatar"></div>
                            <div class="demo-outlook-large-title" id="outlook-large-title">Inbox</div>
                        </div>
                        <div class="demo-outlook-compact-title" id="outlook-compact-title">Inbox</div>
                    </div>
                    <div class="demo-outlook-content">
                        <div class="demo-outlook-mail-item">
                            <div class="demo-outlook-mail-sender">John Smith</div>
                            <div class="demo-outlook-mail-subject">Project Update</div>
                        </div>
                        <div class="demo-outlook-mail-item">
                            <div class="demo-outlook-mail-sender">Sarah Johnson</div>
                            <div class="demo-outlook-mail-subject">Meeting Notes</div>
                        </div>
                        <div class="demo-outlook-mail-item">
                            <div class="demo-outlook-mail-sender">Team Calendar</div>
                            <div class="demo-outlook-mail-subject">Weekly Sync</div>
                        </div>
                    </div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            outlookHeaderState.isCollapsed = false;
            this.updateStyles(params, reducedMotion);
        },

        play: function(params, reducedMotion) {
            const header = document.getElementById('outlook-header');
            const largeTitle = document.getElementById('outlook-large-title');
            const compactTitle = document.getElementById('outlook-compact-title');

            if (!header || !largeTitle || !compactTitle) return;

            this.updateStyles(params, reducedMotion);

            outlookHeaderState.isCollapsed = !outlookHeaderState.isCollapsed;

            if (outlookHeaderState.isCollapsed) {
                header.classList.add('collapsed');
                largeTitle.style.opacity = '0';
                compactTitle.style.opacity = '1';
            } else {
                header.classList.remove('collapsed');
                largeTitle.style.opacity = '1';
                compactTitle.style.opacity = '0';
            }
        },

        reset: function(reducedMotion) {
            const header = document.getElementById('outlook-header');
            const largeTitle = document.getElementById('outlook-large-title');
            const compactTitle = document.getElementById('outlook-compact-title');

            if (!header || !largeTitle || !compactTitle) return;

            header.style.transition = 'none';
            header.classList.remove('collapsed');
            largeTitle.style.opacity = '1';
            compactTitle.style.opacity = '0';
            outlookHeaderState.isCollapsed = false;

            requestAnimationFrame(() => {
                header.style.transition = '';
            });
        },

        updateStyles: function(params, reducedMotion) {
            const blur = params.blurIntensity || 22;
            const speed = params.titleFadeSpeed || 180;

            const style = document.getElementById('outlook-header-style') || document.createElement('style');
            style.id = 'outlook-header-style';
            style.textContent = `
                .demo-outlook-header-container {
                    width: 280px;
                    height: 200px;
                    background: #f5f5f5;
                    border-radius: 12px;
                    overflow: hidden;
                    position: relative;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .demo-outlook-header {
                    position: sticky;
                    top: 0;
                    height: 120px;
                    background: #0F6CBD;
                    transition: ${reducedMotion ? 'opacity' : 'all'} ${speed}ms ease-out;
                    display: flex;
                    align-items: flex-end;
                    padding: 16px;
                    position: relative;
                    z-index: 2;
                }
                .demo-outlook-header.collapsed {
                    height: 66px;
                    background: rgba(255,255,255,0.7);
                    backdrop-filter: blur(${blur}px);
                    -webkit-backdrop-filter: blur(${blur}px);
                    align-items: center;
                }
                .demo-outlook-header-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .demo-outlook-avatar {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.2);
                }
                .demo-outlook-large-title {
                    font-size: 30px;
                    font-weight: 700;
                    color: white;
                    transition: opacity ${speed}ms ease-out;
                }
                .demo-outlook-compact-title {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 17px;
                    font-weight: 600;
                    color: #333;
                    opacity: 0;
                    transition: opacity ${speed}ms ease-out;
                }
                .demo-outlook-header.collapsed .demo-outlook-large-title {
                    opacity: 0 !important;
                }
                .demo-outlook-header.collapsed .demo-outlook-compact-title {
                    opacity: 1 !important;
                }
                .demo-outlook-content {
                    padding: 12px 0;
                    background: white;
                }
                .demo-outlook-mail-item {
                    padding: 12px 16px;
                    border-bottom: 1px solid #f0f0f0;
                }
                .demo-outlook-mail-sender {
                    font-size: 15px;
                    font-weight: 600;
                    color: #333;
                }
                .demo-outlook-mail-subject {
                    font-size: 13px;
                    color: #666;
                    margin-top: 2px;
                }
            `;
            if (!document.getElementById('outlook-header-style')) {
                document.head.appendChild(style);
            }
        }
    });

    // ============================================================
    // OUTLOOK FOOTER MORPHING DEMO
    // ============================================================

    let outlookFooterState = {
        isMinimal: false
    };

    window.DemoRegistry.register('outlook-footer', {
        render: function(reducedMotion) {
            return `
                <div class="demo-outlook-footer-container" id="outlook-footer-container">
                    <div class="demo-outlook-mail-content">
                        <div class="demo-outlook-mail-item">📧 Meeting invitation</div>
                        <div class="demo-outlook-mail-item">📧 Project update</div>
                        <div class="demo-outlook-mail-item">📧 Weekly report</div>
                    </div>
                    <div class="demo-outlook-footer-nav" id="outlook-footer-nav">
                        <div class="demo-outlook-nav-item" data-item="mail">📧</div>
                        <div class="demo-outlook-nav-item" data-item="calendar">📅</div>
                        <div class="demo-outlook-nav-item" data-item="files">📁</div>
                    </div>
                    <div class="demo-outlook-copilot-bar" id="outlook-copilot-bar">
                        <span>🤖 Ask Copilot anything...</span>
                    </div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            outlookFooterState.isMinimal = false;
            this.updateStyles(params, reducedMotion);
        },

        play: function(params, reducedMotion) {
            const nav = document.getElementById('outlook-footer-nav');
            const copilot = document.getElementById('outlook-copilot-bar');

            if (!nav || !copilot) return;

            this.updateStyles(params, reducedMotion);

            outlookFooterState.isMinimal = !outlookFooterState.isMinimal;

            if (outlookFooterState.isMinimal) {
                nav.classList.add('minimal');
                copilot.classList.add('minimal');
            } else {
                nav.classList.remove('minimal');
                copilot.classList.remove('minimal');
            }
        },

        reset: function(reducedMotion) {
            const nav = document.getElementById('outlook-footer-nav');
            const copilot = document.getElementById('outlook-copilot-bar');

            if (!nav || !copilot) return;

            nav.style.transition = 'none';
            copilot.style.transition = 'none';
            nav.classList.remove('minimal');
            copilot.classList.remove('minimal');
            outlookFooterState.isMinimal = false;

            requestAnimationFrame(() => {
                nav.style.transition = '';
                copilot.style.transition = '';
            });
        },

        updateStyles: function(params, reducedMotion) {
            const duration = params.morphDuration || 180;
            const delay = params.staggerDelay || 60;
            const width = params.copilotWidth || 220;

            const style = document.getElementById('outlook-footer-style') || document.createElement('style');
            style.id = 'outlook-footer-style';
            style.textContent = `
                .demo-outlook-footer-container {
                    width: 280px;
                    height: 200px;
                    background: #f8f8f8;
                    border-radius: 12px;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .demo-outlook-mail-content {
                    padding: 20px 16px;
                }
                .demo-outlook-mail-item {
                    padding: 8px 0;
                    font-size: 14px;
                    color: #333;
                }
                .demo-outlook-footer-nav {
                    position: absolute;
                    bottom: 32px;
                    left: 16px;
                    width: 200px;
                    height: 58px;
                    background: rgba(255,255,255,0.8);
                    backdrop-filter: blur(20px);
                    border-radius: 999px;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    transition: all ${duration}ms cubic-bezier(0.4,0,0.2,1);
                }
                .demo-outlook-footer-nav.minimal {
                    width: 54px;
                    border-radius: 50%;
                    left: 16px;
                    justify-content: center;
                }
                .demo-outlook-nav-item {
                    font-size: 20px;
                    padding: 8px;
                    border-radius: 50%;
                    transition: all ${duration}ms cubic-bezier(0.4,0,0.2,1);
                }
                .demo-outlook-nav-item[data-item="mail"] {
                    background: rgba(0,120,212,0.1);
                }
                .demo-outlook-footer-nav.minimal .demo-outlook-nav-item:not([data-item="mail"]) {
                    transform: translateY(20px) scale(0.8);
                    opacity: 0;
                    transition-delay: ${delay}ms;
                }
                .demo-outlook-copilot-bar {
                    position: absolute;
                    bottom: 32px;
                    right: 16px;
                    left: 220px;
                    height: 50px;
                    background: rgba(255,255,255,0.8);
                    backdrop-filter: blur(20px);
                    border-radius: 25px;
                    display: flex;
                    align-items: center;
                    padding: 0 16px;
                    font-size: 13px;
                    color: #666;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    transition: all ${duration}ms cubic-bezier(0.4,0,0.2,1);
                }
                .demo-outlook-copilot-bar.minimal {
                    left: 50%;
                    right: auto;
                    transform: translateX(-50%);
                    width: ${width}px;
                }
            `;
            if (!document.getElementById('outlook-footer-style')) {
                document.head.appendChild(style);
            }
        }
    });

    // ============================================================
    // OUTLOOK COMPOSE SHEET DEMO
    // ============================================================

    let outlookComposeState = {
        isOpen: false
    };

    window.DemoRegistry.register('outlook-compose', {
        render: function(reducedMotion) {
            return `
                <div class="demo-outlook-compose-container" id="outlook-compose-container">
                    <div class="demo-outlook-inbox">
                        <div class="demo-outlook-inbox-header">Inbox</div>
                        <div class="demo-outlook-inbox-content">
                            <div class="demo-outlook-mail-row">Meeting agenda ready</div>
                            <div class="demo-outlook-mail-row">Travel booking confirmed</div>
                        </div>
                        <div class="demo-outlook-compose-button" id="outlook-compose-trigger">✏️</div>
                    </div>
                    <div class="demo-outlook-compose-backdrop" id="outlook-compose-backdrop"></div>
                    <div class="demo-outlook-compose-sheet" id="outlook-compose-sheet">
                        <div class="demo-outlook-compose-handle"></div>
                        <div class="demo-outlook-compose-content">
                            <div class="demo-outlook-compose-header">New Message</div>
                            <div class="demo-outlook-compose-field">To:</div>
                            <div class="demo-outlook-compose-field">Subject:</div>
                            <div class="demo-outlook-compose-body"></div>
                        </div>
                    </div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            outlookComposeState.isOpen = false;
            this.updateStyles(params, reducedMotion);
        },

        play: function(params, reducedMotion) {
            const backdrop = document.getElementById('outlook-compose-backdrop');
            const sheet = document.getElementById('outlook-compose-sheet');
            const trigger = document.getElementById('outlook-compose-trigger');

            if (!backdrop || !sheet || !trigger) return;

            this.updateStyles(params, reducedMotion);

            outlookComposeState.isOpen = !outlookComposeState.isOpen;

            if (outlookComposeState.isOpen) {
                backdrop.classList.add('active');
                sheet.classList.add('active');
                trigger.style.transform = 'scale(0.9)';
            } else {
                backdrop.classList.remove('active');
                sheet.classList.remove('active');
                trigger.style.transform = 'scale(1)';
            }
        },

        reset: function(reducedMotion) {
            const backdrop = document.getElementById('outlook-compose-backdrop');
            const sheet = document.getElementById('outlook-compose-sheet');
            const trigger = document.getElementById('outlook-compose-trigger');

            if (!backdrop || !sheet || !trigger) return;

            backdrop.style.transition = 'none';
            sheet.style.transition = 'none';
            backdrop.classList.remove('active');
            sheet.classList.remove('active');
            trigger.style.transform = 'scale(1)';
            outlookComposeState.isOpen = false;

            requestAnimationFrame(() => {
                backdrop.style.transition = '';
                sheet.style.transition = '';
            });
        },

        updateStyles: function(params, reducedMotion) {
            const duration = (params.duration || 0.4) * 1000;
            const damping = params.springDamping || 0.75;
            const opacity = params.backdropOpacity || 0.35;

            const bezier = reducedMotion
                ? 'ease-out'
                : `cubic-bezier(0.2, ${damping}, 0.2, 1)`;

            const style = document.getElementById('outlook-compose-style') || document.createElement('style');
            style.id = 'outlook-compose-style';
            style.textContent = `
                .demo-outlook-compose-container {
                    width: 280px;
                    height: 200px;
                    background: #f8f8f8;
                    border-radius: 12px;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .demo-outlook-inbox {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
                .demo-outlook-inbox-header {
                    padding: 16px;
                    background: #0F6CBD;
                    color: white;
                    font-weight: 600;
                }
                .demo-outlook-inbox-content {
                    flex: 1;
                    padding: 12px 16px;
                    background: white;
                }
                .demo-outlook-mail-row {
                    padding: 8px 0;
                    font-size: 14px;
                    border-bottom: 1px solid #f0f0f0;
                }
                .demo-outlook-compose-button {
                    position: absolute;
                    bottom: 16px;
                    right: 16px;
                    width: 48px;
                    height: 48px;
                    background: #0078D4;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    cursor: pointer;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
                    transition: transform ${duration}ms ${bezier};
                }
                .demo-outlook-compose-backdrop {
                    position: absolute;
                    inset: 0;
                    background: rgba(0,0,0,${opacity});
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity ${duration * 0.7}ms ease-out;
                }
                .demo-outlook-compose-backdrop.active {
                    opacity: 1;
                    pointer-events: auto;
                }
                .demo-outlook-compose-sheet {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 80%;
                    background: white;
                    border-radius: 16px 16px 0 0;
                    transform: translateY(100%);
                    transition: transform ${duration}ms ${bezier};
                    box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
                }
                .demo-outlook-compose-sheet.active {
                    transform: translateY(0);
                }
                .demo-outlook-compose-handle {
                    width: 36px;
                    height: 4px;
                    background: #d0d0d0;
                    border-radius: 2px;
                    margin: 8px auto 16px;
                }
                .demo-outlook-compose-content {
                    padding: 0 16px;
                }
                .demo-outlook-compose-header {
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 16px;
                }
                .demo-outlook-compose-field {
                    height: 20px;
                    background: #f0f0f0;
                    border-radius: 4px;
                    margin-bottom: 12px;
                    padding: 4px 8px;
                    font-size: 12px;
                    color: #666;
                }
                .demo-outlook-compose-body {
                    height: 40px;
                    background: #f8f8f8;
                    border-radius: 4px;
                }
            `;
            if (!document.getElementById('outlook-compose-style')) {
                document.head.appendChild(style);
            }
        }
    });

    // ============================================================
    // OUTLOOK EMAIL THREAD DEMO
    // ============================================================

    let outlookThreadState = {
        expandedEmails: new Set()
    };

    window.DemoRegistry.register('outlook-thread', {
        render: function(reducedMotion) {
            return `
                <div class="demo-outlook-thread-container" id="outlook-thread-container">
                    <div class="demo-outlook-thread-header">Meeting Discussion</div>
                    <div class="demo-outlook-thread-content">
                        <div class="demo-outlook-email-card" data-email="1">
                            <div class="demo-outlook-email-header">
                                <span>John Smith</span>
                                <span>2:30 PM</span>
                            </div>
                            <div class="demo-outlook-email-content">
                                <div class="demo-outlook-email-preview">Let's schedule the project review...</div>
                                <div class="demo-outlook-email-full">
                                    Let's schedule the project review meeting for next week. I think Tuesday would work best for everyone. We should review the design mockups and discuss the technical implementation approach.
                                </div>
                            </div>
                            <div class="demo-outlook-show-more" data-target="1">···</div>
                        </div>
                        <div class="demo-outlook-email-card" data-email="2">
                            <div class="demo-outlook-email-header">
                                <span>Sarah Johnson</span>
                                <span>3:15 PM</span>
                            </div>
                            <div class="demo-outlook-email-content">
                                <div class="demo-outlook-email-preview">Tuesday works for me. What time...</div>
                                <div class="demo-outlook-email-full">
                                    Tuesday works for me. What time would be best? I'd prefer afternoon since I have client calls in the morning. Also, should we invite the stakeholders?
                                </div>
                            </div>
                            <div class="demo-outlook-show-more" data-target="2">···</div>
                        </div>
                    </div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            outlookThreadState.expandedEmails.clear();
            this.updateStyles(params, reducedMotion);
            this.attachListeners();
        },

        play: function(params, reducedMotion) {
            // Expand the first email as demonstration
            const firstCard = document.querySelector('.demo-outlook-email-card[data-email="1"]');
            if (firstCard && !outlookThreadState.expandedEmails.has('1')) {
                this.toggleEmail('1', params, reducedMotion);
            } else if (firstCard) {
                this.toggleEmail('1', params, reducedMotion);
            }
        },

        reset: function(reducedMotion) {
            outlookThreadState.expandedEmails.clear();
            const cards = document.querySelectorAll('.demo-outlook-email-card');
            cards.forEach(card => {
                card.classList.remove('expanded');
            });
        },

        toggleEmail: function(emailId, params, reducedMotion) {
            const card = document.querySelector(`.demo-outlook-email-card[data-email="${emailId}"]`);
            if (!card) return;

            this.updateStyles(params, reducedMotion);

            if (outlookThreadState.expandedEmails.has(emailId)) {
                outlookThreadState.expandedEmails.delete(emailId);
                card.classList.remove('expanded');
            } else {
                outlookThreadState.expandedEmails.add(emailId);
                card.classList.add('expanded');
            }
        },

        attachListeners: function() {
            const showMoreButtons = document.querySelectorAll('.demo-outlook-show-more');
            showMoreButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const emailId = e.target.dataset.target;
                    this.toggleEmail(emailId, {}, false);
                });
            });
        },

        updateStyles: function(params, reducedMotion) {
            const duration = (params.expandDuration || 0.3) * 1000;
            const delay = params.contentDelay || 100;
            const maxHeight = params.maxCollapsedHeight || 90;

            const style = document.getElementById('outlook-thread-style') || document.createElement('style');
            style.id = 'outlook-thread-style';
            style.textContent = `
                .demo-outlook-thread-container {
                    width: 280px;
                    height: 200px;
                    background: white;
                    border-radius: 12px;
                    overflow: auto;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .demo-outlook-thread-header {
                    padding: 16px;
                    background: #f8f8f8;
                    border-bottom: 1px solid #e0e0e0;
                    font-weight: 600;
                    font-size: 16px;
                }
                .demo-outlook-thread-content {
                    padding: 8px 0;
                }
                .demo-outlook-email-card {
                    margin: 0 12px 8px;
                    padding: 12px;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    max-height: ${maxHeight}px;
                    overflow: hidden;
                    transition: ${reducedMotion ? 'opacity' : 'max-height'} ${duration}ms ease-out;
                    position: relative;
                }
                .demo-outlook-email-card.expanded {
                    max-height: 200px;
                }
                .demo-outlook-email-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 8px;
                    font-size: 12px;
                    font-weight: 600;
                }
                .demo-outlook-email-preview {
                    font-size: 13px;
                    color: #333;
                    opacity: 0.8;
                    transition: opacity ${delay}ms ease-out;
                }
                .demo-outlook-email-full {
                    font-size: 13px;
                    color: #333;
                    line-height: 1.4;
                    opacity: 0;
                    transition: opacity ${delay}ms ease-out;
                    transition-delay: ${delay}ms;
                }
                .demo-outlook-email-card.expanded .demo-outlook-email-preview {
                    opacity: 0;
                }
                .demo-outlook-email-card.expanded .demo-outlook-email-full {
                    opacity: 1;
                }
                .demo-outlook-show-more {
                    position: absolute;
                    bottom: 8px;
                    right: 12px;
                    color: #0078D4;
                    cursor: pointer;
                    font-size: 16px;
                }
                .demo-outlook-email-card.expanded .demo-outlook-show-more {
                    display: none;
                }
            `;
            if (!document.getElementById('outlook-thread-style')) {
                document.head.appendChild(style);
            }
        }
    });

    // ============================================================
    // OUTLOOK MAIL SWIPE ACTIONS DEMO - ENHANCED VERSION
    // ============================================================

    let outlookSwipeState = {
        isRevealed: false,
        isDragging: false,
        startX: 0,
        currentX: 0,
        translateX: 0,
        velocity: 0,
        lastMoveTime: 0,
        animationId: null
    };

    window.DemoRegistry.register('outlook-swipe', {
        render: function(reducedMotion) {
            return `
                <div class="demo-outlook-swipe-container">
                    <div class="demo-outlook-swipe-item" id="outlook-swipe-item">
                        <div class="demo-outlook-swipe-content">
                            <div class="demo-outlook-mail-avatar">JS</div>
                            <div class="demo-outlook-mail-text">
                                <div class="demo-outlook-mail-sender"><strong>John Smith</strong></div>
                                <div class="demo-outlook-mail-subject">Project deadline update</div>
                                <div class="demo-outlook-mail-preview">The new timeline looks good for...</div>
                            </div>
                            <div class="demo-outlook-mail-time">2:30 PM</div>
                        </div>
                        <div class="demo-outlook-swipe-actions" id="outlook-swipe-actions">
                            <div class="demo-outlook-action flag" data-action="flag">
                                <span class="action-icon">🚩</span>
                                <span class="action-label">Flag</span>
                            </div>
                            <div class="demo-outlook-action archive" data-action="archive">
                                <span class="action-icon">📦</span>
                                <span class="action-label">Archive</span>
                            </div>
                            <div class="demo-outlook-action delete" data-action="delete">
                                <span class="action-icon">🗑️</span>
                                <span class="action-label">Delete</span>
                            </div>
                        </div>
                        <div class="demo-outlook-swipe-hint" id="outlook-swipe-hint">
                            ← Swipe or drag to reveal actions
                        </div>
                    </div>
                </div>
            `;
        },

        init: function(params, reducedMotion) {
            this.resetState();
            this.updateStyles(params, reducedMotion);
            this.attachGestureListeners();
        },

        play: function(params, reducedMotion) {
            const item = document.getElementById('outlook-swipe-item');
            if (!item) return;

            this.updateStyles(params, reducedMotion);

            if (outlookSwipeState.isRevealed) {
                this.snapBack();
            } else {
                this.revealActions();
            }
        },

        reset: function(reducedMotion) {
            this.resetState();
            this.removeGestureListeners();

            const item = document.getElementById('outlook-swipe-item');
            const actions = document.getElementById('outlook-swipe-actions');

            if (item && actions) {
                item.style.transition = 'none';
                item.style.transform = 'translateX(0)';
                actions.style.opacity = '0';

                // Reset action individual states
                const actionElements = actions.querySelectorAll('.demo-outlook-action');
                actionElements.forEach(action => {
                    action.style.transform = 'scale(0.8)';
                    action.style.opacity = '0';
                });

                requestAnimationFrame(() => {
                    if (item) item.style.transition = '';
                });
            }
        },

        resetState: function() {
            outlookSwipeState.isRevealed = false;
            outlookSwipeState.isDragging = false;
            outlookSwipeState.translateX = 0;
            outlookSwipeState.velocity = 0;
            if (outlookSwipeState.animationId) {
                cancelAnimationFrame(outlookSwipeState.animationId);
                outlookSwipeState.animationId = null;
            }
        },

        attachGestureListeners: function() {
            const item = document.getElementById('outlook-swipe-item');
            if (!item) return;

            // Remove existing listeners first
            this.removeGestureListeners();

            item.addEventListener('touchstart', this.handleStart.bind(this), { passive: false });
            item.addEventListener('touchmove', this.handleMove.bind(this), { passive: false });
            item.addEventListener('touchend', this.handleEnd.bind(this));

            // Add mouse support for desktop testing
            item.addEventListener('mousedown', this.handleStart.bind(this));
            document.addEventListener('mousemove', this.handleMove.bind(this));
            document.addEventListener('mouseup', this.handleEnd.bind(this));
        },

        removeGestureListeners: function() {
            const item = document.getElementById('outlook-swipe-item');
            if (!item) return;

            item.removeEventListener('touchstart', this.handleStart);
            item.removeEventListener('touchmove', this.handleMove);
            item.removeEventListener('touchend', this.handleEnd);
            item.removeEventListener('mousedown', this.handleStart);
            document.removeEventListener('mousemove', this.handleMove);
            document.removeEventListener('mouseup', this.handleEnd);
        },

        handleStart: function(e) {
            e.preventDefault();
            outlookSwipeState.isDragging = true;

            const touch = e.touches ? e.touches[0] : e;
            outlookSwipeState.startX = touch.clientX;
            outlookSwipeState.currentX = touch.clientX;
            outlookSwipeState.lastMoveTime = Date.now();

            const item = document.getElementById('outlook-swipe-item');
            if (item) {
                item.style.transition = 'none';
            }
        },

        handleMove: function(e) {
            if (!outlookSwipeState.isDragging) return;

            e.preventDefault();
            const touch = e.touches ? e.touches[0] : e;
            const deltaX = touch.clientX - outlookSwipeState.startX;
            const now = Date.now();

            // Calculate velocity (px per ms) - iOS-style calculation
            const timeDelta = now - outlookSwipeState.lastMoveTime;
            if (timeDelta > 0) {
                const currentVel = (touch.clientX - outlookSwipeState.currentX) / timeDelta;
                // Smooth velocity using weighted average (iOS-style)
                outlookSwipeState.velocity = outlookSwipeState.velocity * 0.8 + currentVel * 0.2;
            }
            outlookSwipeState.currentX = touch.clientX;
            outlookSwipeState.lastMoveTime = now;

            // iOS-style elastic resistance curve
            if (deltaX < 0) {
                const maxSwipe = 280; // Increased for iOS feel
                const absDistance = Math.abs(deltaX);

                // iOS rubber-band formula: more realistic resistance
                let resistance;
                if (absDistance <= 100) {
                    resistance = 1.0; // Full movement for first 100px
                } else {
                    const excess = absDistance - 100;
                    resistance = 1.0 - (excess / (excess + 180)); // Asymptotic resistance
                }

                outlookSwipeState.translateX = deltaX * resistance;
            } else {
                // Very minimal rightward movement (iOS doesn't allow reverse swipe)
                outlookSwipeState.translateX = Math.min(deltaX * 0.02, 3);
            }

            this.updatePosition();
        },

        handleEnd: function(e) {
            if (!outlookSwipeState.isDragging) return;

            outlookSwipeState.isDragging = false;

            // iOS-style completion logic
            const distance = outlookSwipeState.translateX;
            const absDistance = Math.abs(distance);
            const velocity = outlookSwipeState.velocity;

            // iOS thresholds
            const minThreshold = 60;  // Minimum distance
            const fullThreshold = 100; // Distance for full reveal
            const velocityThreshold = -0.4; // Velocity threshold (px/ms)

            const item = document.getElementById('outlook-swipe-item');
            if (item) {
                // Use iOS spring timing
                item.style.transition = 'transform 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }

            // iOS completion decision matrix
            const shouldComplete = (
                absDistance >= fullThreshold ||  // Full distance
                (absDistance >= minThreshold && velocity < velocityThreshold) // Minimum + velocity
            );

            if (shouldComplete && distance < 0) {
                this.revealActions();
            } else {
                this.snapBack();
            }
        },

        updatePosition: function() {
            const item = document.getElementById('outlook-swipe-item');
            const actions = document.getElementById('outlook-swipe-actions');

            if (!item || !actions) return;

            item.style.transform = `translateX(${outlookSwipeState.translateX}px)`;

            // iOS-style progressive reveal
            const absDistance = Math.abs(outlookSwipeState.translateX);
            const baseReveal = Math.min(absDistance / 80, 1); // Base opacity curve

            actions.style.opacity = baseReveal;

            // iOS-style staggered action reveal
            const actionElements = actions.querySelectorAll('.demo-outlook-action');
            actionElements.forEach((action, index) => {
                // Each action reveals at different thresholds (iOS style)
                const actionThreshold = 30 + (index * 20); // 30px, 50px, 70px
                const actionProgress = Math.max(0, Math.min(1, (absDistance - actionThreshold) / 30));

                // iOS-style scale animation (0.85 → 1.0)
                const scale = 0.85 + (actionProgress * 0.15);
                action.style.transform = `scale(${scale})`;
                action.style.opacity = actionProgress;

                // Add subtle spring effect when crossing threshold
                if (absDistance >= actionThreshold && !action.classList.contains('revealed')) {
                    action.classList.add('revealed');
                    // Micro bounce effect (iOS-style)
                    action.style.transform = `scale(${scale * 1.05})`;
                    setTimeout(() => {
                        action.style.transform = `scale(${scale})`;
                    }, 100);
                }

                if (absDistance < actionThreshold) {
                    action.classList.remove('revealed');
                }
            });
        },

        revealActions: function() {
            outlookSwipeState.isRevealed = true;
            outlookSwipeState.translateX = -210; // Full reveal distance (iOS standard)

            const item = document.getElementById('outlook-swipe-item');
            const actions = document.getElementById('outlook-swipe-actions');

            if (item && actions) {
                item.style.transform = `translateX(${outlookSwipeState.translateX}px)`;
                actions.style.opacity = '1';

                const actionElements = actions.querySelectorAll('.demo-outlook-action');
                actionElements.forEach((action, index) => {
                    // iOS-style staggered completion with micro-bounce
                    setTimeout(() => {
                        action.style.transform = 'scale(1.05)'; // Slight overshoot
                        action.style.opacity = '1';

                        // Settle back to normal scale
                        setTimeout(() => {
                            action.style.transform = 'scale(1)';
                        }, 80);
                    }, index * 30); // 30ms stagger (iOS timing)
                });
            }
        },

        snapBack: function() {
            outlookSwipeState.isRevealed = false;
            outlookSwipeState.translateX = 0;

            const item = document.getElementById('outlook-swipe-item');
            const actions = document.getElementById('outlook-swipe-actions');

            if (item && actions) {
                item.style.transform = 'translateX(0)';

                // iOS-style fade out with staggered reverse animation
                const actionElements = actions.querySelectorAll('.demo-outlook-action');
                actionElements.forEach((action, index) => {
                    const reverseDelay = (actionElements.length - 1 - index) * 20; // Reverse stagger
                    setTimeout(() => {
                        action.style.transform = 'scale(0.85)';
                        action.style.opacity = '0';
                        action.classList.remove('revealed');
                    }, reverseDelay);
                });

                // Fade out container after actions
                setTimeout(() => {
                    actions.style.opacity = '0';
                }, actionElements.length * 20 + 100);
            }
        },

        updateStyles: function(params, reducedMotion) {
            const threshold = Math.abs(params.swipeThreshold || 80);
            const snapSpeed = (params.snapBackSpeed || 0.35) * 1000; // iOS standard timing
            const actionWidth = params.actionWidth || 60;

            // iOS Spring Physics - Use proper spring curves
            const bezier = reducedMotion
                ? 'ease-out'
                : 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'; // iOS spring curve

            const style = document.getElementById('outlook-swipe-style') || document.createElement('style');
            style.id = 'outlook-swipe-style';
            style.textContent = `
                .demo-outlook-swipe-container {
                    width: 320px;
                    height: var(--ios-cell-height-subtitle);
                    background: var(--ios-secondary-system-grouped-background);
                    border-radius: var(--radius-xl);
                    overflow: hidden;
                    box-shadow: var(--shadow-sm);
                    position: relative;
                    margin: 106px auto;
                    touch-action: pan-y;
                    border: 1px solid var(--ios-separator);
                }
                .demo-outlook-swipe-item {
                    position: relative;
                    background: var(--ios-secondary-system-grouped-background);
                    height: var(--ios-cell-height-subtitle);
                    border-radius: var(--radius-xl);
                    overflow: visible;
                    cursor: grab;
                    user-select: none;
                    z-index: 2;
                    transition: transform ${snapSpeed}ms ${bezier};
                }
                .demo-outlook-swipe-item:active {
                    cursor: grabbing;
                }
                .demo-outlook-swipe-content {
                    display: flex;
                    align-items: center;
                    padding: var(--space-sm) var(--space-md);
                    gap: var(--space-sm);
                    height: 100%;
                    pointer-events: none;
                    border-radius: var(--radius-xl);
                    background: var(--ios-secondary-system-grouped-background);
                }
                .demo-outlook-mail-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: var(--radius-full);
                    background: var(--ios-system-blue);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: var(--font-size-footnote);
                    font-weight: 600;
                    flex-shrink: 0;
                    font-family: var(--font-family);
                }
                .demo-outlook-mail-text {
                    flex: 1;
                    min-width: 0;
                }
                .demo-outlook-mail-sender {
                    font-size: var(--font-size-subheadline);
                    font-weight: 590; /* iOS medium weight */
                    color: var(--ios-label);
                    margin-bottom: 1px;
                    font-family: var(--font-family);
                    line-height: 1.2;
                }
                .demo-outlook-mail-subject {
                    font-size: var(--font-size-footnote);
                    color: var(--ios-label);
                    margin-bottom: 1px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-family: var(--font-family);
                    line-height: 1.2;
                }
                .demo-outlook-mail-preview {
                    font-size: var(--font-size-footnote);
                    color: var(--ios-secondary-label);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-family: var(--font-family);
                    line-height: 1.2;
                }
                .demo-outlook-mail-time {
                    font-size: var(--font-size-caption1);
                    color: var(--ios-secondary-label);
                    flex-shrink: 0;
                    font-family: var(--font-family);
                    font-weight: 400;
                }
                .demo-outlook-swipe-actions {
                    position: absolute;
                    right: 0;
                    top: 0;
                    height: var(--ios-cell-height-subtitle);
                    width: 192px; /* 3 actions × 64px */
                    display: flex;
                    z-index: 1;
                    opacity: 0;
                    border-radius: 0 var(--radius-xl) var(--radius-xl) 0;
                    overflow: hidden;
                }
                .demo-outlook-action {
                    width: 64px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: var(--font-size-caption1);
                    font-weight: 590;
                    text-align: center;
                    cursor: pointer;
                    transition: all var(--transition-micro);
                    transform: scale(0.85);
                    opacity: 0;
                    font-family: var(--font-family);
                }
                .demo-outlook-action .action-icon {
                    font-size: 18px;
                    margin-bottom: 2px;
                    line-height: 1;
                }
                .demo-outlook-action .action-label {
                    font-size: var(--font-size-caption1);
                    line-height: 1;
                    font-weight: 590;
                }
                .demo-outlook-action.flag {
                    background: var(--outlook-flag);
                }
                .demo-outlook-action.flag:hover {
                    background: #E68900;
                    transform: scale(0.95);
                }
                .demo-outlook-action.archive {
                    background: var(--outlook-archive);
                }
                .demo-outlook-action.archive:hover {
                    background: #0056CC;
                    transform: scale(0.95);
                }
                .demo-outlook-action.delete {
                    background: var(--outlook-delete);
                }
                .demo-outlook-action.delete:hover {
                    background: #D70015;
                    transform: scale(0.95);
                }
                .demo-outlook-swipe-hint {
                    position: absolute;
                    bottom: -28px;
                    left: 0;
                    right: 0;
                    text-align: center;
                    font-size: var(--font-size-caption1);
                    color: var(--ios-tertiary-label);
                    opacity: 0.8;
                    font-family: var(--font-family);
                    font-weight: 400;
                }

                /* iOS-style focus states for accessibility */
                .demo-outlook-swipe-item:focus-visible {
                    outline: 2px solid var(--ios-system-blue);
                    outline-offset: 2px;
                }

                /* Reduce motion support */
                @media (prefers-reduced-motion: reduce) {
                    .demo-outlook-swipe-item {
                        transition: transform 200ms ease-out;
                    }
                    .demo-outlook-action {
                        transition: background-color 150ms ease-out, transform 150ms ease-out;
                    }
                }
            `;
            if (!document.getElementById('outlook-swipe-style')) {
                document.head.appendChild(style);
            }
        }
    });

    window.DemoRegistry.register('outlook-calendar', {
        render: function(reducedMotion) {
            return `
                <div class="demo-outlook-calendar-container" id="outlook-calendar-container">
                    <div class="demo-outlook-calendar-view day" id="outlook-calendar-view">
                        <div class="demo-outlook-calendar-header">Day View</div>
                        <div class="demo-outlook-calendar-content">
                            <div class="demo-outlook-event">Team Meeting</div>
                            <div class="demo-outlook-event">Project Review</div>
                        </div>
                    </div>
                    <div style="padding: 8px; text-align: center; color: #666; font-size: 12px;">
                        Tap "Play" to switch to Week View
                    </div>
                </div>
            `;
        },
        init: function() {},
        play: function() {
            const view = document.getElementById('outlook-calendar-view');
            if (view && view.classList.contains('day')) {
                view.className = 'demo-outlook-calendar-view week';
                view.innerHTML = `
                    <div class="demo-outlook-calendar-header">Week View</div>
                    <div class="demo-outlook-calendar-content" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px;">
                        <div class="demo-outlook-event small">Mon: Meeting</div>
                        <div class="demo-outlook-event small">Tue: Review</div>
                        <div class="demo-outlook-event small">Wed: Call</div>
                    </div>
                `;
            } else if (view) {
                view.className = 'demo-outlook-calendar-view day';
                view.innerHTML = `
                    <div class="demo-outlook-calendar-header">Day View</div>
                    <div class="demo-outlook-calendar-content">
                        <div class="demo-outlook-event">Team Meeting</div>
                        <div class="demo-outlook-event">Project Review</div>
                    </div>
                `;
            }
        },
        reset: function() {
            this.init();
        }
    });

    // Add minimal styles for the calendar demo
    const calendarStyles = document.createElement('style');
    calendarStyles.textContent = `
        .demo-outlook-calendar-container {
            width: 280px;
            height: 140px;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .demo-outlook-calendar-view {
            padding: 16px;
            height: 100px;
            transition: all 300ms ease-out;
        }
        .demo-outlook-calendar-header {
            font-weight: 600;
            margin-bottom: 12px;
            color: #0078D4;
        }
        .demo-outlook-event {
            padding: 6px 8px;
            background: #e8f4fd;
            color: #0078D4;
            border-radius: 4px;
            margin-bottom: 4px;
            font-size: 12px;
        }
        .demo-outlook-event.small {
            font-size: 10px;
            padding: 4px 6px;
        }
    `;
    document.head.appendChild(calendarStyles);

})();