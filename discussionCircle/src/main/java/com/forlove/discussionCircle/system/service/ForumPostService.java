package com.forlove.discussionCircle.system.service;

import com.forlove.discussionCircle.common.entity.PageData;
import com.forlove.discussionCircle.system.dao.TomForumPlateMapper;
import com.forlove.discussionCircle.system.dao.TomForumPostMapper;
import com.forlove.discussionCircle.system.entity.TomForumPlate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Winter on 2016/12/12.
 */
@Service
public class ForumPostService {
    @Autowired
    private TomForumPlateMapper plateMapper;

    @Autowired
    private TomForumPostMapper postMapper;

    public PageData<TomForumPlate> findPage(int pageNum, int pageSize, String name) {
        PageData<TomForumPlate> page = new PageData<TomForumPlate>();
        Map<Object, Object> map1 = new HashMap<Object, Object>();
        if (name != null) {
            name = name.replaceAll("/", "//");
            name = name.replaceAll("%", "/%");
            name = name.replaceAll("_", "/_");
        }

        map1.put("name", name);

        int count = plateMapper.countByExample(map1);
        if (pageSize == -1) {
            pageSize = count;
        }

        Map<Object, Object> map = new HashMap<Object, Object>();
        map.put("startNum", (pageNum - 1) * pageSize);
        map.put("endNum", pageNum * pageSize);
        map.put("name", name);
        List<TomForumPlate> list = plateMapper.selectByMany(map);
        page.setDate(list);
        page.setPageNum(pageNum);
        page.setPageSize(pageSize);
        page.setCount(count);

        return page;
    }

    public List<TomForumPlate> selectPlateAll() {
        return plateMapper.selectPlateAll();
    }
}
