import React from "react";
import { Content, Mention, TextContent, TextFormatting } from "../types/content";
import { useAgreement } from "../context/AgreementContext";

interface TextRendererProps {
    item: Content;
    inheritedMarks?: TextFormatting;
}

export const TextRenderer: React.FC<TextRendererProps> = ({ item, inheritedMarks = {} }) => {
    const { value } = useAgreement();
    const mergedMarks: TextFormatting = {
        ...inheritedMarks,
        ...(item as TextFormatting)
    };

    if ((item as Mention).type === "mention") {
        const mention = item as Mention;
        return (
            <span key={mention.id} style={{ backgroundColor: mention.color, color: 'white', padding: '2px 4px', borderRadius: '4px' }}>
                {value?.[mention.id] ?
                    <TextRenderer item={{ text: value?.[mention.id] as string }} inheritedMarks={mergedMarks} />
                    :
                    mention.children.map((child, i) => (
                        <TextRenderer key={i} item={child} inheritedMarks={mergedMarks} />
                    ))}
            </span>
        );
    }

    const text = (item as TextContent).text;
    let content: React.ReactNode = text?.split('\n').map((line, i) => (
        <React.Fragment key={i}>
            {line}
            {i < text.split('\n').length - 1 && <br />}
        </React.Fragment>
    ));

    if (mergedMarks.bold) content = <strong>{content}</strong>;
    if (mergedMarks.underline) content = <u>{content}</u>;
    if (mergedMarks.italic) content = <em>{content}</em>;

    return <>{content}</>;
}; 