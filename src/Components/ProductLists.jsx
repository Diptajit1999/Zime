import React from 'react'

const ProductLists = ({title,body,tags,reactions}) => {
  return (
    <div>
        <p>ProductLists</p>
        <p>{title}</p>
        <p>{body}</p>
        <p>{tags}</p>
        <p>{reactions}</p>
    </div>
  )
}

export default ProductLists