import Navigation from 'components/Navigation/Navigation';
import s from './AppBar.module.css';

export default function AppBar() {
  return (
    <header className={s.header}>
      <Navigation />
    </header>
  );
}
