<script>
  import { url } from "@sveltech/routify";
  export let data = [],
    id;
  let item,
    itemDetails = {};
  $: itemArr = [];
  console.log("_list");
  console.log(data);
  data.then(res => {
    console.log(res);
    item = res.data.filter(item => item.id == id)[0];
    console.log(`item now: `);
    console.log(item);
    Object.entries(item).forEach(entry => {
      let key = entry[0];
      itemDetails.key = key;

      let value = entry[1];
      itemDetails.value = value;

      itemArr = [...itemArr, [key, value]];

      console.log(
        `Object.entries key ${key}: value ${value}, itemArr `,
        itemArr
      );
    });
  });
  // $: item = data.filter(item => item.id == id)[0];
</script>

<div>
  <div>
    <!-- {#await itemArr} -->
      {#each itemArr as item}
        <div>
          <b>{item[0]}:</b>
          {item[1]}
        </div>
      {/each}
      <!-- {:then} -->

    <!-- {:then} -->

    <!-- {/await} -->
  </div>
  <br />
  <a href={$url('../', { id })}>[Back]</a>
  <a href={$url('../:id/update', { id })}>[Update]</a>
</div>
