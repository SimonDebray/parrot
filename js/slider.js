var i = 1;

var lastScrollTop = 0;
// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.

var slides = document.getElementById("slides");
slides.addEventListener("scroll", slide);

function slide(){
    slides.removeEventListener("scroll", slide);
    slides.setAttribute("style", "overflow-y: hidden");

    var st = document.getElementById("slides").scrollTop;
    console.log(st);
    console.log(lastScrollTop);
    if (st > lastScrollTop){
        i++;
    } else if (st < lastScrollTop){
        i--;
    }

    if(i > 4) i = 4;
    if(i < 1) i = 1;

    document.getElementById('s'+i).scrollIntoView();

    lastScrollTop = st;

    setTimeout(function(){
        slides.addEventListener("scroll", slide);
        slides.setAttribute("style", "overflow-y: scroll");
    }, 500);
}

