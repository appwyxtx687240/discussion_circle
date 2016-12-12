package application;

import org.glassfish.jersey.filter.LoggingFilter;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.mvc.jsp.JspMvcFeature;
import org.glassfish.jersey.server.spring.scope.RequestContextFilter;

/**
 * Created by Winter on 2016/12/12.
 */
public class APIApplication extends ResourceConfig {
    public APIApplication() {

        packages("com.forlove.discussionCircle");
//        register(LoggingFilter.class);
        register(JspMvcFeature.class);
        register(RequestContextFilter.class);
        register(MultiPartFeature.class);
    }
}
