package com.forlove.discussionCircle.system.restful;

import com.forlove.discussionCircle.ums.util.ApplicationContextUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.context.support.XmlWebApplicationContext;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * Created by Winter on 2016/12/8.
 */
public class ContextLoaderListener implements ServletContextListener {

    private static Logger logger = LoggerFactory.getLogger(ContextLoaderListener.class);
    private static XmlWebApplicationContext applicationContext;

    @java.lang.Override
    public void contextInitialized(ServletContextEvent sce) {
        ServletContext context = sce.getServletContext();
        applicationContext = (XmlWebApplicationContext) WebApplicationContextUtils.getWebApplicationContext(context);
        ApplicationContextUtils.init(applicationContext);
        context.setAttribute("startupDate", System.currentTimeMillis());
        logger.info("初始化数据...");
//        applicationContext.getBean(Contexinits)
    }

    @java.lang.Override
    public void contextDestroyed(ServletContextEvent sce) {
        logger.error("系统关闭");
    }
}
