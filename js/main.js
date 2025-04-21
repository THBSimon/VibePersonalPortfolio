/**
 * Main JavaScript file
 * Author: John Doe
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Variables
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('backToTop');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const yearSpan = document.getElementById('year');
    
    // Initialize the current year in the footer
    yearSpan.textContent = new Date().getFullYear();
    
    // Typed text animation for hero subtitle
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    const textArray = ["Web Developer", "UI/UX Designer", "Problem Solver", "Creative Thinker"];
    let typingDelay = 100;
    let erasingDelay = 50;
    let newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;
    
    // Typing function
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }
    
    // Erasing function
    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    // Start the typing animation if the element exists
    if(typedTextSpan) {
        setTimeout(type, newTextDelay + 250);
    }
    
    // Toggle navigation menu
    if(menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Close menu when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Set active nav link
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Header scroll effect
    function headerScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Back to top button visibility
    function scrollFunction() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
    
    // Tabs functionality
    tabBtns.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the tab content to show
            const tabId = this.getAttribute('data-tab');
            const tabContent = document.querySelectorAll('.tab-pane');
            
            // Hide all tab content
            tabContent.forEach(content => content.classList.remove('active'));
            
            // Show the selected tab content
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Skills animation
    const skillLevels = document.querySelectorAll('.skill-level');
    
    // Function to animate skill bars when they are in viewport
    function animateSkills() {
        const skills = document.querySelector('.skills');
        if (!skills) return;
        
        const skillsPosition = skills.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (skillsPosition < screenPosition) {
            skillLevels.forEach(skill => {
                const width = skill.getAttribute('data-width');
                skill.style.width = width;
            });
        }
    }
    
    // Set initial width to 0 and store original width
    skillLevels.forEach(skill => {
        const originalWidth = skill.style.width;
        skill.setAttribute('data-width', originalWidth);
        skill.style.width = '0%';
    });
    
    // Call animation on scroll
    window.addEventListener('scroll', animateSkills);
    
    // Call once on page load to check if skills are already in viewport
    setTimeout(animateSkills, 500);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip empty anchors or direct # links
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active section highlighting
    function highlightNav() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Event Listeners
    window.addEventListener('scroll', function() {
        headerScroll();
        scrollFunction();
        highlightNav();
    });
    
    // Initialize functions on page load
    headerScroll();
    scrollFunction();
    highlightNav();
});
