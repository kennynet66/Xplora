CREATE OR ALTER PROCEDURE checkTour(@user_id VARCHAR(200), @tour_id VARCHAR(200))
AS
BEGIN
    SELECT * FROM Bookings
    WHERE user_id = @user_id AND tour_id = @tour_id
END