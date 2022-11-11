import { useState } from 'react';
import MainBar from './components/MainBar';
import SubBar from './components/SubBar/SubBar';

const NavBar = () => {
  const [subBarActive, setSubBarActive] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  return (
    <div>
      <MainBar setSubBarActive={setSubBarActive} subBarActive={subBarActive} setTitle={setTitle} />
      <SubBar subBarActive={subBarActive} title={title} />
    </div>
  );
};

export default NavBar;
