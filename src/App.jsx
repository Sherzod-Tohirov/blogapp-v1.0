import { useContext } from 'react'
import './App.css'
import { tokenContext } from './context/tokenContext'
import { Private } from './apps/Private.app';
import { Public } from './apps/Public.app';

function App() {
  const {token} = useContext(tokenContext);
  if(token) return <Private />
  return <Public />
}

export default App
