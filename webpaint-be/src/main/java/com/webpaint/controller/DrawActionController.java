package com.webpaint.controller;

import com.webpaint.model.DrawAction;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class DrawActionController {

    @MessageMapping("/draw")
    @SendTo("/topic/draw")
    public DrawAction handleDrawAction(DrawAction message) {
        return message;
    }
}
