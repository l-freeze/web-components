import {state} from '../common/state.js';
import {randomString} from '../common/common.js';

const localState = {};
const fetchData = async (url) => {
    const response = await fetch(url);
    return await response.json();
}

class Parts01Input extends HTMLElement {
    constructor() {
        self = super();

        const content = this.textContent.trim();

        const shadowRoot = this.attachShadow({mode: 'open'});
        const style = document.createElement('style');
        shadowRoot.appendChild(style);
        style.textContent = this.styling;

        const div = document.createElement('div');
        shadowRoot.appendChild(div);
        div.innerHTML = `
            <input type='text' name='apiurl' value='' list='api-list' placeholder='${content}'>
            <datalist id='api-list'>
                <option value='https://api.sampleapis.com/switch/games'>Switch Games</option>
                <option value='https://api.sampleapis.com/codingresources/codingResources'>Coding Resources</option>
                <option value='https://api.sampleapis.com/coffee/hot'>Coffee</option>
                <option value='https://api.sampleapis.com/beers/ale'>Beers</option>
            </datalist>
        `; 
    }

    connectedCallback() {
        this.shadowRoot.querySelector('div input').addEventListener('input', (e)=>{
            const url = e.target.value;
            if(typeof this.timeout != 'undefined') {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(
                ()=>{
                    (async(url)=>{
                        const result = await fetchData(url);
                        state().apiResult = result;
                        localState.apiResult = result;
                        document.querySelector('l-freeze-parts01-output').setAttribute('watcher', randomString());
                    })(url);
                }
                ,1500
            );

            state().apiResult = '';
            localState.apiResult = '';
            document.querySelector('l-freeze-parts01-output').setAttribute('watcher', randomString());

        });
    }

    renderedCallback() {
        //console.log('call: renderedCallback');
        //this.textContent = 'Hello Gold!';
    }

    static get observedAttributes() { 
        return ['styling'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if( this.readOnlyProperty().includes(name) === false){
            this[name] = newValue;
        }
    }

    //read only (required get method)
    readOnlyProperty() {
        return ['styling'];
    }
    get styling() {
        return this.getAttribute('styling')  || '';
    }
  
}


class Parts01Output extends HTMLElement{

    updateResult = () => {
        const div = this.shadowRoot.querySelector('div');
        console.log(state());
        console.log(localState);
        if(state().apiResult != '') {
            div.textContent = JSON.stringify( state().apiResult );
        } else {
            div.textContent = '';
        }
    }

    constructor() {
        super();

        const content = this.textContent.trim();

        const shadowRoot = this.attachShadow({mode: 'open'});
        const style = document.createElement('style');
        shadowRoot.appendChild(style);
        style.textContent = this.styling;

        const div = document.createElement('div');
        shadowRoot.appendChild(div);
        div.textContent = content;
    }

    static get observedAttributes() { 
        return ['watcher'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if( this.readOnlyProperty().includes(name) === false){
            this[name] = newValue;
        }
        if(name == 'watcher') {
            this.updateResult();
        }
    }

    //read only (required get method)
    readOnlyProperty() {
        return ['styling'];
    }

    get styling() {
        return this.getAttribute('styling')  || '';
    }


}

export {Parts01Input, Parts01Output};

