<script>
  import { url } from "@sveltech/routify";
  export let data, id;
  let item, itemDetails = []
  // $: item
  console.log(`update.svelte: id ${id}, data `, data)
  data.then(res => {
    let data = res.data
      console.log(`update.svelte inside promise: id ${id}, data `, data)
     item = data.filter(item => item.id == id)[0];
     console.log('item   :   ', item)
     itemDetails = Object.entries(item)
  })

</script>

<div >
  <div >
    {#each itemDetails as [name, value]}
      <div>
        <b>{name}:</b>
        <input type="text" {value}>
      </div>
    {/each}
  </div>
  <br>
  <a href="{$url('../:id', {id})}">Back</a>
</div>
