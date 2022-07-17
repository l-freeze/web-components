(function(){

const fetchArressByZip = async (zip) => {
    console.log('fetch');
    const url = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`;
    const response = await fetch(url);
    return await response.json();
}

class ZipInput extends HTMLElement {
    constructor() {
        self = super();

        const inputStyle = this.inputStyle;
        const content = this.textContent.trim();

        const shadowRoot = this.attachShadow({mode: 'open'});
        const style = document.createElement('style');
        shadowRoot.appendChild(style);
        style.textContent = inputStyle;

        const div = document.createElement('div');
        shadowRoot.appendChild(div);
        div.innerHTML = `
            <input type='text' name='zip' value='' placeholder='${content}'>
        `; 
    }

    connectedCallback() {
        //this.shadowRoot.querySelector('div').textContent = this.textContent;
        this.shadowRoot.querySelector('div input').addEventListener('input', (e)=>{
            const zip = e.target.value;
            if(zip.length == 7) {
                (async()=>{
                    const result = await fetchArressByZip(zip);
                    document.querySelector('l-freeze-result').setAttribute('result', JSON.stringify(result));
                })();
            }

        });
    }

    renderedCallback() {
        //console.log('call: renderedCallback');
        //this.textContent = 'Hello Gold!';
    }

    static get observedAttributes() { 
        return ['class'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
    }

    get inputStyle() {
        return this.getAttribute('inputStyle')  || '';
    }
  
}
customElements.define( 'l-freeze-input', ZipInput );


customElements.define( 'l-freeze-result', class extends HTMLElement{

    updateResult = () => {
        const div = this.shadowRoot.querySelector('div');
        div.textContent = this.result;
    }

    constructor() {
        super();

        const inputStyle = this.inputStyle;
        const content = this.textContent.trim();
        const result = this.result || content;

        const shadowRoot = this.attachShadow({mode: 'open'});
        const style = document.createElement('style');
        shadowRoot.appendChild(style);
        style.textContent = inputStyle;

        const div = document.createElement('div');
        shadowRoot.appendChild(div);
        div.textContent = `${result}`; 
    }

    static get observedAttributes() { 
        return ['result'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        if(name == 'result') {
            this.updateResult();
        }
    }

});

})();