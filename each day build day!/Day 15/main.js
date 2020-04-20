const sliderImages = document.querySelectorAll('.slide-in');

//debounce function to controll the triggering of scroll event 
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

function checkSlide(){
    sliderImages.forEach(sliderImage => {
        // half way through the image
        
        const slideInAt = (window.scrollY + window.innerHeight); // full window width
        // bottom of the image
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        //condition for rendering image
        const isShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;

        //apply css class now
        if (isShown && isNotScrolledPast) {
            sliderImage.classList.add('active');
          } else {
            sliderImage.classList.remove('active');
          }

    })  
}
    
  window.addEventListener('scroll', debounce(checkSlide));