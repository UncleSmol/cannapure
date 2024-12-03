document.addEventListener('DOMContentLoaded', () => {
	const sections = {
	  outdoor_strains: 'outdoorLab',
	  normal_strains: 'normalStrainLab',
	  greenhouse_strains: 'greenhouseLab',
	  aaa_greenhouse_strains: 'aaaGreenhouseLab',
	  aaa_indoor_strains: 'aaaGradeIndoorLab',
	  pre_rolled: 'preRolledLab',
	  extracts_and_vapes: 'extractsAndVapesLab',
	  edibles: 'ediblesLab',
	};
  
	// Function to create a strain card element
	function createStrainCard(record) {
	  const card = document.createElement('div');
	  card.classList.add('strain-card');
	  card.innerHTML = `
		<div class="strain-image">
		  <img src="${record.image_url}" alt="${record.strain_name}" />
		</div>
		<div class="strain-text-card">
		  <h1 class="strain-name">${record.strain_name}</h1>
		  <p class="selling-price">${record.selling_price}</p>
		  <p class="strain-description">${record.description}</p>
		  <p class="strain-availability" style="text-align: right; padding-right: 5pt; font-size: 11pt; font-style: italic;">${getAvailabilityText(record.availability)}</p>
		</div>
	  `;
	  return card;
	}
  
	// Function to get availability text and color
	function getAvailabilityText(availability) {
	  if (availability > 10) {
		return '<span style="color: green;">Available</span>';
	  } else if (availability > 0) {
		return '<span style="color: orange;">Running Out</span>';
	  } else {
		return '<span style="color: red;">Out of Stock</span>';
	  }
	}
  
	// Function to populate a section with data
	async function populateSection(sectionId, endpoint) {
	  try {
		const response = await fetch(`/api/${endpoint}`);
		const data = await response.json();
		console.log(`Data fetched for ${sectionId}:`, data);  // Log the fetched data
		if (!data.length) {
		  console.warn(`No data returned from ${endpoint}`);
		  return;
		}
		const section = document.getElementById(sectionId);
		if (!section) {
		  console.error(`Section with ID ${sectionId} not found`);
		  return;
		}
		const container = section.querySelector('.strainContainer');
		if (!container) {
		  console.error(`Container with class 'strainContainer' not found in section ${sectionId}`);
		  return;
		}
		container.innerHTML = ''; // Clear existing content
		data.forEach((record) => {
		  if (record.availability > 0) {
			// Only display items in stock
			const card = createStrainCard(record);
			console.log(`Adding card for ${record.strain_name}`);  // Log each added card
			container.appendChild(card);
		  }
		});
	  } catch (error) {
		console.error(`Error fetching data for ${sectionId}:`, error);
	  }
	}
  
	// Populate each section dynamically
	Object.entries(sections).forEach(([endpoint, sectionId]) => {
	  populateSection(sectionId, endpoint);
	});
  });
  