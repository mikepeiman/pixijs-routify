<script>
  import { url } from "@sveltech/routify";
  export let data = [],
    id;
  let item, itemDetails;
  $: itemDetails = [];
  console.log("_list");
  console.log(data);
  data.then(res => {
    console.log(res);
    item = res.data.filter(item => item.id == id)[0];
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
  <div>
    {#each itemDetails as item}
      <div>
        <b>{item[0]}:</b>
        {item[1]}
      </div>
    {/each}
    <br />
    <a href={$url('../', { id })}>[Back]</a>
    <a href={$url('../:id/update', { id })}>[Update]</a>
  </div>
</div>
