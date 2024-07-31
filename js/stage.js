class Stage {
    constructor(imgURL) {
        this.domElement = document.getElementById("stage");
        this.imgURL = imgURL; 
        this.setStage();
    }
    
    setStage() {
        this.domElement.style.backgroundImage = `url(${this.imgURL})`; 
    }   

    showStartMessage() {
        // create the element
        this.startMessage = document.createElement("div");

        // add content or modify
        this.startMessage.id = "start-message";

        // append to the dom
        const stage = document.getElementById("stage");
        stage.appendChild(this.startMessage);

        // create title text
        this.startTitle = document.createElement("h1");
        this.startTitle.style.textAlign = "center";
        this.startTitle.innerText = "Welcome to Wasteland!"
        this.startMessage.appendChild(this.startTitle);

        // create game explanation
        this.startExplanation = document.createElement("h3");
        this.startExplanation.style.textAlign = "center";
        this.startExplanation.style.padding = "5vh";
        this.startExplanation.innerText = "DO NOT DIE! Press the W, A, S, D keys to move around the area. You will shoot constant fireballs where your mouse is, so aim properly! If the enemies or their projectiles catch you, you are gone for good. You will be lucky enough to have three lives, use them well to save the princess's twin!"
        this.startMessage.appendChild(this.startExplanation);

        // create confirmation text
        this.startConfirmation = document.createElement("h4");
        this.startConfirmation.style.textAlign = "center";
        this.startConfirmation.style.padding = "0 5vh";
        this.startConfirmation.innerText = "Do you understand?"
        this.startMessage.appendChild(this.startConfirmation);

        // create start button
        this.startButton = document.createElement("button");
        this.startButton.innerText = "Start Game";
        this.startButton.style.marginTop = "20px";
        this.startButton.style.padding = "1vh 2vh";
        this.startButton.style.width = "20vh";
        this.startButton.style.border = "0.5vh solid black"
        this.startButton.style.borderRadius = "1vh";
        this.startButton.addEventListener("click", () => {
            this.startMessage.style.display = "none";
        });
        this.startMessage.appendChild(this.startButton);
    }
}
