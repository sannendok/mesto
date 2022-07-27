
export default class Section{
    constructor({data, renderer}, cardContainer){ 
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = document.querySelector(cardContainer);
    }

    addItem(element){
       this._container.append(element); 
    }
    
    renderer(){
        this._renderedItems.forEach(item => {
            this._renderer(item);
          });
    }
}