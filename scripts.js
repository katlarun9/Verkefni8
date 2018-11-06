const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    const itemList = items.querySelectorAll('.item');
    
    for(let i=0; i<itemList.length; i++) {
        let checkbox = itemList[i].querySelector('.item__checkbox');
        let text = itemList[i].querySelector('.item__text');
        let button = itemList[i].querySelector('.item__button');

        checkbox.addEventListener('click', finish);
        text.addEventListener('click', edit);
        button.addEventListener('click', deleteItem);
    }

    // TODO láta hluti í _items virka
  }

  function formHandler(e) {
    e.preventDefault();
    const {target} = e;
    const {parentNode} = target;
    const innslattur = parentNode.querySelector('.form__input');
    console.log(innslattur);
    if(innslattur.value.trim()) {
      let a = add(target);
      innslattur.value = '';
    }
    console.log('halló heimur');
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    console.log('finish');
    const {target} = e;
    target.parentNode.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    console.log('edit');
      const {target} = e;
    
      const {textContent, parentNode} = target;

      parentNode.removeChild(target);

      let input = el('input', 'item__edit');
      
      input.addEventListener('keyup', commit);
      input.setAttribute('type', 'text');
      input.value = textContent;

      let button = parentNode.querySelector('.item__button');
      parentNode.insertBefore(input,button);

      input.focus();
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    const { keyCode } = e;
    const { target } = e;
    const { parentNode } = target;
    let text;
      if(keyCode === ENTER_KEYCODE) {
        text = target.value;
        console.log(text);
        let span = el('span', 'item__text', edit);
        let button = parentNode.querySelector('.item__button');
        parentNode.insertBefore(span, button);
        console.log('halo');
        parentNode.removeChild(target);
        console.log(text);
        const txt = document.createTextNode(text);
        span.appendChild(txt);
      }
      
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const {parentNode} = value;
    const innslattur = parentNode.querySelector('.form__input');

    let listi = el('li', 'item');
    let checkbox = el('input', 'item__checkbox', finish);
    checkbox.setAttribute('type', 'checkbox');
    let span = el('span', 'item__text', edit);
    const txt = document.createTextNode(innslattur.value);
    span.appendChild(txt);

    let button = el('button', 'item__button', deleteItem);
    const takki = document.createTextNode('Eyða');
    button.appendChild(takki);

    listi.appendChild(checkbox);
    listi.appendChild(span);
    listi.appendChild(button);
    items.appendChild(listi);
    console.log(items);

  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    const {target} = e;
    const parent  = target.parentNode;
    
    let checkbox = parent.querySelector('.item__checkbox');
    checkbox.removeEventListener('click', finish);
    
    parent.parentNode.removeChild(parent);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    let element = document.createElement(type);
  
    if (className){
          element.classList.add(className);
      }
      if (clickHandler){
          element.addEventListener('click', clickHandler);
      }

      return element;
  }

  return {
    init: init
  }
})();
