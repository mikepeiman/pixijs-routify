<script>
  import { leftover, goto } from "@sveltech/routify";
  import { onMount } from "svelte";
  import list from "./_list.svelte";
  import update from "./_update.svelte";
  import task_view from "./_task_view.svelte";
  import project_task_list from "./_project_task_list.svelte";
  import view from "./_view.svelte";
  export let data, name, projects, tasks;
  let id, action
  const components = { list, update, view, task_view, project_task_list };
  // $: console.log(`>>> leftover.split length is ${$leftover.split("/").length}`, $leftover.split("/"));

  $: arr = $leftover.split("/")
    $: console.log(`>>> leftover.split includes tasks: ${arr.includes("tasks")}, arr=${arr}, typeof=${typeof arr}`);
  $: {
    // arr = $leftover.split("/")
    if(arr.includes("tasks")){
      [id, action = "project_task_list"]
    } else if(arr.includes("task")){
          // id = arr[1]
          // console.log(`leftover array ${arr}, arr[1]=${arr[1]} id=${id}`)
          
      [id, action = "task_view"] 
    } else {
      component = list
    }
  }
  // $: [id, action = "project_task_list"] = $leftover.split("/");
  $: [id, action = "view"] = $leftover.split("/");
  console.log(`[id, action = "view"] = $leftover.split("/") ${[id, action = "view"] = $leftover.split("/")}`)
  // $: [id, action = "task_view"] = $leftover.split("/task/");

  $: component = (id && components[action]) || list;
</script>

<div>
  <div style="width: 512px; margin: auto;" class="card shadow">
    <h1 style="text-align: center; margin-top: -8px">{name}</h1>
    <svelte:component
      this={component}
      {data}
      projectsPromise={projects}
      tasksPromise={tasks}
      {id}
      {name} />
  </div>
</div>
