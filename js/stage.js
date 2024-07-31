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
        this.startButton.style.marginTop = "1vh";
        this.startButton.style.padding = "1vh 2vh";
        this.startButton.style.width = "20vh";
        this.startButton.style.border = "0.5vh solid black"
        this.startButton.style.borderRadius = "1vh";
        this.startButton.addEventListener("click", () => {
            this.startMessage.style.display = "none";
        });
        this.startMessage.appendChild(this.startButton);
    }

    showEndMessage() {
        // create the element
        this.endMessage = document.createElement("div");

        // add content or modify
        this.endMessage.id = "start-message";

        // append to the dom
        const stage = document.getElementById("stage");
        stage.appendChild(this.endMessage);

        // create end title text
        this.endTitle = document.createElement("h1");
        this.endTitle.style.textAlign = "center";
        this.endTitle.innerText = "Mission accomplished!"
        this.endMessage.appendChild(this.endTitle);

        // create finish congratulations
        this.endExplanation = document.createElement("h3");
        this.endExplanation.style.textAlign = "center";
        this.endExplanation.style.padding = "5vh";
        this.endExplanation.innerText = "You did well! You saved the second princess and she can now run back to her sister! Feel proud of yourself wizard, this was a tough fight."
        this.endMessage.appendChild(this.endExplanation);

        // create end confirmation text
        this.endConfirmation = document.createElement("h4");
        this.endConfirmation.style.textAlign = "center";
        this.endConfirmation.style.padding = "0 5vh";
        this.endConfirmation.innerText = "Do you want to play again?"
        this.endMessage.appendChild(this.endConfirmation);

        // create end button
        this.endButton = document.createElement("button");
        this.endButton.innerText = "Play Again";
        this.endButton.style.marginTop = "1vh";
        this.endButton.style.padding = "1vh 2vh";
        this.endButton.style.width = "20vh";
        this.endButton.style.border = "0.5vh solid black"
        this.endButton.style.borderRadius = "1vh";
        this.endButton.addEventListener("click", () => {
            window.location.href = "./index.html"; // replace with the URL of your original HTML website
        });
        this.endMessage.appendChild(this.endButton);
    }
}

