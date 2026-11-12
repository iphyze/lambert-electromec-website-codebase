const homeSlideImages = {
  slider1: '/images/home-slides/Slider-1.webp',
  slider2: '/images/home-slides/Slider-2.webp',
  slider3: '/images/home-slides/Slider-3.webp',
  slider4: '/images/home-slides/Slider-4.webp',
  slider5: '/images/home-slides/Slider-5.webp',
  slider6: '/images/home-slides/Slider-6.webp',
  slider7: '/images/home-slides/Slider-7.webp',
  slider8: '/images/home-slides/Slider-8.webp',
  slider9: '/images/home-slides/Slider-9.webp',
}

const normalizeImageName = (value = '') =>
  value.toLowerCase().replace(/[^a-z0-9]/g, '')

export const getHomeSlideImage = (imageKey) =>
  homeSlideImages[normalizeImageName(imageKey)] || ''
