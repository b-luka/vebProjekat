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

select to_base64(img) as img, item, stock, price, item_name, item_description
from item_inventory join items_en on item_inventory.id = items_en.item;
select to_base64(img) as img, item, stock, price, item_name, item_description
from item_inventory join items_sr on item_inventory.id = items_sr.item;


drop table if exists sales;
create table if not exists sales(
	id int unsigned not null auto_increment,
	time_sold datetime not null,
    copies_sold int unsigned not null,
    item int unsigned not null,
    foreign key (item) references item_inventory(id) on update cascade on delete cascade,
    primary key (id)
);

drop trigger if exists itemSold;
delimiter $$
create trigger itemSold
after insert on sales for each row
begin
	update item_inventory set stock = stock - new.copies_sold where new.item = item_inventory.id;
    update item_inventory set sold = sold + new.copies_sold where new.item = item_inventory.id;
    update item_inventory set profit = profit + new.copies_sold * price where new.item = item_inventory.id;
end $$

select * from item_inventory;

insert into sales(time_sold, copies_sold, item) values
(now(), 3, 1);

select * from item_inventory;
select * from sales;

create table media_4_html (
	id int unsigned not null auto_increment,
    img mediumblob not null,
    media_type varchar(10) not null,
    html_id varchar(50) not null,
    primary key (id)
);

set @startFolder = "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\";
insert into media_4_html(img, media_type, html_id) values
(load_file(concat(@startFolder, "store_bg.png")), "png", "store_bg");

select to_base64(img) as img, media_type, html_id from media_4_html;

create table text_en_2 (
	id int unsigned not null auto_increment,
    div_id varchar(20) not null,
    content text not null,
    primary key (id)
);

create table text_sr_2 (
	id int unsigned not null auto_increment,
    div_id varchar(20) not null,
    content text not null,
    primary key (id)
);

insert into text_en_2(div_id,content) values ("AboutPs1",'Ghost is a Swedish rock band that was formed in Linköping in 2006. In 2010, they released a three-track demo followed by a 7-inch vinyl titled "Elizabeth", and later their debut full-length album Opus Eponymous. The song "Ritual" was chosen by Kerrang! as one of "The 50 Most Evil Songs Ever." The Grammis-nominated album was widely praised and significantly increased their popularity. Their second album and major label debut, Infestissumam, was released in 2013, debuted at number one in Sweden, and won the Grammis Award for Best Hard Rock/Metal Album. The band released their third studio album, Meliora, in 2015, reaching number one in Sweden, and number eight in the US. Its lead single, "Cirice", earned them the 2016 Grammy Award for Best Metal Performance. The band released their fourth studio album, Prequelle, in 2018. The band released their fifth studio album, Impera, in 2022.'),
                                             ("AboutPs2",'Ghost is known for its eccentric on-stage presence. Seven of the group\'s eight members, known as "Nameless Ghouls", wear virtually identical, face-concealing costumes. Prior to a 2017 lawsuit filed by former members of the band, lead singer Tobias Forge obscured his identity behind a succession of characters bearing the title of "Papa Emeritus". Portrayed by Forge in a prosthetic mask and makeup, the persona has been described as a "demonic anti-pope", and has undergone five incarnations: I, II, III, Nihil, and IV. For the band\'s 2018 album Prequelle and subsequent world concert tour A Pale Tour Named Death, Forge played a character known as "Cardinal Copia", who is described as being unrelated to the prior Papa Emeritus characters. Copia\'s costume consists of either cardinal vestments or a black or white tuxedo; he also sports a prosthetic mask with black eye makeup and multi-colored eyes, features which are present in each Papa character. In March 2020, at the final show of A Pale Tour Named Death, Copia was promoted to the title of "Papa Emeritus IV", a persona which Forge has continued to use for the album Impera and its associated concert tour, Imperatour.');
                                             
