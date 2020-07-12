<script>
  import { url, leftover } from "@sveltech/routify";
  export let tasksPromise = [],
    id;
  let item, itemDetails;
  $: itemDetails = [];
  $: id = $leftover.split("/")[1]
  tasksPromise.then(res => {
    let data = res.data;
    console.log(data);
    item = data.filter(item => item.id == id)[0];
    console.log(`item now: `);
    console.log(item);

    Object.keys(item).forEach(key => {
      let value = item[key];
      console.log(`Object.keys loop: key ${key} value ${value}`);
      itemDetails = [...itemDetails, [key, value]];
    });

    console.log(`itemDetails.length ${itemDetails.length}: `, itemDetails);
  });
  // console.log(`itemDetails.length ${itemDetails.length}: `, itemDetails);
  // $: item = data.filter(item => item.id == id)[0];
</script>

<div>
<h1>TASK VIEW! ID#{id}</h1>
  <div>
    {#each itemDetails as item}
      <div>
        <b>{item[0]}:</b>
        {item[1]}
      </div>
    {/each}
    <br />
    <a href={$url('../', { id })}>[Back]</a>
    <a href={$url('../task/:id/update', { id })}>[Update]</a>
  </div>
</div>
