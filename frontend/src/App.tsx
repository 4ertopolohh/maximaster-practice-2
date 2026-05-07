import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './styles/base.scss';
import Footer from './components/Footer/Footer';

const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage'));
const ProductPage = lazy(() => import('./pages/ProductPage/ProductPage'));

const App = () => {
  return(
    <>
      <Suspense fallback={<main className='container'><p>Загрузка...</p></main>}>
        <Routes>
          <Route path='/' element={<CatalogPage />} />
          <Route path='/products/:id' element={<ProductPage />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App;
