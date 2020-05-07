/* steps : 1. get the hold of divs, 
2. get the click position 
3. get the scrollLeft value 
4. capture the difference between scrollLeft and clickX
5. move the div to left by value equals the difference  

*/

const scrollArea = document.querySelector('.items')

let mouseClicked = false;
let startX;
let scrollLeft;


scrollArea.addEventListener('mousedown', (e)=>{
    mouseClicked = true;
    scrollArea.classList.add('active')
    //get the scroll value
    startX = e.pageX - scrollArea.offsetLeft //by how much it has scrolled
    scrollLeft = scrollArea.offsetLeft;
    console.log(startX,scrollLeft)
})

scrollArea.addEventListener('mouseup', ()=>{
    mouseClicked = false;
    scrollArea.classList.remove('active')

})

scrollArea.addEventListener('mouseleave', ()=>{
    mouseClicked = false;
    scrollArea.classList.remove('active')
})

scrollArea.addEventListener('mousemove', (e)=>{

    if(!mouseClicked) return;
    
    e.preventDefault()
    //cuurent position after mousemove
    const currentPosX = e.pageX - scrollArea.offsetLeft
    scrollAmount = (currentPosX - startX ) * 2
    //finally the update the div's position either to right or left
    scrollArea.scrollLeft =  scrollLeft - scrollAmount ;//Initial scrollArea.scrollLeft //(scrolled factor) to avoid jumpy animation
})

