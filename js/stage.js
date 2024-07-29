class Stage {
    constructor(imgURL) {
        this.domElement = document.getElementById("stage");
        this.imgURL = imgURL; 
        this.setStage();
    }
    
    setStage() {
        this.domElement.style.backgroundImage = `url(${this.imgURL})`; 
    }   
}
