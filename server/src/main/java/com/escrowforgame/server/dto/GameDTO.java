package com.escrowforgame.server.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GameDTO {

    private Integer gameID;
    private String gameName;
    private String gameImagePath;
    private List<GameAssetDTO> gameAssets;
}
