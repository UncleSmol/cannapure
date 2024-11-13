document.addEventListener('DOMContentLoaded', () => {
	const sections = document.querySelectorAll('section.section'); // Assuming all target sections have the class "section"
	const buttons = document.querySelectorAll('#labContainer .lab-child');

	// Function to hide all sections
	function hideAllSections() {
		sections.forEach((section) => {
			section.style.display = 'none';
		});
	}

	// Initially hide all sections
	hideAllSections();

	// Add click event listeners to each button
	buttons.forEach((button) => {
		button.addEventListener('click', () => {
			// Determine the correct section ID based on the button clicked
			let sectionId;
			if (button.id === 'normalStrainsButton') {
				sectionId = 'normalStrainLab'; // Specific ID for Normal Strains section
			} else {
				sectionId = button.id.replace('Button', 'Lab'); // For other sections following the naming convention
			}
			const targetSection = document.getElementById(sectionId);

			// Toggle the display of the target section
			if (targetSection) {
				if (targetSection.style.display === 'block') {
					targetSection.style.display = 'none'; // Hide if currently visible
				} else {
					hideAllSections(); // Hide all sections first
					targetSection.style.display = 'block'; // Show the selected section

					// Scroll into view with an offset for the paragraph
					const pTag = targetSection.querySelector('p'); // Assuming the <p> is the first element in the section

					// Scroll to the section and adjust for the 8pt margin
					const offset = 60; // 8pt margin
					const elementPosition =
						targetSection.getBoundingClientRect().top + window.scrollY;
					const offsetPosition = elementPosition - offset;

					window.scrollTo({
						top: offsetPosition,
						behavior: 'smooth',
					});
				}
			}
		});
	});
});
