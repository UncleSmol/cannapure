/* Ensure the animation runs on page load */
document.addEventListener('DOMContentLoaded', function () {
	const hotPicks = document.getElementById('hotPicks');
	if (hotPicks) {
		hotPicks.style.animationPlayState = 'running';
	}
});
