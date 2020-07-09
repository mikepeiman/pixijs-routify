<script>
  import CrudWidget from "../_components/CrudWidget/Index.svelte";
  import { projects, tasks } from "../_data";
  console.log(`type of projects from _data: ${typeof projects}`);
  let projectList = [],
    taskList = [];
  projects.then(res => {
    // console.log(`test promise ${res.data}`);
    let data = res.data;
    data.forEach(item => {
      let newObj = {};
      // console.log(`<<<<<<<<<<<<<<<< ${item.name} >>>>>>>>>>>>>>>>>`);
      for (let [key, val] of Object.entries(item)) {
        newObj[key] = val;
        // console.log(`item key ${key}: value: ${val}`);
      }
      // console.log(`logging above newObj`)
      // console.dir(newObj)
      projectList = [...projectList, newObj];
    });
    console.log(
      `#################################################################### new projects list: `,
      projectList
    );
    return projectList;
  });

  // tasks.then(res => {
  //   // console.log(`test promise ${res.data}`);
  //   let data = res.data;
  //   data.forEach(item => {
  //     let newObj = {};
  //     // console.log(`<<<<<<<<<<<<<<<< ${item.name} >>>>>>>>>>>>>>>>>`);
  //     for (let [key, val] of Object.entries(item)) {
  //       newObj[key] = val;
  //       // console.log(`item key ${key}: value: ${val}`);
  //     }
  //     // console.log(`logging above newObj`)
  //     // console.dir(newObj)
  //     taskList = [...taskList, newObj];
  //   });
  //   console.log(
  //     `#################################################################### new tasks list: `,
  //     taskList
  //   );
  //   return taskList;
  // });
</script>

<div style="text-align: center">
  <p>
    By using a _fallback.svelte in example/widget, we can grab the leftover URL
    and pass it to an embedded widget.
  </p>

  <p>Alternatively, the widget can grab the leftover URL itself.</p>
  <p>This allows for reusable navigatable components.</p>
</div>

<CrudWidget data={projects} name="Projects" />
<CrudWidget data={tasks} name="Tasks" />
