import React from 'react'

const getTableContent = (columnItem) => (<>
  {columnItem.children.map((child) => <tr key={child.id}>
    {child?.content?.cells?.map((cell) => <td key={cell[0]?.plain_text}>
      {cell[0]?.plain_text}
    </td>)}
  </tr>)}
</>)

export default getTableContent
