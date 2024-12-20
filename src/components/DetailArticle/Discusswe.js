import React, { useState, useContext , useEffect } from 'react';
import {  Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context Status/AuthContext';
import { Contextwizaed } from "../../Context Status/ContextWizard";
import Editor from '../../components/Editor';
import Chat from '../Chatbox';
const Discusswithedit = (props) => {
    const { token, apiUrl } = useContext(AuthContext);

    const fetchSubmissions = async () => {

        try {
            // Gửi yêu cầu GET
            const response = await axios.get(`${apiUrl}/api/submissions?article_id=${props.postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error.message);
            if (error.response) {
                console.error("Chi tiết lỗi:", error.response.data);
            }
        }
    };



    return (


    <>
        <Chat></Chat>
    </>

    );
};

export default Discusswithedit;
