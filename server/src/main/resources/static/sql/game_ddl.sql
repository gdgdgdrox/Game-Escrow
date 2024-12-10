create table game (
    id int auto_increment not null primary key,
    name varchar(255) not null unique,
    image_path varchar(255) default 'assets/image/games/default_game_icon.jpg'
);