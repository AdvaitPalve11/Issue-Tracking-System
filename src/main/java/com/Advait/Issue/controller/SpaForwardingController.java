package com.Advait.Issue.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaForwardingController {

    // Matches any path that doesn't contain a dot (e.g. /create, /dashboard)
    // Forwards these to index.html so React Router can handle them.
    @RequestMapping(value = "/**/{path:[^\\.]*}")
    public String forward() {
        return "forward:/index.html";
    }
}