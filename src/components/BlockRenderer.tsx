import React from "react";
import { Block, TextFormatting } from "../types/content";
import { useAgreement } from "../context/AgreementContext";
import { TextRenderer } from "./TextRenderer";

interface BlockRendererProps {
  block: Block;
  index: number;
  inheritedMarks?: TextFormatting;
  clauseCount?: number;
  depth?: number;
}

const orderingIndexList = [
  ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.'],
  ['(a)', '(b)', '(c)', '(d)', '(e)', '(f)', '(g)', '(h)', '(i)', '(j)'],
  ['(i)', '(ii)', '(iii)', '(iv)', '(v)', '(vi)', '(vii)', '(viii)', '(ix)', '(x)'],
]

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block, index, inheritedMarks = {}, clauseCount = 0, depth = 0 }) => {
  const mergedMarks: TextFormatting = {
    ...inheritedMarks,
    ...(block as TextFormatting)
  };

  if (block.type === "mention") {
    return <TextRenderer item={block} inheritedMarks={mergedMarks} />;
  }

  switch (block.type) {
    case "h1":
      return (
        <h1 key={index} className="h1">
          {block.children?.map((child, i) => (
            <TextRenderer key={i} item={child} inheritedMarks={mergedMarks} />
          ))}
        </h1>
      );
    case "h4":
      return (
        <h4 key={index}>
          {block.children?.map((child, i) => (
            <TextRenderer key={i} item={child} inheritedMarks={mergedMarks} />
          ))}
        </h4>
      );
    case "p":
      return (
        <p key={index}>
          {block.children?.map((child, i) => (
            <>
              {

                (child as any).text ? <TextRenderer key={i} item={child} inheritedMarks={mergedMarks} /> :
                  <BlockRenderer key={i} block={child as Block} index={i} inheritedMarks={mergedMarks} clauseCount={clauseCount + 1} depth={depth} />
              }
            </>

          ))}
        </p>
      );
    case "ul":
      return (
        <ul key={index} className="list-disc pl-5">
          {block.children?.map((li: Block, i: number) => (
            <li key={i}>
              {li.children?.map((lic, j) =>
                (lic as Block).children?.map((c, k) => (
                  <TextRenderer key={k} item={c} inheritedMarks={mergedMarks} />
                ))
              )}
            </li>
          ))}
        </ul>
      );
    case "clause":
      let childClauseCount = 0;
      return (
        <div key={index} className="mb-2 flex flex-row">
          {orderingIndexList[depth][clauseCount - 1]}
          <div className="pl-2">
            {block.children?.map((child, i) => {
              if ((child as Block).type === "clause") {
                childClauseCount++;
              }
              return (<BlockRenderer key={i} block={child as Block} index={i} inheritedMarks={mergedMarks} clauseCount={childClauseCount} depth={depth + 1} />)
            }
            )}
          </div>
        </div>
      );
    case "block":
      return (
        <div key={index} className="mb-4">
          {block.children?.map((child, i) => (
            <BlockRenderer key={i} block={child as Block} index={i} inheritedMarks={mergedMarks} clauseCount={(child as Block).type === "clause" ? clauseCount + 1 : clauseCount} />
          ))}
        </div>
      );
    default:
      return (
        <div key={index}>
          {block.children?.map((child, i) => (
            <TextRenderer key={i} item={child} inheritedMarks={mergedMarks} />
          ))}
        </div>
      );
  }
}; 