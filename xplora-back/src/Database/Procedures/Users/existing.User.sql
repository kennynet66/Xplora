CREATE OR ALTER PROCEDURE existingUser(@email VARCHAR(200))
AS
BEGIN
    SELECT * FROM Users
    WHERE email = @email
END