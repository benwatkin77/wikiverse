import React from 'react';

export const PagesList = ({ pages, onPageClick }) => {
  return (
    <>
      {pages.map((page, idx) => (
        <div key={idx} onClick={() => onPageClick(page)}>
          <h3>{page.title}</h3>
        </div>
      ))}
    </>
  );
};