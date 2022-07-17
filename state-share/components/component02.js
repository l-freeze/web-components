export class Component02 extends HTMLElement {

    updateResult () {
        if(typeof this.sharedObject.apiResult == 'undefined'){
            return;
        }
        const style = this.shadowRoot.querySelector('style');
        style.textContent = `
            div {
                font-size: 0.4em;
                height: 12em;
                overflow: scroll;
            }
        `;
        const div = this.shadowRoot.querySelector('div');
        div.textContent = JSON.stringify(this.sharedObject.apiResult, null, 2);        
    }

    constructor() {
        self = super();

        if(this.sharedObjectName != ''){
            const namespace = `__webcomponents__${this.sharedObjectName}`;

            if(typeof window.namespace == 'undefined') {
                window.namespace = {};
            }
            this.sharedObject = window.namespace;
        }
        
        const shadowRoot = this.attachShadow({mode: 'open'});
        const style = document.createElement('style');
        shadowRoot.appendChild(style);
        style.textContent = `
            div {
                background-color: lightgreen;
            }
        `;

        const div = document.createElement('div');
        shadowRoot.appendChild(div);
        div.innerHTML = `${this.textContent}(shadow)`; 
    }

    static get observedAttributes() { 
        return ['isupdate'];//全部小文字
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        if(name == 'isupdate') {
            this.updateResult();
        }
    }

    get sharedObjectName() {
        return this.getAttribute('sharedObjectName')  || '';
    }
  
}

