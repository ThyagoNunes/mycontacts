CREATE DATABASE mycontacts;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS categories (
  id UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS contacts (
  id uuid UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE,
  phone VARCHAR NOT NULL,
  birth DATE NOT NULL,
  category_id UUID,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);