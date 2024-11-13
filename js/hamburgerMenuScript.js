// Select the hamburger menu and navbar elements
const hamburgerMenu = document.getElementById('hamburgerMenu'); // Use the ID from your HTML
const navbar = document.querySelector('.navbar'); // Select the navbar using its class

// Check if both elements exist before adding the event listener
if (hamburgerMenu && navbar) {
	hamburgerMenu.addEventListener('click', () => {
		// Check if the navbar is currently displayed
		if (navbar.style.display === 'flex') {
			// Apply slide-up animation
			navbar.style.animation = 'slideUp 0.5s forwards'; // Trigger slide-up animation
			// Use a timeout to wait for the animation to finish before hiding the navbar
			setTimeout(() => {
				navbar.style.display = 'none'; // Hide the navbar after the animation
				navbar.style.animation = ''; // Reset animation
			}, 500); // Match this duration to your animation duration
		} else {
			// Show the navbar with slide-down animation
			navbar.style.display = 'flex'; // Show the navbar
			navbar.style.animation = 'slideDown 0.5s forwards'; // Trigger slide-down animation
		}
		// Optional: Update ARIA attributes for accessibility
		const isActive = navbar.style.display === 'flex';
		hamburgerMenu.setAttribute('aria-expanded', isActive);
	});

	// Close the navbar when a selection is made
	const navbarItems = navbar.querySelectorAll('a'); // Assuming your selections are anchor tags (<a>)
	navbarItems.forEach((item) => {
		item.addEventListener('click', () => {
			// Apply slide-up animation
			navbar.style.animation = 'slideUp 0.5s forwards'; // Trigger slide-up animation
			// Use a timeout to wait for the animation to finish before hiding the navbar
			setTimeout(() => {
				navbar.style.display = 'none'; // Hide the navbar after the animation
				navbar.style.animation = ''; // Reset animation
			}, 500); // Match this duration to your animation duration

			// Update ARIA attributes for accessibility
			hamburgerMenu.setAttribute('aria-expanded', 'false');
		});
	});
}
