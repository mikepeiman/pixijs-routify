<script>
  import CrudWidget from "../_components/CrudWidget/Index.svelte";
  import { projects, tasks } from "../_data";

  let projectList = [],
    taskList = [];
  projects.then(res => {
    let data = res.data;
    data.forEach(item => {
      // console.log(`_fallback.js: getProjects() each item: `, item);
      let newObj = {};
      for (let [key, val] of Object.entries(item)) {
        newObj[key] = val;
      }
      projectList = [...projectList, newObj];
    });
    return projectList;
  });
</script>

<div style="text-align: center">
  <p>
    By using a _fallback.svelte in example/widget, we can grab the leftover URL
    and pass it to an embedded widget.
  </p>

  <p>Alternatively, the widget can grab the leftover URL itself.</p>
  <p>This allows for reusable navigatable components.</p>
</div>

<CrudWidget {projects} {tasks} />
<!-- <CrudWidget data={tasks} name="Tasks" /> -->
