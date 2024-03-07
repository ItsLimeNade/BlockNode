export default class SVGNode {

    private readonly _node: SVGElement
    private readonly _nodeName: string
    private readonly _props: Record<string, string> | undefined

    constructor(nodeName: string, props?: Record<string, string>) {
        this._node = document.createElementNS("http://www.w3.org/2000/svg", nodeName);
        this._nodeName = nodeName
        this._props = props
        
        for (const prop in props) {
            this._node.setAttributeNS(null , prop, props[prop])
        }
        
    }

    get node(): SVGElement {
        return this._node
    }
}