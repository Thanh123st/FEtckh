// App.js
import React, { useState  , useEffect    } from 'react';  // Import useState để quản lý state
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
//Context 
import { AuthProvider } from './Context Status/AuthContext';  
import { AuthProviderWizad} from "./Context Status/ContextWizard";
import ProtectedRoute from './Context Status/ProtectedRoute';

//HomePage
import Home from './Page/HomePage/Home';
//HomePageDetails
import PurposeScope from './Page/HomePage/HPDetails/PurposeScope';
import PubFreq from './Page/HomePage/HPDetails/PubFreq';
import EditEthics from './Page/HomePage/HPDetails/EditEthics';
import PoliciesPrinciples from './Page/HomePage/HPDetails/PoliciesPrinciples';
import Sponsorship from './Page/HomePage/HPDetails/Sponsorship';
import AuthGuidelines from './Page/HomePage/HPDetails/AuthGuidelines';
import RevGuidelines from './Page/HomePage/HPDetails/RevGuidelines';
import Edit from './Page/HomePage/HPDetails/Edit';
import PrivacyPolicy from './Page/HomePage/HPDetails/privacypolicy';
//HomePageArticle
import Archiving from './Page/HomePage/HPArticle/Archiving';
import Submission from './Page/HomePage/HPArticle/Submission';
import Layoutindex from './Page/HomePage/HPArticle/Layoutindex';
import Layoutview from './Page/HomePage/HPArticle/Layoutview';
//SubPage
import DetailArticle from './Page/SubPage/DetailArticle';
import Profile from './Page/SubPage/Profile';
import Subs from './Page/SubPage/Subs';
import Wizard from './Page/SubPage/Wizard';
//AuthPapge
import Login from './Page/HomePage/HPAuthentication/Login';
import Register from './Page/HomePage/HPAuthentication/Register';
import Resetpass from './Page/HomePage/HPAuthentication/Resetpass';
import Forgetpass from './Page/HomePage/HPAuthentication/Forgetpass';
import ResultRes from './Page/HomePage/HPAuthentication/ResultRes';
//Components
import Chat from './components/Chatbox';
import NotFound from './components/Notfound';
import SearchTable from './components/test_know';
import LoadingComponent from "./components/loading";
//Reviewer
import Reviewer from './Page/Reviewer/Reviewer';
import Revdeatils from './Page/Reviewer/Detailsrev';
//Editorial Board
import RedactEB from './Page/EditorialBoard/Editorialboard';
import EBviews from './Page/EditorialBoard/Editorialviews';
import EBprocess from './Page/EditorialBoard/Editorialprocess';
import ArticleDraft from './Page/EditorialBoard/Article_draft';
import Reviewerdetails from './Page/EditorialBoard/EBreviwerdetail';
import EBAss from './Page/EditorialBoard/EBAss';

//Board of Trustees
import Boft from './Page/BofT/BofT';
import Boftviews from './Page/BofT/BofTviews';

