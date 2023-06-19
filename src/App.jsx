import { Routes, Route } from 'react-router-dom'
import Product from './page/product/Product';
import { lazy, Suspense } from 'react';
import './App.css'
import Skeleton from './components/skeleton/Skeleton';


const Home = lazy(() => import('./page/home/Home'))
const AppLayout = lazy(() => import('./components/layout/AppLayout'))
const ContactUs = lazy(() => import('./page/contact/ContactUs'))
const ActivePage = lazy(() => import('./page/not/ActivePage'))
const ClosePage = lazy(() => import('./page/not/ClosePage'))
const CompletePage = lazy(() => import('./page/not/CompletePage'))
const FAQpage = lazy(() => import('./page/not/FAQpage'))
const InvitePage = lazy(() => import('./page/not/InvitePage'))
const MemberPage = lazy(() => import('./page/not/MemberPage'))
const SubcribePage = lazy(() => import('./page/not/SubcribePage'))

function App() {

  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<Suspense fallback={<Skeleton title='Home Page' />}> <Home /> </Suspense>} />
          <Route path='/product' element={<Suspense fallback={<Skeleton title='Product Page' />}><Product /></Suspense>} />
          <Route path='/contact' element={<Suspense fallback={<Skeleton title='Contact Page' />}><ContactUs /></Suspense>} />
          <Route path='/active' element={<Suspense fallback={<Skeleton title='Active Page' />}><ActivePage /></Suspense>} />
          <Route path='/close' element={<Suspense fallback={<Skeleton title='Close Page' />}><ClosePage /></Suspense>} />
          <Route path='/complete' element={<Suspense fallback={<Skeleton title='Complete Page' />}><CompletePage /></Suspense>} />
          <Route path='/faq' element={<Suspense fallback={<Skeleton title='FAQ Page' />}><FAQpage /></Suspense>} />
          <Route path='/invite' element={<Suspense fallback={<Skeleton title='Ivite Page' />}><InvitePage /></Suspense>} />
          <Route path='/mem' element={<Suspense fallback={<Skeleton title='Menber Page' />}><MemberPage /></Suspense>} />
          <Route path='/sub' element={<Suspense fallback={<Skeleton title='Subcribe Page' />}><SubcribePage /></Suspense>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

