-- Quiz App database schema (MySQL)
-- Run this file once to create the database and tables:
--   mysql -u <your-username> -p < schema.sql

CREATE DATABASE IF NOT EXISTS quizapp;
USE quizapp;

-- Registered users (password is stored as a hash, never as plain text)
CREATE TABLE IF NOT EXISTS `user` (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY username (username)
);

-- Quiz scores shown on the leaderboard
CREATE TABLE IF NOT EXISTS leaderboard (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  score INT NOT NULL,
  `date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  category VARCHAR(20) NULL,
  PRIMARY KEY (id)
);