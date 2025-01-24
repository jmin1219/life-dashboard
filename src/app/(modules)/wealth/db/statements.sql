-- -- ------------------ TRANSACTIONS TABLE SETUP ------------------

CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('expense', 'income', 'investment')),
  category_id INTEGER NOT NULL,
  method TEXT NOT NULL,
  details TEXT DEFAULT NULL,
  processed BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (category_id) REFERENCES categories (id)
);

-- -- ------------------ CATEGORIES TABLE SETUP ------------------
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL
);

-- -- Default categories and colors
-- INSERT INTO categories (name, color) VALUES
--   ('Groceries', '#FF5733'),
--   ('Dining', '#33FF57'),
--   ('Transportation', '#5733FF'),
--   ('Entertainment', '#FFD700');




-- DELETE FROM transactions;
-- DELETE FROM categories;


-- INSERT INTO categories (name, color) VALUES
-- ("Subscriptions", "#FF5733"),
-- ("Transportation", "#33FF57"),
-- ("Entertainment", "#3357FF"),
-- ("Groceries", "#FF33A1"),
-- ("Dining Out", "#A133FF"),
-- ("Investments", "#33FFF5"),
-- ("Miscellaneous", "#FF8C33");

