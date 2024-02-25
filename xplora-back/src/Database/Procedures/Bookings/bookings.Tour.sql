/* SELECT * FROM Users
INNER JOIN Bookings
	ON Users.id = 'a5ab0353-c22f-4ab6-b6ab-57d61e59669f' */


CREATE OR ALTER PROCEDURE getUserBookings(@user_id VARCHAR(200))
AS
BEGIN
-- SELECT full_name, email, user_id FROM Users
-- INNER JOIN Bookings
-- ON Users.id = @user_id;

SELECT *
FROM Bookings
INNER JOIN Tours ON Bookings.tour_id = Tours.id
WHERE Bookings.user_id = @user_id;
END

DELETE FROM Bookings