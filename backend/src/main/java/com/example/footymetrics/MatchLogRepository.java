package com.example.footymetrics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchLogRepository extends JpaRepository<MatchLog, Integer> {
    List<MatchLog> findByUsernameOrderByIdDesc(String username);
}
