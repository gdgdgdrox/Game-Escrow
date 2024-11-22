package com.escrowforgame.server.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GameAssetDTO {

    private String type;
    private String unit;
}
