import React from "react";
import styled from "styled-components";

function Stats({ items }) {
  if (items.length === 0) {
    return <p>Start adding some items to your packing list 🚀</p>;
  }

  const totalCount = items.length;
  const packedItem = items.filter((item) => item.packed).length;
  const packedPercentage = Math.round((packedItem / totalCount) * 100);

  return (
    <Footer>
      <i>
        <p>
          💼 You have {totalCount} items on your list, and you already packed{" "}
          {packedItem}({packedPercentage}%)
        </p>
      </i>
    </Footer>
  );
}

export default Stats;

const Footer = styled.div`
  padding-top: 10px;
`;
