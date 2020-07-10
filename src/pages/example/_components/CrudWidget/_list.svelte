<script>
  import { url } from "@sveltech/routify";
  import { onMount } from "svelte";
  export let data, projects, tasks;

  let projectList = [],
    taskList = [],
    newTaskList = [];

  onMount(() => {

    
    projects.then(res => {
      let projects = res.data;
      projects.forEach(project => {
        let newObj = {};
        // console.log(`<<<<<<<<<<<<<<<< ${project.name} >>>>>>>>>>>>>>>>>`);
        for (let [key, val] of Object.entries(project)) {
          newObj[key] = val;
        }
        projectList = [...projectList, newObj];
      });
      console.log(
        `#################################################################### _list.svelte: `,
        projectList
      );
      return projectList;
    });
    tasks.then(res => {
      let tasks = res.data;
      tasks.forEach(project => {
        let newObj = {};
        // console.log(`<<<<<<<<<<<<<<<< ${project.name} >>>>>>>>>>>>>>>>>`);
        for (let [key, val] of Object.entries(project)) {
          newObj[key] = val;
        }
        taskList = [...taskList, newObj];
      });
      console.log(
        `#################################################################### _list.svelte: `,
        taskList
      );
      return taskList;
    });
  });
</script>

<style>
  .item {
    display: inline-block;
    width: 50%;
    height: 128px;
  }
</style>

<div class="items">

  {#each projectList as item}
    <a href={$url('../:id', { id: item.id })} class="item">
      {#each Object.entries(item) as [name, value]}
        {#if name === 'name' || name === 'id' || name === 'content' || name === 'created'}
          <div>
            <b>{name}:</b>
            {value}
          </div>
        {/if}
        {newTaskList = taskList.filter(task => task.project_id == item.id)}
        {#each taskList.filter(task => task.project_id == item.id) as task}
        {task.created}<br>
        {/each}
      {/each}
    </a>
  {/each}

</div>
