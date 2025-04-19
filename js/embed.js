/**
 * Combined Utility Script
 * Includes:
 * - Parent window messaging functionality
 * - Query string parameter binding to form inputs
 */

const AppUtils = (function() {
    // Private variables for messaging
    let messageHandlers = {};
    let targetOrigin = '*'; // Default to any origin (override for production)

    // ========================
    // Parent Messaging Functions
    // ========================

    /**
     * Initialize the messenger
     * @param {string} origin - The target origin for postMessage (for security)
     */
    function initMessaging(origin) {
        if (origin) {
            targetOrigin = origin;
        }
        
        // Setup message listener
        window.addEventListener('message', handleIncomingMessage);
    }

    /**
     * Send a message to the parent window
     * @param {string} type - Message type/identifier
     * @param {object} data - The message payload
     */
    function sendToParent(type, data = {}) {
        if (!window.parent) {
            console.warn('No parent window detected');
            return;
        }

        const message = {
            type,
            data,
            timestamp: Date.now()
        };

        window.parent.postMessage(message, targetOrigin);
    }

    /**
     * Register a handler for specific message types from parent
     * @param {string} type - Message type to handle
     * @param {function} handler - Callback function
     */
    function onMessageFromParent(type, handler) {
        messageHandlers[type] = handler;
    }

    /**
     * Handle incoming messages from parent
     * @param {MessageEvent} event 
     */
    function handleIncomingMessage(event) {
        // Verify origin if targetOrigin is specific
        if (targetOrigin !== '*' && event.origin !== targetOrigin) {
            return;
        }

        const { type, data } = event.data;
        
        if (type && messageHandlers[type]) {
            messageHandlers[type](data, event);
        }
    }

    // ========================
    // Query String Functions
    // ========================

    /**
     * Populates form inputs from query string parameters
     */
    function populateInputsFromQueryString() {
        // Get all input elements with an id attribute
        const inputs = document.querySelectorAll('input[id], textarea[id], select[id]');
        
        // Parse the query string
        const queryParams = new URLSearchParams(window.location.search);
        
        // Track if any parameters were bound
        let paramsBound = false;
        
        // Iterate through each input element
        inputs.forEach(input => {
            const inputId = input.id;
            
            // Check if query string has a parameter with the same name as the input's id
            if (queryParams.has(inputId)) {
                // Set the input's value to the query parameter value
                input.value = queryParams.get(inputId);
                paramsBound = true;
                
                // Trigger change event in case any listeners are attached
                const event = new Event('change');
                input.dispatchEvent(event);
            }
        });

        // Fire custom event if any parameters were bound
        if (paramsBound) {
            const paramsBindEvent = new CustomEvent('paramsBind', {
                detail: {
                    params: Object.fromEntries(queryParams.entries())
                }
            });
            document.dispatchEvent(paramsBindEvent);
        }
    }

    // Initialize on DOM load
    document.addEventListener('DOMContentLoaded', function() {
        populateInputsFromQueryString();
    });

    // Public API
    return {
        // Messaging functions
        initMessaging,
        sendToParent,
        onMessageFromParent,
        
        // Query string functions
        populateInputsFromQueryString
    };
})();

// Example usage:
// Initialize messaging with target origin
// AppUtils.initMessaging('https://your-parent-domain.com');

// Send message to parent
// AppUtils.sendToParent('USER_ACTION', { action: 'form_submitted' });

// Listen for messages from parent
// AppUtils.onMessageFromParent('CONFIG_UPDATE', (data) => {
//     console.log('Config updated:', data);
// });

// Manually trigger query string parsing if needed
// AppUtils.populateInputsFromQueryString();
