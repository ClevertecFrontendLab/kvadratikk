import { Fragment } from 'react';

export const createTooltip = (str: string, splitWords: string[]) => {
  let copyStr = str;
  let key = 0;
  const seperator = '--';

  for (let i = 0; i < splitWords.length; i++) {
    copyStr = copyStr.split(splitWords[i]).join(seperator);
  }

  return copyStr.split(seperator).map((word, idx) => {
    key += 1;

    return (
      <Fragment key={key}>
        {word}
        <span>{splitWords[idx]}</span>
      </Fragment>
    );
  });
};
