package com.forlove.discussionCircle.api.utils;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Winter on 2016/12/12.
 */
public class GetFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse)servletResponse;
        response.setHeader("Cache-Control", "no-cache");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Connection", "keep-alive");
        response.setDateHeader("expires", -1);
        filterChain.doFilter(servletRequest, response);
    }

    @Override
    public void destroy() {

    }
}
