import About from "./components/About";
import Header from "./components/Header";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostDetail from "./components/PostDetail";
import NotFound from "./components/NotFound";
import EditPost from "./components/EditPost";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="/editpost:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
