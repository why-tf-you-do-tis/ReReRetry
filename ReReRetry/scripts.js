ScreenWidth = window.innerWidth;
ScreenHeight = window.innerHeight;

var Prev=0

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

function ImageSize(){
    
    for (let i = 0; i <= 10; i++) {
        let textDataElement =document.getElementsByClassName("TextData")[i];
        if (textDataElement) {
            let height = textDataElement.clientHeight;
            let hiddenElement = document.getElementsByClassName("Image")[i];
            if (hiddenElement) {
                if (ScreenWidth>800){
                hiddenElement.style.setProperty("height", `${height}px`);
                }
                hiddenElement.classList.remove('hidden');
            }
        }
    }
}

async function RevealVideo() {
    await sleep(500)
    window.scrollTo(0, 0);
    document.getElementsByTagName("video")[0].style.setProperty("height","100%")
    document.getElementsByTagName("video")[0].style.setProperty("top","0px")
    await sleep(500)
    document.getElementsByClassName("ESButton")[0].classList.remove("hidden")
    document.getElementsByClassName("TextButton")[0].classList.remove("hidden")
}

function PlayVideo() {
    for (let i = 1; i <= 3; i++) {
        document.getElementsByTagName("video")[i].addEventListener('click', function() {
            if (this.paused) {
                this.play();
            } else {
                this.pause();
            }
        });
    }
}   

document.addEventListener('DOMContentLoaded', function () {
    ImageSize()
    RevealVideo()
    PlayVideo()
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
    window.addEventListener('scroll', function () {
        const ScreenHeight = window.innerHeight;
        const Header = parseFloat(document.querySelector('body').style.getPropertyValue("--Header-Height"));
        const Video = document.getElementsByClassName("VideoContainer")[0].clientHeight;
        const Data = document.getElementsByClassName("Data")[0].clientHeight;
        const Highlights = document.getElementsByClassName("HighlightsContainer")[0].clientHeight;
        const Gallery = document.getElementsByClassName("Gallery")[0].clientHeight;
        if (window.scrollY > (Header + Video - ScreenHeight / 2) && window.scrollY < (Header + Video + Data - ScreenHeight / 2)) {
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
});

