<script>
  import { url } from "@sveltech/routify";
  export let tasksPromise = [],
    projectsPromise = [],
    id,
    name;

  let tasks = [],
    projectName;
  $: tasks = [];
  console.log("tasks_view");
  console.log(tasks);
  console.log(`project id: `, id)
  id = id.split("/tasks")[0]
  console.log(`project id: `, id)

  tasksPromise.then(res => {
    let data = res.data;
    console.log(`task_view tasks res.data `, data);
    // item = data.filter(item => item.id == id)[0];
    // console.log(`item now: `);
    // console.log(item);
    tasks = data.filter(task => task.project_id == id);
    console.log(`task_view tasks filtered `, tasks);
    // Object.keys(data).forEach(key => {
    //   let value = item[key];
    //   console.log(`Object.keys loop: key ${key} value ${value}`);
    //   itemDetails = [...itemDetails, [key, value]];
    // });

    // console.log(`itemDetails.length ${itemDetails.length}: `, itemDetails);
  });

  projectsPromise.then(res => {
    let data = res.data;
    console.log(`task_view projects res.data `, data);
    let project = data.filter(p => p.id == id);
    projectName = project[0].name
    console.log(`project: `, project)
    console.log(`projectName: `, projectName)
    console.log(`project `, project);
  });
</script>

<div>
  <h1>Project: {projectName} ID#{id}</h1>
  <div>
    {#each tasks as task}
      <div>{task.created}</div>
      <div>{task.content}</div>
      <br>
    {/each}
    <br />
    <a href={$url('../', { id })}>[Back]</a>
    <a href={$url('../:id/update', { id })}>[Update]</a>
  </div>
</div>
