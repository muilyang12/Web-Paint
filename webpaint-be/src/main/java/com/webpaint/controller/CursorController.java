package com.webpaint.controller;

import com.webpaint.model.DrawAction;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class CursorController {

    @MessageMapping("/cursor")
    @SendTo("/topic/cursor")
    public DrawAction handleCursorMove(DrawAction message) {
        return message;
    }
}
