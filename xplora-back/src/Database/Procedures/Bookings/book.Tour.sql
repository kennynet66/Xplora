CREATE OR ALTER PROCEDURE bookTour(
    @id VARCHAR(200),
    @tour_id VARCHAR(200),
    @user_id VARCHAR(200)
)
AS
BEGIN
    INSERT INTO Bookings(id, tour_id, user_id)
    VALUES(@id, @tour_id, @user_id)
END