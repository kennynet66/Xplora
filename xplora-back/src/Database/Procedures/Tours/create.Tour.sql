CREATE OR ALTER PROCEDURE createTour(
    @id VARCHAR(100),
    @tour_title VARCHAR(400),
    @tour_dest VARCHAR(500),
    @tour_desc VARCHAR(8000),
    @tour_img VARCHAR(8000),
    @start_date VARCHAR(50),
    @end_date VARCHAR(50)
)
AS
BEGIN
    INSERT INTO Tours(id, tour_title, tour_dest, tour_desc, tour_img, start_date, end_date)
    VALUES(
    @id,
    @tour_title,
    @tour_dest,
    @tour_desc,
    @tour_img,
    @start_date,
    @end_date
    )
END