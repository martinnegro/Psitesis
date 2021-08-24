const { v4: uuidv4 } = require("uuid");
const { management } = require("./src/auth/index");

async function createData() {
  const pdTags = [
    { tag_id: uuidv4(), tag_name: "Investigacion" },
    { tag_id: uuidv4(), tag_name: "Tesis" },
    { tag_id: uuidv4(), tag_name: "General" },
  ];

  const pdRoles = [
    { rol_id: 1, rol_name: "admin" },
    { rol_id: 2, rol_name: "colab" },
    { rol_id: 3, rol_name: "basic" },
  ];

  const pdCategories = [
    { cat_id: uuidv4(), cat_name: "Investigación" },
    { cat_id: uuidv4(), cat_name: "Normas APA" },
  ];

  const pdSubcategories = [
    {
      sub_cat_id: uuidv4(),
      sub_cat_name: "Metodología de la investigación",
      cat_id: pdCategories[0].cat_id,
    },
    {
      sub_cat_id: uuidv4(),
      sub_cat_name: "Elección de tema",
      cat_id: pdCategories[0].cat_id,
    },
    {
      sub_cat_id: uuidv4(),
      sub_cat_name: "Citado en el texto",
      cat_id: pdCategories[1].cat_id,
    },
    {
      sub_cat_id: uuidv4(),
      sub_cat_name: "Referencias bibliográficas",
      cat_id: pdCategories[1].cat_id,
    },
  ];

  const pdInst = [
    {
      inst_id: uuidv4(),
      inst_name: "Henry",
      inst_description: "Bootcamp",
    },
    {
      inst_id: uuidv4(),
      inst_name: "UBA",
      inst_description: "Universidad",
    },
  ];

  const users1 = await management.getUsersInRole({
    id: "rol_mALahPQjTe8Re7vf",
  });
  const users2 = await management.getUsersInRole({
    id: "rol_RXyaFjSO2qcD4KNG",
  });
  const users3 = await management.getUsersInRole({
    id: "rol_ZtYREJr7Fq2n211C",
  });
  const users4 = await management.getUsersInRole({
    id: "rol_r4BJVRTjRQyatGop",
  });

  users1.forEach( u => u.rol_id = "rol_mALahPQjTe8Re7vf" )
  users2.forEach( u => u.rol_id = "rol_RXyaFjSO2qcD4KNG" )
  users3.forEach( u => u.rol_id = "rol_ZtYREJr7Fq2n211C" )
  users4.forEach( u => u.rol_id = "rol_r4BJVRTjRQyatGop" )

  const preMap = [...users1, ...users2, ...users3, ...users4];

  const mappedusersA0 = preMap.map((u) => {
    return {
      user_id: uuidv4(),
      user_name: u.name,
      user_id_A0: u.user_id,
      user_email: u.email,
      user_img_profile: u.picture,
      user_rol_id: u.rol_id,
      biography: "",
    };
  });

  const pdArts = [
    {
      art_title: "Sobre Tesis",
      art_contents: "Contenido extenso",
      art_date: "05/10/2021",
      art_views: 0,
      art_abstract: "Abstract-1",
      art_id: uuidv4(),
      sub_cat_id: pdSubcategories[0].sub_cat_id,
      user_id: mappedusersA0[0].user_id,
      art_available: true
    },

    {
      art_title: "Sobre APA",
      art_contents: "Contenido Extenso",
      art_date: "17/01/1997",
      art_views: 0,
      art_abstract: "Abstract-2",
      art_id: uuidv4(),
      sub_cat_id: pdSubcategories[2].sub_cat_id,
      user_id: mappedusersA0[0].user_id,
      art_available: true
    },
    {
      art_title: "Sobre Proyectos",
      art_contents: "Contenido Extenso",
      art_date: "03/05/2020",
      art_views: 0,
      art_abstract: "Abstract-3",
      art_id: uuidv4(),
      sub_cat_id: pdSubcategories[3].sub_cat_id,
      user_id: mappedusersA0[1].user_id,
      art_available: true
    },
    {
      art_title: "Sobre Tesis 2",
      art_contents:
        '"<h2>Lorem Ipsum</h2><h4>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</h4><h5>"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."</h5><p><br></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut turpis id purus eleifend auctor eu vitae ex. Praesent non auctor ante. Suspendisse bibendum pretium bibendum. Morbi convallis tincidunt elit, a dictum velit scelerisque ac. Integer sed metus pulvinar, imperdiet ante at, rutrum magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce at purus ex. Duis ac pharetra dui. Suspendisse sit amet elit velit. Fusce vulputate pharetra fringilla.</p><p>Nulla congue mollis purus non ultricies. Sed ac accumsan orci. Praesent sagittis nisi eget dolor elementum, dignissim dapibus mi bibendum. Quisque pellentesque arcu vel lectus sagittis, eu tristique turpis rutrum. Curabitur in quam tincidunt, interdum nisi in, semper orci. Integer pulvinar commodo vulputate. Cras dapibus mattis est, id tincidunt lorem fringilla ac. Proin condimentum eros vitae purus ultrices, at faucibus dolor finibus. Suspendisse potenti. Nullam et varius lacus. Proin quis consequat dolor. In mattis augue in dictum suscipit. Suspendisse in eleifend erat, ac scelerisque nisi. Curabitur tincidunt lobortis volutpat. Phasellus id pellentesque risus, ut blandit magna. Phasellus fringilla ac urna vitae porta.</p><p>Cras fringilla enim enim, a tincidunt odio luctus luctus. Suspendisse rutrum, enim eget vulputate ullamcorper, ipsum mi tincidunt urna, eget accumsan nisl arcu at tellus. Nunc eget mauris elit. Suspendisse potenti. Quisque at turpis tincidunt, suscipit dolor vel, sagittis mi. Quisque porttitor neque a mi iaculis porta. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean quis luctus risus, ut iaculis enim.</p><p>Aenean non fermentum turpis, sed efficitur justo. Duis quis magna dapibus justo ultricies mattis a vitae metus. Quisque ex diam, tincidunt quis dignissim in, consequat nec tellus. Duis eu gravida quam, sit amet fringilla mi. Morbi viverra, odio in vestibulum pharetra, libero nisl eleifend neque, ac gravida ipsum nisl imperdiet lacus. Fusce bibendum eros facilisis, semper eros eu, hendrerit nisl. Nunc sed dolor venenatis, consequat ex ut, auctor sapien. Maecenas luctus magna turpis, vitae efficitur sem tincidunt ac.</p><p>Suspendisse potenti. Morbi ultricies venenatis lorem at vulputate. Pellentesque nec felis arcu. Pellentesque ante mauris, vestibulum eget sapien sed, suscipit vestibulum dolor. Nam suscipit est urna, non commodo enim porta sit amet. Mauris nec mattis erat. Praesent ullamcorper risus non urna dictum, vel pellentesque leo ultricies. Aenean sollicitudin euismod dui. Curabitur convallis at ante in pulvinar. Vivamus sit amet eros et neque pulvinar convallis. Vestibulum commodo pulvinar diam, in rutrum diam faucibus eget. Mauris et urna vel ipsum bibendum venenatis. Donec a volutpat erat. Phasellus id lectus ut orci venenatis fringilla a non purus. Aliquam ut bibendum tellus.</p>"',
      art_date: "03/05/2020",
      art_views: 0,
      art_abstract: "Una reseña atractiva",
      art_id: uuidv4(),
      sub_cat_id: pdSubcategories[0].sub_cat_id,
      user_id: mappedusersA0[1].user_id,
      art_available: true
    },
    {
      art_title: "Cómo citar",
      art_contents:
        '<h2>Lorem Ipsum</h2><h4>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</h4><h5>"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."</h5><p><br></p><p><br></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ullamcorper ultrices diam congue consequat. Aliquam erat volutpat. Nullam ac lorem sit amet quam maximus scelerisque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla dui leo, commodo sodales ullamcorper quis, imperdiet sed eros. Donec luctus consectetur purus accumsan lacinia. In sit amet placerat ex. Cras finibus diam nunc, quis lacinia libero dignissim vel. Donec vitae dolor arcu. Proin vel ipsum eros. Ut feugiat neque vel elementum posuere. Duis nisi orci, consequat sit amet mauris sed, suscipit pretium est.</p><p><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBWRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAAEsAAAAAQAAASwAAAAB/+0ALFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAPHAFaAAMbJUccAQAAAgAEAP/hDIFodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nIHg6eG1wdGs9J0ltYWdlOjpFeGlmVG9vbCAxMC4xMCc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp0aWZmPSdodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyc+CiAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICA8dGlmZjpYUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpYUmVzb2x1dGlvbj4KICA8dGlmZjpZUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpZUmVzb2x1dGlvbj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wTU09J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8nPgogIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnN0b2NrOjQ0MzhiZDgyLTlmMzQtNGU5MC1hMGRhLWZmN2JlOGI2MjkyMDwveG1wTU06RG9jdW1lbnRJRD4KICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjA4NzQzYTEwLWI2NTMtNDRlMC1iYTBjLTcyNDQyM2JkNjcwZjwveG1wTU06SW5zdGFuY2VJRD4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwAFAwQEBAMFBAQEBQUFBgcMCAcHBwcPCwsJDBEPEhIRDxERExYcFxMUGhURERghGBodHR8fHxMXIiQiHiQcHh8e/9sAQwEFBQUHBgcOCAgOHhQRFB4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4e/8AAEQgBaAFoAwEiAAIRAQMRAf/EABwAAQEBAAIDAQAAAAAAAAAAAAAIBwUGAQIDBP/EAEQQAQACAQIDBAYHBAcHBQAAAAABAgMEBQYHEQgSITE3QVFxc7MTFCIyYYGhQpGxshUjUmKC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"></p><p>In quis velit posuere metus finibus elementum a efficitur orci. Suspendisse fermentum turpis quis arcu rutrum, sit amet semper erat luctus. Nunc scelerisque vestibulum vestibulum. Nulla dictum, quam in pulvinar aliquet, lectus nulla ultricies magna, quis condimentum eros nibh a leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse sit amet sapien risus. Integer et sem elementum, maximus massa non, luctus purus.</p><p>Mauris et velit in tellus posuere pellentesque imperdiet in sapien. Etiam vulputate at risus at imperdiet. Sed eget lacus diam. Ut vel erat eu nunc placerat placerat. Curabitur nec orci venenatis lorem rhoncus pulvinar vel ac erat. Aenean non justo nec tortor rutrum congue et et sem. Mauris nec tristique tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent imperdiet efficitur massa. Fusce at ligula semper, tempor turpis ac, fringilla massa. Integer ut imperdiet dui, sed fringilla lacus. Phasellus pellentesque, sem et aliquam malesuada, orci erat lobortis nibh, sed laoreet tellus libero id nibh. Integer accumsan volutpat maximus. Quisque nec suscipit ligula, blandit bibendum leo. Nam tempor nibh quam, at sodales urna ultricies vitae. Quisque ut sem ullamcorper, imperdiet risus sit amet, tincidunt massa.</p> ',
      art_date: "03/05/2020",
      art_views: 0,
      art_abstract: "Es algo sobre citas",
      art_id: uuidv4(),
      sub_cat_id: pdSubcategories[0].sub_cat_id,
      user_id: mappedusersA0[1].user_id,
      art_available: true
    },
  ];

  const pdTopics = [
    {
      topic_id: uuidv4(),
      topic_name: "General",
    },
    {
      topic_id: uuidv4(),
      topic_name: "Investigación",
    },
    {
      topic_id: uuidv4(),
      topic_name: "Normas APA",
    },
  ];

  const pdSubtopic = [
    {
      sub_topic_id: uuidv4(),
      sub_topic_name: "Dudas Generales",
      sub_topic_description:
        "Todas las consultas que no entren en las otras secciones",
      topic_id: pdTopics[0].topic_id,
    },
    {
      sub_topic_id: uuidv4(),
      sub_topic_name: "Noticias",
      sub_topic_description:
        "Últimas novedades del campo académico en psicología",
      topic_id: pdTopics[0].topic_id,
    },
    {
      sub_topic_id: uuidv4(),
      sub_topic_name: "Elección de tema",
      sub_topic_description: "Cómo elegir y delimitar tu tema de tesis",
      topic_id: pdTopics[1].topic_id,
    },
  ];

  const pdPost = [
    {
      post_id: uuidv4(),
      post_contents: "",
      post_title: "Duda con el diseño experimental",
      post_date: "03/02/21",
      post_state: true,
      sub_topic_id: pdSubtopic[0].sub_topic_id,
      user_id: mappedusersA0[0].user_id,
      post_edited: false,
      post_open: true,
    },
    {
      post_id: uuidv4(),
      post_contents: "",
      post_title: "Ricón de vago como fuente",
      post_date: "03/02/21",
      post_state: true,
      sub_topic_id: pdSubtopic[0].sub_topic_id,
      user_id: mappedusersA0[1].user_id,
      post_edited: false,
      post_open: true,
    },
    {
      post_id: uuidv4(),
      post_contents: "",
      post_title: "Ayuda con mi proyecto de tesis",
      post_date: "03/02/21",
      post_state: true,
      sub_topic_id: pdSubtopic[0].sub_topic_id,
      user_id: mappedusersA0[2].user_id,
      post_edited: false,
      post_open: true,
    },
    {
      post_id: uuidv4(),
      post_contents: "",
      post_title: "Alguien investigando sobre Autismo?",
      post_date: "03/02/21",
      post_state: true,
      sub_topic_id: pdSubtopic[0].sub_topic_id,
      user_id: mappedusersA0[3].user_id,
      post_edited: false,
      post_open: true,
    },
    {
      post_id: uuidv4(),
      post_contents:
        "Hola a todos, estoy teniendo problemas para enfocar mi tesis. Trato de pensar temas pero mi tutor me dice que son inabarcables para los propositos de la tesis que piden en la facu. Quiero investigar sobre la depresión en situaciones de encierro como la del COVID 19 ¿Cómo podría recortarlo?",
      post_title: "Como recortar mi tema de tesis",
      post_date: "25/08/20",
      post_state: true,
      sub_topic_id: pdSubtopic[2].sub_topic_id,
      user_id: mappedusersA0[4].user_id,
      post_edited: false,
      post_open: true,
    },
    {
      post_id: uuidv4(),
      post_contents:
        "Encontre un artículo muy interesante que revisa la teoria freudiana comparandola con la teoria de la depresión de Beck, el problema es que está subida en elrincondelvago.com y queria saber si la podía usar igual ya que es muy interesante y no encontre otro lugar donde hablaran sobre el tema.",
      post_title: "Ricón de vago como fuente",
      post_date: "03/02/21",
      post_state: true,
      sub_topic_id: pdSubtopic[0].sub_topic_id,
      user_id: mappedusersA0[3].user_id,
      post_edited: false,
      post_open: true,
    },
  ];

  const oneCommentId = uuidv4();
  const pdComments = [
    {
      comment_id: oneCommentId,
      comment_contents:
        "Hola. Creo que no es una fuente valida, pero igualmente la podes usar como inspiración para buscar papers sobre el tema.",
      comment_date: "",
      comment_state: true,
      post_id: pdPost[5].post_id,
      user_id: mappedusersA0[2].user_id,
      deleted: false,
    },
    {
      comment_id: uuidv4(),
      comment_contents: "Respuesta 1",
      comment_date: "",
      comment_state: true,
      post_id: pdPost[5].post_id,
      user_id: mappedusersA0[0].user_id,
      response_to_comment_id: oneCommentId,
      deleted: false,
    },
    {
      comment_id: uuidv4(),
      comment_contents: "Respuesta 2",
      comment_date: "",
      comment_state: true,
      post_id: pdPost[5].post_id,
      user_id: mappedusersA0[2].user_id,
      response_to_comment_id: oneCommentId,
      deleted: false,
    },
    {
      comment_id: uuidv4(),
      comment_contents: "Comentario 2",
      comment_date: "",
      comment_state: true,
      post_id: pdPost[5].post_id,
      user_id: mappedusersA0[5].user_id,
      deleted: false,
    },
  ];

  return {
    pdArts,
    pdCategories,
    pdInst,
    pdRoles,
    pdSubcategories,
    pdTags,
    mappedusersA0,
    pdTopics,
    pdSubtopic,
    pdPost,
    pdComments,
  };
}

module.exports = { createData };
