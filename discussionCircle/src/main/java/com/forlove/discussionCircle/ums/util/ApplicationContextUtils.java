package com.forlove.discussionCircle.ums.util;

import org.springframework.data.repository.support.Repositories;
import org.springframework.web.context.support.XmlWebApplicationContext;

/**
 * Created by Winter on 2016/12/8.
 */
public class ApplicationContextUtils {
    private static XmlWebApplicationContext applicationContext;
    private static Repositories repositories;
    private static String basePath;

    public static void init(XmlWebApplicationContext applicationContext) {
        ApplicationContextUtils.applicationContext = applicationContext;
        repositories = new Repositories(applicationContext);
        basePath = applicationContext.getServletContext().getRealPath("/");
    }

    public static final Repositories getRepositories() {
        return repositories;
    }

    public static String getBasePath() {
        return basePath;
    }

    public static XmlWebApplicationContext getApplicationContext() {
        return applicationContext;
    }

    public static <T> T getBean(Class<T> aClass) {
        return applicationContext.getBean(aClass);
    }

    public static <T> T getBean(String name, Class<T> aClass) {
        return applicationContext.getBean(name, aClass);
    }

    public static <T> T getBean(String name) {
        return (T)applicationContext.getBean(name);
    }

}
