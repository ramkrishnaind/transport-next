// import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { getAllBlog } from "../../../services/admin-api-service";
import Link from "next/link";
import { Table, Space, Button, Divider, Row, Col, Tag } from "antd";
import React, { useState, useEffect, useContext } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import PageHeader from "../../../components/helper/pageTitle";

const GetAllBlogList = () => {
  const router = useRouter();
  const saveFormData = async (formData) => {
    try {
      return await getAllBlog(formData);
    } catch (err) {
      throw err;
      console.log(err);
    }
  };

  const columns = [
    {
      title: "User ID",
      width: 80,
      dataIndex: "userId",
      key: "userId",
      fixed: "left",
    },
    {
      title: "Blog Category Title",
      dataIndex: "blogCategoryTitle",
      key: "blogCategoryTitle",
      width: 80,
    },
    {
      title: "Blog Image",
      dataIndex: "blogImage",
      key: "blogImage",
      width: 80,
    },
    {
      title: "Blog Date",
      dataIndex: "blogDate",
      key: "blogDate",
      width: 100,
    },
    {
      title: "Blog Title",
      dataIndex: "blogTitle",
      key: "blogTitle",
      width: 120,
    },
    {
      title: "Blog Title Para",
      dataIndex: "blogTitlePara",
      key: "blogTitlePara",
      width: 400,
    },
    {
      title: "Blog Sub Title",
      dataIndex: "blogSubTitle",
      key: "blogSubTitle",
      width: 200,
    },
    {
      title: "Blog Sub Title Para",
      dataIndex: "blogSubTitlePara",
      key: "blogSubTitlePara",
      width: 300,
    },
    {
      title: "Blog Content First",
      dataIndex: "blogContentFirst",
      key: "blogContentFirst",
      width: 100,
    },
    {
      title: "Blog Content First Para",
      dataIndex: "blogContentFirstPara",
      key: "blogContentFirstPara",
      width: 300,
    },
    {
      title: "Blog Content Second",
      dataIndex: "blogContentSecond",
      key: "blogContentSecond",
      width: 100,
    },
    {
      title: "Blog Content Second Para",
      dataIndex: "blogContentSecondPara",
      key: "blogContentSecondPara",
      width: 500,
    },
    {
      title: "Blog Content Third",
      dataIndex: "blogContentThird",
      key: "blogContentThird",
      width: 100,
    },
    {
      title: "Blog Content Third Para",
      dataIndex: "blogContentThirdPara",
      key: "blogContentThirdPara",
      width: 300,
    },
    {
      title: "Blog Content Fourth",
      dataIndex: "blogContentFourth",
      key: "blogContentFourth",
      width: 100,
    },
    {
      title: "Blog Content Fourth Para",
      dataIndex: "blogContentFourthPara",
      key: "blogContentFourthPara",
      width: 500,
    },
    {
      title: "Blog Content Fifth",
      dataIndex: "blogContentFifth",
      key: "blogContentFifth",
      width: 100,
    },
    {
      title: "Blog Content Fifth Para",
      dataIndex: "blogContentFifthPara",
      key: "blogContentFifthPara",
      width: 500,
    },
    {
      title: "Blog Category",
      dataIndex: "blogCategory",
      key: "blogCategory",
      width: 100,
    },
    {
      title: "Blog Author",
      dataIndex: "blogAuthor",
      key: "blogAuthor",
      width: 100,
    },
    {
      title: "Blog Status",
      dataIndex: "blogStatus",
      key: "blogStatus",
      width: 75,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 100,
      fixed: "right",
    },
  ];

  const [data, setdata] = useState([]);
  const [item, setbookitem] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const value = 1;
    const res = await saveFormData(value);

    setdata(
      res.data.message.map((row) => ({
        userId: row.userId,
        blogCategoryTitle: row.blogCategoryTitle,
        blogImage: row.blogImage,
        blogDate: row.blogDate,
        blogTitle: row.blogTitle,
        blogTitlePara: row.blogTitlePara,
        blogSubTitle: row.blogSubTitle,
        blogSubTitlePara: row.blogSubTitlePara,
        blogContentFirst: row.blogContentFirst,
        blogContentFirstPara: row.blogContentFirstPara,
        blogContentSecond: row.blogContentSecond,
        blogContentSecondPara: row.blogContentSecondPara,
        blogContentThird: row.blogContentThird,
        blogContentThirdPara: row.blogContentThirdPara,
        blogContentFourth: row.blogContentFourth,
        blogContentFourthPara: row.blogContentFourthPara,
        blogContentFifth: row.blogContentFifth,
        blogContentFifthPara: row.blogContentFifthPara,
        blogCategory: row.blogCategory,
        blogAuthor: row.blogAuthor,
        blogStatus: row.blogStatus,
        createdAt: row.createdAt,
      }))
    );
  };

  return (
    <>
      <PageHeader
        mainTitle="Blog Management"
        subTitle="manage Blog here"
        currentPage="Blog Management"
      />
      <div className="flex flex-row">
        <div className="basis-11/12 ml-1 mt-4 tableTitle">All Bolg</div>
        <div className="basis-1/12 mb-2">
          <Button
            className="adminprimary"
            size="large"
            shape="round"
            icon={<UserAddOutlined />}
            // to create Bolg add on the function
            // onClick={() => router.push("users/adduser")}
          >
            Create Bolg
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1100, y: 400 }}
      />
    </>
  );
};

export default GetAllBlogList;