insert into text_sr_2(div_id,content) values ("AboutPs1",'Ghost (транскр. Гоуст), такође познат као Ghost B.C. је шведски хеви метал бенд основан 2006. године у Линћепингу. 2010. године бенд је објавио демо који је садржао три песме, затим први сингл под називом "Elizabeth" који ће следити њихов деби албум Opus Eponymous са песмом "Ritual" која је касније од стране британског магазина Kerrang! изабрана за једну од "Педесет најзлобнијих песама свих времена". Овај албум је номинован за Греми награду што је изузетно утицало на њихову популарност. Њихов други албум, Infestissumam, објављен 2013. године, дебитовао је на првом месту у Шведској и освојио Греми награду за најбољи хард рок/хеви метал албум. Infestissumam је имао велики утицај на тадашње стање метал жанра музике и инспирисао је многе друге бендове и уметнике. Трећи албум, Meliora, са огромним бројем продатих копија и великим признањем критичара достигао још једном прво место у Шведској и осмо место у Сједињеним Америчким Државамa.Сингл "Cirice" са овог албума је донела бенду Греми за "Најбољи метал перформанс" 2016. године. Први сингл њиховог албума, Prequelle, "Rats" је заузео и држао прво место на Mainstream Rock Songs чарту магазина Billboard седам недеља. Након тога, други сингл "Dance Macabre" је преузео исто место и задржао га две недеље.'),
                                             ("AboutPs2",'Ghost је најпознатији по томе што је мистериозан бенд. Сви чланови сем певача носе идентичне костиме са маскама које им прекривају лица, названи су Nameless Ghouls (транскр. Нејмлес Гулс), њихов идентитет је непознат и верује се да се стално мењају. Тобијас Форџ, главни вокал бенда, је скривао свој идентитет иза лика под именом "Папа Еремитус" који је испратио бенд до 2017. године када су бивши чланови бенда покренули тужбу против Тобијаса. Папа Еремитус је костим са простетичком маском и шминком. Појава Папе Еремитуса се мењала кроз године и албуме, сваки Папа је имао свој аутентичан изглед и назив.');

create table text_en_3 (
	id int unsigned not null auto_increment,
    div_id varchar(20) not null,
    content text not null,
    primary key (id)
);

create table text_sr_3 (
	id int unsigned not null auto_increment,
    div_id varchar(20) not null,
    content text not null,
    primary key (id)
);

insert into text_en_3(div_id,content) values ("Naslov","CONTACT US"),("ContactPs1","UK, Europe and the Rest Of the World\nUnited Kingdom\nGate B, St George`s House\nCape Road\nWarwick\nCV34 5DJ\nUnited Kingdom\nTel: +44 20 8106 2494"),("ContactPs2","North America\n13 Scenic Drive, Apt T\nCroton on Hudson,\nNew York, 10520\nUnited States of America\nTel: +1 (717) 537-0565\n");
select * from text_en_3;

insert into text_sr_3(div_id,content) values ("Naslov","КОНТАКТИРАЈТЕ НАС"),("ContactPs1","Велика Британија, Европа и остатак света\nУједињено Краљевство\nКапија Б, Кућа Светог Ђорђа\nCape Road\nВорвик\nCV34 5DJ\nУједињено Краљевство\nТел: +44 20 8106 2494"),("ContactPs2","Северна Америка\n13 Scenic Drive, Apt T\nCroton on Hudson,\nЊујорк, 10520\nСједињене Америчке Државе\nТел: +1 (717) 537-0565\n");
select * from text_sr_3;

create table text_en_4 (
	id int unsigned not null auto_increment,
    div_id varchar(20) not null,
    content text not null,
    primary key (id)
);

create table text_sr_4 (
	id int unsigned not null auto_increment,
    div_id varchar(20) not null,
    content text not null,
    primary key (id)
);

