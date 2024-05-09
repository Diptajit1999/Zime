


import React from 'react';
import { Input } from 'antd';
const { Search } = Input;
const SearchInput = ({value,onChange}) => (
  <>
    <Search placeholder="input search loading default" loading={false} value={value} onChange={onChange}/>
  </>
);
export default SearchInput;