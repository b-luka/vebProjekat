drop database if exists ghost;
create database if not exists ghost;
use ghost;

create table text_en_1 (
	id int unsigned not null auto_increment,
    div_id varchar(20) not null,
    content text not null,
    primary key (id)
);

create table text_sr_1 (
	id int unsigned not null auto_increment,
    div_id varchar(20) not null,
    content text not null,
    primary key (id)
);

insert into text_en_1(div_id, content) values
("out_now", "OUT NOW"),
("stream_now", "STREAM NOW"),
("tracklist_title", "Tracklist:");

insert into text_sr_1(div_id, content) values
("out_now", "ДОСТУПНО САДА"),
("stream_now", "СТРИМУЈ САДА"),
("tracklist_title", "Листа песама:");

create table media_1_html (
	id int unsigned not null auto_increment,
    img mediumblob not null,
    media_type varchar(10) not null,
    html_id varchar(50) not null,
    primary key (id)
);

create table media_1_css (
	id int unsigned not null auto_increment,
    img mediumblob not null,
    media_type varchar(10) not null,
    html_id varchar(50) not null,
    primary key (id)
);

-- set @test = LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\bg1.mp4');
-- select @test;
set @startFolder = "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\";
insert into media_1_html(img, media_type, html_id) values
(load_file(concat(@startFolder, "bg1.mp4")), "mp4", "videobg_src"),
(load_file(concat(@startFolder, "logo.png")), "png", "logo_img"),
(load_file(concat(@startFolder, "impera.webp")), "webp", "album_img");

insert into media_1_css(img, media_type, html_id) values
(load_file(concat(@startFolder, "impera_bg.png")), "png", "album_div");

select to_base64(img) as img, media_type, html_id from media_1_html;
select to_base64(img) as img, media_type, html_id from media_1_css;

create table item_inventory(
	id int unsigned not null auto_increment,
    img mediumblob not null,
    stock int unsigned not null default 0,
	price double unsigned not null,
    sold int unsigned not null default 0,
    profit double unsigned not null default 0,
    primary key(id)
);

insert into item_inventory(img, stock, price) values
(load_file(concat(@startFolder, "opusC.png")), 120, 14),
(load_file(concat(@startFolder, "opusR.png")), 150, 29),
(load_file(concat(@startFolder, "infestissumamC.png")), 0, 12),
(load_file(concat(@startFolder, "infestissumamR.png")), 120, 19),
(load_file(concat(@startFolder, "melioraC.png")), 130, 14),
(load_file(concat(@startFolder, "melioraR.png")), 130, 19),
(load_file(concat(@startFolder, "prequelleC.png")), 170, 25),
(load_file(concat(@startFolder, "prequelleR.png")), 180, 35),
(load_file(concat(@startFolder, "imperaC.png")), 220, 15),
(load_file(concat(@startFolder, "imperaR.png")), 210, 25);

create table items_en(
	item int unsigned not null,
    item_name varchar(100) not null,
    item_description text not null,
    foreign key (item) references item_inventory(id) on update cascade on delete cascade
);

create table items_sr(
	item int unsigned not null,
    item_name varchar(100) not null,
    item_description text not null,
    foreign key (item) references item_inventory(id) on update cascade on delete cascade
);

insert into items_en(item, item_name, item_description) values
(1, "Opus Eponymous (2010) - CD", "CD release of the 2010 album Opus Eponymous"),
(2, "Opus Eponymous (2010) - Vinyl Record", "Vinyl release of the 2010 album Opus Eponymous"),
(3, "Infestissumam (2013) - CD", "CD release of the 2013 album Infestissumam"),
(4, "Infestissumam (2013) - Vinyl Record", "Vinyl release of the 2013 album Infestissumam"),
(5, "Meliora (2015) - CD", "CD release of the 2015 album Meliora"),
(6, "Meliora (2015) - Vinyl Record", "Vinyl release of the 2015 album Meliora"),
(7, "Prequelle (2018) - CD", "CD release of the 2018 album Prequelle"),
(8, "Prequelle (2018) - Vinyl Record", "Vinyl release of the 2018 album Prequelle"),
(9, "Impera (2022) - CD", "CD release of the 2022 album Impera"),
(10, "Impera (2022) - Vinyl Record", "Vinyl release of the 2022 album Impera");

insert into items_sr(item, item_name, item_description) values
(1, "Opus Eponymous (2010) - CD", "CD издање албума Opus Eponymous из 2010."),
(2, "Opus Eponymous (2010) - Vinyl Record", "Винилно издање албума Opus Eponymous из 2010."),
(3, "Infestissumam (2013) - CD", "CD издање албума Infestissumam из 2013."),
(4, "Infestissumam (2013) - Vinyl Record", "Винилно издање албума Infestissumam из 2013."),
(5, "Meliora (2015) - CD", "CD издање албума Meliora из 2015."),
(6, "Meliora (2015) - Vinyl Record", "Винилно издање албума Meliora из 2015."),
(7, "Prequelle (2018) - CD", "CD издање албума Prequelle из 2018."),
(8, "Prequelle (2018) - Vinyl Record", "Винилно издање албума Prequelle из 2018."),
(9, "Impera (2022) - CD", "CD издање албума Impera из 2022."),
(10, "Impera (2022) - Vinyl Record", "Винилно издање албума Impera из 2022.");

select to_base64(img) as img, stock, price, item_name, item_description
from item_inventory join items_en on item_inventory.id = items_en.item;
select to_base64(img) as img, stock, price, item_name, item_description
from item_inventory join items_sr on item_inventory.id = items_sr.item;