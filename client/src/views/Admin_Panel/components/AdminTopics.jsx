import React, { useEffect, useState } from "react";
import {
  createTopics,
  getAllTopicSubTopic,
} from "../../../redux/actions/actions";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Accordion from "@material-ui/core/Accordion";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ConfirmAlertDeleteSubCategory from "./ConfirmAlertDeleteSubCategory";
import ConfirmAlertDeleteCategory from "./ConfirmAlertDeleteCategory";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table2: {
    "@media (max-width: 601px)": {
      display: "block",
      overflowX: "auto",
    },
  },
}));

const CustomInputCell = ({ newTop, name, handleNewTop }) => {
  return (
    <TableCell align="left">
      <Input
        value={newTop[name]}
        name={name}
        onChange={(e) => handleNewTop(e)}
      />
    </TableCell>
  );
};

const CustomInputCellSub = ({ newSubTop, name, topic_id, handleNewSubTop }) => {
  return (
    <TableCell align="left">
      <Input
        value={newSubTop[topic_id][name]}
        name={name}
        onChange={(e) => handleNewSubTop(e, topic_id)}
      />
    </TableCell>
  );
};

const CustomTableCell = ({ topic, name, onChangeTopic }) => {
  return (
    <TableCell align="left">
      {topic.isEditMode ? (
        <Input
          value={topic[name]}
          name={name}
          onChange={(e) => onChangeTopic(e, topic)}
        />
      ) : (
        topic[name]
      )}
    </TableCell>
  );
};

const CustomTableCellSubTopic = ({ subTopic, name, onChangeSubTopic }) => {
  return (
    <TableCell align="left">
      {subTopic.isEditMode ? (
        <Input
          value={subTopic[name]}
          name={name}
          onChange={(e) => onChangeSubTopic(e, subTopic)}
        />
      ) : (
        subTopic[name]
      )}
    </TableCell>
  );
};

export default function AdminTopics() {
  const topics = useSelector((state) => state.rootReducer.top_subtop);
  const dispatch = useDispatch();
  const [rowsTopics, setRowsTopics] = useState([]);
  const [previous, setPrevious] = useState({});
  const [previousSub, setPreviousSub] = useState({});
  const classes = useStyles();

  useEffect(() => {
    dispatch(getAllTopicSubTopic());
  }, [dispatch]);
  console.log(topics);

    useEffect(() => {
      if (Object.keys(topics).length > 0) {
        setRowsTopics((state) => {
          const auxCreatingSub = [];
          const auxNewSubCat = [];
          //const [newSubCat, setNewSubCat] = useState({});
          const aux = topics.map((topic) => {
            auxCreatingSub[topic.topic_id] = false;
            auxNewSubCat[topic.topic_id] = {
              name: "",
              description: "",
            };
            return {
              name: topics.topic_name,
              id: topics.topic_id,
              isEditMode: false,
              subTopics: topics.subtopics
                .map((subTopic) => {
                  if (subTopic.topic_id === topic.topic_id) {
                    return {
                      id: subTopic.sub_topic_id,
                      name: subTopic.sub_topic_name,
                      cat_id: subTopic.topic_id,
                      description: subTopic.sub_topic_description,
                      isEditMode: false,
                    };
                  }
                  return undefined;
                })
                .filter((notUndefined) => notUndefined !== undefined),
            };
          });
          setIsCreatingSub(auxCreatingSub);
          setNewSubCat(auxNewSubCat);
          return aux;
        });
      }
    });
    const initialNewCat = {
      name: "",
    };
    const [isCreating, setIsCreating] = useState(false);
    const [isCreatingSub, setIsCreatingSub] = useState({});
    const [newCat, setNewCat] = useState(initialNewCat);
    const [newSubCat, setNewSubCat] = useState({});

  return <div></div>;
}
