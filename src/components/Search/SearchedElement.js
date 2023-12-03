import React, { useContext } from "react";
import { ProviderPass } from '../Provider'
import searchStyle from './Search.module.css'
import { Link } from "react-router-dom";

export default function SearchedElement({ data }) {
    const { setSearchStatus } = useContext(ProviderPass)

    return (
      <div className={searchStyle.SearchedItem}>
        <div className={searchStyle.SearchedItem_inner}>
          {data.map((item) => {
            const content = item.content.substring(0, 100);
            return (
              <Link
                onClick={()=>setSearchStatus(false)}
                key={item.noteId}
                to={`/pages/NotePage/${item.noteId}`}
                className={searchStyle.SearchedItem_element}
              >
                <p dangerouslySetInnerHTML={{ __html: content }} />
              </Link>
            );
          })}
        </div>
      </div>
    );
}
