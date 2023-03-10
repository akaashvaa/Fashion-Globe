import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { UserContext } from '../../context/user.context';
import { CartContext } from '../../context/cart.context';

import { SignOutUser } from '../../utils/firebase/firebase.utils';

import {
  NavContainer,
  NavLinksContainer,
  NavLink,
  LogoContainer,
} from './navigation.styles';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  //console.log(currentUser);

  return (
    <>
      <NavContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={SignOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
          {isCartOpen && <CartDropdown />}
        </NavLinksContainer>
      </NavContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
