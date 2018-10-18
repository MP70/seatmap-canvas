/*
 * $project.fileName
 * https://github.com/seatmap/canvas Copyright 2018 Ali Sait TEKE
 */


// @todo legend show hide function

export default class DefaultsModel {
    min_zoom: number = 0.1;
    max_zoom: number = 2;
    animation_speed: number = 600;
    resizable: boolean = false;
    container: any = null;
    zoom_focus_circle_radius: number = 60;
    click_enable_sold_seats: boolean = false;
    zoom_out_button: string = null;
    autohide_legend: boolean = false;
    seat_style: {
        radius: number,
        color: string,
        not_salable: string,
        selected: string,
        hover: string,
        focus: string,
        focus_out: string
    };
    block_style: {
        fill: string
        stroke: string,
        border_width: number,
        title_color:string,
        title_font_size:string
    };

    legend_style: {
        radius: number,
        padding: number,
        font_size: number
    };

    label_style: {
        color: string
        bg: string
        font_size: number
        radius: number
    };

    lang: {
        selectable: string,
        non_selectable: string,
        your_selection: string
    };

    constructor(config: any) {

        this.zoom_focus_circle_radius = config.zoom_focus_circle_radius ? config.zoom_focus_circle_radius : this.zoom_focus_circle_radius;
        this.click_enable_sold_seats = config.click_enable_sold_seats ? config.click_enable_sold_seats : this.click_enable_sold_seats;
        this.autohide_legend = config.autohide_legend ? config.autohide_legend : this.autohide_legend;
        this.max_zoom = config.max_zoom ? config.max_zoom : this.max_zoom;

        this.resizable = config.resizable ? config.resizable : this.resizable;
        this.zoom_out_button = "M192.9,183.3l-65.7-65.7c10.3-12.3,16.4-28.4,16.4-45.8C143.7,32.2,111.5,0,71.8,0S0,32.2,0,71.8 s32.2,71.8,71.8,71.8c17.4,0,33.2-6.2,45.8-16.4l65.7,65.7L192.9,183.3z M13.7,71.8c0-32.2,26-58.2,58.2-58.2s58.2,26,58.2,58.2 S104,130,71.8,130S13.7,104,13.7,71.8z M47.9,65h47.9v13.7H47.9V65z";


        this.seat_style = {
            radius: config.seat_style && config.seat_style.radius || 12,
            color: config.seat_style && config.seat_style.color || "#77b2ff",
            not_salable: config.seat_style && config.seat_style.not_salable || "#ccc9c9",
            selected: config.seat_style && config.seat_style.selected || "#51ff48",
            hover: config.seat_style && config.seat_style.hover || "#4770ff",
            focus: config.seat_style && config.seat_style.focus || "#6293d2",
            focus_out: config.seat_style && config.seat_style.focus_out || "#ff001c"
        };
        this.block_style = {
            fill: config.block_style && config.block_style.fill || "#ffffff",
            stroke: config.block_style && config.block_style.stroke || "#ffffff",
            border_width: config.block_style && config.block_style.border_width || 4,
            title_color: config.block_style && config.block_style.title_color || "#000000",
            title_font_size: config.block_style && config.block_style.title_font_size || 28,
        };
        this.label_style = {
            color: config.label_style && config.label_style.color || "#000000",
            bg: config.label_style && config.label_style.bg || "#ffffff",
            font_size: config.label_style && config.label_style.font_size || 12,
            radius: config.label_style && config.label_style.radius || 12,
        };
        this.legend_style = {
            radius: config.legend_style && config.legend_style.radius || 12,
            padding: config.legend_style && config.legend_style.padding || 36,
            font_size: config.legend_style && config.legend_style.font_size || 100,
        };

        this.lang = {
            selectable: config.lang && config.lang.selectable || "Selectable",
            non_selectable: config.lang && config.lang.non_selectable || "Non Selectable or Rezerved",
            your_selection: config.lang && config.lang.your_selection || "Your Selection",
        };


    }
}