insert into text_en_4(div_id,content) values ("Naslov","Tours"),("datum1","May 23 | Zénith de Toulouse"),("grad1","Toulouse, France"),
																("datum2","May 25 | Le Liberte"),("grad2","Rennes, France"),
                                                                ("datum3","May 26 | Zénith de Lille"),("grad3","Lille, France"),
                                                                ("datum4","May 28 | Zenith of Strasbourg"),("grad4","Strasbourg, France"),
                                                                ("datum5","May 29 | Ippodromo del Galoppo di San Siro"),("grad5","Milano, Italy"),
                                                                ("datum6","May 30 | Palais Nikaïa"),("grad6","Nice, France"),
                                                                ("datum7","June 1 | Primavera Sound 2023"),("grad7","Barcelona, Spain"),
																("datum8","June 3 | Zenith Nantes Metropole"),("grad8","Saint-herblain, France"),
                                                                ("datum9","June 4 | AFAS Live"),("grad9","Amsterdam, Netherlands"),
                                                                ("datum10","June 6 | Velodrom"),("grad10","Berlin, Germany");

												
insert into text_sr_4(div_id,content) values ("Naslov","Туре"),("datum1","Мај 23 | Zénith de Toulouse"),("grad1","Тулуза, Француска"),
																("datum2","Мај 25 | Le Liberte"),("grad2","Рен, Француска"),
                                                                ("datum3","Мај 26 | Zénith de Lille"),("grad3","Лил, Француска"),
                                                                ("datum4","Мај 28 | Zenith of Strasbourg"),("grad4","Стразбург, Француска"),
                                                                ("datum5","Мај 29 | Ippodromo del Galoppo di San Siro"),("grad5","Милано, Италија"),
                                                                ("datum6","Мај 30 | Palais Nikaïa"),("grad6","Ница, Француска"),
                                                                ("datum7","Јун 1 | Primavera Sound 2023"),("grad7","Барселона, Шпанија"),
																("datum8","Јун 3 | Zenith Nantes Metropole"),("grad8","Сент Ерблен, Француска"),
                                                                ("datum9","Јун 4 | AFAS Live"),("grad9","Амстердам, Холандија"),
                                                                ("datum10","Јун 6 | Velodrom"),("grad10","Берлин, Немачка");


create table logo (
	id int unsigned not null auto_increment,
    img mediumblob not null,
    media_type varchar(10) not null,
    html_id varchar(50) not null,
    primary key (id)
);

insert into logo(img, media_type, html_id) values
(load_file(concat(@startFolder, "logo.png")), "png", "logo_img");

select to_base64(img) as img, media_type, html_id from logo;

create table media_5_html (
	id int unsigned not null auto_increment,
    img mediumblob not null,
    media_type varchar(10) not null,
    html_id varchar(50) not null,
    primary key (id)
);

insert into media_5_html(img, media_type, html_id) values
(load_file(concat(@startFolder, "contactPozadina.png")), "png", "contactBG");

select to_base64(img) as img, media_type, html_id from media_5_html;

create table media_3_html (
	id int unsigned not null auto_increment,
    img mediumblob not null,
    media_type varchar(10) not null,
    html_id varchar(50) not null,
    primary key (id)
);

insert into media_3_html(img, media_type, html_id) values
(load_file(concat(@startFolder, "toursPozadina.png")), "png", "toursBG");

select to_base64(img) as img, media_type, html_id from media_3_html;

create table media_2_html (
	id int unsigned not null auto_increment,
    img mediumblob not null,
    media_type varchar(10) not null,
    html_id varchar(50) not null,
    primary key (id)
);

insert into media_2_html(img, media_type, html_id) values
(load_file(concat(@startFolder, "aboutPozadina.png")), "png", "aboutBG");

select to_base64(img) as img, media_type, html_id from media_2_html;

create table mail(
	id int unsigned not null auto_increment,
    username varchar(50) not null,
    email varchar(50) not null,
    message text not null,
    time_sent text not null,
    primary key(id)
);

insert into mail(username, email, message, time_sent) values ("admin", "admin@admin.com", "message test", now());