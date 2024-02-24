/* SELECT * FROM Users
INNER JOIN Bookings
	ON Users.id = 'a5ab0353-c22f-4ab6-b6ab-57d61e59669f' */


CREATE OR ALTER PROCEDURE getUserBookings(@id VARCHAR(200))
AS
BEGIN
SELECT * FROM Users
INNER JOIN Bookings
ON Users.id = @id
END