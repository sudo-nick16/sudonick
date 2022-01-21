import type { NextPage } from 'next'
import { ParsedBlock } from '@sudonick/server/src/utils/graphqlTypes';
import TextBlock from './TextBlock';

type BlockProps = {
    block: ParsedBlock;
}

// declare enum within comp as nextjs' default loader fails to load enums declared outside its root. 
enum Element {
    p = "p",
    h1 = "h1",
    h2 = "h2",
    h3 = "h3",
    ul = "ul",
    ol = "ol",
    input = "input",
    img = "img",
    li = "li",
    blockquote = "blockquote",
}

const styleMap: {[key in Element]: string} = {
    p: "text-base font-regular",
    h1: "text-2xl font-bold",
    h2: "text-xl font-semibold",
    h3: "text-lg font-medium",
    ul: "ul",
    ol: "ol",
    input: "input",
    img: "img",
    li: "li",
    blockquote: "blockquote",
}

const  Block: NextPage<BlockProps> = ({block}) => {
    let Component = block.element;
    if(block.element === "input"){
        return (
            <div className={`flex text-white items-center py-1`}>
                <input type="checkbox" checked={block.checked? true : false} className={`mr-2`} readOnly/>
                <TextBlock text={block.text!}/>
            </div>
        );
    }
    if(block.element === "img"){
        return (
            <img src={block.img?.url} className={`max-w-[80%] max-h-96 w-auto object-cover mx-auto`} />
        )
    }
    if(block.element === "ol" || block.element === "ul"){
        Component = Element['li'];
    }
    return (
        <Component className={`text-white py-1 ${styleMap[block.element]}`}>
            {
                Component === "blockquote"?
                <span className={`bg-white mr-2`} >|</span>
                :
                null 
            }
            <TextBlock text={block.text!} />
        </Component>
    );
}

export default  Block;