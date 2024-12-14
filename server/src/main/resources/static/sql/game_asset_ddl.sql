Create table game_asset(
    id int not null auto_increment primary key,
    game_id int not null,
    asset_type varchar(255) not null,
    asset_unit varchar(255),
    foreign key (game_id) references game(id)
);