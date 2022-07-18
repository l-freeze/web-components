export function state(){
    console.log(window);
    if(typeof window.__webcomponents__ == 'undefined') {
        window.__webcomponents__ = {
            __: 'defined'
        };
    }
    return window.__webcomponents__;
}
