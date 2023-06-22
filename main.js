import gsap from 'gsap';
import imagesLoaded from 'imagesloaded';
import * as header from './header';

const slides = document.querySelectorAll('section div.slides');

slides.forEach(slide => {
	let current = 0;
	let z = 100000000;

	const images = slide.querySelectorAll('img');

	images.forEach(image => {
		z = z - 1;
		image.style.zIndex = z;
	});

	gsap.set(images, { opacity: 0 });

	imagesLoaded(images, () => {
		const timeline = gsap.timeline();

		timeline
			.set(images, {
				x: () => {
					return 500 * Math.random() - 250;
				},
				y: '151%',
				rotation: () => {
					return 45 * Math.random() - 45 / 2;
				},
				opacity: 1,
			})
			.to(images, {
				x: 0,
				y: 0,
				stagger: -0.25,
			})
			.to(images, {
				rotation: () => {
					return 16 * Math.random() - 8;
				},
			});
	});

	slide.addEventListener('click', e => {
		z -= 1;

		let direction = '150%';
		let midAngle = 15;

		if (Math.random() > 0.5) {
			direction = '-150%';
			midAngle = -15;
		}

		const currentImage = images[current];
		const flipTimeLine = gsap.timeline();

		flipTimeLine
			.set(currentImage, { x: 0 })
			.to(currentImage, {
				x: direction,
				rotation: midAngle,
				rotationY: 30,
				scale: 1.1,
			})
			.set(currentImage, { zIndex: z })
			.to(currentImage, {
				x: 0,
				rotation: () => {
					return 16 * Math.random() - 8;
				},
				rotationY: 0,
				scale: 1,
			});

		current += 1;
		current = current % images.length;
	});
});
