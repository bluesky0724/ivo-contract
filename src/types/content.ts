export interface TextFormatting {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export interface Mention {
  color: string;
  type: "mention";
  title: string;
  id: string;
  value: string;
  variableType?: string;
  children: Content[];
}

export interface TextContent extends TextFormatting {
  text: string;
}

export interface Block extends TextFormatting {
  type?: string;
  title?: string;
  text?: string;
  children?: Content[];
}

export type Content = TextContent | Mention | Block; 