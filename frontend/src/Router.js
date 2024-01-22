import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from 'components/notFound';
import AuthenticationForm from 'components/authenticationForm';
import { AuthProvider } from 'context/authContext.js';
import { AnonymousRoute } from 'components/protectedRoute'
import Layout from 'Layout';
import Category from 'components/category';

const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout disableHeader={false} disableAside={false} />}>
            <Route index element={<div>Home</div>} />
            <Route path="home" element={<div>Home</div>} />
            <Route path="category" element={<Category />} />
            <Route path="category/:categoryName" element={<Category />} />
            <Route path="blogs" element={<div>Blogs</div>} />
            <Route path="contact" element={<div>Contacts</div>} />
            <Route
              path="auth"
              element={<AnonymousRoute element={<AuthenticationForm />} />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default Router;