CREATE TABLE product (
    id int auto_increment,
    title varchar(255) not null,
    category varchar(255),
    image_url varchar(255),
    description varchar(255),
    price varchar(255),
    primary key (id)
);

create table users (
    id int auto_increment,
    name varchar(100),
    email varchar(100),
    password varchar(100),
    primary key (id)
);