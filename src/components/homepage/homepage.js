import React from 'react'
import { Link } from 'gatsby'

import Header from '../header/header'
import profilePic from '../../components/profile-pic.jpg'
import styles from './homepage.module.css'
import '../../assets/css/font-awesome.min.css'

export default function Homepage() {
  return (
    <div className={styles.flexbox}>
      <Header></Header>
      <div className={styles.flexContainer}>
        <div>
          <div className={styles.textCenter}>
            <img src={profilePic} alt="Anand Amrit Raj, NIT Raipur" />
          </div>
          <div className={styles.textCenter}>
            <h1>Anand Amrit Raj</h1>
            <h2>Software Engineer</h2>

            <ul className={styles.socialRibbon}>
              <li>
                <a
                  target="_blank"
                  title="Github"
                  href="https://github.com/anamritraj"
                >
                  <i className="fa fa-2x fa-github"></i>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  title="Twitter"
                  href="https://twitter.com/anamritraj"
                >
                  <i className="fa fa-2x fa-twitter"></i>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  title="Linkedin"
                  href="https://linkedin.com/in/anamritraj"
                >
                  <i className="fa fa-2x fa-linkedin"></i>
                </a>
              </li>
              <li>
                <Link to={'/blog'} title="Blog">
                  <i className="fa fa-2x fa-square"></i>
                </Link>
              </li>
              <li>
                <a
                  target="_blank"
                  title="What I'm listening to"
                  href="https://listen.anandamritraj.in"
                >
                  <i className="fa fa-2x fa-music"></i>
                </a>
              </li>
            </ul>
            <hr />
          </div>
          <div className={styles.aboutMe}>
            <p>
              I am a Computer Science Undergraduate from National Institute of
              Technology, Raipur, India who takes great interest in Web
              Development. I enjoy board games, comic book discussions and
              singing along! I also enjoy exploring the Internet (read reddit)
              and it was only a matter of time before I created a website to
              call my own.
            </p>
            <p>
              You may want to check my{' '}
              <a
                target="_blank"
                href="https://github.com/anamritraj?tab=repositories"
              >
                projects{' '}
              </a>{' '}
              or follow me on{' '}
              <a target="_blank" href="https://twitter.com/anamritraj">
                Twitter
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
