CREATE TABLE Biletter
(
    id              INTEGER AUTO_INCREMENT NOT NULL,
    film            VARCHAR(255),  -- Added based on your JavaScript object
    antall          INTEGER,
    fornavn         VARCHAR(255) NOT NULL,
    etternavn       VARCHAR(255) NOT NULL,
    telefonnummer   INTEGER,
    epost           VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
