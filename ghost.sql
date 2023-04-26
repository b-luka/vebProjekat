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