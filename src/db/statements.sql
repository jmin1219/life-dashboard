-- -- ------------------ TRANSACTIONS TABLE SETUP ------------------

-- CREATE TABLE IF NOT EXISTS transactions (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   date DATE NOT NULL,
--   amount REAL NOT NULL CHECK (amount > 0),
--   method TEXT NOT NULL,
--   category_id INTEGER NOT NULL REFERENCES categories(id),
--   title TEXT DEFAULT NULL,
--   details TEXT DEFAULT NULL,
--   processed BOOLEAN DEFAULT TRUE
-- );

-- -- ------------------ CATEGORIES TABLE SETUP ------------------
-- CREATE TABLE IF NOT EXISTS categories (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   name TEXT NOT NULL UNIQUE,
--   color TEXT NOT NULL
-- );

-- -- Default categories and colors
-- INSERT INTO categories (name, color) VALUES
--   ('Groceries', '#FF5733'),
--   ('Dining', '#33FF57'),
--   ('Transportation', '#5733FF'),
--   ('Entertainment', '#FFD700');

