import React, { useState, useEffect } from "react";
import fetchAPI from "../api"; // Renaming imported function to avoid conflict
import SearchInput from "../Components/SearchInput";
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { Layout, Table, Select, Input } from 'antd';

const { Header, Content } = Layout;
const { Option } = Select

const MyTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Change the value to your desired page size
  const [filterTag, setFilterTag] = useState([]);
  const [filterSearch, setFilterSearch] = useState("");


  
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
    },
    {
      title: "Reactions",
      dataIndex: "reactions",
      key: "reactions",
    },
  ];

  const fetchDataFromAPI = () => {
    setLoading(true);
    fetchAPI() // Using the renamed imported function
      .then((res) => {
        console.log(res.posts);
        setData(res.posts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };
  const handleTagChange = (value) => {
    setSelectedTags(value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
    // history.push(`/posts/${pagination.current}`);
  };

  const filteredPosts = posts.filter(post =>
    selectedTags.every(tag => post.tags.includes(tag)) &&
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  ); 
  return (
    <>
      <SearchInput />
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data.length,
          onChange: handlePageChange,
        }}
      />
      <div>
        <Select
          mode="multiple"
          style={{ width: 300, marginBottom: 10 }}
          placeholder="Select tags"
          onChange={handleTagChange}
          value={selectedTags}
        >
          {tags.map((tag) => (
            <Option key={tag}>{tag}</Option>
          ))}
        </Select>
        <Input
          placeholder="Search posts"
          style={{ width: 300, marginBottom: 10 }}
          onChange={handleSearch}
          value={searchTerm}
        />
        <Table
          columns={columns}
          dataSource={filteredPosts}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          rowKey="id"
        />
      </div>
    </>
  );
};

export default MyTable;
