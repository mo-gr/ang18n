# ToDo schema

# --- !Ups

CREATE TABLE todos (
    id bigint(20) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    done boolean NOT NULL,
    PRIMARY KEY (id)
);

# --- !Downs

DROP TABLE todos;