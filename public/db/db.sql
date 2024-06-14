-- Language Database
-- Language programming
-- Language Design

create table language_type(
	id_langtype serial not null,
	langtype_name varchar(25) not null,
	constraint pk_idlt primary key(id_langtype)
);

insert into language_type(langtype_name) values('Language Database');
insert into language_type(langtype_name) values('Language programming');
insert into language_type(langtype_name) values('Language Design');



create table language_programming(
	id_language serial not null,
	language_name varchar(50) not null,
	language_type integer not null,
	image varchar(100) not null,	
	constraint pk_language primary key(id_language),
	constraint fk_lt foreign key(language_type) references language_type(id_langtype)
);

insert into language_programming (language_name, language_type, image) values ('MySQL 5.7 / 8.0', 1, 'https://bit.ly/41HBY09');
insert into language_programming (language_name, language_type, image) values ('MariaDB 10.5', 1, 'https://bit.ly/3UIHEVi');
insert into language_programming (language_name, language_type, image) values ('PostgreSQL 13.5 / 12.7 / 11.12', 1, 'https://bit.ly/3A62sMS');
insert into language_programming (language_name, language_type, image) values ('SQL Server 2019 XE / 2017 XE', 1, 'https://bit.ly/3A62sMS');
insert into language_programming (language_name, language_type, image) values ('Oracle 11g XE', 1, 'https://bit.ly/3UIHEVi');

insert into language_programming (language_name, language_type, image) values ('Python', 2, 'https://bit.ly/3mHTMcq');
insert into language_programming (language_name, language_type, image) values ('C#', 2, 'https://bit.ly/40ivgfQ');
insert into language_programming (language_name, language_type, image) values ('C++', 2, 'https://bit.ly/43Kx6c8');
insert into language_programming (language_name, language_type, image) values ('JavaScript', 2, 'https://bit.ly/3La2hX3');
insert into language_programming (language_name, language_type, image) values ('PHP', 2, 'https://bit.ly/40lbUqu');
insert into language_programming (language_name, language_type, image) values ('Java', 2, 'https://bit.ly/3A6kH4O');
insert into language_programming (language_name, language_type, image) values ('Go', 2, 'https://bit.ly/3MTsjzb');
insert into language_programming (language_name, language_type, image) values ('Ruby', 2, 'https://bit.ly/3N1sUyK');

insert into language_programming (language_name, language_type, image) values ('HTML 5', 3, 'https://bit.ly/3KLovgM');
insert into language_programming (language_name, language_type, image) values ('CSS 3', 3, 'https://bit.ly/41xV1tw');


create table knowledge_level(
	id_knowledge_level serial not null,
	name_levknowledge varchar(50) not null,
	constraint pk_knowledge_level primary key(id_knowledge_level)
);

insert into knowledge_level(name_levknowledge) values('None Knowledge');
insert into knowledge_level(name_levknowledge) values('Slow Knowledge');
insert into knowledge_level(name_levknowledge) values('Middle Knowledge');
insert into knowledge_level(name_levknowledge) values('High Knowledge');
insert into knowledge_level(name_levknowledge) values('Expert Knowledge');


create table language_learned(
	id_langlearn serial not null,
	description varchar(200) not null,
	knowledge_level integer not null,
	language_programming integer not null,
	user_language integer not null,
	constraint pk_language_learned primary key(id_langlearn),
	constraint fk_lk_ll foreign key(knowledge_level) references knowledge_level(id_knowledge_level),
	constraint fk_lp_ll foreign key(language_programming) references language_programming(id_language),
	constraint fk_uc_ll foreign key(user_language) references users_centenario(id_user)
);



