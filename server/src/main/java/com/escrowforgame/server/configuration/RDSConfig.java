package com.escrowforgame.server.configuration;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import com.escrowforgame.server.service.AWSParameterStoreService;

@Configuration
public class RDSConfig {
    
    @Autowired
    private AWSParameterStoreService awsParameterStoreService;
    
    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${parameter.store.rds.username}")
    private String rdsUsername;

    @Value("${parameter.store.rds.password}")
    private String rdsPassword;

    @Bean
    public DataSource dataSource() {
        String username = awsParameterStoreService.getParameter(rdsUsername,false);
        String password = awsParameterStoreService.getParameter(rdsPassword,true);

        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl(dbUrl);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }

}
