import React from 'react';

export const createTooltip = (str: string, splitWords: string[]) => {
  let copyStr = str;
  const seperator = '--';

  for (let i = 0; i < splitWords.length; i++) {
    copyStr = copyStr.split(splitWords[i]).join(seperator);
  }

  return copyStr.split(seperator).map((word, idx) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <React.Fragment key={idx}>
        {word}
        <span>{splitWords[idx]}</span>
      </React.Fragment>
    );
  });
};
