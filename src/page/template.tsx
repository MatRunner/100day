import { lazy, ReactNode, Suspense } from 'react'
import { useParams, Navigate } from 'react-router-dom'
// import P1 from './001'
import './template.scss'

interface P {
  [key: string]: ReactNode
}
const P1 = lazy(() => import('./001'))

const PAGE: P = {
  "01": <P1 />
}

export default function Template() {
  const { id } = useParams()
  return <main className='template'>
    <Suspense fallback={null}>
      {typeof id == 'string' ? PAGE[id] : <Navigate to='/' />}
    </Suspense>
  </main>
}