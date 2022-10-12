import { useNavigate } from 'react-router-dom'
import pages from './util/pages'
import './App.scss'
export default function App() {
  const navigate = useNavigate()
  return <main className='app'>
    <div className='content'>
      <div className='text-lg font-bold mb-2'>10 Day</div>
      <div className='mb-6 text-gray-400'>Inspired by <i className='cursor-pointer text-blue-600' onClick={() => window.open('https://100.antfu.me/')}>Antfu</i></div>
      <div className='list' >{pages.map((i, idx) => <div key={i} onClick={() => navigate(`/${String(idx + 1).padStart(2, '0')}`)}><span>{String(idx + 1).padStart(2, '0')}</span><span>{i}</span></div>)}</div>
    </div>
  </main>
}