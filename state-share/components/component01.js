
const fetchSample = async() => {
    const baseURL = 'https://api.sampleapis.com/coffee/hot';
    const response = await fetch(baseURL);
    const json = await response.json();
    return json;
    /**
    fetch(baseURL)
        .then(resp => resp.json())
        .then(data => displayData(data));

    function displayData(data) {
        document.querySelector("pre").innerHTML = JSON.stringify(data, null, 2);
    }
    */
}




export class Component01 extends HTMLElement {
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
                background-color: pink;
            }
        `;

        const div = document.createElement('div');
        shadowRoot.appendChild(div);
        div.innerHTML = `
            <input type='text' placeholder='fetchと打つとsampleAPIを叩きます'>
        `; 
    }

    connectedCallback() {
        this.shadowRoot.querySelector('div input').addEventListener('input', (e)=>{
            const input = e.target.value;
            if(input == 'fetch') {
                (async()=>{
                    const resultJson = await fetchSample();
                    this.sharedObject.apiResult = resultJson;
                    console.log(this.sharedObject.apiResult);
                    document.querySelector('l-freeze-state-02').setAttribute('isUpdate', Math.random().toString(32).substring(2));
                    document.querySelector('l-freeze-state-03').setAttribute('isUpdate', Math.random().toString(32).substring(2));
                })();
            }
        });
    }


    renderedCallback() {
        //console.log('call: renderedCallback');
        //this.textContent = 'Hello Gold!';
    }

    static get observedAttributes() { 
        return ['isUpdate'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
    }

    get sharedObjectName() {
        return this.getAttribute('sharedObjectName')  || '';
    }
  
}

