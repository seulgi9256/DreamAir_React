package com.joeun.server.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomAccessDeniedHandler implements AccessDeniedHandler {
    
    @Override
    public void handle(HttpServletRequest request
                     , HttpServletResponse response
                     , AccessDeniedException accessDeniedException) throws IOException, ServletException {
        log.info("접근 거부 에러...");
        int statusCode = response.getStatus(); // 응답 상태 코드 가져오기
        log.info("HTTP 응답 상태 코드: " + statusCode);
        log.info("accessDeniedException : " + accessDeniedException);

        response.sendRedirect("/exception");
    }
    
}