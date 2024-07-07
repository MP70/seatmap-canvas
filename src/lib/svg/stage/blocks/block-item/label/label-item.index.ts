/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */


import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import {LabelItemCircle} from "./label-item.circle";
import {CoordinateModel} from "../../../../../models/coordinate.model";
import Labels from "../block-item.labels.index";
import LabelModel from "../../../../../models/label.model";
import {LabelItemTitle} from "./label-item.title";


@dom({
    tag: "g",
    class: "label",
    autoGenerate: false
})
export class LabelItem extends SvgBase {

    public circle: LabelItemCircle;
    public coordinates: CoordinateModel;

    constructor(public parent: Labels, public item: LabelModel) {
        super(parent);
        this.coordinates = new CoordinateModel(item);
        this.attr("transform", "translate(" + this.coordinates.toArray() + ")");
        return this;
    }


    update(): this {
        this.circle = new LabelItemCircle(this);
        this.addChild(this.circle);

        this.circle = new LabelItemTitle(this);
        this.addChild(this.circle);

        this.updateChilds();

        this.circle.node.text(this.item.title);
        return this;
    }
}