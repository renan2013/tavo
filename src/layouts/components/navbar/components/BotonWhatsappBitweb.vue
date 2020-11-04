<template>
  <div class="card-profile-actions py-4 mt-lg-0">
    <a
      href="https://api.whatsapp.com/send?phone=50683790449&text=Tengo%20inter%C3%A9s%20en%20el%20t%C3%A9cnico%20de:"
      class="whatsapp"
      target="_blank"
      ><div id="boton"><i class="fab fa-whatsapp fa-lg"></i></div
    ></a>

    <router-link to="/apps/chat/0" class="whatsapp2"
      ><div id="boton"><i class="far fa-comment-alt"></i></div
    ></router-link>
  </div>
</template>

<style>
.whatsapp {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: #25d366;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  font-size: 30px;
  z-index: 100;
}

.whatsapp2 {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 110px;
  background-color: red;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  font-size: 30px;
  z-index: 100;
}

#boton {
  color: white;
  margin-top: 9px;
}
</style>