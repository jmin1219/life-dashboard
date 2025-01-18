CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATE NOT NULL,
  amount REAL NOT NULL CHECK (amount > 0),
  method TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT DEFAULT NULL,
  details TEXT DEFAULT NULL,
  processed BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_transactions_category ON transactions(category);
CREATE INDEX idx_transactions_processed ON transactions(processed);

-- ------------------ MOCK DATA ------------------
-- Groceries
INSERT INTO transactions (date, amount, method, category, description, details, processed)
VALUES
('2025-01-10', 75.50, 'Credit Card', 'Groceries', 'Weekly groceries', 'Bought essentials and snacks', TRUE),
('2025-01-15', 100.00, 'Debit Card', 'Groceries', 'Monthly bulk shopping', 'Bought household supplies', TRUE),
('2025-01-20', 25.75, 'Cash', 'Groceries', 'Quick grocery run', 'Bought milk and bread', FALSE);

-- Dining
INSERT INTO transactions (date, amount, method, category, description, details, processed)
VALUES
('2025-01-12', 45.00, 'Credit Card', 'Dining', 'Dinner at Italian restaurant', 'Family dinner night', TRUE),
('2025-01-18', 18.50, 'Debit Card', 'Dining', 'Quick lunch', 'Had ramen with a friend', TRUE),
('2025-01-22', 30.00, 'Cash', 'Dining', 'Lunch date', 'Visited a local cafe', FALSE);

-- Transportation
INSERT INTO transactions (date, amount, method, category, description, details, processed)
VALUES
('2025-01-11', 20.00, 'Cash', 'Transportation', 'Taxi fare', 'Ride to work', TRUE),
('2025-01-14', 50.00, 'Credit Card', 'Transportation', 'Monthly subway pass', 'January subway pass purchase', TRUE),
('2025-01-19', 12.50, 'Debit Card', 'Transportation', 'Uber ride', 'Ride from airport to home', FALSE);

-- Entertainment
INSERT INTO transactions (date, amount, method, category, description, details, processed)
VALUES
('2025-01-09', 15.00, 'Credit Card', 'Entertainment', 'Movie ticket', 'Watched Avatar 3', TRUE),
('2025-01-17', 30.00, 'Debit Card', 'Entertainment', 'Concert ticket', 'Attended a local band performance', TRUE),
('2025-01-23', 10.00, 'Cash', 'Entertainment', 'Arcade games', 'Played games at an arcade', FALSE);


