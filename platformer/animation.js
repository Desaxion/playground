class Animation extends Renderable {
    constructor(ctx,characterName, animationName,pos,speed = 100){
        super(ctx,0,0,pos,"platformer/sprites/" + characterName + "/" + animationName + "/", 0);
        this.imgDone = false;
        this.jsonDone = false;
        this.ready = false;
        this.sheet = new Image();
        this.sheet.src = this.path + "sheet.png";
        this.name = characterName
        this.speed = speed;
        this.frames = []

        this.sheet.onload = () => {
            this.imgDone = true;  // 'this' now refers to the 'Animation' instance
        };
        this.fetchAndParseJson(this.path + animationName + ".json", (data) => this.loadData(data));
        this.totalTime = 0;
        this.defaultTotalTime = 0;
    }

    loadData(data) {
        if(data.root != this.name){
            console.warn("The animation " + data.name + " wasn't made for the character " + this.name + ", but for " + data.root);
        }
        this.width = data.width;
        this.height = data.height;
        this.frames = data.frames;
        this.jsonDone = true;
        // We get the total animation time as well
        for(let i = 0; i < this.frames.length; i++){
            this.totalTime += this.frames[i];
            this.defaultTotalTime += this.frames[i];
        }
        this.totalTime /= (this.speed/100);
    }

    async fetchAndParseJson(url,loadingFunction) {
        fetch(url)
            .then(response => {
                // Check if the request was successful
                if (!response.ok) {
                    console.error(`Error: Network response was not ok. Status: ${response.status} - ${response.statusText}`);
                    throw new Error('Network response was not ok');
                }
                return response.json();  // Parse JSON data from the response
            })
            .then(data => {
                loadingFunction(data);  // Use the JSON data
            })
            .catch(error => {
                console.error('Error fetching JSON:', error);
            });
    }

    setSpeed(speed){
        this.speed = speed;
        this.totalTime = this.defaultTotalTime /(this.speed/100);
    }

    draw(time) {
        let t = (time/1000) % this.totalTime; // Find the frame within the cycle
        let timeStep = 0;
        let index = 0;
        for(let i = 0;i < this.frames.length; i++ ){
            if(t < timeStep){
                index = i;
                break;
            }
            timeStep += this.frames[i]/(this.speed/100);
        }
        //console.log(time);
        // Draw the selected frame, in the right position
        // The position of the frame in the sheet (in px)
        let framePosX = index * this.width;
        //console.log(this.sheet, framePosX,0, this.width, this.height, this.position[0] - (this.width/2), ctx.canvas.height - this.height - this.position[1],this.width*this.scale,this.height*this.scale)
        this.ctx.drawImage(this.sheet, framePosX,0, this.width, this.height, this.position[0] - (this.width/2)*this.scale, this.ctx.canvas.height - this.height*this.scale - this.position[1],this.width*this.scale,this.height*this.scale);
    }
}