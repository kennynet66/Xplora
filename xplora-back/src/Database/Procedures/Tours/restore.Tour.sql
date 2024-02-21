CREATE OR ALTER PROCEDURE restoreTour(@id VarChar(100))
AS
BEGIN
    UPDATE Tours
    SET isCanceled = 0
    WHERE id = @id
    AND isCanceled = 1
END