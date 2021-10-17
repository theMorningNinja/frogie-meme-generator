import gsap from 'gsap';

const preloader = (gif, overlay, content, itemsIntro) => {
  const preloaderAnim = gsap
    .timeline({ paused: true, defaults: { ease: 'expo' } })
    .to(gif, {
      opacity: 0,
      duration: 1.3,
    })
    .to(
      overlay,
      {
        y: '-100%',
        duration: 2.5,
      },
      0.2
    )
    .set(
      gif,
      {
        display: 'none',
      },
      0.4
    )
    .set(
      document.querySelector('.preloader'),
      {
        display: 'none',
      },
      3
    )
    .set(
      content,
      {
        display: 'block',
      },
      1.2
    )
    .from(
      itemsIntro,
      {
        autoAlpha: 0,
        duration: 1.5,
        y: 50,
        stagger: 0.2,
      },
      1.21
    );

  setTimeout(() => {
    preloaderAnim.play();
  }, 1500);
};

export { preloader };
