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

    // Run the function when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', populateInputsFromQueryString);
