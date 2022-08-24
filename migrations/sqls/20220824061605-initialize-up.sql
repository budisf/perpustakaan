/* Replace with your SQL commands */


-- public.book definition

-- Drop table

-- DROP TABLE public.book;

CREATE TABLE public.book (
	id serial4 NOT NULL,
	isbn varchar NULL,
	title varchar(255) NULL,
	author varchar(255) NULL,
	publication_year int4 NULL,
	publisher varchar(255) NULL,
	image_s varchar(255) NULL,
	image_m varchar(255) NULL,
	image_l varchar(255) NULL,
	stok int4 NULL DEFAULT 1,
	CONSTRAINT book_pkey PRIMARY KEY (id)
);


-- public.cart definition

-- Drop table

-- DROP TABLE public.cart;

CREATE TABLE public.cart (
	id serial4 NOT NULL,
	user_id int4 NULL,
	book_id int4 NULL,
	CONSTRAINT cart_pkey PRIMARY KEY (id)
);


-- public.ratting definition

-- Drop table

-- DROP TABLE public.ratting;

CREATE TABLE public.ratting (
	id serial4 NOT NULL,
	user_id int4 NULL,
	isbn varchar(255) NULL,
	book_ratting int4 NULL,
	CONSTRAINT ratting_pkey PRIMARY KEY (id)
);

-- public.transaction_detail definition

-- Drop table

-- DROP TABLE public.transaction_detail;

CREATE TABLE public.transaction_detail (
	id serial4 NOT NULL,
	return_status bool NULL,
	return_date date NULL,
	created_at timestamp NULL,
	updated_at timestamp NULL,
	transaction_id int4 NULL,
	book_id int4 NULL,
	user_id int4 NULL,
	CONSTRAINT transaction_detail_pkey PRIMARY KEY (id)
);

-- public.transaction_header definition

-- Drop table

-- DROP TABLE public.transaction_header;

CREATE TABLE public.transaction_header (
	id serial4 NOT NULL,
	user_id varchar NULL,
	transaction_status bool NULL,
	created_at timestamp NULL,
	updated_at timestamp NULL,
	CONSTRAINT transaction_header_pkey PRIMARY KEY (id)
);

-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id serial4 NOT NULL,
	short_name varchar(255) NULL,
	address varchar(255) NULL,
	email varchar(255) NULL,
	pass varchar(255) NULL,
	username varchar(255) NULL,
	phone varchar(255) NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

INSERT INTO public.users (short_name, address, email, pass, username, phone) VALUES('Budi', 'jakarta', 'budi@gmail.com', '$2a$12$vaDX9ZNi77GmgQ/3WuiF8eIo5BxWdlmgw8zACL.y8Vtbej0AZ4t1a', 'budisf', '0834888885');
