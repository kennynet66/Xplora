CREATE OR ALTER PROCEDURE oneUser(@id VARCHAR(200))
AS
BEGIN
    SELECT * FROM Users
    WHERE id = @id
END