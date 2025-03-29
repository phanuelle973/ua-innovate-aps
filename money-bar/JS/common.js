document.addEventListener("scroll", function() {
    var backToTop = document.getElementById("backToTop");
    if (window.scrollY >= 200) {
        backToTop.style.display = "block";
    }
    backToTop.addEventListener("click", function() {
       scrollTo(0, snap,500);
    });
    if (window.scrollY <= 200) {
        backToTop.classList.add('fade');
    } else if (window.scrollY != 0) {
        backToTop.classList.remove('fade')
    }
});


document.addEventListener("DOMContentLoaded", function() {
    if (document.body.classList.contains("calculator-page")) {
        var tabs = document.querySelectorAll(".tab");
        for (i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener("click", function() {
                document.querySelector(".active").classList.remove("active")
                this.classList.add("active");
                checkConn();
                if (this.id == "tab-two") {
                    document.querySelector("#tb-1").style.display = "none";
                    document.querySelector("#tb-2").style.display = "block";
                    document.querySelector("#iWrapper-One").classList.remove("currentIframe");
                    document.querySelector("#iWrapper-Two").classList.add("currentIframe");
                } else {
                    document.querySelector("#tb-1").style.display = "block";
                    document.querySelector("#tb-2").style.display = "none";
                    document.querySelector("#iWrapper-Two").classList.remove("currentIframe");
                    document.querySelector("#iWrapper-One").classList.add("currentIframe");
                }
            })
        }
        checkConn();
    }
});

window.addEventListener('online', function(e) {
    checkConn();
}, false);

window.addEventListener('offline', function(e) {
    checkConn();
}, false);

function checkConn() {
    var iframes = document.getElementsByTagName('iframe');
    if (!navigator.onLine) {
        for (var i = 0; i < iframes.length; i++) {
            iframes[i].classList.remove("na");
            iframes[i].setAttribute("style", "")
            var page = iframes[i].classList;
            iframes[i].src = "https://www.pnc.com/content/pnc-com/en/digital-publishing/" + page + "-calculator.html?DPS=true";
        }
    } else {
        for (var i = 0; i < iframes.length; i++) {
            var page = iframes[i].classList[0];
            if (page === "balance") {
                console.log(page)
                iframes[i].setAttribute("style", "background-image:url(img/Core-Calculator-ConnectMsg.jpg);background-size:contain;width:580px;margin:auto;position:static;background-repeat:no-repeat;");
                iframes[i].src = "";
                iframes[i].classList.add("na");
            } else {
                iframes[i].src = "";
                iframes[i].setAttribute("style", "background-image:url(img/Miles-Placeholder-ConnectMsg.jpg);background-size:contain;width:580px;margin:auto;position:static;background-repeat:no-repeat;")
                iframes[i].classList.add("na");
            }
        }
    }
}

function snap(){
    //this function exists because the scrolling function requires a callback. It can be set to "return false;" or some such in the future. 
    console.log("snap! Scroll Animation fired")
}
// easing functions http://goo.gl/5HLl8
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) {
    return c/2*t*t + b
  }
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};

Math.easeInCubic = function(t, b, c, d) {
  var tc = (t/=d)*t*t;
  return b+c*(tc);
};

Math.inOutQuintic = function(t, b, c, d) {
  var ts = (t/=d)*t,
  tc = ts*t;
  return b+c*(6*tc*ts + -15*ts*ts + 10*tc);
};

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
var requestAnimFrame = (function(){
  return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
})();

function scrollTo(to, callback, duration) {
  // because it's so difficult to detect the scrolling element, just move them all
  function move(amount) {
    document.documentElement.scrollTop = amount;
    document.body.parentNode.scrollTop = amount;
    document.body.scrollTop = amount;
  }
  function position() {
    return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
  }
  var start = position(),
    change = to - start,
    currentTime = 0,
    increment = 20;
  duration = (typeof(duration) === 'undefined') ? 500 : duration;
  var animateScroll = function() {
    // increment the time
    currentTime += increment;
    // find the value with the quadratic in-out easing function
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    // move the document.body
    move(val);
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimFrame(animateScroll);
    } else {
      if (callback && typeof(callback) === 'function') {
        // the animation is done so lets callback
        callback();
      }
    }
  };
  animateScroll();
}