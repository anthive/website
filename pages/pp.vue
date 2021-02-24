<template>
  <section>
    <div class="container">
      <h1 class="mb-8">Privacy Policy</h1>

      <p>Anthive org (hereinafter referred to as "We") through its online game AntHive.IO
      collects personal and non-personal information about you that you provide in your account
      in order to provide and improve its services, but never hands this information to any third parties.
      We maintain all reasonable safeguards to protect the security, integrity and privacy of the personal
      information we collect.</p>

      <p>While the security of your information is very important to us, and we take all
      reasonable precautions against possible breaches of our websites, no website or Internet
      transmission is completely secure. So, we cannot guarantee that unauthorized access, hacking,
      data loss, or other breaches will never occur. We urge you to take steps to keep your personal information
      safe by memorizing your password or keeping it in a safe place.</p>

      <p>We do not store our users' passwords in any way. We store only uids provided by Firebase Auth service.</p>

      <p>As most websites, we collect information automatically, and it is stored in the form
      of log files. This information includes such data as Internet Protocol (IP) addresses, browser type and
      language, operating system, website activity, the number of "hits" a webpage is getting, and other
      relevant information which may be later combined with your personal and non-personal information.</p>

      <p>We may use cookies, scripts,
      and other technologies to improve the use of our websites,
      products and services. You can disable or delete cookies or set your browser to
      alert you when cookies are being sent to your computer. We may use local storage to store content information
      and preferences of our users. We may collect certain "device-identifying data" about your personal computer or
      mobile device to create a digital identifier of your device in order to optimize our services for it.</p>
    </div>
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t('pp.meta.title'),
      meta: [
        {
          name: 'description',
          content: this.$t('pp.meta.title')
        }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  margin: 115px auto;
}
a {
  text-decoration: underline;
}
a:hover {
  text-decoration: none!important;
}
</style>
