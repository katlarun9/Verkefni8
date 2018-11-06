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

    console.log('halló heimur');
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
      console.log('finish');
      const {target} = e;
      target.parentNode.classList.toggle('item--done');
      //target.parentNode.classList.toggle('item--blue'); til að gera background bláan, en þarf að skilgreina í css
      //á að strika yfir textan
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
      console.log('edit');
      const {target} = e;
    
      const {textContent, parentNode} = target;

      parentNode.removeChild(target);

      //svona á að kalla á fallið - útbúa fallið 
      
      //let input = document.createElement('input');
      //input.classList.add('item__edit');
      input.addEventListener('keyup', commit);
      input.setAttribute('type', 'text');
      input.value = textContent

     
     const button = parentNode.querySelector('.item__button');
     parentNode.insertBefore(input, button);

     input.focus();

     console.log(target);
      console.log(textContent);
      console.log(parentNode);


    }

    // event handler fyrir það að klára að breyta færslu
  function commit(e) {
      const { keyCode } = e;
      if(keyCode === ENTER_KEYCODE)
      console.log('halloo');

  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
}

// event handler til að eyða færslu
function deleteItem(e) {
    const {target} = e;
    const parent  = target.parentNode;
    
    let checkbox = parent.querySelector('.item__checkbox');
    checkbox.removeEventListener('click', finish);
    
    parent.parentNode.removeChild(parent);
}

//let input = el( 'input', 'item__edit', add);
//hjálparfall til að útbúa element
function el(type, className, clickHandler) {
    //ekki hvernig á að gera í verkefninu 
    //búa til element alltaf kalla a þetta fall
    
    //bua til div
    let element = document.createElement(type);
    
    if (className){
          //bæta við
          element.classList.add(className);
      }
      if (clickHandler){
          //bæta við clickhandler
          element.addEventListener('click', clickHandler);
      }
      //gefa class


      return
  }

  return {
    init: init
  }
})();