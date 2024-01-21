import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from 'Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout disableHeader={false} disableAside={false}/>}>
          <Route index element={<div>Home</div>} />
          <Route path="blogs" element={<div>Blogs</div>} />
          <Route path="contact" element={<div>Contacts</div>} />
          <Route path="*" element={<div>Not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;