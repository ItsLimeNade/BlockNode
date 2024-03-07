import { BlockData, BlockDefinition } from "../interfaces/BlockData"
import Workspace from "./workspace"
import SVGNode from "./svgNodes"
import { XYCoordinates } from "../interfaces/XYCoordinates"

export default class Block {

    private readonly _blockContainer: SVGNode
    private readonly _blockStructure: SVGElement

    private _blockData: BlockData
    private _draggable: boolean
    private _offset: XYCoordinates

    constructor(blockData: BlockData, ) {
        this._blockData = blockData
        this._draggable = false

        this._blockContainer = new SVGNode("g", {transform: `translate(${this._blockData.pos.x},${this._blockData.pos.y})`})
        this._blockStructure = new SVGNode("path", {d: this.generatePath()}).node

        this.startDrag = this.startDrag.bind(this);
        this.drag = this.drag.bind(this);
        this.endDrag = this.endDrag.bind(this);

    }

    get blockDefinition(): BlockDefinition {
        return {
            blockData: this._blockData,
            blockContainer: this._blockContainer.node,
            blockStructure: this._blockStructure
        }
    }

    private generatePath(): string {
        let length: number = 50;
        for (let i: number = 0; i < this._blockData.text.length; i++) {
            length += 7.5
        }
        return `m 0 0 l ${length} 0 c 7 0 7 7 7 7 l 0 70 c 0 0 0 7 -7 7 l -${length} 0 c -6 0 -7 -7 -7 -7 l 0 -70 c 0 0 0 -7 7 -7`
    }

    private generateStructure(): SVGElement {
        const blockContainerNode = this._blockContainer.node
        blockContainerNode.classList.add("block")
        blockContainerNode.id = this._blockData.name


        const blockStructureContainer: SVGElement = new SVGNode("g", {fill: this._blockData.colour, stroke:"black", "stroke-width":"5"}).node
        blockContainerNode.appendChild(blockStructureContainer)
        blockStructureContainer.appendChild(this._blockStructure)

        const textSVGNode: SVGElement = new SVGNode("text", {x: "15", y: "25", "font-size": "20"}).node
        const text: Text = document.createTextNode(this._blockData.text)
        blockContainerNode.appendChild(textSVGNode)
        textSVGNode.appendChild(text)
        textSVGNode.classList.add("starfall-text-font")

        return blockContainerNode
    }

    private getBlockPos(): XYCoordinates {
        const block = document.querySelector(`#${this._blockData.name}`)
        if (!block) return {x:0, y:0}

        const style = window.getComputedStyle(block);
        const transform = style.transform
        const coordinates: XYCoordinates = {x: 0, y: 0}

        if (transform && transform !== 'none') {
            // Split the transform property value to extract individual transform functions
            let matches = transform.match(/matrix\((.+)\)/)
            if (!matches) return {x:0, y:0}
            const coords  = matches[1].split(',');

            if (matches) {
                // Extract x and y values from the matched groups
                coordinates.x = parseFloat(coords[4]);
                coordinates.y  = parseFloat(coords[5]);
            }
        }
        return coordinates
    }

    private getMousePos(e): XYCoordinates {
        return {x: e.clientX, y: e.clientY};
    }

    private setOffset(e): void {
        this._offset = {x: this.getBlockPos().x - this.getMousePos(e).x , y:  this.getBlockPos().y - this.getMousePos(e).y }
    }

    private addDrag(): void {
        this._blockContainer.node.classList.add("draggable")
        this._blockContainer.node.addEventListener("mousedown", this.startDrag)
        this._blockContainer.node.addEventListener("mousemove", this.drag)
        this._blockContainer.node.addEventListener("mouseup", this.endDrag)
        this._blockContainer.node.addEventListener("mouseleave", this.endDrag)
    }

    private startDrag(evnt: MouseEvent): void {
        if (document.querySelector(`#${this._blockData.name}`)?.classList.contains("draggable")) {
            this._draggable = true
            this.setOffset(evnt)
        }
    }

    private drag(evnt: MouseEvent): void {
        if (this._draggable === false) return

        const {x, y} = this.getMousePos(evnt)
        const {x: xOffset, y: yOffset} = this._offset

        this._blockContainer.node.setAttributeNS(null, "transform", `translate(${x + xOffset}, ${y + yOffset})`)
    }

    private endDrag(evnt: MouseEvent) {
        this._draggable = false
    }

    addToWorkspace(workspace: Workspace): void {
        this.generateStructure()
        workspace.addBlock(this)
        this.addDrag()
    }
}