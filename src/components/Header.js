import React from 'react';
import {graphql, StaticQuery} from 'gatsby';
import GitHubButton from 'react-github-btn'
import Link from './link';
import './styles.scss';
import config from '../../config.js';

import Search from './search/index';
import Sidebar from "./sidebar";

const help = require('./images/help.svg');
const isSearchEnabled = config.header.search && config.header.search.enabled ? true : false;

let searchIndices = [];
if (isSearchEnabled && config.header.search.indexName) {
  searchIndices.push(
    {name: `${config.header.search.indexName}`, title: `Results`, hitComp: `PageHit`},
  );
}

const Header = ({location}) => (
  <StaticQuery
    query={
      graphql`
        query headerTitleQuery {
          site {
            siteMetadata {
              headerTitle
              githubUrl
              helpUrl
              tweetText
              logo {
                link
                image
              }
              headerLinks {
                link
                text
              }
            }
          }
        }
        `}
    render={(data) => {
      const logoImg = require('./images/logo-white.svg');
      const twitter = require('./images/twitter.svg');
      const {
        site: {
          siteMetadata: {
            headerTitle,
            githubUrl,
            helpUrl,
            tweetText,
            logo,
            headerLinks,
          }
        }
      } = data;
      const finalLogoLink = logo.link !== '' ? logo.link : '/';
      return (
        <div className={'navBarWrapper'}>
          <nav className={'navbar navbar-default navBarDefault navbar navbar-expand-lg'}>
            <div className={'navBarHeader'}>
              <Link to={finalLogoLink} className={'navbar-brand navBarBrand'}>
                {logo.image !== '' ?
                  (<img className={'img-responsive'} src={logo.image} alt={'logo'}/>)
                  :
                  (<img className={'img-responsive'} src={logoImg} alt={'logo'}/>)
                }
                <div className={"divider hidden-xs"}></div>
                <div className={"headerTitle"} dangerouslySetInnerHTML={{__html: headerTitle}}/>
              </Link>

            </div>
            <button type="button" className={'navbar-toggler collapsed navBarToggle'} data-toggle="collapse"
                    data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className={'sr-only'}>Toggle navigation</span>
              <span className={'icon-bar'}></span>
              <span className={'icon-bar'}></span>
              <span className={'icon-bar'}></span>
            </button>

            {isSearchEnabled ? (
              <div className={'searchWrapper hidden-xs navBarUL'}>
                <Search collapse indices={searchIndices}/>
              </div>
            ) : null}

            <div  id="navbarNav" className={'navbar-collapse collapse navBarCollapse'}>
              {/*<div className={'visible-xs'}>*/}
              {/*  <Sidebar location={location}/>*/}
              {/*  <hr/>*/}
              {/*  {isSearchEnabled ? (*/}
              {/*    <div className={'searchWrapper navBarUL'}>*/}
              {/*      <Search collapse indices={searchIndices}/>*/}
              {/*    </div>*/}
              {/*  ) : null}*/}
              {/*</div>*/}
              <div className="collapse navbar-collapse justify-content-end" id="navbarNav">

                <ul className={"navbar-nav navBarUL navBarULRight d-flex align-items-center"}>
                  {headerLinks.map((link, key) => {
                    if (link.link !== '' && link.text !== '') {
                      return (
                        <li key={key} className={"mr-4"}>
                          <a href={link.link} target="_blank" dangerouslySetInnerHTML={{__html: link.text}}/>
                        </li>
                      );
                    }
                  })}
                  {helpUrl !== '' ?
                    (<li><a href={helpUrl}><img src={help} alt={'Help icon'}/></a></li>) : null
                  }
                  {(tweetText !== '' || githubUrl !== '') ?
                    (<li className={"divider hidden-xs"}></li>) : null
                  }
                  {tweetText !== '' ?
                    (<li>
                      <a href={'https://twitter.com/intent/tweet?&text=' + tweetText} target="_blank">
                        <img className={'shareIcon'} src={twitter} alt={'Twitter'}/>
                      </a>
                    </li>) : null
                  }
                  {githubUrl !== '' ?
                    (<li className={'githubBtn'}>
                      <GitHubButton href={githubUrl} data-show-count="true"
                                    aria-label="Star on GitHub">Star</GitHubButton>
                    </li>) : null}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
    }}
  />
);

export default Header;
