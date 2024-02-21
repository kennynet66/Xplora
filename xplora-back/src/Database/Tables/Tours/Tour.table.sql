CREATE TABLE Tours(
    id VARCHAR(100),
    tour_title VARCHAR(400),
    tour_dest VARCHAR(500),
    tour_desc VARCHAR(8000),
    tour_img VARCHAR(8000),
    start_date VARCHAR(50),
    end_date VARCHAR(50),
    isActive BIT DEFAULT 0 NOT NULL
);
