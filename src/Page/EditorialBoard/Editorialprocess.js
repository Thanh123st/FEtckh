import React, { useState, useRef } from 'react';
import Editor from '../../components/Editor';
import { Link } from 'react-router-dom';
import HeaderSub, {SlideBar} from "../../components/HeaderSub";
import "../../Css/reviewer.css"; // Import CSS tùy chỉnh
import ArticleProcess from '../../components/ArticleProcess';
const EBprocess = () => {
    
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
            <ArticleProcess></ArticleProcess>
        </div>
        </div>

        </div>
    
  );
};

export default EBprocess;