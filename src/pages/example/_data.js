import axios from "axios";
let gun = Gun()
let items = gun.get('items')
// let authUrl = "https://todoist.com/oauth/authorize";
// let clientId = "?client_id=b27b589d42044a5ca44bffe94ffb1cfb";
// let scope = "&scope=data:read";
// let clientSecret = "&state=59d52f98e27f41528505670f1a51c9ce";
let authToken = "7031e994e56e51471f68692df9504e981c35c54a";
let todoistREST = "https://api.todoist.com/rest/v1";

let pid, projectList;

let todoistProjects = axios({
  method: "get",
  url: todoistREST + '/projects',
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
});

let todoistTasks = axios({
  method: "get",
  url: todoistREST + '/tasks',
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
});

function getProject(pid) {
  axios
    .get(todoistREST + `/projects/${pid}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((res) => {
      console.log(`getProject(${pid}) ${res.data}`);
      let data = res.data;
      for (let [key, val] of Object.entries(data)) {
        console.log(key, val);
      }
    });
}

projectList = [];

function getProjects() {
  todoistProjects.then((res) => {
    let data = res.data;
    data.forEach((item) => {
      let newObj = {};
      for (let [key, val] of Object.entries(item)) {
        newObj[key] = val;
      }
      projectList = [...projectList, newObj];
    });
    console.log(
      `#################################################################### new projects list: `,
      projectList
    );
    gun.get('test').put({name: "This is Mike's test"})
    return projectList;
  });
}

export const projects = todoistProjects;
export const tasks = todoistTasks;