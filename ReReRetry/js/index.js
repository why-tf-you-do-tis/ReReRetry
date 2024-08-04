gsap.to('.NavButton', {
    y:0,
    stagger:0.10,
    delay:0.2,
    duration: 0.500
});

/*const splitTypes = document.querySelectorAll(".AnimateType")
splitTypes.forEach((words,i) => {
    const text = new SplitType(words, {types: 'words'})
    gsap.from(text.words, {
        scrollTrigger: {
            trigger:words,
            start:'top 100%',
            end:'top 80%',
            scrub:true,
            marker:false,
        },
        y:100,
        opacity:0,
        stagger:1,
        duration: 1 ,
    });
});*/

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

async function RevealVideo() {
    await sleep(500)
    document.getElementsByTagName("video")[0].style.setProperty("height","100%")
    document.getElementsByTagName("video")[0].style.setProperty("top","0px")
    await sleep(500)
    document.getElementsByClassName("ESButton")[0].classList.remove("hidden")
    document.getElementsByClassName("TextButton")[0].classList.remove("hidden")
}

function NavButtonAnimator() {
    window.addEventListener('scroll', function () {
        const ScreenHeight = window.innerHeight;
        const Header = parseFloat(document.querySelector('body').style.getPropertyValue("--Header-Height"));
        const Video = document.getElementsByClassName("VideoContainer")[0].clientHeight;
        const Data = document.getElementsByClassName("Data")[0].clientHeight;
        const Highlights = document.getElementsByClassName("HighlightsContainer")[0].clientHeight;
        const Gallery = document.getElementsByClassName("Gallery")[0].clientHeight;
        if (window.scrollY > (Header - ScreenHeight / 2) && window.scrollY < (Header + Video - ScreenHeight / 2)) {
            document.getElementsByClassName("NavButton")[0].classList.remove("NavButton-hover");
            document.getElementsByClassName("NavButton")[1].classList.remove("NavButton-hover");
            document.getElementsByClassName("NavButton")[2].classList.remove("NavButton-hover");
        } else if (window.scrollY > (Header + Video - ScreenHeight / 2) && window.scrollY < (Header + Video + Data - ScreenHeight / 2)) {
            document.getElementsByClassName("NavButton")[0].classList.add("NavButton-hover");
            document.getElementsByClassName("NavButton")[1].classList.remove("NavButton-hover");
            document.getElementsByClassName("NavButton")[2].classList.remove("NavButton-hover");
        } else if (window.scrollY > (Header + Video + Data - ScreenHeight / 2) && window.scrollY < (Header + Video + Data + Highlights - ScreenHeight / 2)) {
            document.getElementsByClassName("NavButton")[0].classList.remove("NavButton-hover");
            document.getElementsByClassName("NavButton")[1].classList.add("NavButton-hover");
            document.getElementsByClassName("NavButton")[2].classList.remove("NavButton-hover");
        } else if (window.scrollY > (Header + Video + Data + Highlights - ScreenHeight / 2) && window.scrollY < (Header + Video + Data + Highlights + Gallery - ScreenHeight / 2)) {
            document.getElementsByClassName("NavButton")[0].classList.remove("NavButton-hover");
            document.getElementsByClassName("NavButton")[1].classList.remove("NavButton-hover");
            document.getElementsByClassName("NavButton")[2].classList.add("NavButton-hover");
        }
    });
}

function SlideAnimator() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove("hidden");
                const TextData=entry.target.getElementsByClassName("TextData")[0];
                var Image=entry.target.getElementsByTagName("img")[0];
                if (!Image){
                    var Image=entry.target.getElementsByTagName("video")[0]
                }
                if (TextData.classList.contains("TextDataRight")){
                    TextData.classList.remove("hiddenAnimationRight")
                    Image.classList.remove("hiddenAnimationRight")
                }else if (TextData.classList.contains("TextDataLeft")){
                    TextData.classList.remove("hiddenAnimationLeft")
                    Image.classList.remove("hiddenAnimationLeft")
                }
            } else{
                entry.target.classList.add("hidden");
                const TextData=entry.target.getElementsByClassName("TextData")[0];
                var Image=entry.target.getElementsByTagName("img")[0];
                if (!Image){
                    var Image=entry.target.getElementsByTagName("video")[0]
                    Image.pause()
                }
                if (TextData.classList.contains("TextDataRight")){
                    TextData.classList.add("hiddenAnimationRight")
                    Image.classList.add("hiddenAnimationRight")
                }else if (TextData.classList.contains("TextDataLeft")){
                    TextData.classList.add("hiddenAnimationLeft")
                    Image.classList.add("hiddenAnimationLeft")
                }
            }
        });
    });
    const hiddenElement = document.querySelectorAll(".Container")
    hiddenElement.forEach((el) => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', function () {
    RevealVideo()
    HeaderAnimator()
    NavButtonAnimator()
    SlideAnimator()
});
