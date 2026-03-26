-- SELECT authors.id, authors.full_name, books.title
-- FROM authors
-- JOIN authors_books ON authors.id = authors_books."authorId"
-- JOIN books ON authors_books."bookId" = books.id
-- ORDER BY authors.id;

-- ALTER TABLE books 
-- ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CREATE OR REPLACE FUNCTION update_modified_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--     NEW."updatedAt" = now();
--     RETURN NEW;
-- END;
-- $$ language 'plpgsql';

-- CREATE TRIGGER update_books_modtime
-- BEFORE UPDATE ON books
-- FOR EACH ROW
-- EXECUTE PROCEDURE update_modified_column();

