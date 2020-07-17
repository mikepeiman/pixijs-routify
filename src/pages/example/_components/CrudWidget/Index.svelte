<script>
  import { leftover, goto } from "@sveltech/routify";
  import { onMount } from "svelte";
  import list from "./_list.svelte";
  import update from "./_update.svelte";
  import update_task from "./_update_task.svelte";
  import task_view from "./_task_view.svelte";
  import list_tasks from "./_project_task_list.svelte";
  import view from "./_view.svelte";
  export let data, name, projects, tasks;

  let gun = Gun();

  let id, action, component, arr;
  const components = { list, update, update_task, view, task_view, list_tasks };

  $: {
    arr = $leftover.split("/");
    console.log(`reactive leftovers arr ${arr}`);
    if (arr.includes("tasks")) {
      id = arr[0];
      action = "list_tasks";
      console.log(
        `we hit the tasks list route with id ${id} and action ${action}`
      );
    } else if (arr.includes("task") && !arr.includes("update")) {
      (id = arr[1]), (action = "task_view");
      console.log(
        `we hit the task view route with id ${id} and action ${action}`
      );
    } else if (arr.includes("task") && arr.includes("update")) {
      (id = arr[1]), (action = "update_task");
      console.log(
        `we hit the task update route with id ${id} and action ${action}`
      );
    } else {
      [id, action = "view"] = arr;
      console.log(
        `we hit the default view route with id ${id} and action ${action}`
      );
    }
  }

  $: component = (id && components[action]) || list;
  $: name = "";

  onMount(() => {});

  function testGun() {
    console.log(`testGun`);
    gun.get("test").on(function(data, key) {
      let rand = Math.random().toString();
      console.log(`name: ${name}, rand `, rand);
      console.log(`testGun within .on: `, data.name);
      console.log(`name: ${name}, rand `, rand);
    });

    gun.get('todoist-projects').on(function(data, key) {
      console.log(`gun.get('todoist-projects') key: ${key}, data: ${data}`, data)
    })
gun.get('todoist-projects').map().on(function(data, key) {
      console.log(`gun.get('todoist-projects') key: ${key}, data: ${data}`, data)
    })

    

        gun.get('todoist-projects').get('all').on(function(data, key) {
      console.log(`gun.get('todoist-projects').get('all') key: ${key}, data: ${data}`, data)
    })
  }

  function logChange() {
    gun.get("test").put({ name: name });

    console.log(`New name value: ${name}`);
  }
</script>

<div>
  <div style="width: 512px; margin: auto;" class="card shadow">
    <input bind:value={name} on:input={logChange} type="text" id="gundb" />
    <button on:click={testGun}>test GUNDB</button>
    <h1 style="text-align: center; margin-top: -8px">{action}</h1>
    <svelte:component
      this={component}
      {data}
      projectsPromise={projects}
      tasksPromise={tasks}
      {id}
      {name} />
  </div>
</div>
