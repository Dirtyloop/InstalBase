package com.komfortcieplny.InstalBase.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import static com.komfortcieplny.InstalBase.security.ApplicationUserRole.*;

@Configuration
@EnableWebSecurity
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public ApplicationSecurityConfig(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/", "index.*", "/css/*", "/js/*").permitAll()
                .antMatchers("/api/v1/material/add", "/api/v1/material/delete/**").hasRole(ADMIN.name())
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();
    }

    @Override
    @Bean
    protected UserDetailsService userDetailsService() {
         UserDetails dirtyloopUser = User.builder()
                .username("Dirtyloop")
                .password(passwordEncoder.encode("DirtyPassword"))
                .roles(WORKER.name())
                .build();
        UserDetails adminUser = User.builder()
                .username("Admin")
                .password(passwordEncoder.encode("PassAdminWord"))
                .roles(ADMIN.name())
                .build();

        return new InMemoryUserDetailsManager(dirtyloopUser, adminUser);

    }
}
