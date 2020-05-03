import React from "react";
import '../styles/elements.scss'

export const Elements = (props) => {
    const {data: {owner: {avatar_url, login, html_url: author_url}, html_url, homepage, description, full_name, language, pushed_at, stargazers_count, stargazers_url}} = props;
    const kFormatter = num => {
        return Math.abs(num) > 999 ?
            Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' :
            Math.sign(num) * Math.abs(num)
    };
    return (
        <div className="element-wrapper">
            <div className="author-info">
                <a href={author_url} target="_blank" rel="noopener noreferrer">
                    <div>
                        <img loading="lazy" width={100} height={100} src={avatar_url} alt={login}/>
                    </div>
                    <p>{login}</p>
                </a>
            </div>
            <div className="repo-info">
                <p><a href={html_url} target="_blank" rel="noopener noreferrer">{full_name}</a></p>
                {homepage &&
                <p><b>Homepage:</b> <a href={homepage} target="_blank" rel="noopener noreferrer">{homepage}</a></p>
                }
                {description &&
                <p><b>Description:</b> {description.length > 300 ? `${description.substring(0, 300)}...` : description}
                </p>
                }
                {language &&
                <p><b>Language:</b> {language}</p>
                }
                <div className="bottom-info">
                    <a href={stargazers_url} target="_blank" rel="noopener noreferrer">
                        <svg aria-label="star" className="octicon octicon-star" viewBox="0 0 14 16"
                             version="1.1"
                             width="14" height="16" role="img">
                            <path fillRule="evenodd"
                                  d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"/>
                        </svg>
                        <b>{kFormatter(stargazers_count)}</b>
                    </a>
                    {pushed_at &&
                    <p className="last-update">Last update: {pushed_at.replace(/T/, ' ').slice(0, -1)}</p>
                    }
                </div>
            </div>

        </div>

    )
};