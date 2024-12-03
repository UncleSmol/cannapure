document.addEventListener('DOMContentLoaded', () => {
	const DELAY_BETWEEN_CARDS = 3000; // 3 seconds delay
	let cardCount = 0; // Keep track of total cards for timing

	// Create Intersection Observer
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// Get card's index from dataset
					const cardIndex = parseInt(entry.target.dataset.cardIndex);
					// Calculate delay based on card index
					const delay = cardIndex * DELAY_BETWEEN_CARDS;

					// Start animation with calculated delay
					setTimeout(() => {
						startScrollAnimation(entry.target);
					}, delay);
				} else {
					stopScrollAnimation(entry.target);
				}
			});
		},
		{
			threshold: 0.5,
		}
	);

	function startScrollAnimation(card) {
		if (card.scrollHeight <= card.clientHeight) return;

		let scrolling = true;
		let position = 0;
		const scrollSpeed = 1;
		const resetDelay = 1000;

		function animate() {
			if (!scrolling) return;

			position += scrollSpeed;
			card.scrollTop = position;

			if (position >= card.scrollHeight - card.clientHeight) {
				setTimeout(() => {
					position = 0;
					card.scrollTop = 0;
				}, resetDelay);
			}

			card.dataset.animationFrame = requestAnimationFrame(animate);
		}

		animate();
	}

	function stopScrollAnimation(card) {
		if (card.dataset.animationFrame) {
			cancelAnimationFrame(Number(card.dataset.animationFrame));
			card.dataset.animationFrame = null;
		}
	}

	// Function to initialize new cards
	function initializeCard(card) {
		// Assign index to card for delay calculation
		card.dataset.cardIndex = cardCount++;
		observer.observe(card);
	}

	// Initialize existing cards
	document.querySelectorAll('.team-card').forEach((card) => {
		initializeCard(card);
	});

	// Set up MutationObserver to watch for new cards
	const containerObserver = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			mutation.addedNodes.forEach((node) => {
				if (node.classList && node.classList.contains('team-card')) {
					initializeCard(node);
				}
			});
		});
	});

	// Start observing the container for new cards
	const container = document.querySelector('.team-container');
	containerObserver.observe(container, {
		childList: true, // Watch for added/removed cards
		subtree: true, // Watch nested elements
	});
});
