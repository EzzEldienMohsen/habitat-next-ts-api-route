import React from 'react';

const AmountGeneration: React.FC<{ count: number }> = ({ count }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => {
        const value = index + 1;
        return (
          <option key={value} value={value} id="amount" aria-label="amount">
            {value}
          </option>
        );
      })}
    </>
  );
};
export default AmountGeneration;
