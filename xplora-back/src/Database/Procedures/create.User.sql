CREATE OR ALTER PROCEDURE createUser(
    @id VARCHAR(200),
    @full_name VARCHAR(100),
    @password VARCHAR(200),
    @email VARCHAR(200)
)
AS
BEGIN
    INSERT INTO Users(id, full_name, password, email)
    VALUES(@id, @full_name, @password, @email)
END
GO
