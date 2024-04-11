CREATE TABLE Libraries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE,
    description TEXT,
    url VARCHAR(255)
);
CREATE TABLE Programming_Languages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE
);
CREATE TABLE Tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE
);
CREATE TABLE Library_Tags (
    library_id INT,
    tag_id INT,
    FOREIGN KEY (library_id) REFERENCES Libraries(id),
    FOREIGN KEY (tag_id) REFERENCES Tags(id),
    PRIMARY KEY (library_id, tag_id)
);
CREATE TABLE Library_Languages (
    library_id INT,
    language_id INT,
    FOREIGN KEY (library_id) REFERENCES Libraries(id),
    FOREIGN KEY (language_id) REFERENCES Programming_Languages(id),
    PRIMARY KEY (library_id, language_id)
);