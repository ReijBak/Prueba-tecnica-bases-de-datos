-- =========================
-- CREACIÓN BASE DE DATOS
-- =========================

CREATE DATABASE pd_juan_cardona_van_rossum_v3;

-- =========================
-- CREACIÓN DE TABLAS
-- =========================

CREATE TABLE clients (
    id VARCHAR(15) PRIMARY KEY,
    full_name VARCHAR(60) NOT NULL,
    address VARCHAR(60) NOT NULL,
    contact VARCHAR(20) NOT NULL,
    email VARCHAR(45) NOT NULL
);

CREATE TABLE bills (
    id VARCHAR(7) PRIMARY KEY,
    period VARCHAR(45) NOT NULL,
    amount INT NOT NULL,
    paid_amount INT NOT NULL,
    client_id VARCHAR(15),
    transaction_id VARCHAR(6)
);

CREATE TYPE transaction_status AS ENUM ('Pendiente', 'Completada', 'Fallida');
CREATE TYPE platforms AS ENUM ('Nequi', 'Daviplata');
CREATE TYPE transaction_type AS ENUM ('Pago de Factura')

CREATE TABLE transactions (
    id VARCHAR(6) PRIMARY KEY,
    date_and_time VARCHAR(20) NOT NULL,
    amount INT NOT NULL,
    status transaction_status NOT NULL,
    used_platform platforms NOT NULL,
    type transaction_type NOT NULL,
    client_id VARCHAR(15),
    bill_id VARCHAR(7),

    FOREIGN KEY (client_id) REFERENCES clients(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (bill_id) REFERENCES bills(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

