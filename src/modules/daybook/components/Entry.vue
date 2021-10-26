<template>
  <div
    class="entry-container mb-3 pointer p-2"
    @click="$router.push({ name: 'daybook-entry', params: { id: 10 } })"
  >
    <!-- Title -->
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">15</span>
      <span class="mx-1 fs-5">Julio</span>
      <span class="mx-2 fw-light">2021, jueves</span>
    </div>

    <div class="entry-description">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident velit
      quisquam laboriosam excepturi repudiandae, quae odio rem voluptatum harum
      vero ad! Aspernatur voluptatum quisquam blanditiis dolorum aut doloribus
      quidem similique!
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2s all ease-in-out;
  &:hover {
    background-color: lighten($color: grey, $amount: 45);
    transition: 0.2s all ease-in-out;
  }
  .entry-description {
    font-size: 12px;
  }
}
</style>
