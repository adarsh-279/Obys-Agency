function locomotive() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
}

function loadingAnimation(){
    var tl = gsap.timeline();
    var h5 = document.querySelector("#l1t1 h5");
    var t = 0;
    
    setInterval(function(){
        if(t<100){
            t++;
            h5.innerHTML = t++;
        }else {
            h5.innerHTML = t;
        }
    },50)
    
    tl.from("#l1 h1, #l1 h2",{
        y:150,
        stagger:0.2,
        duration: 0.6,
    })
    tl.to("#loader",{
        opacity:0,
        duration: 0.4,
        delay:2,
        display:"none"
    })
    tl.from("#page1",{
        y:1200,
        opacity:0,
        delay:0.2
    })
    tl.from("#hero h1",{
        y:120,
        stagger:0.2,
    })
}
function crsrAnimation (){
    document.addEventListener("mousemove", function(dets){
        gsap.to("#crsr",{
            left:dets.x,
            top:dets.y
        })
    });
    
    Shery.makeMagnet(".menu-opener__square, #nav2 h4");   
}

locomotive();
loadingAnimation();
//crsrAnimation();

// var flag = document.querySelectorAll("#page1-right .hero span");
// flag.addEventListener("mouseon", function(){
//     alert("Hovered");
// });  

function sheryAnimation(){
    Shery.imageEffect("#project1-first img",{
        style:5,
        debug:true,
        gooey:true,
    })
}

sheryAnimation();