DROP TABLE IF EXISTS ;

CREATE TABLE trees (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  quantity INTEGER (quantity > 0)
);