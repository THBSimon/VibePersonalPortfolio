/**
 * Form Validation JavaScript
 * Author: John Doe
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Get form elements
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Get error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    const formStatus = document.getElementById('formStatus');
    
    // Regex patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validation functions
    const validateName = () => {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameInput.classList.add('error');
            return false;
        } else if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            nameInput.classList.add('error');
            return false;
        } else {
            nameError.textContent = '';
            nameInput.classList.remove('error');
            return true;
        }
    };
    
    const validateEmail = () => {
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            emailInput.classList.add('error');
            return false;
        } else if (!emailPattern.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.classList.add('error');
            return false;
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('error');
            return true;
        }
    };
    
    const validateSubject = () => {
        if (subjectInput.value.trim() === '') {
            subjectError.textContent = 'Subject is required';
            subjectInput.classList.add('error');
            return false;
        } else if (subjectInput.value.trim().length < 3) {
            subjectError.textContent = 'Subject must be at least 3 characters';
            subjectInput.classList.add('error');
            return false;
        } else {
            subjectError.textContent = '';
            subjectInput.classList.remove('error');
            return true;
        }
    };
    
    const validateMessage = () => {
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Message is required';
            messageInput.classList.add('error');
            return false;
        } else if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            messageInput.classList.add('error');
            return false;
        } else {
            messageError.textContent = '';
            messageInput.classList.remove('error');
            return true;
        }
    };
    
    // Add event listeners for real-time validation
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    subjectInput.addEventListener('blur', validateSubject);
    messageInput.addEventListener('blur', validateMessage);
    
    // Reset form status on input
    const inputs = [nameInput, emailInput, subjectInput, messageInput];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            formStatus.style.display = 'none';
            formStatus.classList.remove('success', 'error');
        });
    });
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        // If all fields are valid, submit the form
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Prepare form data for API submission
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim()
            };
            
            // Display loading message
            formStatus.textContent = 'Sending your message...';
            formStatus.classList.remove('success', 'error');
            formStatus.classList.add('info');
            formStatus.style.display = 'block';
            
            // Send data to the API endpoint
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show success message
                    formStatus.textContent = data.message || 'Thank you! Your message has been sent successfully.';
                    formStatus.classList.remove('info', 'error');
                    formStatus.classList.add('success');
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    // Show error message from API
                    formStatus.textContent = data.error || 'Something went wrong. Please try again.';
                    formStatus.classList.remove('info', 'success');
                    formStatus.classList.add('error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                formStatus.textContent = 'Network error. Please try again later.';
                formStatus.classList.remove('info', 'success');
                formStatus.classList.add('error');
            })
            .finally(() => {
                // Scroll to the form status
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        } else {
            // Show error message
            formStatus.textContent = 'Please check the form for errors and try again.';
            formStatus.classList.remove('info', 'success');
            formStatus.classList.add('error');
            formStatus.style.display = 'block';
        }
    });
});
