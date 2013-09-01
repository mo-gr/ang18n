# ToDo schema

# --- !Ups

CREATE TABLE todos (
    id bigint(20) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    done boolean NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO todos (name, done) VALUES ('Hook up a real Database', false);
INSERT INTO todos (name, done) VALUES ('Actually translate the todos', false);

# --- !Downs

DROP TABLE todos;