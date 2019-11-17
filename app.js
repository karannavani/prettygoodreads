
const key = 'yPse7ekZ2yogdr6dKky12w&v=2'

fetchBooks();

function fetchBooks() {
    shelves = ['currently-reading', 'to-read', 'read']
    shelves.forEach(shelf => {
        url = `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/review/list/58929869.xml?key=${key}&shelf=${shelf}&per_page=200&page=1`

        fetch(url)
            .then(res => res.text())
            .then(string => {
                return new window.DOMParser().parseFromString(string, 'text/xml')
            })
            .then(result => {

                toRead = result.getElementsByTagName('reviews')[0].children;
                return getBookTitles(toRead);
            });

    })
}



function getBookTitles(toRead) {

    for (let i = 0; i < toRead.length; i++) {
        // console.log(toRead[i].children[1].children[5]);

        let title = toRead[i].children[1].children[5].innerHTML;

        console.log(title);
    };
};
