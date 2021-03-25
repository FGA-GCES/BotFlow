import React from './node_modules/react'

const Flag = ({ image, isSelected, ...props }) => (
  <img alt="flag" src={image} className={isSelected ? 'flag selected' : 'flag'} {...props} />
)

export default Flag