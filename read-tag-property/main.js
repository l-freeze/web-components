(function(){
    
class ReadTagProperty extends HTMLElement {
    
    constructor() {
        self = super();
        this.opt_prefix = 'default prefix';
        this.property01 = 'default property';        
    }

    connectedCallback() {
        this.textContent = `
            ${this.opt_prefix}${this.textContent}:${this.property01}
        `;
    }

    static get observedAttributes() { 
        return ['opt_prefix', 'property01'];
    }

    attributeChangedCallback(property, oldValue, newValue) {
        //console.log('[attributeChangedCallback]');
        //console.log(`property: ${property} / oldValue:${oldValue} / newValue: ${newValue}`);
        if (oldValue === newValue) {
            return;
        }

        this[ property ] = newValue;
    }

}
customElements.define( 'read-tag-property', ReadTagProperty );

})();