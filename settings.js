// Function to check if all input fields are empty
function areAllFieldsEmpty(form) {
    for (let i = 0; i < form.elements.length; i++) {
        const input = form.elements[i];
        if (input.tagName === 'INPUT' && input.type !== 'button' && input.value.trim() !== '') {
            return false; // At least one field is not empty
        }
    }
    return true; // All fields are empty
}

// Get the form and submit button elements
const form = document.getElementById('profileForm');
const submitButton = document.getElementById('submit-button');

if (form && submitButton) {
    // Add an input event listener to the form
    form.addEventListener('input', function () {
        submitButton.disabled = areAllFieldsEmpty(form);
    });

    // Initial check to disable the button if all fields are empty on page load
    submitButton.disabled = areAllFieldsEmpty(form);
}

function saveChanges() {
    alert('Profile Successfully Updated!');

    // Reset all fields in the form
    const form = document.getElementById('profileForm');
    if (form) {
        form.reset();
    }

    // Re-disable the button after resetting the form
    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.disabled = true;
    }
}