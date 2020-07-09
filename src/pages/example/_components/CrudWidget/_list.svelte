<script>
  import { url } from "@sveltech/routify";
  import { onMount } from "svelte";
  import axios from "axios";
  export let data;

  let projectList = [],
    taskList = [];

  onMount(() => {
    data.then(res => {
      let projects = res.data;
      projects.forEach(item => {
        let newObj = {};
        // console.log(`<<<<<<<<<<<<<<<< ${item.name} >>>>>>>>>>>>>>>>>`);
        for (let [key, val] of Object.entries(item)) {
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
        {#if name === 'name' || name === 'id'}
          <div>
            <b>{name}:</b>
            {value}
          </div>
        {/if}
      {/each}
    </a>
  {/each}

</div>
