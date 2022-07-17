(function(){
    
class SimpleTextComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.textContent = `connectedCallbackで ${this.textContent}`;
    }

}
customElements.define( 'simple-text-component', SimpleTextComponent );

})();