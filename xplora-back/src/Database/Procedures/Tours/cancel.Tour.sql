CREATE OR ALTER PROCEDURE cancelTour(@id VARCHAr(200))
AS
BEGIN
    UPDATE Tours
    SET isCanceled =  1
    WHERE id = @id
    AND isCanceled = 0
END

