import './footerstyles.css'
import { PiScroll } from "react-icons/pi";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";


import { Link } from 'react-router-dom';

export default function Footerlinks() {
  return (
    <div className='footer-container'>
      <h3> Get To Know the Developer!</h3>
      <div className='linkscontainer'>
<div>

      <img className='profile' src='https://havinproud.com/images/headshot.jpg' alt='headshot' />
</div>
      <div className='logoscontainer'>
        <h4 className='myname'><Link style={{color:'black'}}>Havin Proud</Link></h4>

        <div className='resumediv'>
          <Link onClick={()=> window.open('https://havinproud.com/resume.html')} style={{color:'black'}} ><PiScroll /></Link></div>
        <div className='githubdiv'><p><Link style={{color:'black'}}  onClick={()=> window.open('https://github.com/Hproud')} ><FaGithub /></Link></p></div>
        <div className='linkedindiv'><Link style={{color:'black'}}  onClick={()=> window.open('https://www.linkedin.com/in/havin-proud-6315b3308/')} ><FaLinkedin /></Link></div>

      </div>

      </div>
    </div>
  )
}
