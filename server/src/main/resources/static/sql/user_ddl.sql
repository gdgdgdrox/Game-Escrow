CREATE TABLE `user` (
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `sex` enum('male','female') NOT NULL,
  PRIMARY KEY (`username`)
);