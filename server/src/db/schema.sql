create table if not exists users (
    id serial primary key,
    username varchar(255) not null,
    password varchar(255) not null,
    email varchar(255) not null,
    created_at timestamp default current_timestamp
);

create table if not exists posts (
    id serial primary key,
    user_id integer references users(id),
    title varchar(255) not null,
    content text not null,
    created_at timestamp default current_timestamp
);