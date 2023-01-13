import SignUp from './Components/Pages/SignUP/SignUp';
import { Route, Routes} from "react-router-dom";
import Login from './Components/Pages/Login/Login';
import AllPosts from './Components/Pages/Posts/AllPosts';
import Navbar from './Components/Pages/Generic/Navbar';
import AddPost from './Components/Pages/Posts/Post/AddPost/AddPost.jsx'
import Comments from './Components/Pages/Comments/Comments';
import AddComment from './Components/Pages/Comments/AddComment';
import Logout from './Components/Pages/Logout/Logout';
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/addPost" element={<AddPost />}></Route>
        <Route path="/comments" element={<Comments />}></Route>
        <Route path="/addComment" element={<AddComment />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/" element={<AllPosts />}></Route>
      </Routes>
    </div>
  );
}

export default App;
