/**
 * ============================================================
 * DEMO REGISTRY
 *
 * Central registry for all motion pattern demos.
 * Each demo must implement:
 * - render(reducedMotion): returns HTML string for the demo
 * - init(params, reducedMotion): initialize the demo
 * - play(params, reducedMotion): trigger the animation
 * - reset(reducedMotion): reset to initial state
 * ============================================================
 */

(function() {
    'use strict';

    // Demo storage
    const demos = {};

    /**
     * Register a demo implementation
     * @param {string} id - Demo identifier (matches pattern.demoId)
     * @param {object} implementation - Demo implementation object
     */
    function register(id, implementation) {
        if (!id || typeof id !== 'string') {
            console.error('Demo registration requires a string ID');
            return;
        }

        if (!implementation || typeof implementation !== 'object') {
            console.error(`Demo "${id}" requires an implementation object`);
            return;
        }

        if (typeof implementation.render !== 'function') {
            console.error(`Demo "${id}" must have a render() method`);
            return;
        }

        demos[id] = implementation;
        console.log(`Registered demo: ${id}`);
    }

    /**
     * Get a demo implementation by ID
     * @param {string} id - Demo identifier
     * @returns {object|null} Demo implementation or null
     */
    function get(id) {
        return demos[id] || null;
    }

    /**
     * Check if a demo exists
     * @param {string} id - Demo identifier
     * @returns {boolean}
     */
    function has(id) {
        return id in demos;
    }

    /**
     * List all registered demo IDs
     * @returns {string[]}
     */
    function list() {
        return Object.keys(demos);
    }

    // Expose global API
    window.DemoRegistry = {
        register,
        get,
        has,
        list
    };

})();
