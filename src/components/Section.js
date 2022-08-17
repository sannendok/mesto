
export default class Section{
    constructor({data, renderer}, cardContainer){ 
      //  this._renderedItems = data;
        this._renderer = renderer;
        this._container = document.querySelector(cardContainer);
    }

    addItem(element){
       this._container.prepend(element); 
    }
    
    renderer(data){
        data.forEach(item => {
            this._renderer(item);
          });
    }
}