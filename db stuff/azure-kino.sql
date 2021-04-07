CREATE TABLE movie(
    movie_id bigint IDENTITY(1000,1) primary key,
    title varchar(100),
    fsk int,
    length int,
    release_date date,
    description varchar(8000),
    trailer_url varchar(500),
    picture_path varchar(500),
);

CREATE TABLE hall (
    hall_id bigint IDENTITY(2000,1) primary key,
    number_of_seats int,
    startSeat int,
    endSeat int,
    show_id bigint
    --, foreign key(show_id)
        -- references show(show_id)
            -- on delete set null
);

CREATE TABLE dbo.show (
    show_id bigint IDENTITY(3000,1) primary key,
    startTime timestamp,
    movie_id bigint,
    hall_id bigint,
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
    seat_id bigint IDENTITY(4000,1) primary key,
    free bit,
    show_id bigint,
    hall_id bigint,
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
    ticket_id bigint IDENTITY(5000,1) primary key,
    price float,
    movie_id bigint,
    show_id bigint,
    hall_id bigint,
    seat_id bigint,
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