<script>
  import { url } from "@sveltech/routify";
  export let tasksPromise, id;
  let item, itemDetails = []

  console.log(`_update_task.svelte: id ${id}`)
  tasksPromise.then(res => {
    let data = res.data
      console.log(`update.svelte inside promise: id ${id}, data `, data)
     item = data.filter(item => item.id == id)[0];
     console.log('item   :   ', item)
     itemDetails = Object.entries(item)
  })

</script>

<div >
<h2>Update Task</h2>
  <div >
    {#each itemDetails as [name, value]}
      <div>
        <b>{name}:</b>
        <input type="text" {value}>
      </div>
    {/each}
  </div>
  <br>
  <a href="{$url('../task/:id', {id})}">Back</a>
</div>
