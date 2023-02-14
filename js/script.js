const myLibrary = [];
const form = document.querySelector(".book_form");
const bookPrint = document.querySelector("[data-id='0']");
const select = document.querySelector("[data-name='genre']"); 
const [...inputField] = document.querySelector(".form")
                              .querySelectorAll("input");



function Book(title, author, pages, genre, state) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.state = state;
}

function addBookToLibrary(title, author, pages, genre, state) {
    const newBook = new Book(title, author, pages, genre, state);
    myLibrary.push(newBook);
}

function addBookToDom(book) {
    
}

function addBook(event) {  
    event.preventDefault();
    inputField.push(select);
    if (inputField.some(elm => elm.value === '') === true) {
        if (!form.classList.contains("empty_field"))
            form.classList.add("empty_field");
        return;
    }

    if (inputField.every(elm => elm.value !== '') === true) {
        const book = document.importNode(bookPrint, true);
        const data = inputField.reduce((obj, input) => {
            const dataName = input.getAttribute("data-name");
            const {value} = input;
            obj[dataName] = value;
            if (dataName === 'status' && input.checked === true)
                obj.status = 'read';
            return obj;
        }, {})
        // console.log
        console.log(data);
        addBookToLibrary(data.title, data.author, data.page, data.genre, data.status);
        addBookToDom(book);
    }

    
}



document.querySelector(".btn_add").addEventListener("click", () => {
    document.querySelector(".book_box__add").classList.remove("display--none");
    document.querySelector(".container").classList.add("blur");
})

document.querySelector(".btn_submit").addEventListener("click", addBook);

form.addEventListener("change", () => {
    if (inputField.every(elm => elm.value !== '') === true)
       form.classList.remove("empty_field");
})