<script>
  import { leftover } from "@sveltech/routify";
  import list from "./_list.svelte";
  import update from "./_update.svelte";
  import task_view from "./_task_view.svelte";
    import view from "./_view.svelte";
  export let data, name, projects, tasks;
  const components = { list, update, view, task_view };

  $: [id, action = "view"] = $leftover.split("/");
    $: [id, action = "task_view"] = $leftover.split("/tasks/");
  $: component = (id && components[action]) || list;
</script>

<div>
  <div style="width: 512px; margin: auto;" class="card shadow">
    <h1 style="text-align: center; margin-top: -8px">{name}</h1>
    <svelte:component this={component} {data} {projects} {tasks} {id} />
  </div>
</div>
