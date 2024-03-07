import Block from "./classes/blocks";
import { Vec2 } from "./classes/vectors";
import Workspace from "./classes/workspace";

let workspace: Workspace;
const app = document.querySelector("#app")
const blocks = {}
if (app) {
    workspace = new Workspace(app)
    for (let i=0; i < 1; i++) {
        blocks[i] = () => {return new Block({
            name: `hello_world${i}`,
            colour: "white",
            text: "Hello World I love TypeScript",
            pos: new Vec2(150,300)
        })}

        blocks[i]().addToWorkspace(workspace)
    }
    // const block = new Block({
    //     name: "hello_world",
    //     colour: "white",
    //     text: "Hello World I love TypeScript",
    //     pos: new Vec2(150,300)
    // })
    
    // block.addToWorkspace(workspace)

}

