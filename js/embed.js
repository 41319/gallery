function populateInputsFromQueryString() {
    // Get all input elements with an id attribute
    const inputs = document.querySelectorAll('input[id], textarea[id], select[id]');
    
    // Parse the query string
    const queryParams = new URLSearchParams(window.location.search);
    
    // Iterate through each input element
    inputs.forEach(input => {
        const inputId = input.id;
        
        // Check if query string has a parameter with the same name as the input's id
        if (queryParams.has(inputId)) {
            // Set the input's value to the query parameter value
            input.value = queryParams.get(inputId);
            
            // Trigger change event in case any listeners are attached
            const event = new Event('change');
            input.dispatchEvent(event);
        }
    });
}

// Run the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', populateInputsFromQueryString);
