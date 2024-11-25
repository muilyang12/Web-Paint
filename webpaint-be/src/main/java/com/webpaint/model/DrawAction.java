package com.webpaint.model;

public class DrawAction {

    private double relativeX;
    private double relativeY;
    private String name;

    public double getRelativeX() {
        return relativeX;
    }

    public void setRelativeX(double x) {
        this.relativeX = x;
    }

    public double getRelativeY() {
        return relativeY;
    }

    public void setRelativeY(double y) {
        this.relativeY = y;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
