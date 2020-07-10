<script>
  import { url } from "@sveltech/routify";
  export let id;
</script>

<div>
  <h1>TASKS!</h1>
  <div>
    <!-- {#each itemDetails as item}
      <div>
        <b>{item[0]}:</b>
        {item[1]}
      </div>
    {/each} -->
    <br />
    <a href={$url('../', { id })}>[Back]</a>
    <a href={$url('../:id/update', { id })}>[Update]</a>
  </div>
</div>
