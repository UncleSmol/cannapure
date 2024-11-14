/* Ensure the animation runs on page load */
document.addEventListener('DOMContentLoaded', function () {
	const hotPicks = document.getElementById('hotPicks');
	if (hotPicks) {
		hotPicks.style.animationPlayState = 'running';
	}
});

document.addEventListener('DOMContentLoaded', () => {
	const hotPicks = document.querySelectorAll('.hot-picks');

	function handleScroll() {
		hotPicks.forEach((card) => {
			const rect = card.getBoundingClientRect();
			const inView = rect.left >= 0 && rect.right <= window.innerWidth;

			if (inView) {
				card.style.transform = 'scale(1)'; // Scale up when in view
			} else {
				card.style.transform = 'scale(0.9)'; // Scale down when out of view
			}
		});
	}

	const wrapper = document.querySelector('.hot-picks-wrapper');
	wrapper.addEventListener('scroll', handleScroll);

	// Initial check
	handleScroll();
});
