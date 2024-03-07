import { Vec2 } from "../classes/vectors"

export interface BlockData {
    // The name of how the block will be refered as in the code
    name: string
    //? TODO: Will change this to make it a better system, can only display one text on screen for now.
    text: string
    // Colour of the filling of the block.
    colour: string
    pos: Vec2
}

export interface BlockDefinition {
    blockData: BlockData
    // A <g> tag that contains all the block SVG elements (text, block structure, etc.)
    blockContainer: SVGElement
    // A path SVG elelement that traces the block outlines
    blockStructure: SVGElement
}