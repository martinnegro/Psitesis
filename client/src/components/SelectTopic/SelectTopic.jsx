import { useSelector, useDispatch } from "react-redux";
import React, { Fragment, useEffect } from 'react';
import {getSubtopic} from '../../redux/actions/forumActions'

export default function SelectTopic() {
  const dispatch = useDispatch()
  const topics = useSelector((state) => state.forumReducer.subtopics);
    console.log('topics',topics)
    useEffect(() => {
		dispatch(getSubtopic())
	},[])
  return (
    <Fragment>
      {topics?.map((e) => (
        <optgroup key={e.topic_id} label={e.topic_name}>
          {e.subtopics?.map((s) => (
            <option key={s.sub_topic_id} value={`${e.topic_id}/${s.sub_topic_id}`}>
              {s.sub_topic_name}
            </option>
          ))}
        </optgroup>
      ))}
    </Fragment>
  );
}
