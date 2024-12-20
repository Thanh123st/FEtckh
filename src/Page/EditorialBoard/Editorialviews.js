import React, { useState, useRef } from 'react';
import Editor from '../../components/Editor';
import { Link , useParams} from 'react-router-dom';
import HeaderSub, {SlideBar} from "../../components/HeaderSub";
import "../../Css/reviewer.css"; // Import CSS tùy chỉnh
import ArticleDetail from '../../components/DetailAritcle';
import ArticleProcess from '../../components/ArticleProcess';
const EBviews = () => {
    const { articleId } = useParams();
    console.log("id bai viết ",articleId);
  return (
    <div>
        <style>
            {`
            .hidden {
                display: none;
            }
            `}
        </style>
        <HeaderSub/>
        <div className="pkp_structure_main">
            <SlideBar></SlideBar>
            <div className="edt_container">
            <ArticleDetail articleid={articleId}/>
        </div>
        </div>

        </div>
    
  );
};

export default EBviews;
