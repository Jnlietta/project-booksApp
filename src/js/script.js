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
  getElem.dom.formFilters = document.querySelector('.filters'); //reference to form with class 'filters'

  //console.log('booksList:',getElem.dom.booksList);
  //console.log('DOM template',getElem.dom.template);
  //console.log('form Filters',getElem.dom.formFilters);

  const booksSource = dataSource.books;
  //console.log('booksSource',booksSource);

  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  //console.log('template', template);

  const determineRatingBgc = function(rating){

    if(rating < 6){return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';}
    if(rating > 6 && rating<= 8){return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';}
    if(rating > 8 && rating<= 9){return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';}
    if(rating > 9){return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';}

  };

  const render = function(booksArray) {
    for(let bookData of booksArray){ 
      //console.log('bookData',bookData);

      const ratingBgc = determineRatingBgc(bookData.rating);
      console.log('ratingBgc',ratingBgc);

      const ratingPercentage = bookData.rating * 10;
      const ratingWidth = ratingPercentage.toString();
      console.log('ratingWidth',ratingWidth);

      bookData.ratingBgc = ratingBgc;
      bookData.ratingWidth = ratingWidth;
      console.log('bookData',bookData);

      const  generatedHTML = template(bookData);
      //console.log('generated HTML',generatedHTML); //szablon z podstawionymi danymi ksiazki jako string
            
      const generatedDOM = utils.createDOMFromHTML(generatedHTML); 
      //console.log('generatedDOM',generatedDOM); //string szablonu z danymi zamieniony na element DOM

      getElem.dom.booksList.appendChild(generatedDOM); //wstawienie elementu DOM do rodzica w HTML
    }
  };

  render(booksSource);
    
  const favoriteBooks = [];
  const filters = [];

  const filterBooks = function() {

    for(const book of dataSource.books){ 

      const bookDetails = book.details;
      const bookId = book.id;
      let shouldBeHidden = false;

      for(const filter of filters){ 
            
        if(!bookDetails[filter]){
          shouldBeHidden = true;
          break; //przerwanie petli, bo dalej nie trzeba sprawdzac
        }
      }
            
      const hiddenElementSelector = '.book__image[data-id="'+ bookId +'"]';
      const hiddenElement = getElem.dom.booksList.querySelector(hiddenElementSelector);    

      if(shouldBeHidden == true){
        hiddenElement.classList.add('hidden');
      } else {
        hiddenElement.classList.remove('hidden');
      }
    }
  };

  const initActions = function() {
    
    //   const booksImages = getElem.dom.booksList.querySelectorAll('li .book__image'); //obrazek ksiazki w liscie w ul books-list
    //   console.log('bookImage',booksImages);

    getElem.dom.booksList.addEventListener('dblclick', function(event){
      event.preventDefault();

      //reference to clicked element link DOM as before as elem
      const clickedElement = event.target.offsetParent;
      //console.log('clickedElement',clickedElement);
      const  elem = clickedElement;
        
      //get attribute data-id from clicked elem
      const dataId = elem.getAttribute('data-id');
      //console.log('data-id:',dataId);

      //check if clicked element contain class 'book__image' as before in elem of booksImages
      if(elem.classList.contains('book__image')){ 
      //for (let elem of booksImages){
      
        //get attribute class from elem and make const about it
        const classElem = elem.getAttribute('class');
        //console.log('class of elem',classElem);

        //check if class of elem is not equal to 'book__image favorite'
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
        //console.log('favoriteBooks',favoriteBooks);
      }

    });

    getElem.dom.formFilters.addEventListener('click', function(event) {
        
      const clickedElement = event.target;
      //console.log('clickedElement',clickedElement);
        
      if(clickedElement.tagName == 'INPUT' 
            && clickedElement.type == 'checkbox'
            && clickedElement.name == 'filter'){

        //show in console value of clicked input
        const value = clickedElement.value;
        console.log('clickedElement value:',value);
            
        if(clickedElement.checked == true){
          //add value of clicked element to array filters
          filters.push(value);
        
        } else {
          //get the index of clicked element 'value' from array filters
          const indexOfValue = filters.indexOf(value);

          //remove the index from array
          filters.splice(indexOfValue,1);
        }

        console.log('filters array:',filters);

        filterBooks();
      }

    });
  };

  initActions();
  
}
