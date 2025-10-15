<template>
  <!-- Hero -->
  <section class="py-5 bg-light border-bottom">
    <div class="container">
      <div class="row align-items-center g-4">
        <div class="col-lg-7">
          <h1 class="display-5 fw-semibold mb-3">
            Women's Health — a focused health portal
          </h1>
          <p class="lead text-muted mb-4">
            Find women’s health services, book appointments, and manage your preferences in
            <strong>My Health Hub</strong>.
          </p>
          <div class="d-flex flex-wrap gap-2">
            <RouterLink to="/care" class="btn btn-primary btn-lg">
              Find a provider
            </RouterLink>
            <RouterLink to="/hub" class="btn btn-outline-primary btn-lg">
              Open My Health Hub
            </RouterLink>
          </div>
          <p class="small text-muted mt-3">
            No install • Free to use • Email confirmations via Cloud Functions
          </p>
        </div>
        <div class="col-lg-5">
          <div class="ratio ratio-16x9 rounded-4 bg-white shadow-sm d-flex align-items-center justify-content-center">
            <div class="text-center p-3">
              <div class="fw-semibold mb-1">A lightweight portal for women’s health</div>
              <div class="text-muted small">Search • Book • Manage</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features -->
  <section class="py-5">
    <div class="container">
      <h2 class="h4 mb-4">What you can do</h2>
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h3 class="h5">Find Care</h3>
              <p class="text-muted">
                Filter by postcode and type (GP / OB-GYN / Mental / Physio). Advanced table with
                search, sort, and pagination.
              </p>
              <RouterLink to="/care" class="btn btn-outline-primary btn-sm">Browse providers</RouterLink>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h3 class="h5">Book & Email Confirmations</h3>
              <p class="text-muted">
                Submissions trigger Firebase Cloud Functions + SendGrid to send confirmation emails
                securely.
              </p>
              <RouterLink to="/care" class="btn btn-outline-primary btn-sm">Book now</RouterLink>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h3 class="h5">My Health Hub</h3>
              <p class="text-muted">
                Review and manage your preferences and appointments. Includes search, sort, and
                pagination.
              </p>
              <RouterLink to="/hub" class="btn btn-outline-primary btn-sm">Open Hub</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- How it works -->
  <section class="py-5 bg-light border-top border-bottom">
    <div class="container">
      <h2 class="h4 mb-4">How it works</h2>
      <div class="row g-4">
        <div class="col-md-4">
          <div class="p-3 bg-white rounded-3 h-100 shadow-sm">
            <div class="fw-semibold mb-1">1. Set preferences</div>
            <div class="text-muted small">Enter name, email, postcode, and appointment type in Find Care.</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-3 bg-white rounded-3 h-100 shadow-sm">
            <div class="fw-semibold mb-1">2. Choose and book</div>
            <div class="text-muted small">Filter providers in the interactive table and submit the booking form.</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-3 bg-white rounded-3 h-100 shadow-sm">
            <div class="fw-semibold mb-1">3. Confirm and manage</div>
            <div class="text-muted small">Receive email confirmation and manage records in My Health Hub.</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Call to action -->
  <section class="py-5">
    <div class="container text-center">
      <h2 class="h4 mb-3">Ready to start?</h2>
      <RouterLink to="/care" class="btn btn-primary btn-lg">Find nearby providers</RouterLink>
      <p class="small text-muted mt-3">
        Already set preferences? Go to <RouterLink to="/hub">My Health Hub</RouterLink>
      </p>
    </div>
  </section>
</template>

<script setup>
// no logic required here
</script>

<style scoped>
.card { border: none; }
</style>