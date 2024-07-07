/*
 * $project.fileName
 * https://github.com/alisaitteke/seatmap-canvas Copyright 2023 Ali Sait TEKE
 */


import SvgBase from "@svg/svg.base";
import {dom} from "@decorator/dom";
import Block from "./block-item.index";
import BlockModel from "@model/block.model";
import {LabelItem} from "./label/label-item.index";
import LabelModel from "@model/label.model";


@dom({
    tag: "g",
    class: "labels",
    autoGenerate: false
})
export default class Labels extends SvgBase {

    constructor(public parent: Block, public item: BlockModel) {
        super(parent);
        return this;
    }

    update(): this {
        // add seat items in blockItem container
        this.item.labels.map((label: LabelModel) => {
            this.addChild(new LabelItem(this, label))
        });
        this.updateChilds();
        return this;
    }

    // Getting labels method
    // ex: seatmap.stage.blocks.getBlock(2).seats.getSeat("1-1")
    public getLabels(): Array<LabelItem> {
        return this.child_items;
    }
}