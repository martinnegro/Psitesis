import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav/Nav";
import { useSelector, useDispatch } from "react-redux";
import { getArticleDetail, clearDetail } from "../../actions/index";
import { useParams, useHistory } from "react-router-dom";

const Art_Detail = () => {
    const { id } = useParams();

  const dispatch = useDispatch();
  const article = useSelector((state) => state.article);
  //const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getArticleDetail(id));
    return () => dispatch(clearDetail());
  }, [id, dispatch]);

    return ( <div>
            <Nav />

            </div> );
}
 
export default Art_Detail;