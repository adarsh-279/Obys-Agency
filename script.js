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


function sheryAnimation(){
    Shery.imageEffect("#img-div",{
        style:5,
        config:{"a":{"value":2,"range":[0,30]},"b":{"value":0.59,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7628495268658563},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":5.6,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.46,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0.03,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":8.4,"range":[0,100]}},
        gooey:true,
    })
}

document.addEventListener("mousemove", function(dets){
    gsap.to("#flag",{
        left:dets.x,
        top:dets.y
    });
});

document.querySelector(".hero3").addEventListener("mouseenter",function(){
    gsap.to("#flag",{
        opacity:1,
    });
});
document.querySelector(".hero3").addEventListener("mouseleave",function(){
    gsap.to("#flag",{
        opacity:0,
    });
});


locomotive();
loadingAnimation();
crsrAnimation();
sheryAnimation();