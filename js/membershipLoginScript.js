// Get the necessary elements
const membershipDigitalCard = document.getElementById('memebershipLogin');
const loginAside = document.getElementById('membershipDigitalCard');
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
membershipDigitalCard.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    showLoginForm();
});

// Add click event listener to the document to detect clicks outside the login form
document.addEventListener('click', function (e) {
    if (
        loginAside.style.display === 'grid' &&
        !loginAside.contains(e.target) &&
        e.target !== membershipDigitalCard
    ) {
        hideLoginForm();
    }
});

// Prevent form from closing when clicking inside it
loginAside.addEventListener('click', function (e) {
    e.stopPropagation();
});

document.addEventListener('DOMContentLoaded', () => {
    const membershipNumberInput = document.getElementById('membershipNumber');
    const submitButton = document.getElementById('submitMembership');

    // Handle membership number change
    membershipNumberInput.addEventListener('change', async () => {
        const membershipNumber = membershipNumberInput.value.trim();
        if (membershipNumber) {
            try {
                const response = await fetch(`/api/membership/${membershipNumber}`);
                if (response.ok) {
                    const data = await response.json();
                    membershipNumberInput.value = data.membership_number;
                    document.getElementById('renewalDueDate').textContent = formatDate(data.renewal_due_date);
                    const statusElement = document.getElementById('membershipStatus');
                    statusElement.textContent = data.status;
                    statusElement.style.color = data.status.toLowerCase() === 'active' ? 'green' : 'red';
                    document.getElementById('memberSince').textContent = formatDate(data.member_since);
                    document.getElementById('daysSince').textContent = calculateDaysSince(data.member_since, data.renewal_due_date);

                    // Disable further input
                    membershipNumberInput.readOnly = true;

                    // Hide the submit button
                    submitButton.style.display = 'none';
                } else {
                    alert('Membership number not found.');
                }
            } catch (error) {
                console.error('Error fetching membership data:', error);
            }
        }
    });
});

// Helper function to format date as YYYY/MM/DD
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
}

// Helper function to calculate days since the member joined or since renewal date
function calculateDaysSince(memberSince, renewalDueDate) {
    const today = new Date();
    const startDate = new Date(memberSince);
    const endDate = new Date(renewalDueDate);
    const referenceDate = today > endDate ? endDate : today;
    const timeDiff = referenceDate - startDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return `That's ${daysDiff} days with us`;
}
