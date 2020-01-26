function swipedetect(el, callback){
  
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 100, 
    restraint = 70,  
    allowedTime = 400,  
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime()  
        e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault()  
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX 
        distY = touchobj.pageY - startY  
        elapsedTime = new Date().getTime() - startTime  
        if (elapsedTime <= allowedTime){  
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){  
                swipedir = (distX < 0)? 'left' : 'right'  
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){  
                swipedir = (distY < 0)? 'up' : 'down'  
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}
var el = document.getElementsByClassName('wrapper')[0]
swipedetect(el, function(swipedir){
    
    switch(swipedir){
        case "left":
            left_move()
            break;
        case "right":
            right_move()
            break;
        case "up":
            up_move()
            break;
        case "down":
            down_move()
            break;
    }
})