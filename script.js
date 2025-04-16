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
loadingAnimation();
crsrAnimation();

// var flag = document.querySelectorAll("#page1-right .hero span");
// flag.addEventListener("mouseon", function(){
//     alert("Hovered");
// });  