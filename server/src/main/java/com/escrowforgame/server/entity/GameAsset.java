package com.escrowforgame.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="game_asset")
@Data
public class GameAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int assetID;

    @ManyToOne
    @JoinColumn(name="game_id", nullable=false)    
    private Game game;

    @Column(name = "asset_type", nullable = false)
    private String assetType;

    @Column(name = "asset_unit", nullable = false)
    private String assetUnit;

}



/*
 * 
 * 
 * 
 * Create table game_asset(
assetID int not null auto_increment primary key,
gameID int not null,
assetType varchar(255) not null,
assetUnit varchar(255) not null,
foreign key (gameID) references game(gameID)
);

 */