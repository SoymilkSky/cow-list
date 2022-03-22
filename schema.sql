-- ATTN WINDOWS USERS: Some of you might have an easier time just copying and pasting the lines below in to your mysql shell

-- YOUR CODE GOES HERE
-- CREATE YOUR DATABASE
-- CREATE YOUR TABLES
-- ADD RECORDS TO YOUR TABLE

CREATE DATABASE cowlist;

USE cowlist;

CREATE TABLE cowlist (
  id INTEGER AUTO_INCREMENT,
  cowname TINYTEXT,
  cowtext TINYTEXT,
  PRIMARY KEY(id)
);