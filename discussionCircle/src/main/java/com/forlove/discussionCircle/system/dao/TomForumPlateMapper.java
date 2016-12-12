package com.forlove.discussionCircle.system.dao;


import com.forlove.discussionCircle.system.entity.TomForumPlate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public interface TomForumPlateMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table TOM_FORUM_PLATE
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Integer plateId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table TOM_FORUM_PLATE
     *
     * @mbggenerated
     */
    int insert(TomForumPlate record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table TOM_FORUM_PLATE
     *
     * @mbggenerated
     */
    int insertSelective(TomForumPlate record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table TOM_FORUM_PLATE
     *
     * @mbggenerated
     */
    TomForumPlate selectByPrimaryKey(Integer plateId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table TOM_FORUM_PLATE
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(TomForumPlate record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table TOM_FORUM_PLATE
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(TomForumPlate record);

    int countByExample(Map<Object, Object> map1);

    List<TomForumPlate> selectByMany(Map<Object, Object> map);
    List<TomForumPlate> selectPlateAll();

}