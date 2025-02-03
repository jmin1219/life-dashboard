-- -- -- ------------------ TRANSACTIONS TABLE SCHEMA ------------------

-- CREATE TABLE transactions (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   date DATE NOT NULL,
--   amount REAL NOT NULL CHECK (amount > 0),
--   category_id INTEGER NOT NULL,
--   type TEXT NOT NULL CHECK (type IN ('expense', 'income', 'investment', 'transfer')),
--   method_id INTEGER DEFAULT NULL,
--   title TEXT NOT NULL,
--   details TEXT DEFAULT NULL,
--   importance_level TEXT CHECK (importance_level IN ('essential', 'optional', 'unexpected but necessary')),
--   FOREIGN KEY (category_id) REFERENCES categories(id),
--   FOREIGN KEY (method_id) REFERENCES payment_methods(id) ON DELETE SET NULL
-- );

-- -- importance_level:
-- -- •	essential → Must-have (e.g., rent, groceries, medical bills).
-- -- •	unexpected but necessary → Unplanned but important (e.g., emergency expenses, car repair).
-- -- •	optional → Non-essential (e.g., entertainment, luxury items).



-- -- -- ------------------ TRANSACTIONS TABLE SCHEMA ------------------

-- CREATE TABLE scheduled_transactions (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   date DATE NOT NULL, -- When it should be processed
--   amount REAL NOT NULL CHECK (amount > 0),
--   category_id INTEGER NOT NULL,
--   type TEXT NOT NULL CHECK (type IN ('expense', 'income', 'investment', 'transfer')),
--   method_id INTEGER DEFAULT NULL,
--   title TEXT NOT NULL,
--   details TEXT DEFAULT NULL,
--   recurrence TEXT CHECK (recurrence IN ('daily', 'weekly', 'monthly', 'yearly')),
--   status TEXT CHECK (status IN ('pending', 'completed', 'canceled')) DEFAULT 'pending',
--   FOREIGN KEY (category_id) REFERENCES categories(id),
--   FOREIGN KEY (method_id) REFERENCES payment_methods(id) ON DELETE SET NULL
-- );



-- -- -- ------------------ CATEGORIES TABLE SCHEMA ------------------
-- CREATE TABLE categories (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   name TEXT NOT NULL UNIQUE,
--   color TEXT NOT NULL
-- );


-- -- -- ------------------ PAYMENT METHODS TABLE SCHEMA ------------------
-- CREATE TABLE payment_methods (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   name TEXT NOT NULL UNIQUE,
--   account_number TEXT DEFAULT NULL
-- );


-- -- -- ------------------ BUDGET TABLE SCHEMA ------------------
-- CREATE TABLE budgets (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   category_id INTEGER NOT NULL,
--   limit_amount REAL NOT NULL CHECK (limit_amount > 0),
--   period TEXT CHECK (period IN ('monthly', 'weekly', 'daily', 'yearly')),
--   FOREIGN KEY (category_id) REFERENCES categories(id)
-- );

-- -- -- ------------------ INVESTMENTS TABLE SCHEMA ------------------
-- CREATE TABLE investments (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   name TEXT NOT NULL,
--   type TEXT NOT NULL,
--   amount_invested REAL NOT NULL,
--   current_value REAL NOT NULL,
--   roi REAL GENERATED ALWAYS AS ((current_value - amount_invested) / amount_invested * 100) STORED,
--   investment_date DATE NOT NULL,
--   last_updated DATE DEFAULT CURRENT_DATE
-- );


-- -- -- ------------------ SAVINGS GOALS TABLE SCHEMA ------------------
-- CREATE TABLE savings_goals (
--   id INTEGER PRIMARY KEY AUTOINCREMENT,
--   name TEXT NOT NULL,
--   target_amount REAL NOT NULL CHECK (target_amount > 0),
--   current_amount REAL DEFAULT 0,
--   deadline DATE DEFAULT NULL,
--   status TEXT CHECK (status IN ('in progress', 'compeleted', 'failed')) DEFAULT 'in progress'
-- );


