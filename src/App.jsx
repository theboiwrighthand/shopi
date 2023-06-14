import { Routes, Route } from 'react-router-dom'
import Product from './page/product/Product';
import './App.css'
import Home from './page/home/Home';
import NotPage from './page/not/NotPage';
import AppLayout from './components/layout/AppLayout';
import ContactUs from './page/contact/ContactUs';
import ActivePage from './page/not/ActivePage';
import ClosePage from './page/not/ClosePage';
import CompletePage from './page/not/CompletePage';
import FAQpage from './page/not/FAQpage';
import InvitePage from './page/not/InvitePage';
import MemberPage from './page/not/MemberPage';
import SubcribePage from './page/not/SubcribePage';

function App() {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<Product />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/active' element={<ActivePage />} />
          <Route path='/close' element={<ClosePage />} />
          <Route path='/complete' element={<CompletePage />} />
          <Route path='/faq' element={<FAQpage />} />
          <Route path='/invite' element={<InvitePage />} />
          <Route path='/mem' element={<MemberPage />} />
          <Route path='/sub' element={<SubcribePage />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;

