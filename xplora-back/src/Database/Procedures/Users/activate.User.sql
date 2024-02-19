CREATE OR ALTER PROCEDURE activateUser(@id VARCHAR(100))
AS
BEGIN
    UPDATE Users
    SET isDeleted = 0
    WHERE id = @id
END