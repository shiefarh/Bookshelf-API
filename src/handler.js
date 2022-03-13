// import modul
const { nanoid } = require('nanoid');
const books = require('./books');

// handler untuk KRITERIA 1 : API dapat menyimpan buku
const saveBooks = (request, h) => {
  // mendeklarasikan variabel
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const id = nanoid(16);
  const finished = Boolean(pageCount === readPage);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBookInfo = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  // apabila nama tidak didefinisikan ketika menginput
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  // apabila readpage lebih besar dari pagecount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  // memasukkan nilai dari variabel yang didefinisikan ke dalam module 'books'
  books.push(newBookInfo);

  // apabila proses sesuai dan berhasil
  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  // kegagalan untuk faktor lainnya
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// handler untuk kriteria 2 : API dapat menampilkan seluruh buku

// tugas optional
const showBooks = (request, h) => {
  const { name, reading, finished } = request.query;
  if (name !== undefined) {
    nameBook = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    return {
      status: 'success',
      data: {
        books: nameBook.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    };
  }
  if (reading) {
    readingBook = books.filter((book) => Number(book.reading) === Number(reading));
    return {
      status: 'success',
      data: {
        books: readingBook.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    };
  }
  if (finished) {
    finishedBook = books.filter((book) => Number(book.finished) === Number(finished));
    return {
      status: 'success',
      data: {
        books: finishedBook.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    };
  }

  // tugas mandatory : menampilkan status berhasil dan data buku
  const response = h.response({
    status: 'success',
    data: {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

// handler untuk KRITERIA 3 : API dapat menampilkan detail buku
// deklarasi variabel
const showBooksById = (request, h) => {
  const { id } = request.params;
  const book = books.filter((book) => book.id === id)[0];

  // apabila ID ditemukan
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  // apabila ID tidak ditemukan
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

// handler untuk KRITERIA 4 : API dapat mengubah data buku
// deklarasi variabel
const editBookById = (request, h) => {
  const { id } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  // apabila properti name tidak dilampirkan
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  // apabila readpage lebih besar dari pagecount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // apabila yang dilampirkan sesuai dan proses update data
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  // apabila ada kegagalan
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// handler untuk KRITERIA 5 : API dapat menghapus buku
// deklarasi variabel
const deleteBooksById = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

  // bila ID ditemukan dan proses delete
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  // apabila ada kegagalan dalam delete
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// ekspor modul
module.exports = {
  saveBooks, showBooks, showBooksById, editBookById, deleteBooksById,
};
