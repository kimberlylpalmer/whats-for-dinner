
import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";


const Footer = () => {
  return (
    <div id="footer">
        <span className="made-by">Made by Kimberly Palmer</span>
          <span className="flatiron"><a href="https://flatironschool.com/"><strong>//Flatiron School</strong></a></span>
          <span>
              <a className="linkedin" href="https://www.linkedin.com/in/kimberly-l-palmer/">
            <BsLinkedin />
            </a>
          </span>          
          <span>
            <a className="github" href="https://github.com/kimberlylpalmer">
                <BsGithub />
            </a>
        </span>
    </div>
  )
}

export default Footer