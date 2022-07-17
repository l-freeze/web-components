(function(){
    
class TextDecoration extends HTMLElement {
    constructor() {

        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        const span = document.createElement('span');
        shadowRoot.appendChild(span);

        const style = document.createElement('style');
        span.textContent = this.textContent;
  
        shadowRoot.appendChild(style);
  
        style.textContent = `
          span:hover { text-decoration: underline; font-size:1.1em;}
          :host-context(h1) { font-style: italic; }
          :host-context(h1):after { content: " - no links in headers!" }
          :host-context(article, aside) { color: gray; }
          :host(.footer) { color : red; }
          :host { background: rgba(0,255,0,0.4); padding: 5px; }
        `;
    }
}
customElements.define( 'text-decoration', TextDecoration );

})();