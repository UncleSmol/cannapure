document.addEventListener('DOMContentLoaded', () => {
	const page404 = document.getElementById('page404');
	const closePage404Button = document.getElementById('closePage404');
	const mainContent = document.querySelector('main');

	// Function to show the 404 modal
	function showPage404() {
		page404.style.display = 'flex'; // Show modal with flex display
		mainContent.style.filter = 'blur(5px)'; // Apply blur effect
		mainContent.style.opacity = '0.6'; // Reduce opacity for effect
	}

	// Function to hide the 404 modal
	function hidePage404() {
		page404.style.display = 'none'; // Hide modal
		mainContent.style.filter = 'none'; // Remove blur effect
		mainContent.style.opacity = '1'; // Reset opacity
	}

	// Event listener for the close button
	closePage404Button.addEventListener('click', () => {
		hidePage404();
		window.history.back(); // Navigate back to the previous page
	});

	// Select all anchors that should trigger the 404 modal
	const page404Links = document.querySelectorAll('a[href="#page404"]');

	// Attach event listener to each link
	page404Links.forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault(); // Prevent default anchor behavior
			showPage404();
		});
	});
});
