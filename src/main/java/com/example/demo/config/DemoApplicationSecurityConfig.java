package com.example.demo.config;

@Configuration
@EnableWebMvcSecurity
@EnableGlobalAuthentication
public class DemoApplicationSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//      http.authorizeRequests().antMatchers("/", "/index", "/quizStart")
//              .permitAll().anyRequest().authenticated();
//      http.formLogin().loginPage("/login").permitAll().and().logout()
//              .permitAll();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth)
            throws Exception {
        auth.inMemoryAuthentication().withUser("test").password("test")
                .roles("USER");
    }
}