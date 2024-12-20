import React, { createContext, useState } from 'react';


// Tạo context cho Wizard
const Contextwizaed = createContext();

const AuthProviderWizad = ({ children }) => {
    const [postId, setPostId] = useState(null);
    const [isStep1Completed, setIsStep1Completed] = useState(false);
    const [isStep2Completed, setIsStep2Completed] = useState(false);
    const [isStep3Completed, setIsStep3Completed] = useState(false);
    const [isStep4Completed, setIsStep4Completed] = useState(false);
    const [chuDe, setChuDe] = useState("1");
    const [ghiChu, setGhiChu] = useState("");
    const [file , setFile] = useState([]);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [keywords, setKeywords] = useState('');
    const [citations, setCitations] = useState('');
    const [coAuthors, setCoAuthors] = useState([]);


    const resetAuthState = () => {
        console.log("Resetting steps"); // Log để kiểm tra
        setIsStep1Completed(false);
        setIsStep2Completed(false);
        setIsStep3Completed(false);
        setIsStep4Completed(false);
    };



    return (
        <Contextwizaed.Provider value={{coAuthors,setCoAuthors, resetAuthState,postId,setPostId,isStep1Completed,isStep2Completed,isStep3Completed,setIsStep3Completed,isStep4Completed,setIsStep1Completed,setIsStep2Completed,setIsStep4Completed ,
        chuDe, setChuDe,
        ghiChu, setGhiChu,
        file, setFile,
        title, setTitle,
        summary, setSummary,
        keywords, setKeywords,
        citations, setCitations
        }}>
            {children}
        </Contextwizaed.Provider>
    );
};

export { Contextwizaed, AuthProviderWizad };