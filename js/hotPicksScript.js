// Get the container where the hot picks will be added
const hotPicksWrapper = document.querySelector('.hot-picks-wrapper');

// Function to create a hot-pick div element
function createHotPick(record) {
  const hotPickDiv = document.createElement('div');
  hotPickDiv.classList.add('hot-picks');

  const imageDiv = document.createElement('div');
  imageDiv.classList.add('hot-picks-image');
  const img = document.createElement('img');
  img.src = record.image_url;  // Assuming the image URL is correct
  img.alt = record.strain_name;
  imageDiv.appendChild(img);

  const textCardDiv = document.createElement('div');
  textCardDiv.classList.add('text-card');
  textCardDiv.innerHTML = `
    <p class="strain-type">${record.strain_type}</p>
    <p class="thc-percent">${record.thc_percent}</p>
    <p class="strain-class">${record.strain_class}</p>
    <p class="rating">${record.rating}</p>
    <p class="strain-name">${record.strain_name}</p>
    <p class="strain-price">${record.strain_price}</p>
  `;
  hotPickDiv.appendChild(imageDiv);
  hotPickDiv.appendChild(textCardDiv);

  return hotPickDiv;
}

// Function to populate the hot-picks based on records
function populateHotPicks(records) {
  hotPicksWrapper.innerHTML = '';  // Clear any existing content
  records.forEach((record) => {
    const hotPickDiv = createHotPick(record);
    hotPicksWrapper.appendChild(hotPickDiv);
  });
}

// Fetch the records from the server and populate the hot-picks
fetch('/api/hot_picks')
  .then((response) => response.json())
  .then((records) => {
    populateHotPicks(records);  // Populate the page with the fetched records
  })
  .catch((error) => console.error('Error fetching hot-picks:', error));

  