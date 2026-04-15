<template>
  <section class="container py-4">
    <h1 class="h3 mb-3">Community & Support</h1>

    <p class="text-muted mb-4">
      Connect with women’s health support groups, peer communities, and verified local networks.
    </p>

    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col" v-for="item in supports" :key="item.id">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text small mb-2">{{ item.desc }}</p>
            <a :href="item.link" target="_blank" class="btn btn-outline-primary btn-sm">
              Visit
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const supports = [
  {
    id: 1,
    name: 'Jean Hailes Foundation',
    desc: 'Evidence-based health information for women of all ages.',
    link: 'https://www.jeanhailes.org.au/',
  },
  {
    id: 2,
    name: 'Beyond Blue',
    desc: 'Mental health support, resources, and community forums.',
    link: 'https://www.beyondblue.org.au/',
  },
  {
    id: 3,
    name: 'Pink Hope',
    desc: 'Empowering women to manage their risk of breast and ovarian cancer.',
    link: 'https://pinkhope.org.au/',
  },
  {
    id: 4,
    name: 'Endometriosis Australia',
    desc: 'Raising awareness and supporting women living with endometriosis.',
    link: 'https://www.endometriosisaustralia.org/',
  },
]
</script>

<style scoped>
.card-title {
  font-weight: 600;
}
</style>