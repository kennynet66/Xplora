CREATE OR ALTER PROCEDURE deactivateUser(@id VARCHAR(100))
AS
BEGIN
    UPDATE Users
    SET isDeleted = 1
    WHERE id = @id
END