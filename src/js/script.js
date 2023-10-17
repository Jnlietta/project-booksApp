{
  'use strict';

  class BooksList {
    constructor(){
      const thisBooksList = this;
      //console.log(this);

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render(thisBooksList.booksSource);
      thisBooksList.initActions();
    }

    initData(){
      const thisBooksList = this;

      thisBooksList.data = dataSource;
        
    }

    getElements(){
      const thisBooksList = this;

      thisBooksList.dom = {};

      thisBooksList.dom.booksList = document.querySelector('.books-list');
      thisBooksList.dom.template = document.querySelector('#template-book');
      thisBooksList.dom.formFilters = document.querySelector('.filters'); //reference to form with class 'filters'
    
      thisBooksList.booksSource = dataSource.books; //ogarniete
      //console.log('booksSource',thisBooksList.booksSource);
      
      thisBooksList.template = Handlebars.compile(document.querySelector('#template-book').innerHTML); //ogarniete
      //console.log('template', thisBooksList.template);

      thisBooksList.favoriteBooks = []; //ogarniete
      thisBooksList.filters = []; //ogarniete
      
    }

    determineRatingBgc(rating){ //wywolywana w render

      if(rating < 6){return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';}
      if(rating > 6 && rating<= 8){return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';}
      if(rating > 8 && rating<= 9){return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';}
      if(rating > 9){return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';}
    
    }

    render(booksArray){
      const thisBooksList = this;
      //console.log('booksArray:',booksArray);

      for(let bookData of booksArray){ 
        //console.log('bookData',bookData);
      
        const ratingBgc = thisBooksList.determineRatingBgc(bookData.rating);
        //console.log('ratingBgc',ratingBgc);
      
        const ratingPercentage = bookData.rating * 10;
        const ratingWidth = ratingPercentage.toString();
        //console.log('ratingWidth',ratingWidth);
      
        bookData.ratingBgc = ratingBgc;
        bookData.ratingWidth = ratingWidth;
        //console.log('bookData',bookData);
      
        const  generatedHTML = thisBooksList.template(bookData);
        //console.log('generated HTML',generatedHTML); //szablon z podstawionymi danymi ksiazki jako string
                  
        const generatedDOM = utils.createDOMFromHTML(generatedHTML); 
        //console.log('generatedDOM',generatedDOM); //string szablonu z danymi zamieniony na element DOM
      
        thisBooksList.dom.booksList.appendChild(generatedDOM); //wstawienie elementu DOM do rodzica w HTML
      }
    }

    filterBooks(){ //wywolywana w initActions
      const thisBooksList = this;

      for(const book of dataSource.books){ 

        const bookDetails = book.details;
        const bookId = book.id;
        let shouldBeHidden = false;
      
        for(const filter of thisBooksList.filters){ 
                  
          if(!bookDetails[filter]){
            shouldBeHidden = true;
            break; //przerwanie petli, bo dalej nie trzeba sprawdzac
          }
        }
                  
        const hiddenElementSelector = '.book__image[data-id="'+ bookId +'"]';
        const hiddenElement = thisBooksList.dom.booksList.querySelector(hiddenElementSelector);    
      
        if(shouldBeHidden == true){
          hiddenElement.classList.add('hidden');
        } else {
          hiddenElement.classList.remove('hidden');
        }
      }
    }

    initActions(){
      const thisBooksList = this;

      //   const booksImages = thisBooksList.dom.booksList.querySelectorAll('li .book__image'); //obrazek ksiazki w liscie w ul books-list
      //   console.log('bookImage',booksImages);

      thisBooksList.dom.booksList.addEventListener('dblclick', function(event){
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
  
          //check if elem doesn't contain class 'favorite'
          if(!elem.classList.contains('favorite')){
          //add class favorite to clicked elem
            elem.classList.add('favorite');
  
            //add dataId to array thisBooksList.favoriteBooks
            thisBooksList.favoriteBooks.push(dataId);
          
          } else {
      
            //remove class favorite from clicked element
            elem.classList.remove('favorite');
  
            //get the index of clicked element 'dataId' from array thisBooksList.favoriteBooks
            const indexOfDataId = thisBooksList.favoriteBooks.indexOf(dataId);
  
            //remove the index from array
            thisBooksList.favoriteBooks.splice(indexOfDataId,1);
          
          }
          //console.log('favoriteBooks',thisBooksList.favoriteBooks);
        }
  
      });
  
      thisBooksList.dom.formFilters.addEventListener('click', function(event) {
          
        const clickedElement = event.target;
        //console.log('clickedElement',clickedElement);
          
        if(clickedElement.tagName == 'INPUT' 
              && clickedElement.type == 'checkbox'
              && clickedElement.name == 'filter'){
  
          //show in console value of clicked input
          const value = clickedElement.value;
          //console.log('clickedElement value:',value);
              
          if(clickedElement.checked == true){
            //add value of clicked element to array filters
            thisBooksList.filters.push(value);
          
          } else {
            //get the index of clicked element 'value' from array filters
            const indexOfValue = thisBooksList.filters.indexOf(value);
  
            //remove the index from array
            thisBooksList.filters.splice(indexOfValue,1);
          }
  
          //console.log('filters array:',thisBooksList.filters);
  
          thisBooksList.filterBooks();
        }
  
      });
    }
  }
  
  const app = new BooksList();

  app;

}
