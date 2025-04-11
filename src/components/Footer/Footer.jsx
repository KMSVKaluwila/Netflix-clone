import React from 'react'
import './Footer.css'
import youtube_icon from '../../assets/youtube_icon.png'
import twitter_icon from '../../assets/twitter_icon.png'
import facebook_icon from '../../assets/facebook_icon.png'
import instagram_icon from '../../assets/instagram_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-icons">
        <img src={facebook_icon}  alt="" />
        <img src={twitter_icon} alt="" />
        <img src={instagram_icon} alt="" />
        <img src={youtube_icon} alt="" />
      </div>

      <ul>
        <li>Video Discription</li>
        <li>Audio and Subtitles</li>
        <li>Media Center</li>
        <li>Privacy</li>
        <li>Contact Us</li>
        <li>Help Center</li>
        <li>Jobs</li>
        <li>Cookie Preferences</li>
        <li>Legal Notices</li>
        <li>Terms of Use</li>
        <li>Corporate Information</li>
        <li>Netflix Originals</li>
        <li>Netflix Shop</li>
        <li>Gift Cards</li>
        <li>Investor Relations</li>
      </ul>
      <p className='copyright-text'>© 2023 Netflix, Inc || All Rights Reserved</p>
    </div>
  )
}

export default Footer