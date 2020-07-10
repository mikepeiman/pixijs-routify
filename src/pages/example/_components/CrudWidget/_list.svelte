<script>
  import { url } from "@sveltech/routify";
  import { onMount } from "svelte";
  export let projectsPromise, tasksPromise;

  let projectList = [],
    taskList = [],
    newTaskList = [],
    resultsMax = [1, 1, 1];

  function limitResults(arr, max) {
    let count = 0;
    return arr.filter(item => {
      if (count == max || arr.length < 1) {
        count++;
        return true;
      }
      return false;
    }, count);
  }

  function sortByCreated(arr) {
    return arr.sort((a, b) => (a > b ? -1 : a < b ? 1 : 0));
  }

  function filterByProject(list, pid) {
    return list.filter(task => task.project_id == pid);
  }
  onMount(async () => {
    await tasksPromise.then(res => {
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
      console.log("filtered: ");
      console.log(filterByProject(taskList, "377557134"));
      return taskList;
    });
    projectsPromise.then(res => {
      let projects = res.data;
      projects.forEach(project => {
        let newObj = {};
        // console.log(`<<<<<<<<<<<<<<<< ${project.name} >>>>>>>>>>>>>>>>>`);
        for (let [key, val] of Object.entries(project)) {
          newObj[key] = val;
          newObj.tasks = filterByProject(taskList, project.id);
        }
        projectList = [...projectList, newObj];
      });
      console.log(
        `#################################################################### _list.svelte: `,
        projectList
      );
      return projectList;
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

  {#each projectList as project}
    <a href={$url('../:pid', { pid: project.id })} class="project">
      {#each Object.entries(project) as [name, value]}
        {#if name === 'name' || name === 'id' || name === 'content' || name === 'created'}
          <div>
            <b>{name}:</b>
            {value}
            <br />

          </div>
        {/if}
      {/each}
    </a>

    {#each project.tasks.slice(0, 3) as task, i (task.id)}
      <a
        href={$url('../:pid/tasks/:tid', { pid: project.id, tid: task.id })}
        class="task">
        {task.created.slice(0, 10)}: {task.content.slice(0, 50)}...
      </a>
      <br />
    {/each}
    <a href={$url('../:pid/tasks/', { pid: project.id })} class="tasks">
      [All tasks...]
    </a>
    <br />
    <br>
  {/each}

</div>