// Bắt đầu App
function App() {
  // Khởi tạo state cho isLoggedIn và email
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Giá trị mặc định là false
  const [email, setEmail] = useState('');  // Email ban đầu là chuỗi rỗng
  
  const [isAppLoading, setIsAppLoading] = useState(true);


  



  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false); // Dừng loader sau thời gian delay
    }, 1000); // Điều chỉnh thời gian nếu cần

    return () => clearTimeout(timer);
  }, []);
  if (isAppLoading) {
    return <LoadingComponent />; // Hiển thị loading khi app đang khởi tạo
  }
  return (
    // AuthContext.Provider với các state đã được khai báo
    <AuthProvider value={{ isLoggedIn, setIsLoggedIn, email, setEmail}}>
      <AuthProviderWizad>
        <Router>
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/purpose-scope" element={<PurposeScope />} />
                <Route path="/pub-freq" element={<PubFreq />} />
                <Route path="/edit-ethics" element={<EditEthics />} />
                <Route path="/policies-principles" element={<PoliciesPrinciples />} />
                <Route path="/sponsorship" element={<Sponsorship />} />
                <Route path="/auth-guidelines" element={<AuthGuidelines />} />
                <Route path="/rev-guidelines" element={<RevGuidelines />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="/archiving" element={<Archiving />} />
                <Route path="/submission" element={<Submission />} />
                <Route path="/layoutindex" element={<Layoutindex />} />
                <Route path="/layoutview" element={<Layoutview />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="http://192.168.10.195:8000/api/auth/verify-email" element={<ResultRes/>} />
                <Route path="/forgetpass" element={<Forgetpass/>}/>
                <Route path="/resetpass" element={<Resetpass/>}/>
                <Route path="/privacypolicy" element={<PrivacyPolicy/>}/>


                <Route path="/subs" element={
                  <ProtectedRoute requiredRoles={["4"]}>
                    <Subs />
                  </ProtectedRoute>
                }/>
                <Route path="/profile" element={
                  <ProtectedRoute requiredRoles={["1", "2", "3", "4"]}>
                    <Profile />
                  </ProtectedRoute>
                }/>
                <Route path="/wizard" element={
                  <ProtectedRoute requiredRoles={["4"]}>
                    <Wizard />
                  </ProtectedRoute>
                }/>
                <Route path="/wizard/:idbaiviet" element={
                  <ProtectedRoute requiredRoles={["4"]}>
                    <Wizard />
                  </ProtectedRoute>
                }/>
                <Route path="/detailArticle/:articleId" element={
                  <ProtectedRoute requiredRoles={["4"]}>
                    <DetailArticle />
                  </ProtectedRoute>
                }/>

                
                <Route path="/reviewer" element={
                  <ProtectedRoute requiredRoles={["3"]}>
                    <Reviewer />
                  </ProtectedRoute>
                }/>
                <Route path="/revdetails" element={
                  <ProtectedRoute requiredRoles={["3"]}>
                    <Revdeatils />
                  </ProtectedRoute>
                }/>

                <Route path="/editorialboard" element={
                  <ProtectedRoute requiredRoles={["1"]}>
                    <RedactEB />
                  </ProtectedRoute>
                }/>
                <Route path="/editorialboard/assignment" element={
                  <ProtectedRoute requiredRoles={["1"]}>
                    <EBAss />
                  </ProtectedRoute>
                }/>
                <Route path="/editorialboard/views/:articleId" element={
                  <ProtectedRoute requiredRoles={["1"]}>
                    <EBviews />
                  </ProtectedRoute>
                }/>
                <Route path="/editorialboard/process/:articleId" element={
                  <ProtectedRoute requiredRoles={["1"]}>
                    <EBprocess />
                  </ProtectedRoute>
                }/>
                <Route path="/editorialboard/articledraft/:articleId" element={
                  <ProtectedRoute requiredRoles={["1"]}>
                    <ArticleDraft />
                  </ProtectedRoute>
                }/>

                <Route path="/editorialboard/reviwerdetails/:idRev" element={
                  <ProtectedRoute requiredRoles={["1"]}>
                    <Reviewerdetails />
                  </ProtectedRoute>
                }/>

                
                <Route path="/boardoftrustees" element={
                  <ProtectedRoute requiredRoles={["2"]}>
                    <Boft />
                  </ProtectedRoute>
                }/>
                <Route path="/boardoftrustees/view/:articleId" element={
                  <ProtectedRoute requiredRoles={["2"]}>
                    <Boftviews />
                  </ProtectedRoute>
                }/>
                

                <Route path="/chatbox" element={<Chat></Chat>}/>
                
                <Route path="/test" element={<SearchTable></SearchTable>}/>
                <Route path="*" element={<NotFound></NotFound>}></Route>


              </Routes>
            </main>
          </Router>
        </AuthProviderWizad>
    </AuthProvider>
  );
}

export default App;


