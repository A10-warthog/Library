function Book() {
    this.title = '';
    this.author = '';
    this.pages = '';
    this.read = false;
    this.info = () => {
        let haveRead = '';
        if (this.read === false)
            haveRead = "not read yet";
        else 
            haveRead = "have read"
        console.log(`${this.title} by ${this.author}, ${this.pages} ${haveRead}`)
    };
}