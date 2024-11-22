package com.escrowforgame.server.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GameDTO {

    private Integer id;
    private String name;
    private List<GameAssetDTO> assets;
}
