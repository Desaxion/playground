



document.addEventListener('DOMContentLoaded', () => {

let title = document.getElementsByClassName("name");
console.log(title);
for(let i = 0; i < title.length; i++){
    let grabbed = false;
    title[i].addEventListener("mousedown", (event) => {
        grabbed = true;
        //title[i].style.position = 'absolute';
        let initialPositionX = title[i].offsetLeft;
        let initialPositionY = title[i].offsetTop;
        
        let positionX =  initialPositionX;
        let positionY =  initialPositionY;

        if(grabbed){
            title[i].style.top = positionY + 'px';
            title[i].style.left = positionX + 'px';
            
        }

        document.addEventListener("mousemove", (e) => {
             // Get the initial mouse position relative to the title's position
            
            positionX = initialPositionX + e.clientX - initialPositionX;
            positionY = initialPositionY + e.clientY - initialPositionY;

            if(grabbed){
                title[i].style.top = positionY + 'px';
                title[i].style.left = positionX + 'px';
                
            }
          

        })
        title[i].addEventListener("mouseup", () => {
            //Mouse is released
            console.log('releades')
            grabbed = false;
            //title[i].style.position = 'relative';
            //title[i].removeEventListener("mouseup")
        });
    })
    
}

});