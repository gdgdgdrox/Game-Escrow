CREATE DATABASE game_escrow;
USE game_escrow;

create table game (
    id int auto_increment not null primary key,
    name varchar(255) not null unique,
    image_path varchar(255) default 'assets/image/games/default_game_icon.jpg'
);

Create table game_asset(
    id int not null auto_increment primary key,
    game_id int not null,
    asset_type varchar(255) not null,
    asset_unit varchar(255),
    foreign key (game_id) references game(id)
);

insert into
    game (name, image_path)
values
    ('Maplestory','assets/image/games/maplestory.png'),
    ('CS:GO','assets/image/games/cs_go.webp'),
    ('Dota 2','assets/image/games/dota_2.png'),
    ('Clash Of Clans','assets/image/games/clash_of_clans.png'),
    ('Genshin Impact','assets/image/games/genshin_impact.png'),
    ('Honkai Star Rail','assets/image/games/honkai_star_rail.jpg'),
    ('Pokemon GO','assets/image/games/pokemon_go.webp'),
    ('Team Fortress 2','assets/image/games/team_fortress_2.png'),
    ('Wuthering Waves','assets/image/games/wuthering_waves.png'),
    ('World Of Warcraft', 'assets/image/games/wow.jpeg'),
    ('Valorant', 'assets/image/games/valorant.png'),
    ('Runescape', 'assets/image/games/runescape.png'),
    ('PUBG', 'assets/image/games/pubg.png'),
    ('EVE Online', 'assets/image/games/eve_online.png'),
    ('Fortnite', 'assets/image/games/fortnite.png');

insert into
    game_asset(game_id, asset_type, asset_unit)
values
    (1, 'meso', 'quantity'),
    (1, 'donor point',  'quantity'),
    (1, 'equipment', 'name'),
    (1, 'account', 'name'),
    (2, 'skin', 'name'),
    (3, 'skin', 'name'),
    (4, 'town hall', 'name'),
    (4, 'gems', 'quantity'),
    (4, 'account', 'name'),
    (5, 'genesis crystal', 'quantity'),
    (5, 'account', 'name'),
    (6, 'oneiric shard', 'quantity'),
    (6, 'account', 'name'),
    (7, 'PokeCoins', 'quantity'),
    (7, 'pokemon', 'name'),
    (7, 'account', 'name'),
    (8, 'account', 'name'),
    (9, 'lunite', 'quantity'),
    (9, 'account', 'name'),
    (10, 'token', 'quantity'),
    (10, 'item', 'name'),
    (11, 'account', 'name'),
    (11, 'valorant points', 'quantity'),
    (12, 'gold', 'quantity'),
    (13, 'unknown cash', 'quantity'),
    (13, 'account', 'name'),
    (14, 'PLEX', 'quantity'),
    (14, 'ship', 'name'),
    (15, 'V-Bucks', 'quantity'),
    (15, 'skin', 'name'),
    (15, 'account', 'name');

CREATE TABLE `user` (
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `sex` enum('male','female') NOT NULL,
  `first_name` varchar(255),
  `last_name` varchar(255) NOT NULL,
  PRIMARY KEY (`username`)
);