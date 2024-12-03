/* Ensure the animation runs on page load */
document.addEventListener('DOMContentLoaded', function () {
	const hotPicks = document.getElementById('hotPicks');
	if (hotPicks) {
		hotPicks.style.animationPlayState = 'running';
	}
});


document.addEventListener('DOMContentLoaded', () => {
	const header = document.querySelector('.header');
	let lastScrollTop = 0;
  
	window.addEventListener('scroll', () => {
	  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
	  if (scrollTop > lastScrollTop) {
		// Scroll down - hide the header
		header.style.top = '-55px'; // Move header up
	  } else {
		// Scroll up - show the header
		header.style.top = '0';
	  }
	  lastScrollTop = scrollTop;
	});
  });
  