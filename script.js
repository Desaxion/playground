

document.addEventListener('DOMContentLoaded', () => {



    const background = document.getElementById('background-wrapper');
    const firstName = document.getElementsByClassName('name')[0];
    const lastName = document.getElementsByClassName('name')[1];
    
 


        //pdf download
        const pdfButton = document.getElementById("pdf-button");
        if(pdfButton){
        pdfButton.addEventListener("click", function () {
            const curriculumContent = document.getElementById("curriculum-content");
            const contentClone = curriculumContent.cloneNode(true);
            const pdfButtonClone = contentClone.querySelector("#pdf-button");
            if (pdfButtonClone) {
                pdfButtonClone.remove();
            }
    
            // Style the clone to match the desired styling (optional)
            contentClone.style.backgroundColor = "white";
            // Add any other styling as needed
    
            // Create a new jsPDF instance
            const doc = new jsPDF();
    
            // Generate the PDF from the cloned content
            doc.fromHTML(contentClone, 15, 15);
    
            // Save the PDF as a file with the name "curriculum.pdf"
            doc.save("curriculum.pdf");
        });
        }

    let blob = document.getElementById("blob");
    function setBlobPosition(e){
        
        let midPoint = {x:window.innerWidth/2,y:window.innerHeight/2};

        cursorPosFromMidPoint = {x:e.clientX - midPoint.x, y:e.clientY - midPoint.y};

        blob.style.left = - cursorPosFromMidPoint.x + midPoint.x - (blob.clientWidth/2) + "px"
        blob.style.top = - cursorPosFromMidPoint.y + midPoint.y - (blob.clientHeight/2) + "px";
    };

    document.addEventListener('mousemove', (e) => {
       // setTitlePosition(e);
        setBlobPosition(e)

    })


       //firstName.style.position = "absolute";
    //lastName.style.position = "absolute";

    function setTitlePosition(event) {
        const ratio = 80;
        console.log((firstName.offsetTop - event.clientY))
    


    firstName.style.top = (firstName.offsetTop - event.clientY)/ratio + 'px'; 
    firstName.style.left = (firstName.offsetLeft -event.clientX)/ratio + 'px';
    firstName.style.transform = "translateX(-100%)"

    lastName.style.top = -1*(firstName.offsetTop - event.clientY)/ratio + 'px';
    lastName.style.left = -1*(firstName.offsetLeft -event.clientX)/ratio + 'px';
    //lastName.style.transform = "translateX(%)"
    }

    //Clicks and buttons:
    //Get all side menu things

    const sideMenu = document.getElementById('side_menu');
    let sideMenuOptions = sideMenu.querySelectorAll('li');

    const contents = document.getElementsByClassName('content');


    // Get the current URL path
    const currentPath = window.location.pathname;

    // To handle URLs with slashes, you can split the path into segments
    const pathSegments = currentPath.split('/');
    
    // The first segment (index 0) might be empty if the URL starts with a slash, so you can skip it
    //const pageName = pathSegments[pathSegments.length-1]; // Assuming the page name is the second segment
    //console.log(pageName)
    let pageName = '';
    
    for(let i = 0; i < sideMenuOptions.length; i++){
        if(pageName == sideMenuOptions[i].id) {
            console.log(sideMenuOptions[i])
            if(!sideMenuOptions[i].classList.contains('selected')){
                sideMenuOptions[i].classList.add('selected');
            }
        } else if(pageName != sideMenuOptions[i].id){
            if(sideMenuOptions[i].classList.contains('selected')){
                sideMenuOptions[i].classList.remove('selected');
            }
        }
    }
    let mm = 0;
    for(let m = 0; m < sideMenuOptions.length; m++){
        if(sideMenuOptions[m].classList.contains('selected')) { break; }
        mm++;
    }
    if(mm == sideMenuOptions.length){ //If none is selected, set page to about
        sideMenuOptions[0].classList.add('selected')
    }

  
    for(let j = 0; j < sideMenuOptions.length; j++){
            if(sideMenuOptions[j].classList.contains('selected')){ //The contents and the options has to be arranged in the same order
                if(!contents[j].classList.contains('visible')){
                    contents[j].classList.remove('invisible')
                    contents[j].classList.add('visible')
                }
            } else {
                if(!contents[j].classList.contains('invisible')){
                    if(contents[j].classList.contains('visible')) { contents[j].classList.remove('visible') }
                    contents[j].classList.add('invisible')
                }
            }
    }
    
    
    




    for(let i = 0; i < sideMenuOptions.length; i++){
      
        sideMenuOptions[i].addEventListener('click', (event) => {

            for(let k = 0; k < sideMenuOptions.length; k++){
                if(sideMenuOptions[k].classList.contains('selected') && k != i){
                    sideMenuOptions[k].classList.remove('selected');
                }
            }


            if(!sideMenuOptions[i].classList.contains('selected')){
                sideMenuOptions[i].classList.add('selected');
                
                for(let j = 0; j < sideMenuOptions.length; j++){
                    if(i == j){ //The contents and the options has to be arranged in the same order
                        if(!contents[j].classList.contains('visible')){
                            contents[j].classList.remove('invisible')
                            contents[j].classList.add('visible')
                        }
                    } else {
                        if(!contents[j].classList.contains('invisible')){
                            if(contents[j].classList.contains('visible')) { contents[j].classList.remove('visible') }
                            contents[j].classList.add('invisible')
                        }
                    }
                }
            }

        })

    }

const goBackButton = document.getElementById('back-button');
goBackButton.addEventListener('click', () => {
    background.style.left = '0vw';
})


const pachinkoButton = document.getElementById('pachinko-button');
pachinkoButton.addEventListener('click', () => {
    background.style.left = "-100vw";

});


/*
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
*/
});
