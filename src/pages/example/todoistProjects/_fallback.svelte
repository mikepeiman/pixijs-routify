<script>
  import CrudWidget from "../_components/CrudWidget/Index.svelte";
  import { projects, tasks } from "../_data";

  let projectList = [],
    taskList = [];
  projects.then(res => {
    let data = res.data;
    data.forEach(item => {
      let newObj = {};
      for (let [key, val] of Object.entries(item)) {
        newObj[key] = val;
      }
      projectList = [...projectList, newObj];
    });
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

<CrudWidget data={projects} {projects} {tasks} name="Projects" />
<!-- <CrudWidget data={tasks} name="Tasks" /> -->
