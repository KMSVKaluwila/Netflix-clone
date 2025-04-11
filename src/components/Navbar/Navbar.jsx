import React, { useRef, useEffect } from 'react'; // Added missing useEffect import
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile from '../../assets/user.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';

const Navbar = () => {
  const navRef = useRef(null); // Added null as initial value

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navRef.current?.classList.add('nav-dark'); // Optional chaining to avoid errors
      } else {
        navRef.current?.classList.remove('nav-dark');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function toggleMenu() {
    document.querySelector(".navbar-left ul").classList.toggle("show");
  }


  return (
    <div ref={navRef} className="navbar"> {/* Applied navRef here */}
      <div className="navbar-left">
        <img src={logo} alt="Netflix Logo" />
        <div class="menu-icon" onClick={toggleMenu}>
          &#9776;
        </div>
        <ul>
          <li>Home</li>
          <li>TV Shows</li> {/* Fixed typo from "TV show" to "TV Shows" */}
          <li>Movies</li>
          <li>New & Popular</li> {/* Improved readability */}
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="Search" className="icon" />
        <p>Children</p>
        <img src={bell_icon} alt="Notifications" className="icon" />
        <div className="navbar-profile">
          <img src={profile} alt="Profile" className="profile" />
          <img src={caret_icon} alt="Caret" className="caret_icon" />
          <div className="dropdown">
            <p onClick={() => {
              { logout() }
            }}>Log out of Netflix</p> {/* Fixed "Login out" to "Log out" */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
