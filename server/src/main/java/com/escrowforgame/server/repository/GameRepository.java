package com.escrowforgame.server.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.escrowforgame.server.entity.Game;

@Repository
public interface GameRepository extends CrudRepository<Game,Integer>{
    
}
