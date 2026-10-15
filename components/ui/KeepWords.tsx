import { Fragment } from "react";

// Lines may break only at spaces: each word — a hyphenated pair such as
// "Chinuri-Goruli" counting as one — is kept whole.
export default function KeepWords({ text }: { text: string }) {
  return text.split(" ").map((word, index) => (
    <Fragment key={index}>
      {index > 0 && " "}
      <span className="whitespace-nowrap">{word}</span>
    </Fragment>
  ));
}

/** Letters in the longest unbreakable word, for sizing a name to its column. */
export const longestWordLength = (text: string) => Math.max(...text.split(/\s+/).map((word) => word.length));
