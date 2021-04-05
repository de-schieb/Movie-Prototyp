CREATE TABLE movie(
    movie_id bigint --AUTO_INCREMENT
    ,title varchar(100),
    fsk int,
    length int,
    release_date date,
    description varchar(8000),
    trailer_url varchar(500),
    picturepath varchar(500),
    primary key(movie_id)
);

CREATE TABLE hall (
    hall_id bigint --AUTO_INCREMENT
    ,number_of_seats int,
    startSeat int,
    endSeat int,
    show_id bigint,
    primary key(hall_id)
    --, foreign key(show_id)
        -- references show(show_id)
            -- on delete set null
);

CREATE TABLE dbo.show (
    show_id bigint --AUTO_INCREMENT
    ,startTime timestamp,
    movie_id bigint,
    hall_id bigint,
    primary key(show_id),
    constraint movie_deleted_delete_show
    foreign key(movie_id) 
        references movie(movie_id)
            on delete cascade,
    constraint hall_deleted_set_null
    foreign key(hall_id)
        references hall(hall_id)
            on delete set null
);

CREATE TABLE seat (
    seat_id bigint --AUTO_INCREMENT
    ,free bit,
    show_id bigint,
    hall_id bigint,
    primary key(seat_id),
    constraint show_deleted_delete_seat
    foreign key(show_id)
        references dbo.show(show_id)
            on delete cascade,
    constraint hall_deleted_delete_seat
    foreign key(hall_id)
        references hall(hall_id)
            on delete cascade
);

CREATE TABLE ticket (
    ticket_id bigint --AUTO_INCREMENT
    ,price float,
    movie_id bigint,
    show_id bigint,
    hall_id bigint,
    seat_id bigint,
    primary key(ticket_id),
    constraint movie_deleted_delete_ticket
    foreign key(movie_id)
        references movie(movie_id)
            on delete cascade,
    --constraint show_deleted_delete_ticket
    foreign key(show_id)
        references dbo.show(show_id)
            --on delete cascade
    ,foreign key(hall_id)
        references hall(hall_id),
    foreign key(seat_id) 
        references seat(seat_id)
);