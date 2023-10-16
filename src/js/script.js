{
  'use strict';

  const thisApp = this;

  thisApp.data = dataSource;
  const getElem = {};

  console.log('thisApp',thisApp);

  //referances
  getElem.dom = {};

  getElem.dom.booksList = document.querySelector('.books-list');
  getElem.dom.template = document.querySelector('#template-book');

  console.log('booksList:',getElem.dom.booksList);
  console.log('DOM template',getElem.dom.template);

  const booksSource = dataSource.books;
  console.log('booksSource',booksSource);

  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  console.log('template', template);

  const render = function(booksArray) {
    for(let bookData of booksArray){ 
      console.log('bookData',bookData);

      const  generatedHTML = template(bookData);
      console.log('generated HTML',generatedHTML); //szablon z podstawionymi danymi ksiazki jako string
            
      const generatedDOM = utils.createDOMFromHTML(generatedHTML); 
      console.log('generatedDOM',generatedDOM); //string szablonu z danymi zamieniony na element DOM

      getElem.dom.booksList.appendChild(generatedDOM); //wstawienie elementu DOM do rodzica w HTML
    }
  };

  render(booksSource);
    
  const favoriteBooks = [];
  
  const initActions = function() {
    
    const booksImages = getElem.dom.booksList.querySelectorAll('li .book__image'); //obrazek ksiazki w liscie w ul books-list
    console.log('bookImage',booksImages);

    for (let elem of booksImages){
      elem.addEventListener('dblclick', function(event){
        event.preventDefault();

        //get attribute data-id from clicked elem
        const dataId = elem.getAttribute('data-id');
        console.log('data-id:',dataId);

        const classElem = elem.getAttribute('class');
        console.log(classElem);

        if(classElem!='book__image favorite'){
        //add class favorite to clicked elem
          elem.classList.add('favorite');

          //add dataId to array favoriteBooks
          favoriteBooks.push(dataId);
        

        } else {
    
          //remove class favorite from clicked element
          elem.classList.remove('favorite');

          //get the index of clicked element 'dataId' from array favoriteBooks
          const indexOfDataId = favoriteBooks.indexOf(dataId);

          //remove the index from array
          favoriteBooks.splice(indexOfDataId,1);
        
        }

        console.log('favoriteBooks',favoriteBooks);

      });

    }

  };


  initActions();

}
