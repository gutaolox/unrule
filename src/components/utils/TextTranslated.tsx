import { InternacionalizationContext } from "@/src/hooks/internacionalizationProvider";
import React, { useContext } from "react";
import { Text, TextProps } from "react-native";

interface TextTranslatedProps extends TextProps {
  children: string;
  count?: number;
}

const TextTranslated: React.FC<TextTranslatedProps> = (props,) => {
  const { getMessage } = useContext(InternacionalizationContext);
  const { children, count, ...textProps } = props;
  const translatedText = getMessage(children, count) ?? children;

  return <Text {...textProps}>{translatedText}</Text>;
};

export default TextTranslated;
