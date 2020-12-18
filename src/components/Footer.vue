<template>
  <footer>
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="50" preserveAspectRatio="none" viewBox="0 0 1920 75" pointer-events="none" xmlns:v="https://vecta.io/nano" class="ondas">
      <defs>
        <clipPath id="A">
          <path d="M0 0h1920v75H0z" fill="none"/></clipPath>
      </defs>
      <g clip-path="url(#A)">
        <path d="M1963,327H-105V65A2647.49,2647.49,0,0,1,431,19c217.7,3.5,239.6,30.8,470,36,297.3,6.7,367.5-36.2,642-28a2511.41,2511.41,0,0,1,420,48" fill="#5658DD"/>
      </g>
      <g clip-path="url(#A)" class="D">
        <path d="M-127 404h2090V44c-140.1-28-343.3-46.7-566 22-75.5 23.3-118.5 45.9-162 64-48.6 20.2-404.7 128-784 0-95.8-32.3-109.4-51.7-216-80C86.6 10.6-41.8 6.9-127 10" fill="#5658DD" opacity=".5"/>
      </g>
      <g clip-path="url(#A)" class="D">
        <path d="M1979,462-155,446V106C251.8,20.2,576.6,15.9,805,30c167.4,10.3,322.3,32.9,680,56,207,13.4,378,20.3,494,24" fill="#5658DD" opacity=".5"/>
      </g>
      <g clip-path="url(#A)" class="D">
        <path d="M1998,484H-243V100c445.8,26.8,794.2-4.1,1035-39,141-20.4,231.1-40.1,378-45,349.6-11.6,636.7,73.8,828,150" fill="#5658DD" opacity=".5"/>
      </g>
    </svg>


    <div class="bg-primary py-4">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <social />
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-6">
            <nav class="footer-nav">
              <ul class="list-inline mb-0">
                <li class="list-inline-item"><router-link :to="{ name: 'contact'}" class="text-white">Contactanos</router-link></li>
                <li class="list-inline-item"><router-link :to="{ name: 'about'}" class="text-white"> Nosotros</router-link></li>
                <li class="list-inline-item"><router-link :to="{ name: 'faq'}" class="text-white"> FAQ's</router-link></li>
                <li class="list-inline-item"><router-link :to="{ name: 'soport'}" class="text-white"> Soporte</router-link></li>
                <li class="list-inline-item"><router-link :to="{ name: 'premium'}" class="text-white"> premium</router-link></li>
              </ul>
            </nav>
          </div>
          <div class="col-12 col-sm-6 text-xs-center text-sm-right">
            <div class="footer-copyright text-white">© 2020 Punku </div>
          </div>
        </div>
      </div>
    </div>
    <ComponentsNotifications />
  </footer>
</template>

<script>
import Social from '../components/Social';
import ComponentsNotifications from '@/components/ComponentsNotifications';

export default {
  components: {
    ComponentsNotifications,
    Social
  }
}
</script>

<style scoped>
  .D { isolation:isolate }
</style>
