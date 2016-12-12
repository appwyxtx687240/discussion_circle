package com.forlove.discussionCircle.system.restful;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.forlove.discussionCircle.system.entity.TomForumPlate;
import com.forlove.discussionCircle.system.service.ForumPlateService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.validation.ObjectError;

import javax.print.attribute.standard.MediaSize;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

/**
 * Created by Winter on 2016/12/12.
 */
@Path("/plate")
@Scope("request")
@Component
public class ForumPlateRest {
    private static Logger logger = LoggerFactory.getLogger(ForumPlateRest.class);

    ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private ForumPlateService plateService;

    /**
     *
     * 功能描述：[分页查询app功能]
     *
     * 创建者：ZHJ
     * 创建时间: 2016年11月10日
     * @param pageNum
     * @param pageSize
     * @param name
     * @return
     */
    @GET
    @Path("/findpage")
    @Produces({MediaType.APPLICATION_JSON})
    public String findByPage(@DefaultValue("1") @QueryParam("pageNum") int pageNum,
                             @DefaultValue("10") @QueryParam("pageSize") int pageSize,
                             @QueryParam("name") String name) {
        try {
            return mapper.writeValueAsString(plateService.findPage(pageNum, pageSize, name));
        }catch (JsonProcessingException e) {
            logger.error(e.getMessage(), e);
        }

        return "{\"result\":\"error\"}";
    }

    /**
     *
     * 功能描述：[查询详细信息]
     *
     * 创建者：zhj
     * @param id
     * @return
     */
    @GET
    @Path("/selectById")
    @Produces({MediaType.APPLICATION_JSON})
    public String selectById(int id) {
        try {
            return mapper.writeValueAsString(plateService.selectByPrimaryKey(id));
        }catch (JsonProcessingException e) {
            logger.error(e.getMessage(), e);
        }

        return "{\"result\":\"error\"}";
    }

    /**
     *
     * 功能描述：[添加icon]
     *
     * 创建者：ZHJ
     * @param plate
     * @return
     */
    @POST
    @Path("/insertSelective")
    @Produces({MediaType.APPLICATION_JSON})
    public String insertSelective (@BeanParam TomForumPlate plate) {
        try {
            plateService.insertSelective(plate);
            return "{\"result\":\"success\"}";
        }catch (Exception e) {
            logger.error(e.getMessage(), e);
        }

        return "{\"result\":\"error\"}";
    }

    /**
     *
     * 功能描述：[编辑plate]
     *
     * 创建者：zhj
     * @param plate
     * @return
     */
    @PUT
    @Path("/updatePlate")
    @Produces({MediaType.APPLICATION_JSON})
    public String updatePlate (@BeanParam TomForumPlate plate) {
        try {
            plateService.updateByPrimaryKeySelective(plate);
            return "{\"result\":\"success\"}";
        }catch (Exception e) {
            logger.error(e.getMessage(), e);
        }

        return "{\"result\":\"error\"}";
    }

    /**
     *
     * 功能描述：[删除icon]
     *
     * 创建者：cjx
     * 创建时间: 2016年11月15日 下午5:55:23
     * @param id
     * @return
     */
    @DELETE
    @Path("/deleteByPrimaryKey")
    @Produces({MediaType.APPLICATION_JSON})
    public String deleteByPrimaryKey (@QueryParam("id") Integer id) {
        try {
            plateService.deleteByPrimaryKey(id);
            return "{\"result\":\"success\"}";
        }catch (Exception e) {
            logger.error(e.getMessage(), e);
        }

        return "{\"result\":\"error\"}";
    }
}