insert into language_learned (description, knowledge_level, language_programming, user_language)
values('Python es un lenguaje de programación de alto nivel y de propósito general. Puede utilizarse 
para diversas tareas, desde el análisis y la visualización de datos hasta el desarrollo web, la creación de prototipos y la automatización.', 3, 6, 24);

insert into language_learned (description, knowledge_level, language_programming, user_language)
values('JavaScript es un lenguaje de programación ligero que los desarrolladores web suelen utilizar para crear interacciones más dinámicas al 
desarrollar páginas web, aplicaciones, servidores e incluso juegos.', 4, 9, 24);

insert into language_learned (description, knowledge_level, language_programming, user_language)
values('El Preprocesador de Hipertexto (PHP – Hypertext Preprocessor) es un lenguaje de scripting del lado del servidor, gratuito y de código abierto, utilizado 
muy comúnmente en el desarrollo web. Según Web Technology Surveys, PHP es utilizado por el 77,6% de todos los sitios web.', 3, 10, 24);

insert into language_learned (description, knowledge_level, language_programming, user_language)
values('Java es un lenguaje de programación propietario de Oracle. Es un lenguaje de programación de alto nivel y de propósito general que permite a los 
programadores crear todo tipo de aplicaciones con facilidad.', 4, 11, 24);

insert into language_learned (description, knowledge_level, language_programming, user_language)
values('Go, o Golang fue creado para desarrollar APIs, aplicaciones de escritorio basadas en GUI y aplicaciones web. Aunque es un lenguaje joven, 
Go es uno de los lenguajes de programación de más rápido crecimiento.', 5, 12, 24);


insert into language_learned (description, knowledge_level, language_programming, user_language)
values('MySQL es un sistema de administración de bases de datos relacionales. Es un software de código abierto desarrollado por Oracle. 
Se considera como la base de datos de código abierto más utilizada en el mundo.', 3, 1, 24);
insert into language_learned (description, knowledge_level, language_programming, user_language)
values('PostgreSQL es un sistema de bases de datos de código abierto, altamente estable, que proporciona soporte a diferentes funciones de SQL, como claves 
foráneas, subconsultas, disparadores y diferentes tipos y funciones definidas por el usuario. Además, aumenta el lenguaje SQL 
ofreciendo varias funciones que escalan y reservan meticulosamente las cargas de trabajo de datos.', 5, 3, 24);
insert into language_learned (description, knowledge_level, language_programming, user_language)
values('Microsoft SQL Server es uno de los principales sistemas de gestión de bases de datos relacional del mercado que presta servicio a un 
amplio abanico de aplicaciones de software destinadas a la inteligencia empresarial y análisis sobre entornos corporativos.
Basada en el lenguaje Transact-SQL, incorpora un conjunto de extensiones de programación propias de lenguaje estándar y 
su aplicación está disponible para usarse tanto a nivel on premise o bajo una modalidad cloud.', 4, 4, 24);

insert into language_learned (description, knowledge_level, language_programming, user_language)
values('HTML es el lenguaje con el que se define el contenido de las páginas web. Básicamente se trata de un conjunto de etiquetas que sirven para definir el texto y otros 
elementos que compondrán una página web, como imágenes, listas, vídeos, etc.', 4, 14, 24);
insert into language_learned (description, knowledge_level, language_programming, user_language)
values('El CSS es lo que se llama un lenguaje de hojas de estilo en cascada y se utiliza para estilizar elementos escritos en un lenguaje de marcado como HTML. 
Separa el contenido de la representación visual del sitio.', 5, 15, 24);

select*from users_centenario uc ;


drop table language_learned;
drop table knowledge_level;
drop table language_programming;
drop table language_type;

/*
GOOGLE_CLIENT_ID=144810888219-p64p7k8l2iksuvfts3u1rbe6pa23lccv.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
DATABASE_URL="mongodb+srv://mariosalazar10utn:1001590650ANDmar10@cluster0.iftvxqz.mongodb.net/e-shop"
SECRET_KEY=secretkeytocipherpassword
NEXTAUTH_SECRET=e-shop-jwt
NODE_ENV=1001590650ANDmar10
STRIPE_SECRET_KEY=sk_test_51PHJafP3jDLGB61T9zUwpZNHj96ojdPxVF1eaelSlfwOwVawMn0a82HXDUVYle6ghsGqGTOqQ7DGZrlVizpYale100iliXfwgs
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51PHJafP3jDLGB61T6UUkufe5kNUm5o267xZByQMRxllVdZW1ib6Mpfildc8ETQjSZS5TGj0oT6p6pM53K0CnU81t00ULs6zOgF
STRIPE_WEBHOOK_SECRET=whsec_7b1eeb7566651892d1a80c5ac9177a8114e24d8ca62f06de12235e66c25b0e9d
*/