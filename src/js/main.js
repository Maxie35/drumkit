'use strict'

window.addEventListener('keydown', (e) => {

	/* Get the audio and key elements belonging to the pressed key */
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
	const keys = document.querySelectorAll('.key');

	/* Return when the pressed key has no audio */
	if(!audio) return;

	audio.currentTime = 0; // Restart the sample each time the button is pressed
	audio.play();

	/* Now add the css classes to the keys for animation */
	key.classList.add('playing');

	/* And wait for the transition to end */
	keys.forEach(key => key.addEventListener('transitionend', removeTransition));
});

function removeTransition(e) {
	if(e.propertyName !== 'transform') return;
	this.classList.remove('playing');
};