CREATE TABLE IF NOT EXISTS test_results (
    id SERIAL PRIMARY KEY,
    user_session VARCHAR(255),
    total_score INTEGER NOT NULL,
    result_type VARCHAR(50) NOT NULL,
    answers JSONB NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_session ON test_results(user_session);
CREATE INDEX idx_completed_at ON test_results(completed_at DESC);