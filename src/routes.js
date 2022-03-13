// impor modul dari handler
const {
  saveBooks, showBooks, showBooksById, editBookById, deleteBooksById,
} = require('./handler');

const routes = [
  {
    // rute untuk KRITERIA 1
    method: 'POST',
    path: '/books',
    handler: saveBooks,
  },
  {
    // rute untuk KRITERIA 2 dan TUGAS OPTIONAL
    method: 'GET',
    path: '/{books?}',
    handler: showBooks,
  },
  {
    // rute untuk KRITERIA 3
    method: 'GET',
    path: '/books/{id}',
    handler: showBooksById,
  },
  {
    // rute untuk KRITERIA 4
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookById,
  },
  {
    // rute untuk KRITERIA 5
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBooksById,
  },
];

// ekspor modul
module.exports = routes;
