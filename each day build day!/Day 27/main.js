
const triggers = document.querySelectorAll('.cool > li'); // hover area complete li 
const background  = document.querySelector('.dropdownBackground');
const nav  = document.querySelector('.top');

function mouseEnter(){
//first add the class to the <li></li>
this.classList.add('trigger-enter');
//load content only if 'trigger-enter exits
setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
//then add open class to background div (this class has opacity 1)
background.classList.add('open');

//get the coords for enclosing nav and dropdown
const dropdown = this.querySelector('.dropdown'); // not querySelectorAll because we want one at a time
    const dropdownCoords = dropdown.getBoundingClientRect();
    const navCoords = nav.getBoundingClientRect();

    const divCoords = {
        height: dropdownCoords.height, //match the content height width
        width: dropdownCoords.width,
        top: dropdownCoords.top - navCoords.top,
        left: dropdownCoords.left - navCoords.left
    }

    background.style.setProperty('height',`${divCoords.height}px`)
    background.style.setProperty('width', `${divCoords.width}px`)
    background.style.setProperty('transform',`translate(${divCoords.left}px,${divCoords.top}px)`)

}

function mouseLeave(){
    //remove classes
    this.classList.remove('trigger-enter', 'trigger-enter-active');
    background.classList.remove('open');
}


triggers.forEach(trigger => trigger.addEventListener('mouseenter',mouseEnter))
triggers.forEach(trigger => trigger.addEventListener('mouseleave',mouseLeave))
