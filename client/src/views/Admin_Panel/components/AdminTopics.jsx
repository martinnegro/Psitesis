import React, { useEffect, useState } from "react";
import {
  getAllTopicSubTopic,
  createNewTopic,
  setTopic,
  deleteTopic,
  createNewSubTopic,
  setSubTopic,
  deleteSubTopic
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
  const topics = useSelector((state) => state.rootReducer.topics);
  const dispatch = useDispatch();
  const [rowsTopics, setRowsTopics] = useState([]);
  const [previous, setPrevious] = useState({});
  const [previousSub, setPreviousSub] = useState({});
  const classes = useStyles();

  useEffect(() => {
    dispatch(getAllTopicSubTopic());
  }, []);
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
              name: topic.topic_name,
              id: topic.topic_id,
              isEditMode: false,
              subTopics: topic.subtopics
                .map((subTopic) => {
                  if (subTopic.topic_id === topic.topic_id) {
                    return {
                      id: subTopic.sub_topic_id,
                      name: subTopic.sub_topic_name,
                      topic_id: subTopic.topic_id,
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
          setNewSubTopic(auxNewSubCat);
          return aux;
        });
      }
    },[topics]);

    const onChangeTopic = (e, topic) => {
      if (!previous[topic.id])
        setPrevious((state) => ({ ...state, [topic.id]: topic }));
      const value = e.target.value;
      const name = e.target.name;
      const { id } = topic;
      const newRows = rowsTopics.map((topic) =>
        topic.id === id ? { ...topic, [name]: value } : topic
      );
      setRowsTopics(newRows);
    };
  
    const onUpdateTopic = async (id) => {
      const body = rowsTopics.find((topic) => topic.id === id);
      dispatch(setTopic(body));
      onToggleEditMode(id);
    };
  
    const onUpdateSubTopic = async (sub_topic_id, topic_id) => {
      const topic = rowsTopics.find((topic) => topic.id === topic_id);
      const subTopic = topic.subTopics.find(
        (subtopic) => subtopic.id === sub_topic_id
      );
       dispatch(setSubTopic(subTopic));
      onToggleEditModeSubTopic(topic_id, sub_topic_id);
    };
  
    const onToggleEditMode = (id) => {
      setRowsTopics(() => {
        return rowsTopics.map((category) =>
          category.id === id
            ? { ...category, isEditMode: !category.isEditMode }
            : category
        );
      });
    };
  
    const onToggleEditModeSubTopic = (id, idSub) => {
      setRowsTopics(() => {
        return rowsTopics.map((topic) =>
          topic.id === id
            ? {
                ...topic,
                subTopics: topic.subTopics.map((subTopics) =>
                  subTopics.id === idSub
                    ? { ...subTopics, isEditMode: !subTopics.isEditMode }
                    : subTopics
                ),
              }
            : topic
        );
      });
    };
  
    const onRevert = (id) => {
      const newRows = rowsTopics.map((row) =>
        row.id === id && previous[id]
          ? { ...previous[id], isEditMode: false }
          : { ...row, isEditMode: false }
      );
      setRowsTopics(newRows);
      setPrevious((state) => {
        delete state[id];
        return state;
      });
    };
  
    const onRevertSubTopics = (sub_topic_id, topic_id) => {
      const newRows = rowsTopics.map((topic) =>
        topic.id === topic_id
          ? {
              ...topic,
              subTopics: topic.subTopics.map((subTopic) =>
                subTopic.id === sub_topic_id && previousSub[sub_topic_id]
                  ? { ...previousSub[sub_topic_id], isEditMode: false }
                  : { ...subTopic, isEditMode: false }
              ),
            }
          : topic
      );
      setRowsTopics(newRows);
      setPreviousSub((state) => {
        delete state[sub_topic_id];
        return state;
      });
    };
  
    const [open, setOpen] = useState({});
  
    useEffect(() => {
      const newOpen = {};
      rowsTopics &&
        rowsTopics.forEach((r) => (newOpen[r.topic_id] = false));
      setOpen(newOpen);
    }, [rowsTopics]);
  
    const [openSub, setOpenSub] = useState({});
    const handleClickOpenSub = (id) => {
      setOpenSub({
        ...openSub,
        [id]: true,
      });
    };
    const handleCloseSub = (id) => {
      setOpenSub({
        ...openSub,
        [id]: false,
      });
    };
  
    const handleConfirmSub = async (id) => {
      setOpenSub(false);
       dispatch(deleteSubTopic(id));
    };
  
    const handleClickOpen = (id) => {
      setOpen({
        ...open,
        [id]: true,
      });
    };
  
    const handleClose = (id) => {
      setOpen({
        ...open,
        [id]: false,
      });
    };
  
    const handleConfirm = async (id) => {
      setOpen(false);
      dispatch(deleteTopic(id));
    };
    const initialNewTop = {
      name: "",
    };
    const [isCreating, setIsCreating] = useState(false);
    const [isCreatingSub, setIsCreatingSub] = useState({});
    const [newTopic, setNewTopic] = useState(initialNewTop);
    const [newSubTopic, setNewSubTopic] = useState({});


    const handleNewTopic = (e) => {
      setNewTopic({
        ...newTopic,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleNewSubTopic = (e, cat_id) => {
      setNewSubTopic({
        ...newSubTopic,
        [cat_id]: {
          ...newSubTopic[cat_id],
          [e.target.name]: e.target.value,
        },
      });
    };
  
    const cancelNewTopic = () => {
      setIsCreating(false);
      setNewTopic(initialNewTop);
    };
  
    const cancelNewSubTopic = (id) => {
      setIsCreatingSub({
        ...isCreatingSub,
        [id]: false,
      });
      setNewSubTopic({
        ...newSubTopic,
        [id]: {
          name: '',
          description: '',
        },
      });
    };
  
    const confirmNewTopic = async (newTopic) => {
      dispatch(createNewTopic(newTopic));
      setIsCreating(false);
      setNewTopic(initialNewTop);
    };
  
    const confirmNewSubTopic = async (id) => {		
      dispatch(createNewSubTopic({...newSubTopic[id], id: id}));
      setIsCreatingSub({
        ...isCreatingSub,
        [id]: false,
      });
      setNewSubTopic({
        ...newSubTopic,
        [id]: {
          name: '',
          description: '',
        },
      });
    };

    

    const onChangeSubTopic = (e, subTopic) => {
      if (!previousSub[subTopic.id])
        setPreviousSub((state) => ({ ...state, [subTopic.id]: subTopic }));
      const value = e.target.value;
      const name = e.target.name;
      const { id, topic_id } = subTopic;
      const newRows = rowsTopics.map((topic) =>
        topic.id === topic_id
          ? {
              ...topic,
              subTopics: topic.subTopics.map((subTopic) =>
                subTopic.id === id
                  ? { ...subTopic, [name]: value }
                  : subTopic
              ),
            }
          : topic
      );
      setRowsTopics(newRows);
    };
    const onRevertSubTopic = (sub_topic_id, topic_id) => {
      const newRows = rowsTopics.map((topic) =>
        topic.id === topic_id
          ? {
              ...topic,
              subTopics: topic.subTopics.map((subTopic) =>
                subTopic.id === sub_topic_id && previousSub[sub_topic_id]
                  ? { ...previousSub[sub_topic_id], isEditMode: false }
                  : { ...subTopic, isEditMode: false }
              ),
            }
          : topic
      );
      setRowsTopics(newRows);
      setPreviousSub((state) => {
        delete state[sub_topic_id];
        return state;
      });
    };
  return (<>

<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1bh-content"
					id="panel1bh-header"
				>
					Topics
				</AccordionSummary>
				<AccordionDetails>
					<Table size="small" width="100%" className={classes.table2}>
						<TableHead >
							<TableCell>Nombre</TableCell>
							<TableCell align="right">Editar</TableCell>
							<TableCell align="right">Eliminar</TableCell>
						</TableHead>
						<TableBody>
							{rowsTopics ? (
								rowsTopics.map((topic) => (
									<TableRow key={topic.id}>
										<CustomTableCell
											{...{ topic: topic, name: 'name', onChangeTopic }}
											component="th"
											scope="row"
										/>
										{topic.isEditMode ? (
											<TableCell align="right">
												<IconButton>
													<DoneIcon
														onClick={() => onUpdateTopic(topic.id)}
													/>
												</IconButton>
												<IconButton onClick={() => onRevert(topic.id)}>
													<CloseIcon />
												</IconButton>
											</TableCell>
										) : (
											<TableCell align="right">
												<IconButton
													onClick={() => onToggleEditMode(topic.id)}
												>
													<EditIcon color="action" />
												</IconButton>
											</TableCell>
										)}
										<TableCell align="right">
											<IconButton onClick={() => handleClickOpen(topic.id)}>
												<DeleteForeverIcon color="secondary" />
											</IconButton>
											<ConfirmAlertDeleteCategory
												open={open[topic.id]}
												handleClose={handleClose}
												handleConfirm={handleConfirm}
												name={topic.name}
												id={topic.id}
											/>
										</TableCell>
									</TableRow>
								))
							) : (
								<div>CARGANDO</div>
							)}
						</TableBody>
						{isCreating ? (
							<TableRow>
								<CustomInputCell {...{ newTop: newTopic, name: 'name', handleNewTop: handleNewTopic }} />
								<TableCell align="right">
									<IconButton onClick={() => confirmNewTopic(newTopic)}>
										<DoneIcon />
									</IconButton>
								</TableCell>
								<TableCell>
									<IconButton onClick={() => cancelNewTopic()}>
										<CloseIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						) : (
							<TableFooter align="center">
								<IconButton align="center" onClick={() => setIsCreating(true)}>
									<AddCircleOutlineIcon />
								</IconButton>
							</TableFooter>
						)}
					</Table>
				</AccordionDetails>
			</Accordion>
			{rowsTopics?.map((topic) => (
				<Accordion key={topic.id}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1bh-content"
						id="panel1bh-header"
					>
						Sub-Topics de {topic.name}
					</AccordionSummary>
					<AccordionDetails>
						<Table size="small" width="100%" className={classes.table2}>
							<TableHead>
								<TableCell>Nombre</TableCell>
								<TableCell>Descripción</TableCell>
								<TableCell align="right">Editar</TableCell>
								<TableCell align="right">Eliminar</TableCell>
							</TableHead>
							{topic.subTopics ? (
								topic.subTopics?.map((subTopic) => (
									<TableRow key={subTopic.id}>
										<CustomTableCellSubTopic
											{...{ subTopic, name: 'name', onChangeSubTopic}}
											component="th"
											scope="row"
										/>
										<CustomTableCellSubTopic
											{...{
												subTopic,
												name: 'description',
												onChangeSubTopic,
											}}
										/>
										{subTopic.isEditMode ? (
											<TableCell>
												<IconButton>
													<DoneIcon
														onClick={() =>
															onUpdateSubTopic(
																subTopic.id,
																subTopic.topic_id
															)
														}
													/>
												</IconButton>
												<IconButton
													onClick={() =>
														onRevertSubTopic(
															subTopic.id,
															subTopic.cat_id
														)
													}
												>
													<CloseIcon />
												</IconButton>
											</TableCell>
										) : (
											<TableCell align="right">
												<IconButton
													onClick={() =>
														onToggleEditModeSubTopic(
															topic.id,
															subTopic.id
														)
													}
												>
													<EditIcon color="action" />
												</IconButton>
											</TableCell>
										)}
										<TableCell align="right">
											<IconButton
												onClick={() => handleClickOpenSub(subTopic.id)}
											>
												<DeleteForeverIcon color="secondary" />
											</IconButton>
											<ConfirmAlertDeleteSubCategory
												open={openSub[subTopic.id]}
												handleClose={handleCloseSub}
												handleConfirm={handleConfirmSub}
												name={subTopic.name}
												id={subTopic.id}
											/>
										</TableCell>
									</TableRow>
								))
							) : (
								<div>CARGANDO</div>
							)}
							{isCreatingSub[topic.id] ? (
								<TableRow>
									<CustomInputCellSub
										{...{
											newSubTop: newSubTopic,
											name: 'name',
											topic_id: topic.id,
											handleNewSubTop: handleNewSubTopic,
										}}
									/>
									<CustomInputCellSub
										{...{
											newSubTop: newSubTopic,
											name: 'description',
											topic_id: topic.id,
											handleNewSubTop: handleNewSubTopic,
										}}
									/>
									<TableCell align="right">
										<IconButton onClick={() => confirmNewSubTopic(topic.id)}>
											<DoneIcon />
										</IconButton>
									</TableCell>
									<TableCell>
										<IconButton onClick={() => cancelNewSubTopic(topic.id)}>
											<CloseIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							) : (
								<TableFooter align="center">
									<IconButton
										align="center"
										onClick={() =>
											setIsCreatingSub({
												...isCreatingSub,
												[topic.id]: true,
											})
										}
									>
										<AddCircleOutlineIcon />
									</IconButton>
								</TableFooter>
							)}
						</Table>
					</AccordionDetails>
				</Accordion>
			))}
  </>);
}
