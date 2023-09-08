let genericTask= {
  description: "Make a to-do app", 
  isDone: false  
};

let renderTask = (aTask, parentSelector) => {
    let $el = $('<h1 class="${aTask.isDone ? "strikethrough": ""}">${aTask.description}<h1>');
};