package com.joeun.server.service;

import java.util.List;
import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Service;

import com.joeun.server.dto.Auth;
import com.joeun.server.dto.Product;
import com.joeun.server.dto.Users;
import com.joeun.server.mapper.UserMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    
    @Override
    public int insert(Users user) throws Exception {
        // 비밀번호 암호화
        String userPw = user.getUserPw();
        String encodedPw = passwordEncoder.encode(userPw);
        user.setUserPw(encodedPw);

        // 회원 등록
        int result = userMapper.insertUsers(user);

        // auth 테이블에 데이터 추가
        if( result > 0 ) {
            Auth Auth = new Auth();
            Auth.setUserId( user.getUserId() );
            Auth.setAuth("ROLE_USER");          // 기본 권한 : 사용자 권한 (ROLE_USER)
            result = userMapper.insertAuth(Auth);
        }

        // mileage 테이블에 데이터 추가
        if (result > 0) {
            user.setUserId(user.getUserId());
            result = userMapper.insertMileage(user);
        }

        return result;
    }



    @Override
    public Users select(int userNo) throws Exception {
        return userMapper.select(userNo);
    }



    @Override
    public void login(Users user, HttpServletRequest requset) throws Exception {

        String username = user.getUserId();
        String password = user.getUserPwCheck();
        log.info("username : " + username);
        log.info("password : " + password);

        // 아이디, 패스워드 인증 토큰 생성
        UsernamePasswordAuthenticationToken token 
            = new UsernamePasswordAuthenticationToken(username, password);

        // 토큰에 요청정보를 등록
        token.setDetails( new WebAuthenticationDetails(requset) );

        // 토큰을 이용하여 인증(로그인)
        Authentication authentication = authenticationManager.authenticate(token);

        User authUser = (User) authentication.getPrincipal();
        log.info("인증된 사용자 아이디 : " + authUser.getUsername());

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }


    @Override
    public Users selectById(String userId) throws Exception {
        Users user = userMapper.selectById(userId);
        return user;
    }


    
    @Override
    public Users selectById2(Principal principal, HttpServletRequest request) throws Exception {

        Users user = new Users();
        String loginId;
        if( principal != null ) {
            loginId = principal.getName();
            user = userMapper.selectById(loginId);
        } else {
            HttpSession session = request.getSession();
            String userId = (String) session.getAttribute("userId");
            log.info("비회원아이디 : " + userId);
            loginId = userId;
            user = userMapper.selectByUser2Id(loginId);
        }

        return user;
    }


    
    @Override
    public int update(Users user) throws Exception {
        // 비밀번호 암호화
        String userPw = user.getUserPw();
        String encodedPw = passwordEncoder.encode(userPw);
        user.setUserPw(encodedPw);

        int result = userMapper.update(user);

        return result;
    }
    
    
    // 회원 탈퇴
    @Override
    public int deleteUsers(String userId) {
        
        int result = userMapper.deleteUsers(userId);

        return result;
    }
    

    
    @Override
    public Users selectMileage(String userId) throws Exception {
        
        return userMapper.selectMileage(userId);
        
    }


    // 장바구니
    @Override
    public List<Users> user_cart_list(int userNo) throws Exception {
        return userMapper.user_cart_list(userNo);
    }
    
    @Override
    public List<Users> user2_cart_list(int phone, int userPw) throws Exception {
        return userMapper.user2_cart_list(phone, userPw);
    }

    // 장바구니 추가
    @Override
    public int cartadd(Users user) throws Exception {
        int result = userMapper.cartadd(user);
        return result;
    }

    // 장바구니 삭제
    @Override
    public int cart_delete(int cartNo) throws Exception {
        int result = userMapper.cart_delete(cartNo);
        return result;
    }

    // 전체 탑승권 조회
    @Override
    public List<Product> product_flightList() throws Exception {
        List<Product> productFlightList = userMapper.product_flightList();
        return productFlightList;
    }

    
    
    // 회원 탈퇴 시, auth 테이블 삭제
    @Override
    public Users deleteAuth(String username) {
        
        Users deleteAuth = userMapper.deleteAuth(username);

        return deleteAuth;
    }


    
    // 회원 탈퇴 시, mileage 테이블 삭제
    @Override
    public int deleteMileage(String username) {

        int result = userMapper.deleteMileage(username);

        return result;
    }

    

}
