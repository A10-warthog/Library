(() => {
  let myLibrary = [];
  const container = document.querySelector(".container");
  const bookshelf = document.querySelector(".bookshelf");
  const addBtn = document.querySelector(".btn_add");
  const form = document.querySelector(".book_form");
  const inputValue = document.querySelector(".form");
  const bookPrint = document.querySelector("[data-id='0']");
  const select = document.querySelector("[data-name='genre']");
  const formBody = document.querySelector(".book_box__add");
  const noBook = document.querySelector(".no_books_txt");
  const [...inputField] = document
    .querySelector(".form")
    .querySelectorAll("input");
  inputField.push(select);

  // Book class
  function Book(title, author, pages, genre, state) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.state = state;
  }

  // remove no book text from display
  function noBooks() {
    if (myLibrary.length === 0) {
      noBook.classList.remove("display--none");
    } else {
      noBook.classList.add("display--none");
    }
  }

  // finds button recursively
  function isButton(elm) {
    if (elm.tagName === "BUTTON" || elm.tagName === "DIV") return elm;
    return isButton(elm.parentElement);
  }

  // create book obj and add to array
  function addBookToLibrary(title, author, pages, genre, state) {
    const newBook = new Book(title, author, pages, genre, state);
    myLibrary.push(newBook);
  }

  // returns book component
  function addBookToDom(book) {
    const len = myLibrary.length - 1;
    const thisBook = book;
    thisBook.querySelectorAll("[data-put]").forEach((elm) => {
      switch (elm.getAttribute("data-put")) {
        case "title":
          elm.textContent = myLibrary[len].title;
          break;
        case "author":
          elm.textContent = myLibrary[len].author;
          break;
        case "genre":
          elm.textContent = myLibrary[len].genre;
          break;
        case "page":
          elm.textContent = myLibrary[len].pages;
          break;
        case "status":
          elm.textContent = myLibrary[len].state;
          break;
        default:
          break;
      }
    });
    // make book green when user checks read
    if (thisBook.querySelector("[data-put='status']").textContent === "read")
      thisBook.classList.add("read");

    // sets id of the book
    thisBook.setAttribute("data-id", len + 1);
    myLibrary[myLibrary.length - 1].id = len + 1;

    // adds event listener to book's buttons
    thisBook.querySelectorAll("button").forEach((btn) =>
      btn.addEventListener("click", (event) => {
        const dataName = isButton(event.target).getAttribute("data-name");
        if (dataName === "btn_del") {
          myLibrary = myLibrary.filter(
            (elm) => elm.id !== +thisBook.getAttribute("data-id")
          );
          noBooks();
          thisBook.remove();
        }
        if (dataName === "btn_status") {
          const status = thisBook.querySelector("[data-put='status']");
          const foundBook = myLibrary.find(
            (elm) => elm.id === +thisBook.getAttribute("data-id")
          );
          if (foundBook.state === "unread") {
            foundBook.state = "read";
            thisBook.classList.add("read");
          } else {
            foundBook.state = "unread";
            thisBook.classList.remove("read");
          }
          myLibrary[foundBook.id - 1].state = foundBook.state;
          status.textContent = foundBook.state;
        }
      })
    );
    noBooks();
    thisBook.classList.remove("display--none");
    return thisBook;
  }

  // event listener for submit button
  function addBook(event) {
    event.preventDefault();
    if (inputField.some((elm) => elm.value === "") === true) {
      if (!form.classList.contains("empty_field"))
        form.classList.add("empty_field");
      return;
    }

    if (inputField.every((elm) => elm.value !== "") === true) {
      const book = document.importNode(bookPrint, true);
      const data = inputField.reduce((obj, input) => {
        const dataName = input.getAttribute("data-name");
        const { value } = input;
        obj[dataName] = value;
        if (dataName === "status" && input.checked === true)
          obj.status = "read";
        return obj;
      }, {});
      addBookToLibrary(
        data.title,
        data.author,
        data.page,
        data.genre,
        data.status
      );
      const toDomBook = addBookToDom(book);
      bookshelf.insertBefore(toDomBook, addBtn.parentElement);
      document.querySelector(".book_box__add").classList.add("display--none");
      bookshelf.parentElement.classList.remove("blur");
      inputValue.reset();
    }
  }

  // brings form to display
  addBtn.addEventListener("click", () => {
    formBody.classList.remove("display--none");
    container.classList.add("blur");
  });

  form.addEventListener("click", (event) => {
    const elm = isButton(event.target);
    switch (elm.getAttribute("data-name")) {
      case "btn_close":
        container.classList.remove("blur");
        formBody.classList.add("display--none");
        form.classList.remove("empty_field");
        inputValue.reset();
        break;
      case "btn_submit":
        addBook(event);
        break;
      case "btn_reset":
        form.classList.remove("empty_field");
        break;
      default:
        break;
    }
  });

  inputField.forEach((elm) => {
    elm.addEventListener("input", () => {
      if (inputField.every((input) => input.value !== "") === true)
        form.classList.remove("empty_field");
    });
  });

  formBody.addEventListener("mousedown", (event) => {
    if (
      event.button === 0 &&
      event.target.classList.contains("book_box__add")
    ) {
      formBody.classList.add("display--none");
      form.classList.remove("empty_field");
      container.classList.remove("blur");
      inputValue.reset();
    }
  });
})();
