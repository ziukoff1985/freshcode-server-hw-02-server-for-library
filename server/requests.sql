SELECT authors.id, authors.full_name, books.title
FROM authors
JOIN authors_books ON authors.id = authors_books."authorId"
JOIN books ON authors_books."bookId" = books.id
ORDER BY authors.id;