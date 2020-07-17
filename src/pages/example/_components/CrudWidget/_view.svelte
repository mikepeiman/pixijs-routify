<script>
  import { url } from "@sveltech/routify";
  import { onMount } from "svelte";
  let gun = Gun();
  export let projectsPromise = [],
    id;
  let item, itemDetails;
  $: itemDetails = [];

  projectsPromise.then(res => {
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
  gun.get("test").on(function(data, key) {
    console.log(
      `GUNDB *******************   view onMount, gun.get('test').on(())`
    );
    console.log(`key ${key}, data ${data.name}`);
    console.log(key, data);
    onMount(() => {});

  });
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
