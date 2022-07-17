export class Component03 extends HTMLElement {

    updateResult () {
        if(typeof this.sharedObject.apiResult == 'undefined'){
            return;
        }
        const style = this.shadowRoot.querySelector('style');
        style.textContent = `
            div { 
                font-size: 0.6em;
                background-color: orange;
            }
            dl {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
              }
              dt {
                width: 30%;
                padding-bottom: 20px;
                margin-bottom: 10px;
                background-color: #DADADA;
              }
              
              dd {
                width: 70%;
                padding-bottom: 20px;
                background-color: #F3F3F3;
                margin-bottom: 10px;
              }              

            `;
        const div = this.shadowRoot.querySelector('div');
        div.innerHTML = `
            <dl>
                <dt>title</dt>
                <dd>${this.sharedObject.apiResult[0].title}</dd>
                <dt>description</dt>
                <dd>${this.sharedObject.apiResult[0].description}</dd>
                <dt>image</dt>
                <dd>${this.sharedObject.apiResult[0].image}</dd>
            </dl>
            <dl>
                <dt>title</dt>
                <dd>${this.sharedObject.apiResult[0].title}</dd>
                <dt>description</dt>
                <dd>${this.sharedObject.apiResult[0].description}</dd>
                <dt>image</dt>
                <dd>${this.sharedObject.apiResult[0].image}</dd>
            </dl>
        `;
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
                background-color: lightblue;
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

