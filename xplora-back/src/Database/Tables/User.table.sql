USE Xplora

CREATE TABLE Users(
    id VARCHAR(200) UNIQUE,
    full_name VARCHAR(100),
    password VARCHAR(200),
    email VARCHAR(200) NOT NULL UNIQUE,
    isDeleted BIT DEFAULT 0,
    isWelcomed BIT DEFAULT 0,
    isAdmin BIT DEFAULT 0,
);

SELECT * FROM Users

ALTER TABLE users
ALTER COLUMN profile_img VARCHAR(8000)

UPDATE Users
SET isAdmin = 1
WHERE email = 'kennynet66@gmail.com'