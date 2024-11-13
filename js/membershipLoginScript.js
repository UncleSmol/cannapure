// Get the necessary elements
const membershipLogin = document.getElementById('memebershipLogin');
const loginAside = document.getElementById('memberLogin');
const mainContent = document.querySelector('main');

// Function to show the login form and hide the main content
function showLoginForm() {
	// Set the login form to display as grid
	loginAside.style.display = 'grid';

	// Hide the main content
	mainContent.style.filter = 'blur(5px)';
	mainContent.style.opacity = '0.6';

	// Ensure the login form is visible and positioned correctly
	loginAside.style.position = 'fixed';
	loginAside.style.top = '50%';
	loginAside.style.left = '50%';
	loginAside.style.transform = 'translate(-50%, -50%)';
	loginAside.style.zIndex = '1000';
}

// Function to hide the login form and show the main content
function hideLoginForm() {
	// Hide the login form
	loginAside.style.display = 'none';

	// Show the main content
	mainContent.style.filter = 'none';
	mainContent.style.opacity = '1';
}

// Add click event listener to the membership login link
membershipLogin.addEventListener('click', function (e) {
	e.preventDefault(); // Prevent default anchor behavior
	showLoginForm();
});

// Add click event listener to the document to detect clicks outside the login form
document.addEventListener('click', function (e) {
	if (
		loginAside.style.display === 'grid' &&
		!loginAside.contains(e.target) &&
		e.target !== membershipLogin
	) {
		hideLoginForm();
	}
});

// Prevent form from closing when clicking inside it
loginAside.addEventListener('click', function (e) {
	e.stopPropagation();
});
