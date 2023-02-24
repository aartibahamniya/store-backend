CREATE TABLE product (
    id int auto_increment,
    title varchar(255) not null,
    category varchar(255),
    image_url varchar(255),
    description varchar(255),
    price varchar(255),
    primary key (id)
);