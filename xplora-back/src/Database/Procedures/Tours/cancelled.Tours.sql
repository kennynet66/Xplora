CREATE OR ALTER PROCEDURE cancelledTours
AS
BEGIN
    SELECT * FROM Tours
    WHERE isCanceled = 1
END