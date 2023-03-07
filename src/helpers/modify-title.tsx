import React from 'react';

export const modifyTitle = (title: string, search: string) => {
  const regexp = new RegExp(`${search}`, 'gi');
  const searchWords = title.match(regexp);

  return title.split(regexp).map((word, idx) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <React.Fragment key={idx + word}>
        {word}
        {searchWords?.[idx] ? <span data-test-id='highlight-matches'>{searchWords[idx]}</span> : ''}
      </React.Fragment>
    );
  });
};
