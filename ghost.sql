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

create table accounts (
	id int unsigned not null auto_increment,
    username varchar(20) not null,
    passwd varchar(30) not null,
    primary key (id)
);

insert into accounts (username, passwd) values ("admin", "admin");

create table media_1_html (
	id int unsigned not null auto_increment,
    img longblob not null,
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

insert into media_1_html(img, media_type, html_id) values
(LOAD_FILE('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\bg1.mp4'), "mp4", "videobg_src"),
(load_file("C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\logo.png"), "png", "logo_img"),
(load_file("C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\impera.webp"), "webp", "album_img");

insert into media_1_css(img, media_type, html_id) values
(load_file("C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\impera_bg.png"), "png", "album_div");

select to_base64(img) as img, media_type, html_id from media_1_html;
select to_base64(img) as img, media_type, html_id from media_1_css;