
gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis()
lenis.on('scroll', (e) => {
})
function raf(time) {
lenis.raf(time)
requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

Prev=0

function HeaderAnimator() {
    window.addEventListener('scroll', function () {
        if (Prev<window.scrollY && Prev == 0) {
            document.querySelector('body').style.setProperty('--Header-Height', '100px');
            document.getElementsByClassName('Logo')[0].className='LogoSide';
            document.getElementsByClassName('ButtonBox')[0].className='ButtonBoxAlt';
        } else if (window.scrollY == 0) {
            document.querySelector('body').style.setProperty('--Header-Height', '170px');
            document.getElementsByClassName('LogoSide')[0].className='Logo';
            document.getElementsByClassName('ButtonBoxAlt')[0].className='ButtonBox';
        }
        Prev = window.scrollY
    });
}