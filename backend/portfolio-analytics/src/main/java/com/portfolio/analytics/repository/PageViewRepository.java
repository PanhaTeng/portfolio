package com.portfolio.analytics.repository;

import com.portfolio.analytics.entity.PageView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PageViewRepository extends JpaRepository<PageView, Long> {

    @Query("SELECT COUNT(DISTINCT p.ipHash) FROM PageView p")
    long countDistinctVisitors();

    @Query("SELECT p.pagePath as path, COUNT(p) as count FROM PageView p GROUP BY p.pagePath ORDER BY count DESC")
    List<Object[]> findViewsGroupedByPage();

    List<PageView> findTop50ByOrderByVisitedAtDesc();
}
