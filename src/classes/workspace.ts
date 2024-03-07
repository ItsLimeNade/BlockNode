import Block from "./blocks"
import SVGNode from "./svgNodes"

export default class Workspace {

    private readonly _workspaceContainer: Element
    private readonly _workspace: SVGElement

    constructor(workspaceContainer: Element) {
        this._workspaceContainer = workspaceContainer

        this._workspace = new SVGNode("svg", {width: "100vw", height: "100vh"}).node
        this._workspace.id = "workspace"

        // // Setup the SVG definitions (fonts, etc.)
        // const defs = new SVGNode("defs").node
        // this._workspace.appendChild(defs)

        // const style = document.createElement("style")
        // defs.appendChild(style)

        // const fontCss = `@font-face {
        //     src: url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');
        //     font-family: "Roboto Mono", monospace;
        //     font-optical-sizing: auto;
        //     font-weight: 700;
        //     font-style: normal;
        // }`
        // const cssTextNode = document.createTextNode(fontCss)
        // style.appendChild(cssTextNode)

        // Inject the workspace
        this._workspaceContainer.appendChild(this._workspace)
    }

    get workspace(): SVGElement {
        return this.workspace
    }

    addBlock(block: Block): void {
        this._workspace.appendChild(block.blockDefinition.blockContainer)
    }

}