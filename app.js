const key = 'yPse7ekZ2yogdr6dKky12w&v=2';

fetchBooks();

function fetchBooks() {
  // shelves = ['currently-reading', 'to-read', 'read']
  const shelves = ['currently-reading'];
  shelves.forEach(shelf => {
    const url = `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/review/list/58929869.xml?key=${key}&shelf=${shelf}&per_page=200&page=1`;

    fetch(url)
      .then(res => res.text())
      .then(string => {
        return new window.DOMParser().parseFromString(string, 'text/xml');
      })
      .then(result => {
        const books = result.getElementsByTagName('reviews')[0].children;
        // getBookTitles(books);
        return handleBooks(shelf, books);
      });
  });
}

function handleBooks(shelf, books) {
  for (let i = 0; i < books.length; i++) {
    console.log(books[i].children[1]);

    const book = {
      title: books[i].children[1].children[5].innerHTML,
      author: books[i].children[1].children[21].children[0].children[1].innerHTML,
      isbn: books[i].children[1].children[2].innerHTML
    };

    displayRead(shelf, book);

    // console.log(title);
  }
}

function displayRead(shelf, book) {
  const currentlyReading = $(`.${shelf}`);
  currentlyReading.append(`
  <div class='current-book col-5 align-middle'>
    <p>${book.title}</p>
    <p>By ${book.author}</p>
    </div>`);
}

// function getBookTitles(books) {

//     for (let i = 0; i < books.length; i++) {
//         // console.log(books[i].children[1].children[7].innerHTML);

//         let title = books[i].children[1].children[5].innerHTML;

//         displayRead(title);

//         // console.log(title);
//     };
// };
