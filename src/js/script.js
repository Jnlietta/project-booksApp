{
    'use strict'

    thisApp = this;

    thisApp.data = dataSource;
    thisApp.getElem = {};

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

    const render = function(array) {
        for(let bookData of array){ //to tablica
                console.log('bookData',bookData);

            const  generatedHTML = template(bookData);
                console.log('generated HTML',generatedHTML); //szablon z podstawionymi danymi ksiazki jako string
            
            const generatedDOM = utils.createDOMFromHTML(generatedHTML); 
                console.log('generatedDOM',generatedDOM); //string szablonu z danymi zamieniony na element DOM

            getElem.dom.booksList.appendChild(generatedDOM); //wstawienie elementu DOM do rodzica w HTML
        }
    }

    render(booksSource);
    
    
}
