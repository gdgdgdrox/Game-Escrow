CREATE TABLE `user` (
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `sex` enum('male','female') NOT NULL,
  `first_name` varchar(255),
  `last_name` varchar(255) NOT NULL,
  PRIMARY KEY (`username`)
);