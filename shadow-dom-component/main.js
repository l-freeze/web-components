(function(){
    
class TextDecoration extends HTMLElement {
    constructor() {

        super();
        const style = document.createElement('style');
        const span = document.createElement('span');
        span.textContent = this.textContent.trim();
 
        const shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.appendChild(style);
        shadowRoot.appendChild(span);
  
        style.textContent = `
          span:hover { text-decoration: underline; background-color:#003333;}
          :host-context(h1) { font-style: italic; color:red;}
          :host-context(h1):after { content: " - no links in headers!" }
          :host-context(article, aside) { color: gray; }
          :host(.footer) { color : red; }
          :host { background: rgba(255,100,0,0.3); padding: 2px 5px; }
          span {
            background-color: #00000000;
          }
        `;
    }
}
customElements.define( 'text-decoration', TextDecoration );

class ShadowDomComponent extends HTMLElement {
    updateStyle = function (elem) {
        //console.log(elem);
        //console.log(elem.innerHTML);
        const shadow = elem.target.shadowRoot;
        //console.log(shadow.innerHTML);
        
        shadow.querySelector('style').textContent = `
            div {
                width: 10em;
                height: 5em;
                background-color: green;
                color: pink;
            }
        `;
    }

    prefixRandom = (e) => {
        //console.log(e.target);
        const currentSuffix = e.target.property_suffix;
        const randomString = Math.random().toString(32).substring(2);
        //console.log(`befor:${currentSuffix} / after:${randomString}`);

        e.target.setAttribute('property_suffix', randomString) ;
        //console.log('INNER:' + e.target.outerHTML);
        //console.log('SHADOW:' + e.target.shadowRoot.innerHTML);
        //this.ShadowDomComponent.querySelector('div').textContent = "222";
        //console.log('SHADOW:' + this.shadowRoot.innerHTML);

        e.target.shadowRoot.querySelector('div').textContent = `${this.defaultTextContent}(${this.property_suffix})`;
    };

    updateDivText = (e) => {
        e.target.shadowRoot.querySelector('div').textContent = "222";
    }

    
    constructor() {
        self = super();

        //this.onclick = self.prefixRandom;
        //this.ondblclick = self.updateStyle;
        this.onclick = (e) => {
            self.prefixRandom(e);
            self.updateStyle(e);
        };

        this.property_suffix = 'default property_suffix';
        this.defaultTextContent = this.textContent.trim();

        const shadowRoot = this.attachShadow({mode: 'open'});

        const style = document.createElement('style');
        shadowRoot.appendChild(style);

        const div = document.createElement('div');
        div.textContent = this.textContent;
        
        shadowRoot.appendChild(div);
        style.textContent = `
            div {color: green;}
        `;

    }

    connectedCallback() {
        //console.log('call: connectedCallback');
        //console.log(`property_suffix: ${this.property_suffix}`);
        //console.log(`defaultTextContent: ${this.defaultTextContent}`);
        //this.textContent = `${this.property_suffix} ${this.defaultTextContent}`;
        this.shadowRoot.querySelector('div').textContent = this.textContent;
    }

    renderedCallback() {
        //console.log('call: renderedCallback');
        this.textContent = 'Hello Gold!';
    }

    static get observedAttributes() { 
        return ['property_suffix'];
    }

    // attribute change
    attributeChangedCallback(name, oldValue, newValue) {
        //console.log('[attributeChangedCallback]');
        //console.log(this.shadowRoot.innerHTML);
        //console.log(`property: ${property} / oldValue:${oldValue} / newValue: ${newValue}`);
        if (oldValue === newValue) {
            return;
        }
        //console.log('update property');
        this[name] = newValue;
        //this.textContent = `${this.textContent} (${this.property_suffix})`
        //console.log('::::' + this.textContent);
    }

    disconnectedCallback() {
        alert('Custom square element removed from page.');
    }

    adoptedCallback() {
        alert('Custom square element moved to new page.');
    }

}
customElements.define( 'shadow-dom-component', ShadowDomComponent );


})();