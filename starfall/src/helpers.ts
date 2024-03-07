import { Vec2 } from "./classes/vectors";

export function setNodeTo(node: SVGElement, pos: Vec2): void {
    node.setAttributeNS(null, "x", `${pos.x}`)
    node.setAttributeNS(null, "y", `${pos.y}`)
}

export function moveNodeby(node: SVGElement, pos: Vec2): void {
    const x = Number(node.getAttributeNS(null, "x"))
    const y = Number(node.getAttributeNS(null, "y"))
    node.setAttributeNS(null, "x", `${x + pos.x}`)
    node.setAttributeNS(null, "y",  `${y + pos.y}`)
}