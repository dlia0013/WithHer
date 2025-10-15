<template>
  <section class="container py-5">
    <h1 class="h3 mb-4 text-center">About Us</h1>

    <div class="row justify-content-center">
      <div class="col-lg-8">
        <p class="lead">
          <strong>Women’s Health Portal</strong> is a digital platform designed to empower women
          to take control of their health journey — from learning about key wellness topics,
          to finding trusted healthcare providers and joining supportive communities.
        </p>

        <p>
          Our mission is to make women’s healthcare more <strong>accessible, personalised, and supportive</strong>.
          We believe that technology can bridge gaps in health literacy and connect individuals with
          the right care at the right time.
        </p>

        <h2 class="h5 mt-4">What We Offer</h2>
        <ul>
          <li><strong>Find Care:</strong> Discover nearby healthcare providers and book appointments easily.</li>
          <li><strong>Learn & Explore:</strong> Read evidence-based articles on women’s health and wellbeing.</li>
          <li><strong>Community & Support:</strong> Connect with peer networks and local support groups.</li>
          <li><strong>My Health Hub:</strong> Manage your preferences, view appointments, and access personalised tips.</li>
        </ul>

        <h2 class="h5 mt-4">Our Development Team</h2>
        <p>
          This application was collaboratively developed by a student team at <strong>Monash University</strong>,
          integrating front-end, back-end, and cloud technologies to create a modern web experience.
        </p>
        <ul>
          <li><strong>Leticia Liao</strong> — Front-End & Integration Developer</li>
          <li><strong>Duanchu Liao</strong> — UX/UI Design</li>
          <li><strong>Liao Duanchu</strong> — Visual Design & Research</li>
          <li><strong>Letty Liao</strong> — Back-End & Firebase Cloud Functions</li>
        </ul>

        <div class="alert alert-light border mt-4">
          <p class="mb-1"><strong>Disclaimer:</strong></p>
          <p class="mb-0">
            The Women’s Health Portal is an academic project intended for educational purposes only.
            It does not replace professional medical advice, diagnosis, or treatment.
          </p>
        </div>

        <div class="text-center mt-4">
          <router-link class="btn btn-primary" to="/care">Find Care Near You</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

</script>

<style scoped>
.lead {
  font-size: 1.15rem;
  line-height: 1.7;
}
ul {
  margin-left: 1.2rem;
}
li {
  margin-bottom: 0.5rem;
}
</style>