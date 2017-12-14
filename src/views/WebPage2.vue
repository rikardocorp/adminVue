<template>
  <div class="wrapper" ref="pageWraper" id="page-wraper" v-scroll="onScroll" v-resize="onResize">
    <div>
      <b-navbar fixed="top" toggleable="md" type="light" :variant="null" :class="{'navbar-prepare': prepare}">
        <div class="progress-line" v-if="isLoading"></div>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <!--<b-navbar-brand href="#">NavBar</b-navbar-brand>-->
        <b-navbar-brand href="/"><img src="static/img/logo2.png" alt="BV"></b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#" v-scroll-to="{ el: '#intro',container: '#page-wraper' }" right>Inicio</b-nav-item>

            <b-nav-item-dropdown text="Servicios" right>
              <b-dropdown-item href="#" v-scroll-to="{ el: '#blog',container: '#page-wraper' }">Seguros</b-dropdown-item>
              <b-dropdown-item href="#" v-scroll-to="{ el: '#features',container: '#page-wraper' }">Nuestros Servicios</b-dropdown-item>
              <b-dropdown-item href="#" v-scroll-to="{ el: '#service',container: '#page-wraper' }">Nuestro Cotizador</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item href="#" v-scroll-to="{ el: '#about',container: '#page-wraper' }" right>Nosotros</b-nav-item>
            <b-nav-item href="#" v-scroll-to="{ el: '#contact-us',container: '#page-wraper' }" >Contactanos</b-nav-item>
            <b-nav-item href="#" v-scroll-to="{ el: '#map',container: '#page-wraper' }" >Ubicanos</b-nav-item>

          </b-navbar-nav>

        </b-collapse>
      </b-navbar>

      <!-- Intro  Slider -->
      <section id="intro" class="intro black-bg">
        <carousel :perPage="1" :loop="true" :autoplay="true" :speed="500" :autoplayTimeout="3000">
          <slide>
            <parallax>
              <div class="slide slide--1"></div>
            </parallax>
          </slide>
          <slide>
            <div class="slide slide--2"></div>
          </slide>
          <slide>
            <div class="slide slide--3"></div>
          </slide>
        </carousel>
        <!--<agile :arrows="false" :speed="750" :timing="'linear'" :fade="true" :autoplay="false" :pauseOnHover="false" :pauseOnDotsHover="true">-->
          <!--<parallax :speedFactor="0.6">-->
            <!--<div class="slide slide&#45;&#45;1"></div>-->
          <!--</parallax>-->
          <!--<parallax :speedFactor="0.4">-->
            <!--<div class="slide slide&#45;&#45;2"></div>-->
          <!--</parallax>-->
          <!--<parallax :speedFactor="0.6">-->
            <!--<div class="slide slide&#45;&#45;3"></div>-->
          <!--</parallax>-->
        <!--</agile>-->
        <div class="mylogin container">
          <div class="row">
            <div class="col-xl-8 col-lg-7 col-md-1 d-none d-lg-block"></div>
            <div class="col-xl-4 col-lg-5 col-md-11 ">
              <div class="card text-dark light card-form">
                <transition name="fade" mode="out-in">
                  <div v-if="form==0" key="div1" class="card-body text-dark ">
                    <h3 class="text-center" style="color:#F58634;">Cotiza tu
                      <strong>SOAT Digital</strong> aqui</h3>
                    <p style="color:black;"></p>

                    <form id="login-form" role="form" autocomplete="off">
                      <label>Correo Electronico</label>
                      <div class="form-group input-group ">
                        <span class="input-group-addon ">
                          <i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i>
                        </span>
                        <input v-model="credentials.email" class="form-control" type="email" placeholder="Ingrese Correo Electronico" style="text-transform: none;">
                      </div>
                      <form-error :data="$v.credentials.email? $v.credentials.email : {} "></form-error>
                      <label>Contraseña</label>
                      <div class="form-group input-group ">
                        <span class="input-group-addon ">
                          <i class="fa fa-key fa-fw" aria-hidden="true"></i>
                        </span>
                        <input v-model="credentials.password" class="form-control" type="password" placeholder="Ingrese Contraseña" style="text-transform: none;">
                      </div>
                      <form-error :data="$v.credentials.password? $v.credentials.password : {} "></form-error>
                      <button :disabled="isLoading" @click.prevent="login" class="btn form-control" style="background-color:#F07B1D;color:white; margin-top:15px">
                        <i class="fa fa-sign-in fa-lg"></i> Iniciar Sesión
                      </button>
                      <hr class="separator">

                      <facebook-login ref="facebookLog" class="button"
                                      appId="1743259215715457"
                                      @login="onLogin"
                                      @logout="onLogout"
                                      @sdk-loaded="sdkLoaded">
                      </facebook-login>

                      <!--<googleLogin :params="googleSignInParams"></googleLogin>-->

                      <g-signin-button
                        :params="googleSignInParams"
                        @success="onSignInSuccess"
                        @error="onSignInError">
                        <div class="icoSocial">
                          <i class="fa fa-google" aria-hidden="true"></i>
                        </div>
                        Sign in with Google
                      </g-signin-button>

                      <!--     <div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with"
                      data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false" scope="public_profile,email"
                      onlogin="checkLoginState();" ></div>

                     <fb:login-button
                      scope="public_profile,email"
                      onlogin="checkLoginState();">
                    </fb:login-button>-->




                    </form>
                    <!--<form id="face-form" role="form" autocomplete="off"></form>-->
                    <!--<div class="form-group " style="margin-top:8%">-->
                      <!--<div class="form-group input-group fb-login-button" data-max-rows="1" data-size="large" data-button-type="login_with" data-show-faces="false"-->
                           <!--data-auto-logout-link="false" data-use-continue-as="true" scope="public_profile,email" onlogin="checkLoginState();"></div>-->
                    <!--</div>-->

                    <!--<div class="g-signin2" data-onsuccess="onSignIn"></div>-->

                    <!-- <button class="btn form-control " style="background:red;color: white;"><i class="fa fa-google-plus-square fa-lg"></i>Continuar con Google</button>
                    -->

                    <div class="form-group" style="margin-top:25px;">
                      <table style="width:100%">
                        <tr>
                          <td style="text-align:left; width:50%;font-size:10pt;">
                            <a style="color: #ef7b1f;text-decoration:underline" @click="form=2">Olvidaste tu contraseña</a>
                          </td>
                          <td style="text-align:right;width:50%;font-size:10pt;">
                            <a style="color: #ef7b1f;text-decoration:underline" @click="form=1">Registrate</a>
                            <!--<router-link style="color:#0088D6;text-decoration:underline" tag="a" to="/registrar">Registrate</router-link>-->
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div v-if="form==1" key="div2" class="card-body text-dark ">
                    <h3 class="text-center" style="color:#F58634;">Se parte de JMC
                      <strong>Registrate</strong> aqui</h3>
                    <p style="color:black;"></p>

                    <form id="register-form" role="form" autocomplete="off">
                      <label>Correo Electronico</label>
                      <div class="form-group input-group ">
                        <span class="input-group-addon ">
                          <i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i>
                        </span>
                        <input :disabled="isLoading" v-model="reg.email" class="form-control" type="email" placeholder="Ingrese Correo Electronico" style="text-transform: none;">
                      </div>
                      <form-error :data="$v.reg.email? $v.reg.email : {} "></form-error>

                      <label>Contraseña</label>
                      <div class="form-group input-group ">
                        <span class="input-group-addon ">
                          <i class="fa fa-key fa-fw" aria-hidden="true"></i>
                        </span>
                        <input :disabled="isLoading" v-model="reg.password" class="form-control" type="password" placeholder="Ingrese Contraseña" style="text-transform: none;"/>
                      </div>
                      <form-error :data="$v.reg.password? $v.reg.password : {} "></form-error>

                      <label>re-contraseña</label>
                      <div class="form-group input-group ">
                        <span class="input-group-addon ">
                          <i class="fa fa-key fa-fw" aria-hidden="true"></i>
                        </span>
                        <input :disabled="isLoading" v-model="reg.rePassword" class="form-control" type="password" placeholder="Repita la Contraseña" style="text-transform: none;"/>
                      </div>
                      <form-error :data="$v.reg.rePassword? $v.reg.rePassword : {} "></form-error>

                      <label>Numero Telefonico</label>
                      <div class="form-group input-group ">
                        <span class="input-group-addon ">
                          <i class="fa fa-phone fa-fw" aria-hidden="true"></i>
                        </span>
                        <input :disabled="isLoading" v-model="reg.phone" class="form-control" type="number" placeholder="Ingrese numero telefonico" style="text-transform: none;">
                      </div>
                      <form-error :data="$v.reg.phone? $v.reg.phone : {} "></form-error>

                      <button :disabled="isLoading" @click.prevent="register"  class="btn form-control" style="background-color:#F07B1D;color:white; margin-top:15px">
                        <i class="fa fa-sign-in fa-lg"></i> Registrarme
                      </button>
                      <hr style="border-color:#F58634;width:75%;margin-top:10px;">
                    </form>
                    <div class="form-group" style="margin-top:15px;">
                      <table style="width:100%">
                        <tr>
                          <td style="text-align:right;width:50%;font-size:10pt;">
                            <a style="color: #ef7b1f;text-decoration:underline" @click="form=0">Iniciar Sesion</a>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div v-if="form==2" key="div3" class="card-body text-dark ">
                    <h3 class="text-center" style="color:#F58634;">Recupera tu
                      <strong>Contraseña</strong> aqui</h3>
                    <p style="color:black;"></p>

                    <form id="recover-form" role="form" autocomplete="off">
                      <label>Correo Electronico</label>
                      <div class="form-group input-group ">
                        <span class="input-group-addon ">
                          <i class="fa fa-envelope-o fa-fw" aria-hidden="true"></i>
                        </span>
                        <input :disabled="isLoading" v-model="recover.email" class="form-control" type="email" placeholder="Ingrese Correo Electronico" style="text-transform: none;">
                      </div>
                      <form-error :data="$v.recover.email? $v.recover.email : {} "></form-error>

                      <button :disabled="isLoading" @click.prevent="recoverPass"  class="btn form-control" style="background-color:#F07B1D;color:white; margin-top:15px">
                        <i class="fa fa-sign-in fa-lg"></i> Recuperar
                      </button>
                      <hr style="border-color:#F58634;width:75%;margin-top:10px;">
                    </form>
                    <div class="form-group" style="margin-top:15px;">
                      <table style="width:100%">
                        <tr>
                          <td style="text-align:right;width:50%;font-size:10pt;">
                            <a style="color: #ef7b1f;text-decoration:underline" @click="form=0">Iniciar Sesion</a>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>

                </transition>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="blog" class="section-padding">
        <div class="container" style="min-height: 483px;">
          <h1 class="mb-80 text-center">SEGUROS</h1>
          <transition appear mode="out-in" name="flag1" enter-active-class="animated fadeInUp" leaveActiveClass="animated fadeOutDown">
            <div class="row" v-if="flag1">
              <div class="col-md-4 col-sm-6 mb-sm-30">
                <!-- Post -->
                <div class="blog-post">
                  <div class="post-media">
                    <img src="static/img/full/ima1.jpg" alt="blog" />
                  </div>
                  <div class="post-header text-center">
                    <h4 class="alt-title">
                      <a href="">Soat</a>
                    </h4>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-6 mb-sm-30">
                <!-- Post -->
                <div class="blog-post">
                  <div class="post-media">
                    <img src="static/img/full/ima3.jpg" alt="blog" />
                  </div>

                  <div class="post-header  text-center">
                    <h4 class="alt-title">
                      <a href="">Seguro Vehicular</a>
                    </h4>
                  </div>

                </div>
                <!-- End Post -->
              </div>
              <div class="col-md-4 col-sm-6 mb-sm-30">
                <!-- Post -->
                <div class="blog-post">
                  <div class="post-media">
                    <img src="static/img/full/ima2.jpg" alt="blog" />
                  </div>

                  <div class="post-header  text-center">
                    <h4 class="alt-title">
                      <a href="">Seguros Personales</a>
                    </h4>
                  </div>

                </div>
                <!-- End Post -->
              </div>
            </div>
          </transition>
        </div>
        <div class="container text-center ">
          <div class="row">
            <button class="accordion" @click="panel1=!panel1">
              <i class="fa fa-user"></i>
              <strong>Seguros Para Personas:</strong>
            </button>
            <div class="panel" style=" width: 100%; background: none" v-show="panel1">
              <div class="row">
                <div class="col-sm-6">
                  <h4 class="alt-title">Para ti y tu familia:</h4>
                  <table class="table table-sm table-hover table-striped text-left">
                    <tbody>
                    <tr>
                      <td>Vida</td>
                    </tr>
                    <tr>
                      <td>Oncológico</td>
                    </tr>
                    <tr>
                      <td>Accidentes Personales</td>
                    </tr>
                    <tr>
                      <td>Asistencia Médica</td>
                    </tr>
                    <tr>
                      <td>Fondo Universitario</td>
                    </tr>
                    <tr>
                      <td>Asistencia en Viajes</td>
                    </tr>
                    </tbody>
                  </table>
                </div>

                <div class="col-sm-6">
                  <h4 class="alt-title">Para tus bienes:</h4>
                  <table class="table table-sm table-hover table-striped text-left">
                    <tbody>
                    <tr>
                      <td>Seguro Vehicular</td>
                    </tr>
                    <tr>
                      <td>Domiciliario</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <button class="accordion" @click="panel2=!panel2">
              <i class="fa fa-building-o"></i>
              <strong>Seguros Para Empresas:</strong>
            </button>
            <div class="panel" style=" width: 100%; background: none" v-show="panel2">
              <div class="row">
                <div class="col-sm-6">
                  <h4 class="alt-title">Para tu Patrimonio:</h4>
                  <table class="table table-sm table-hover table-striped text-left">
                    <tbody>
                    <tr>
                      <td>Multi-riesgo</td>
                    </tr>
                    <tr>
                      <td>Transportes</td>
                    </tr>
                    <tr>
                      <td>Incendio</td>
                    </tr>
                    <tr>
                      <td>Seguro Vehicular</td>
                    </tr>
                    <tr>
                      <td>TREC - Todo Riesgo de Equipo Contratista</td>
                    </tr>
                    <tr>
                      <td>CAR - Todo Riesgo de Construcción</td>
                    </tr>
                    <tr>
                      <td>EAR - Todo Riesgo de Montaje</td>
                    </tr>
                    <tr>
                      <td>Equipo Electrónico</td>
                    </tr>
                    <tr>
                      <td>RC - Responsabilidad Civil</td>
                    </tr>
                    <tr>
                      <td>3D - Deshonestidad, Desaparición y Destrucción</td>
                    </tr>
                    <tr>
                      <td>Lucro Cesante</td>
                    </tr>
                    <tr>
                      <td>Agropecuario</td>
                    </tr>
                    </tbody>
                  </table>
                </div>

                <div class="col-sm-6">
                  <h4 class="alt-title">Riesgos humanos:</h4>
                  <table class="table table-sm table-hover table-striped text-left">

                    <tbody>
                    <tr>
                      <td>SCTR - Seguro Complementario de Trabajo de Riesgo</td>
                    </tr>
                    <tr>
                      <td>Vida Ley</td>
                    </tr>
                    <tr>
                      <td>EPS – Planes de Salud</td>
                    </tr>
                    <tr>
                      <td>Accidentes Personales</td>
                    </tr>
                    <tr>
                      <td>Vida Grupo</td>
                    </tr>
                    <tr>
                      <td>SOAT</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section id="features" class="section-padding gray-bg overlay-light">

        <div class="container">
          <div class="row">
            <div class="col-md-5 mb-sm-30">
              <h1 class="alt-title">Nuestros servicios</h1>
              <UL>
                <li>Análisis y gestión del riesgo con la finalidad de reducirlo elaborando así la mejor propuesta de seguros para
                  nuestros clientes con todas las compañías aseguradoras del mercado.</li>
                <li>Contamos con los mejores precios y condiciones del mercado en las diferentes compañías de seguro.</li>
                <li>Asesoría y representación oportuna en caso de siniestro.</li>
                <li>Atención personalizada.</li>
                <li>Personal altamente calificado con experiencia y trayectoria en seguros.</li>
              </UL>

            </div>
            <div class="col-md-7 text-right">
              <transition appear mode="out-in" name="flag2" enter-active-class="animated fadeInUp" leaveActiveClass="animated fadeOutDown">
                <img v-if="flag2" src="static/img/full/ima55.jpg" style="max-width: 580px; width: 100%;" alt="" />
              </transition>
            </div>

          </div>
        </div>
      </section>
      <!-- Testimonials Section -->
      <section id="testimonials" class="section-padding bg-image dark-bg pos-section overlay-dark pt-5 pb-5" data-stellar-background-ratio="0.4">
        <!-- page triangle shape -->
        <div class="page-triangle white-bg"></div>
        <!-- End page triangle shape -->
        <div class="container py-4">
          <!--<agile :arrows="false" :speed="750" :timing="'linear'" :fade="false" :autoplay="true" :pauseOnHover="true">-->
          <carousel :perPage="1" :loop="true" :autoplay="true"
                    :speed="500" :paginationEnabled="true"
                    :autoplayTimeout="5000">
            <slide>
              <div class="item pb-5">
                <div class="testimonial text-center max-width-700">
                  <div class="page-icon-sm">
                    <i class="icon-badge"></i>
                  </div>
                  <h2>¿Que dicen nuestros clientes?</h2>
                  <p class="lead-lg">Un servicio asombroso, me ayudaron y me asesoraron muy bien.</p>
                  <h6 class="quote-author alt-title">Carlos Arbieto
                    <span class="text-regular">Unsa</span>
                  </h6>
                </div>
              </div>
            </slide>
            <slide>
              <div class="item pb-5">
              <div class="testimonial text-center max-width-700">
                <div class="page-icon-sm">
                  <i class="icon-badge"></i>
                </div>
                <h2>¿Que dicen nuestros clientes?</h2>
                <p class="lead-lg">El personal que me atendio muy profesional y amable, lo recomiendo.</p>
                <h6 class="quote-author alt-title">Ricardo Coronado
                  <span class="text-regular">Universidad Catolica DeSanta Maria</span>
                </h6>
              </div>
            </div>
            </slide>
            <slide>
              <div class="item pb-5">
              <div class="testimonial text-center max-width-700">
                <div class="page-icon-sm">
                  <i class="icon-badge"></i>
                </div>
                <h2>¿Que dicen nuestros clientes?</h2>
                <p class="lead-lg">Tuve un accidente, los llame y me ayudaron mucho, estoy agradecido.</p>
                <h6 class="quote-author alt-title">Jhon Monroy
                  <span class="text-regular">Gobierno Regional</span>
                </h6>
              </div>
            </div>
            </slide>
          </carousel>
        </div>
      </section>
      <!-- Service Section -->
      <section id="service" class="section-padding bg-white">
        <div class="container text-center" style="min-height: 698px;">
          <h1 class="mb-60">Nuestro Cotizador</h1>
          <div class="row">
            <transition appear mode="out-in" name="flag3" enter-active-class="animated fadeInLeft" leaveActiveClass="animated fadeOutLeft">
              <div v-show="flag3" class="col-md-4 col-sm-6 pt-60 pt-sm-0 wow fadeInLeft">
              <div class="content-box alt-right">
                <div class="alt-icon-right">
                  <i class="icon-screen-desktop"></i>
                </div>
                <h4 class="alt-title">Amigable</h4>
                <p>Con una interfaz, amigable, es muy sencillo realizar la cotizacion de tu
                  <strong>Soat Digital</strong>
                </p>
              </div>
              <div class="content-box alt-right">
                <div class="alt-icon-right">
                  <i class="icon-refresh"></i>
                </div>
                <h4 class="alt-title">Diseño limpio</h4>
                <p>Limpio, rapido y simple, directo y sin demoras, tu Soat en 2 minutos </p>
              </div>
              <div class="content-box alt-right">
                <div class="alt-icon-right">
                  <i class="icon-settings"></i>
                </div>
                <h4 class="alt-title">Flexible & Configurable</h4>
                <p>Edita tu perfil, y agrega tus datos, para que puedas hacer tu renovación al instante.</p>
              </div>
              <div class="content-box alt-right">
                <div class="alt-icon-right">
                  <i class="icon-layers"></i>
                </div>
                <h4 class="alt-title">Minimas pantallas</h4>
                <p>Olvidate del papeleo, los documentos y las colas, compra tu Soat facil.</p>
              </div>
            </div>
            </transition>
            <!-- Image Mockup -->
            <transition appear mode="out-in" name="flag3-2" enter-active-class="animated fadeInUp" leaveActiveClass="animated fadeOutDown">
              <div v-show="flag3"  class="col-md-4 hidden-sm hidden-xs text-center wow fadeInUp">
              <img alt="" src="static/img/full/mockup.png" style="width: 100%; max-width: 320px;">
            </div>
            </transition>
            <!-- End Image Mockup -->
            <transition appear mode="out-in" name="flag3-3" enter-active-class="animated fadeInRight" leaveActiveClass="animated fadeOutRight">
              <div v-show="flag3"  class="col-md-4 col-sm-6 pt-60 pt-sm-0 wow fadeInRight">
              <div class="content-box alt-left">
                <div class="alt-icon-left">
                  <i class="icon-screen-tablet"></i>
                </div>
                <h4 class="alt-title">Seguro Vehicular</h4>
                <p>Podras comprar y recibir ayuda, para la compra de tus seguros vehiculares al instante </p>
              </div>
              <div class="content-box alt-left">
                <div class="alt-icon-left">
                  <i class="icon-tag"></i>
                </div>
                <h4 class="alt-title">Conectado con nuestros aliados</h4>
                <p>Nuestros aliados son las mejores Aseguradoras del Pais, brindote el mejor servicio</p>
              </div>
              <div class="content-box alt-left">
                <div class="alt-icon-left">
                  <i class="icon-book-open"></i>
                </div>
                <h4 class="alt-title">Soat Digital en PDF</h4>
                <p>Podras recibir y ver tu Soat en tu celular y en tu correo</p>
              </div>
              <div class="content-box alt-left">
                <div class="alt-icon-left">
                  <i class="icon-bubbles"></i>
                </div>
                <h4 class="alt-title">Dispuestos a ayudarte</h4>
                <p>Te ayudanos en lo que necesites de manera gratuita y en cualquier momento</p>
              </div>
            </div>
            </transition>

          </div>
        </div>
      </section>
      <!-- About Section -->
      <section id="about" class="section-padding gray-bg">

        <div class="container text-center mb-60 ">
          <h1>Nosotros</h1>
          <p class="lead-lg">Somos un equipo de profesionales altamente capacitados, contamos con más de 20 años de experiencia en el mercado.
            Te garantizamos la mejor opción de seguro hecho a tu medida o la de tu empresa.</p>
          <h1>¿Qué hacemos por ti?</h1>

          <UL class="text-left">
            <li>
              <p class="lead-lg">Conseguimos los mejores
                <strong>PRECIOS</strong> del mercado, ya no busques en todas las compañías de seguros.</p>
            </li>
            <li>
              <p class="lead-lg">
                <strong>VELOCIDAD</strong> en tus trámites, tu tiempo es lo más valioso, nosotros nos encargamos.</p>
            </li>
            <li>
              <p class="lead-lg">
                <strong>FACILIDAD</strong> de solicitar un seguro, deja las colas y otros trámites innecesarios, nosotros lo hacemos
                por ti.</p>
            </li>
            <li>
              <p class="lead-lg">En caso de un
                <strong>SINIESTRO</strong>, te asesoramos y brindamos un servicio personalizado,
                <strong>SOMOS TUS ALIADOS</strong> para que se cubran los daños que te puedan suceder.</p>
            </li>
          </UL>
          <p class="lead-lg">
            <i>
              <strong>Confía en nosotros, déjanos el trabajo difícil, mientras vives tranquilo y seguro.</strong>
            </i>
          </p>
        </div>

        <div class="container text-center">
          <div class="row">
            <div class="col-md-6 content-box mb-sm-85">
              <div class="alt-icon-top icon-gray">
                <i class="icon-direction"></i>
              </div>
              <h4 class="alt-title">Nuestra Misión</h4>
              <p>Garantizar un seguro rentable a nuestros clientes para la protección de su familia y negocios, brindando un servicio
                óptimo profesional y personalizado en la atención integral de su siniestro.</p>
            </div>
            <div class="col-md-6 content-box mb-sm-85">
              <div class="alt-icon-top icon-gray">
                <i class="icon-rocket"></i>
              </div>
              <h4 class="alt-title">Nuestra Visión</h4>
              <p>Ser la empresa de corretaje de seguros líder de la Macro Región Sur del País; con los más altos estándares de
                calidad, profesionalismo y ética.</p>
            </div>

          </div>
        </div>
      </section>
      <!-- Contact Infobar Section -->
      <section class="py-5 black-bg text-center dark-bg">
        <div class="container">
          <div class="row">
            <div class="col-md-4 col-sm-6 mb-sm-30">
              <div class="contact-info">
                <div class="alt-icon-top alt-icon-color">
                  <i class="icon-phone  color-primary"></i>
                </div>
                <p class="large">(054) 206188</p>
              </div>
            </div>
            <div class="col-md-4 col-sm-6 mb-sm-30">
              <div class="contact-info">
                <div class="alt-icon-top alt-icon-color">
                  <i class="icon-location-pin color-primary"></i>
                </div>
                <p class="large">
                  Pasaje Bustamante 201 Urb. Vallecito
                  <br> Cercado - Arequipa.
                </p>
              </div>
            </div>
            <div class="col-md-4 col-sm-6 mb-sm-30">
              <div class="contact-info">
                <div class="alt-icon-top alt-icon-color">
                  <i class="icon-envelope  color-primary"></i>
                </div>
                <p class="large">contacto@jmcintegral.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Contact Form Section -->
      <section id="contact-us" class="section-padding">
        <div class="container text-center">
          <h1>Contactanos</h1>
          <p class="lead-lg max-width-700 mb-60">Envianos un mensaje con tus dudas, te responderemos lo mas antes posible recuerda que puedes llamarnos al (054) 206188.</p>

          <!-- Contact form -->
          <div class="row">
            <div class="col-md-8 m-auto">
              <form id="contact" class="contact-form row" role="form">

                <div class="col-md-12 text-center">
                  <h5 class="successContent">
                    <i class="fa fa-check left" style="color: #5cb45d;"></i>Tu mensaje ha sido exitosamente enviado.
                  </h5>
                  <h5 class="errorContent" style="color: #e1534f;">
                    <i class="fa fa-exclamation-circle left"></i>Ha ocurrido un problema, en su mensaje, porfavor revise, si sus datos han sido escritos correctamente.
                  </h5>
                </div>

                <div class="col-md-6">
                  <div class="form-field-wrapper">
                    <input v-model="item.nombre" class="input-lg form-full input-fancy" style="text-transform:capitalize;" type="text" name="form-name"
                           placeholder="Tu nombre" title="Tu nombre" />
                    <form-error :data="$v.item.nombre? $v.item.nombre : {} "></form-error>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-field-wrapper">
                    <input v-model="item.email" class="input-lg form-full input-fancy" style="text-transform:none;" type="email" name="form-email"
                           placeholder="Email" title="Tu email"/>
                    <form-error :data="$v.item.email? $v.item.email : {} "></form-error>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-field-wrapper">
                    <input v-model="item.titulo" class="input-lg form-full input-fancy" style="text-transform:capitalize;" type="text" name="form-subject"
                           placeholder="Titulo" title="Titulo del mensaje" />
                    <form-error :data="$v.item.titulo? $v.item.titulo : {} "></form-error>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-field-wrapper">
                    <textarea v-model="item.mensaje" class="home-contact-txt-msg input-lg form-full input-fancy" style="text-transform:none;" rows="7"
                            name="message" placeholder="Tu mensaje" title="Tu mensaje"></textarea>
                    <form-error :data="$v.item.mensaje? $v.item.mensaje : {} "></form-error>

                  </div>
                </div>

                <div class="col-md-12">
                  <button class="btn-contact-submit btn btn-lg btn-primary" type="submit" @click.prevent="enviar">Enviar mensaje</button>
                </div>
              </form>
            </div>
          </div>
          <!-- End Contact form -->
        </div>
      </section>
      <!-- MAP -->
      <section id="map" class="map" style="position: relative">
        <div class="cover"></div>
        <gmap-map ref="map"
                 :center="center"
                 :zoom="16"
                 style="width: 100%; height: 450px">
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="false"
            @click="center=m.position"
          ></gmap-marker>
        </gmap-map>
      </section>
      <!-- BRAND -->
      <section id="social_section" class="section-padding bg-image dark-bg pos-section overlay-dark justify-content-center">
        <!-- page triangle shape -->
        <div class="page-triangle white-bg "></div>
        <!-- End page triangle shape -->
        <div class="container text-center ">
          <carousel :perPageCustom="[[480, 2],[768, 3],[1024, 4]]" :paginationEnabled="false" :loop="true" :autoplay="true">
            <slide>
              <img src="static/img/full/log1.png" alt="" />
            </slide>
            <slide>
              <img src="static/img/full/log2.png" alt="" />
            </slide>
            <slide>
              <img src="static/img/full/log3.png" alt="" />
            </slide>
            <slide>
              <img src="static/img/full/log4.png" alt="" />
            </slide>
            <slide>
              <img src="static/img/full/log5.png" alt="" />
            </slide>
            <slide>
              <img src="static/img/full/log6.png" alt="" />
            </slide>
            <slide>
              <img src="static/img/full/log7.png" alt="" />
            </slide>
          </carousel>
          <!--<agile :arrows="false" :speed="450" :timing="'linear'" :fade="false" :autoplay="true" :pauseOnHover="false" :dots="false">-->

            <!--<div class="item">-->
              <!--<div class="client-logo row">-->
                <!--<div class="col-4">-->
                  <!--<img src="static/img/full/log1.png" alt="" />-->
                <!--</div>-->
                <!--<div class="col-4">-->
                  <!--<img src="static/img/full/log2.png" alt="" />-->
                <!--</div>-->
                <!--<div class="col-4">-->
                  <!--<img src="static/img/full/log3.png" alt="" />-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->

            <!--<div class="item">-->
              <!--<div class="client-logo row">-->
                <!--<div class="col-3">-->
                  <!--<img src="static/img/full/log4.png" alt="" />-->
                <!--</div>-->
                <!--<div class="col-3">-->
                  <!--<img src="static/img/full/log5.png" alt="" />-->
                <!--</div>-->
                <!--<div class="col-3">-->
                  <!--<img src="static/img/full/log6.png" alt="" />-->
                <!--</div>-->
                <!--<div class="col-3">-->
                  <!--<img src="static/img/full/log7.png" alt="" />-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</agile>-->

        </div>
      </section>
      <!-- Footer Section -->
      <footer id="footer" class="footer gray-bg">
        <div class="container text-center">
          <ul class="social mb-60 wow fadeInUp" data-wow-duration="1.5s">
            <li>
              <a target="_blank" href="https://www.facebook.com/jmcintegral">
                <i class="fa fa-facebook"></i>
              </a>
            </li>

          </ul>
          <p class="copyright">
            <a class="copy-link scroll-top" href="#">&copy; Desarrollado por
              <b>DevAqp Group</b>
            </a>
            <br /> Todos los derechos reservados por <br>
            <a target="_blank" href="#">
              <b>JMC INTEGRAL S.A.C. ASESORES Y CORREDORES DE SEGUROS</b>
            </a>
          </p>
        </div>
      </footer>
    </div>
    <notifications group="foo"
                   position="top right"
                   animation-type="velocity"
                   :speed="500" :duration="3000" :max="5">
    </notifications>
    <!--<pre>{{google}}</pre>-->
  </div>
</template>

<script>
  import Parallax from 'vue-parallaxy'
  import FormError from '../components/FormError.vue'
  import {DATA_CONTACT as _data} from '../data/dataWeb'
  import { required, email, sameAs } from 'vuelidate/lib/validators'
  import facebookLogin from '../components/facebookLogin/facebook-login.vue'
  import { Carousel, Slide } from 'vue-carousel'
  import resize from 'vue-resize-directive'

  export default {
    name: 'WebPage',
    directives: {
      resize
    },
    components: {
      Parallax,
      FormError,
      facebookLogin,
      Carousel,
      Slide
    },
    data () {
      return {
        google: '',
        // Facebook
        FB: undefined,
        isConnected: false,
        dataFb: {
          name: '',
          email: '',
          personalID: '',
          token: ''
        },
        dataG: {
          name: '',
          email: '',
          personalID: '',
          token: ''
        },

        // Google
        googleSignInParams: {
//           client_id: '833712505628-imprrpljbf80th9nsek1q4hmcp2gqjll.apps.googleusercontent.com'
          client_id: '54563486287-d3ccvubvf768a4p1hgubvs1h3ktv2jo2.apps.googleusercontent.com' // JMC Integral
        },
        center: {lat: -16.404388, lng: -71.543704},
        markers: [{
          position: {lat: -16.404357, lng: -71.543634}
        }],
        item: JSON.parse(JSON.stringify(_data.post)),
        form: 0,

        reg: {
          email: '',
          password: '',
          rePassword: '',
          phone: ''
        },
        credentials: {
          email: '',
          password: ''
        },
        recover: {
          email: ''
        },

        prepare: false,
        fixed: false,
        flag1: false,
        flag2: false,
        flag3: false,
        isMobile: false,
        panel1: false,
        panel2: false,
        parallaxPosition: '',

        option: {
          container: '#page-wraper',
          duration: 500,
          easing: 'ease',
          offset: 0,
          cancelable: true,
          onDone: false,
          onCancel: false,
          x: false,
          y: true
        }
      }
    },
    validations () {
      let vdata = {
        item: _data.validate.item,
        reg: {
          email: {
            required,
            email
          },
          password: {
            required
          },
          rePassword: {
            required,
            sameAsPassword: sameAs('password')
          },
          phone: {
            required
          }
        },
        credentials: {
          email: {
            required,
            //email
          },
          password: {
            required
          }
        },
        recover: {
          email: {
            required,
            email
          }
        }
      }
      return vdata
    },
    computed: {
      isLoading () {
        return this.$store.state.isLoading
      },
      notification () {
        return this.$store.state.notification
      },
      scrollTop () {
        return document.getElementById('myBody').scrollTop
      }
    },
    methods: {
      // Google
      onSignInSuccess (googleUser) {
        this.google = googleUser
        const profile = googleUser.getBasicProfile()
        this.dataG.personalID = googleUser.El
        this.dataG.email = profile.U3
        this.dataG.name = profile.ig
        this.dataG.token = googleUser.Zi.access_token
        this.xloginGoogle('google')

        console.log('Google')
        console.log(this.dataG)
        console.log(profile)
        console.log(googleUser)
      },
      onSignInError (error) {
        console.log('OH NOES', error)
      },
      // Facebook
      getUserData () {
        this.FB.api('/me', 'GET', { fields: 'id,name,email' },
          userInformation => {
            console.log(userInformation)
            this.dataFb.personalID = userInformation.id
            this.dataFb.email = userInformation.email
            this.dataFb.name = userInformation.name
            this.dataFb.token = this.FB.getAuthResponse()['accessToken']
            this.xlogin('facebook')
          }
        )
      },
      sdkLoaded (payload) {
        this.isConnected = payload.isConnected
        this.FB = payload.FB
        if (this.isConnected) {
          this.getUserData()
        }
        if (this.$store.state.Login.logOut) {
          this.$store.commit('switchLoading', true)
          this.$refs.facebookLog.logout()
          this.$store.commit('setLogOut', false)
        }
      },
      onLogin () {
        this.$store.commit('switchLoading', true)
        this.isConnected = true
        this.getUserData()
      },
      onLogout (response) {
        this.$store.commit('switchLoading', false)
        console.log('LOGOUT FACEBOOK')
        console.log(response)
        this.isConnected = false
        this.dataFb = {
          name: '',
          email: '',
          personalID: '',
          token: ''
        }
      },
      async xlogin (provider) {
        let data = {
          email: this.dataFb.email,
          provider: provider,
          token: this.dataFb.token
        }
        let self = await this.$store.dispatch('xlogin', data)
        if (!self.status) {
          this.$refs.facebookLog.logout()
        }
      },
      async xloginGoogle (provider) {
        let data = {
          email: this.dataG.email,
          provider: provider,
          token: this.dataG.token
        }
        let self = await this.$store.dispatch('xlogin', data)
        if (!self.status) {
        }
      },
      async login () {
        let invalid = this.$v.credentials.$invalid
        if (!invalid) {
          let credentials = {
            email: this.credentials.email,
            password: this.credentials.password
          }
          console.log(this.credentials)
          this.$store.dispatch('login', {credentials})
        } else {
          this.$v.credentials.$touch()
        }
      },
      async recoverPass () {
        let invalid = this.$v.recover.$invalid
        if (!invalid) {
          let self = await this.$store.dispatch('recoverPassword', this.recover)
          if (self.status) {
            this.resetForm('recover-form')
            this.form = 0
          }
        } else {
          this.$v.recover.$touch()
        }
      },
      async register () {
        let invalid = this.$v.reg.$invalid
        if (!invalid) {
          let self = await this.$store.dispatch('register', this.reg)
          if (self.status) {
            this.resetForm('register-form')
            this.form = 0
            // this.$store.commit('sendNotification', {status: false, message: 'No cuenta con polizas asignadas'})
          }
          console.log(self)
        } else {
          this.$v.reg.$touch()
        }
      },
      async enviar () {
        let invalid = this.$v.item.$invalid
        if (!invalid) {
          let self = await this.$store.dispatch('contactanos', this.item)
          if (self.status) {
            this.resetForm('contact')
          }
          console.log(self)
        } else {
          this.$v.item.$touch()
        }
        console.log(this.item)
      },
      onScroll: function (e, position) {
        let posTop = position.scrollTop
        this.prepare = posTop > 150
        this.fixed = posTop > 1

        if (!this.isMobile) {
          if (posTop >= 350) {
            this.flag1 = true
          } else {
            this.flag1 = false
          }

          if (posTop >= 1050) {
            this.flag2 = true
          } else {
            this.flag2 = false
          }

          if (posTop >= 2100) {
            this.flag3 = true
          } else {
            this.flag3 = false
          }
        } else {
          this.flag1 = true
          this.flag2 = true
          this.flag3 = true
        }
      },
      onResize: function (a) {
        let screen = a.offsetWidth
        if (screen <= 767) {
//          alert('isMobile')
          this.isMobile = true
          this.flag1 = true
          this.flag2 = true
          this.flag3 = true
        } else {
//          alert('isNotMobile')
          this.isMobile = false
        }
      },
      resetForm (formId) {
        document.getElementById(formId).reset()
        this.$v.item.$reset()
      }
    },
    watch: {
      notification (newVal, oldVal) {
        console.log('NOTIFICATION')
        console.log(newVal)
        console.log(oldVal)
        let type = ''
        let content = newVal.content.data
        if (content.success === true) {
          type = 'success'
        } else if (content.success === false) {
          type = 'error'
        } else if (content.success === null) {
          type = 'warn'
        }

        this.$notify({
          group: 'foo',
          title: 'Mensaje Importante',
          text: content.message,
          type: type
        })
      }
    },
    mounted () {
      let screen = this.$refs.pageWraper.offsetWidth
      if (screen <= 767) {
        this.isMobile = true
        this.flag1 = true
        this.flag2 = true
        this.flag3 = true
      } else {
        this.isMobile = false
      }
    }
  }
</script>

<style lang="scss" scoped="">
  body{
    max-height: 100vh;
    background-color: #fff;
    overflow: hidden;

    /*.post-media{*/
      /*border-radius: 3em;*/
    /*}*/

    .g-signin-button {
      background: #e04931;
      border-radius: 0.5em;
      margin-top: 0.3em;
      text-align: center;
      position: relative;
      padding: 5px;
      border: none;
      line-height: 34px;
      font-size: 1em;
      color: #FFF;
      width: 100%;
      .icoSocial{
        display: inline;
        font-size: 1.5em;
        position: relative;
        margin-right: 40px;
        i {
          position: absolute;
          top: 5px;
          font-size: 1em;
        }
      }
    }

    .separator{
      border: 1px solid #f07b1e;
      width: 98%;
      margin-top: 10px !important;
      margin-bottom: 10px !important;
    }

    #page-wraper {
      height: 100vh;
      overflow: scroll;
      #intro{
        .Masthead{
          height: 100vh !important;
        }
      }

      .card{
        box-shadow: 4px 9px 15px -5px rgba(0, 0, 0, 0.66);
      }
      label {
        margin-bottom: 2px;
      }
      .form-group {
        margin-bottom: 7px;
      }
      .form-error-vue {
        margin-top: -5px;
      }
      .mylogin .card-body{
        padding-bottom: 0;
      }
      .mylogin a {
        cursor: pointer;
      }
      ul li a.menu-has-sub:hover ~ ul.sub-dropdown{ display: block; }
      ul.sub-dropdown:hover { display: block; }
      ul.sub-dropdown{
        top: 60px !important;
      }
      ul li {
        cursor: pointer;
      }

      footer a {
        color: #000000;
      }
    }
    #page-wraper {
      /* css */
      .page-content {
        margin-bottom: 60px;
      }

      p {
        font-size: 14px;
        color: #626262;
        line-height: 1.6;
        font-weight: 400;
        margin-bottom: 15px;
        margin-top: 0px;
      }

      p.small {
        font-size: 12px;
      }

      p.large {
        font-size: 16px;
      }

      p.lead {
        font-size: 18px;
        font-weight: 300;
      }

      p.lead-lg {
        font-size: 20px;
        font-weight: 300;
        margin-bottom: 20px;
      }

      p.white, p.small.white, p.large.white, p.lead.white, p .white, .white {
        color: #ffffff;
      }

      p.dark, p.small.dark, p.large.dark, p.lead.dark, p .dark, .dark {
        color: #626262;
      }

      p.color p.small.color, p.large.color, p.lead.color, p .color, .color {
        color: #17a697;
      }

      .yellow {
        color: #f4efb7;
      }

      .section-padding {
        padding-top: 120px;
        padding-bottom: 120px;
      }

      .section-padding-t {
        padding-top: 120px;
      }

      .section-padding-b {
        padding-bottom: 120px;
      }

      .black-bg {
        background-color: #222;
      }
      .gray-bg {
        background-color: #f6f6f6;
      }
      .white-bg {
        background-color: #FFF;
      }
      .color-bg {
        background-color: #17a697;
      }
      .yellow-bg {
        background-color: #f4efb7;
      }
      .bg-cover-section, .small-bg-cover-section {
        background-size: cover;
        background-position: top center;
      }
      .dark-bg h1, .dark-bg h2, .dark-bg h3, .dark-bg h4, .dark-bg h5, .dark-bg h6,
      .dark-bg p, .dark-bg p.small, .dark-bg p.large, .dark-bg p.lead, .dark-bg p.lead-lg,
      .dark-bg .page-icon, .dark-bg .page-icon-sm,
      .dark-bg ul, .dark-bg ol, .dark-bg li,
      .dark-bg .alt-icon-top, .dark-bg .alt-icon-left, .dark-bg .alt-icon-right,
      .dark-bg .counter-icon,
      .dark-bg .skill-bar-percent {
        color: #fff;
      }

      .bg-image {
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        display: block;
        overflow: hidden;
        position: absolute;
        width: 100%;
        /*background-attachment: fixed;*/
      }

      .bg-fixed {
        background-attachment: fixed;
      }
      div.mylogin{
        position: absolute;
        top: 0;
        width: 90%;
        right: 5%
      }
      .card-form{
        padding:15px;
      }
      .card{
        margin-top:150px;
      }
      .home-inner{
        padding-top:150px;
      }
      #intro .bg-image,#intro .card-form,#intro .card, #intro .fa, #intro.bg-image, #inner-intro .bg-image, #inner-intro.bg-image {
        background-attachment: relative;

      }

      .slide-bg-image {
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        display: auto;
        overflow: hidden;
        position: relative;
        width: 100%;
      }

      /* Style the buttons that are used to open and close the accordion panel */
      button.accordion {
        background-color: #eee;
        color: #444;
        cursor: pointer;
        display:block;
        padding: 18px;
        width: 100%;
        text-align: center;
        border: none;
        outline: none;
        transition: 0.4s;
      }

      /* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
      button.accordion.active, button.accordion:hover {
        background-color: #ccc;
      }

      /* Style the accordion panel. Note: hidden by default */
      div.panel {
        padding: 0 18px;
        background-color: white;
      }
      .overlay-dark, .overlay-dark20, .overlay-dark30, .overlay-dark40, .overlay-dark60, .overlay-dark80, .overlay-dark90, .overlay-light, .overlay-light80 {
        position: relative;
        z-index: 1;
      }

      .overlay-dark:before, .overlay-dark20:before, .overlay-dark30:before, .overlay-dark40:before, .overlay-dark60:before, .overlay-dark80:before, .overlay-dark90:before, .overlay-light:before, .overlay-light80:before {
        left: 0;
        top: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        content: "";
        z-index: -1;
      }

      .overlay-dark:before {
        background-color: rgba(34,34,34,0.85);
      }

      .overlay-dark20:before {
        background-color: rgba(34,34,34,0.2);
      }

      .overlay-dark30:before {
        background-color: rgba(34,34,34,0.3);
      }

      .overlay-dark40:before {
        background-color: rgba(34,34,34,0.4);
      }

      .overlay-dark60:before {
        background-color: rgba(34,34,34,0.6);
      }

      .overlay-dark80:before {
        background-color: rgba(34,34,34,0.8);
      }

      .overlay-dark90:before {
        background-color: rgba(34,34,34,0.9);
      }


      .overlay-light:before {
        background-color: rgba(255,255,255,0.4);
      }

      .overlay-light80:before {
        background-color: rgba(255,255,255,0.8);
      }

      .page-triangle {
        /*margin-bottom: 20px;*/
      }

      .page-triangle::before {
        background-color: inherit;
        top: -100px;
      }

      .page-triangle::before {
        content: "";
        height: 100px;
        left: 50%;
        pointer-events: none;
        position: absolute;
        transform: translateX(-50%) rotate(45deg);
        -moz-transform: translateX(-50%) rotate(45deg);
        -ms-transform: translateX(-50%) rotate(45deg);
        -o-transform: translateX(-50%) rotate(45deg);
        -webkit-transform: translateX(-50%) rotate(45deg);
        width: 100px;
        z-index: 39;
      }

      .page-icon {
        color: #333;
        font-size: 50px;
        line-height: 50px;
        padding-bottom: 15px;
        width: 100%;
      }

      .page-icon-sm {
        color: #333;
        font-size: 30px;
        margin-bottom: 15px;
        color: #fff;
      }

      .play-icon-lg, .play-icon-md {
        border: 4px solid #fff;
        border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        display: block;
        color: #fff;
        text-align: center;
        background: none;
      }

      .pos-section {
        position: relative;
        overflow: hidden;
      }

      .play-icon-lg {
        font-size: 36px;
        height: 95px;
        line-height: 89px;
        margin: auto;
        width: 95px;
      }

      .play-icon-md {
        font-size: 28px;
        height: 75px;
        line-height: 67px;
        margin: auto;
        width: 75px;
      }

      .play-icon-lg i, .play-icon-md i {
        margin-left: 8px;
      }

      img {
        border: 0px none;
        outline: 0px none;
      }

      i.left, .i-left {
        margin-right: 6px;
      }

      i.right, .i-right {
        margin-left: 6px;
      }

      hr {
        border-top: 1px solid #eee !important;
        margin-bottom: 0;
        margin-top: 0;
        color: transparent;
      }

      .video {
        max-width: 100%;
        height: auto;
      }

      .rows {
        margin-left: -15px;
        margin-right: -15px;
      }

      embed,
      object {
        max-width: 100%;
      }

      /* Font Style */

      p, .nav-menu {
        font-family: 'Open Sans', sans-serif;
      }

      h1, h2, h3, h4, h5, h6,
      .btn, button,
      .link, .link-dark, link-color,
      button, input, textarea, select,
      .portfolio-filter,
      p.lead-lg, .lead-lg,
      .overlay-menu-nav,
      .accordion .accordion-title, .toggle .toggle-title {
        /*font-family: 'Work Sans', sans-serif;*/
        font-family: 'Ubuntu', sans-serif;
      }
      h1, h2, h3, h4, h5, h6 {
        color: #222;
        font-weight: 300;
        margin-top: 0px;
        line-height: 1.5;
        margin-bottom: 15px;
      }

      h1 {
        font-size: 44px;
      }

      h2 {
        font-size: 32px;
      }

      h3 {
        font-size: 26px;
      }

      h4 {
        font-size: 22px;
      }

      h5 {
        font-size: 18px;
      }

      h6 {
        font-size: 16px;
      }

      h1.white, h2.white, h3.white, h4.white, h5.white, h6.white, h6 .white {
        color: #fff;
      }

      h1.color, h2.color, h3.color, h4.color, h5.color, h6.color, h6 .color {
        color: #17a697;
      }

      /* Alternate Hadding */
      .alt-title {
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 1px;
      }

      h1.alt-title {
        font-size: 22px;
        margin-bottom: 25px;
      }

      h2.alt-title {
        font-size: 20px;
      }

      h3.alt-title {
        font-size: 18px;
      }

      h4.alt-title {
        font-size: 16px;
      }

      h5.alt-title {
        font-size: 14px;
      }

      h6.alt-title {
        font-size: 12px;
      }

      /*Site Title*/

      .page-title {
        margin-bottom: 60px;
      }

      .page-title2 {
        margin-bottom: 30px;
      }

      .content-title {
        margin-bottom: 25px;
      }

      .features-title {
        margin-bottom: 15px;
      }
      /*------------------------------------------------------------------*/
      /* Form Style */
      /*------------------------------------------------------------------*/
      /*form {*/
        /*position: relative;*/
      /*}*/

      /*button {*/
        /*outline: none;*/
      /*}*/

      /*button, html input[type="button"], input[type="reset"], input[type="submit"] {*/
        /*!*cursor: pointer;*!*/
        /*!*display: inline-block;*!*/
      /*}*/

      /*button, input, textarea, select {*/
        /*font-size: 12px;*/
      /*}*/

      input, input[type="text"], input[type="email"], input[type="tel"], input[type="number"], input[type="password"], input[type="radio"], input[type="checkbox"], textarea, select {
        appearance: none;
        -webkit-appearance: none;
        border: 1px solid rgba(0, 0, 0, 0.10);
        background: #fff;
        -webkit-border-radius: 0px !important;
        -moz-border-radius: 0px !important;
        border-radius: 0px !important;
        color: #000;
        outline: none;
        font-weight: 500;
        font-size: 12px;
        padding-left: 15px;
        padding-right: 15px;
        transition: all 0.2s cubic-bezier(0, 0, 0.58, 1) 0s;
        -moz-transition: all 0.2s cubic-bezier(0, 0, 0.58, 1) 0s;
        -webkit-transition: all 0.2s cubic-bezier(0, 0, 0.58, 1) 0s;
        -o-transition: all 0.2s cubic-bezier(0, 0, 0.58, 1) 0s;
        display: inline-block;
        text-transform: uppercase;
        line-height: 1;
        vertical-align: middle;
      }

      input[type="text"]:hover, input[type="email"]:hover, input[type="tel"]:hover, input[type="number"]:hover, input[type="radio"]:hover, input[type="checkbox"]:hover, input[type="password"]:hover, textarea:hover, select:hover {
        border: 1px solid rgba(0, 0, 0, 0.2);
      }

      input[type="text"]:focus, input[type="email"]:focus, input[type="tel"]:focus, input[type="number"]:focus, input[type="radio"]:focus, input[type="checkbox"]:focus, input[type="password"]:focus, textarea:focus {
        border: 1px solid rgba(0, 0, 0, 0.7);
        color: #333;
      }

      input.input-sm, .input-sm {
        padding-top: 11px;
        padding-bottom: 11px;
      }

      input.input-md, .input-md {
        padding-top: 13px;
        padding-bottom: 13px;
      }

      input.input-lg, .input-lg {
        padding-top: 15px;
        padding-bottom: 15px;
      }

      input.input-xlg, .input-xlg {
        padding-top: 17px;
        padding-bottom: 17px;
      }

      textarea {
        height: 120px;
        font-size: 13px !important;
      }

      label {
        color: #333;
        font-size: 12px;
        margin-bottom: 10px;
        padding-right: 3px;
        /*font-weight: 600;*/
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-top: 6px;
        font-family: 'Raleway', sans-serif;
      }

      .input-fancy {
        border-top: none !important;
        border-left: none !important;
        border-right: none !important;
      }

      .form-full {
        width: 100%;
      }

      .form-full-height {
        height: 100%;
      }

      .form-field-wrapper {
        margin-bottom: 20px;
        position: relative;
      }

      form .error {
        border-color: #e1534f;
      }

      form label.error {
        margin-bottom: 0px;
        margin-top: 3px;
        color: #e1534f;
        font-size: 12px;
        font-weight: 400;
      }

      .successContent, .errorContent {
        margin-bottom: 20px;
        display: none;
        text-transform: none;
        letter-spacing: 1px;
      }

      .newsletter-input {
        max-width: 280px;
      }

      @media (max-width: 767px) {
        /*extra small medium*/
        .navbar-brand {
          img {
            width: 100px !important;
          }
        }

        .mylogin{
          max-width: none;
          .row .card{
            padding: 0;
            margin-top: 80px;
          }
          .card-form{
            background: rgba(255, 255, 255, 0.92);
            .card-body{
              h3{
                font-size: 22px;
                line-height: 1.2em;
              }
              > div {
                margin-top: 15px !important;
              }
            }
          }
        }

        /*padding*/
        .section-padding {
          padding-top: 70px;
          padding-bottom: 60px;
        }

        .section-padding-t {
          padding-top: 70px;
        }

        .section-padding-b {
          padding-bottom: 70px;
        }

        /*margrin*/
        .container-margin {
          margin-top: 70px;
          margin-bottom: 70px;
        }

        .container-margin-t {
          margin-top: 70px;
        }

        .container-margin-b {
          margin-bottom: 70px;
        }

        .float-xs-left {
          float: left !important;
          text-align: left;
        }

        .float-xs-right {
          float: right !important;
          text-align: right;
        }

        .p-xs-0 {
          padding: 0px;
        }

        .ptb-xs-0 {
          padding-top: 0px;
          padding-bottom: 0px;
        }

        .plt-xs-0 {
          padding-left: 0px;
          padding-right: 0px;
        }

        .pt-xs-0 {
          padding-top: 0px;
        }

        .pb-xs-0 {
          padding-bottom: 0px;
        }


        .mtb-xs-30 {
          margin-top: 30px;
          margin-bottom: 30px;
        }

        .mlt-xs-30 {
          margin-left: 30px;
          margin-right: 30px;
        }

        .mt-xs-30 {
          margin-top: 30px;
        }

        .mb-xs-30 {
          margin-bottom: 30px;
        }

        /* 0 */
        .mtb-xs-0 {
          margin-top: 0px;
          margin-bottom: 0px;
        }

        .mlt-xs-0 {
          margin-left: 0px;
          margin-right: 0px;
        }

        .mt-xs-0 {
          margin-top: 0px;
        }

        .mb-xs-0 {
          margin-bottom: 0px;
        }
      }

      @media (max-width: 991px) {
        .p-sm-0 {
          padding: 0px;
        }

        .ptb-sm-0 {
          padding-top: 0px;
          padding-bottom: 0px;
        }

        .plt-sm-0 {
          padding-left: 0px;
          padding-right: 0px;
        }

        .pt-sm-0 {
          padding-top: 0px;
        }

        .pb-sm-0 {
          padding-bottom: 0px;
        }


        /* 45 */
        .mtb-sm-45 {
          margin-top: 45px;
          margin-bottom: 45px;
        }

        .mlt-sm-45 {
          margin-left: 45px;
          margin-right: 45px;
        }

        .mt-sm-45 {
          margin-top: 45px;
        }

        .mb-sm-45 {
          margin-bottom: 45px;
        }

        /* 30 */
        .mtb-sm-30 {
          margin-top: 30px;
          margin-bottom: 30px;
        }

        .mlt-sm-30 {
          margin-left: 30px;
          margin-right: 30px;
        }

        .mt-sm-30 {
          margin-top: 30px;
        }

        .mb-sm-30 {
          margin-bottom: 30px;
        }

        /* 0 */
        .mtb-sm-0 {
          margin-top: 0px;
          margin-bottom: 0px;
        }

        .mlt-sm-0 {
          margin-left: 0px;
          margin-right: 0px;
        }

        .mt-sm-0 {
          margin-top: 0px;
        }

        .mb-sm-0 {
          margin-bottom: 0px;
        }
      }


      /*------------------------------------------------------------------*/
      /* Intro */
      /*------------------------------------------------------------------*/

      #intro {
        position: relative;
      }

      .intro-media-wraper {
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }

      .client-logo {
        height: 90px;
        text-align: center;
      }

      .client-logo img {
        height: 100%;
      }

      /*==========================================================================================================*/
      /* FOOTER     ||---------------------------- */
      /*==========================================================================================================*/

      .footer {
        padding-top: 120px;
        padding-bottom: 120px;
      }

      /*------------------------------------------------------------------*/
      /* Social */
      /*------------------------------------------------------------------*/
      .footer .social {
        list-style: outside none none;
        padding: 0;
      }

      .footer .social li {
        display: inline-block;
        list-style: outside none none;
        margin: 0 8px;
      }

      .footer .social li a {
        border: 1px solid #222;
        display: block;
        font-size: 14px;
        height: 30px;
        line-height: 28px;
        text-align: center;
        width: 30px;
        transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
      }

      .footer .social li a i, .footer .social li a span {
        transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
      }

      .footer .social li a:hover {
        background: #222 none repeat scroll 0 0;
        color: #fff;
      }


      /*------------------------------------------------------------------*/
      /* Copyright */
      /*------------------------------------------------------------------*/
      .copyright {
        line-height: 1.9;
      }

      .copy-link {
        letter-spacing: 4px;
        text-transform: uppercase;
        font-size: 12px;
      }

      /*------------------------------------------------------------------*/
      /* Content Box (Services Box, Featured Box, icon-box, etc...) */
      /*------------------------------------------------------------------*/

      .content-box, .content-box-with-bg {
        position: relative;
      }

      .content-box.left {
        padding-left: 100px;
        text-align: left;
        margin-bottom: 35px;
        position: relative;
      }

      .content-box.right {
        padding-right: 100px;
        text-align: right;
        margin-bottom: 35px;
        position: relative;
      }

      .content-box-with-bg {
        padding: 45px 30px 30px !important;
        background: #fff;
        border-radius: 3px;
        border: 1px dashed #eee;
        margin-bottom: 30px;
        transition: all 0.3s ease-in-out 0s;
        -o-transition: all 0.3s ease-in-out 0s;
        -moz-transition: all 0.3s ease-in-out 0s;
        -webkit-transition: all 0.3s ease-in-out 0s;
      }

      .content-box-with-bg:hover {
        background: #f7f7f7;
        border-color: #f7f7f7;
      }


      /*Icon Style 1*/

      .content-box:hover .icon-top, .content-box:hover .icon-left, .content-box:hover .icon-right {
        background-color: #222;
        color: #fff;
      }

      .icon-top, .icon-left, .icon-right {
        background-color: #f5f5f5;
        display: inline-block !important;
        font-size: 26px;
        color: #333;
        height: 70px;
        line-height: 75px;
        width: 70px;
        text-align: center;
        transition: all 0.3s ease-in-out 0s;
        -o-transition: all 0.3s ease-in-out 0s;
        -moz-transition: all 0.3s ease-in-out 0s;
        -webkit-transition: all 0.3s ease-in-out 0s;
        transform: rotate(45deg);
        -o-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        border-radius: 3px;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
      }

      .icon-top i, .icon-top span,
      .icon-left i, .icon-left span,
      .icon-right i, .icon-right span {
        transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
      }

      .icon-top {
        margin-bottom: 45px;
      }

      .icon-left, .alt-icon-left {
        position: absolute;
        left: 0;
      }

      .icon-right, .alt-icon-right {
        position: absolute;
        right: 0;
      }

      .alt-icon-left, .alt-icon-right {
        top: 5px;
      }

      .icon-left, .icon-right {
        top: 15px;
      }

      .alt-icon-color {
        color: #17a697 !important;
      }

      .icon-color {
        background-color: #17a697;
        color: #fff;
      }

      .icon-black {
        background-color: #222;
        color: #fff;
      }

      .content-box:hover .icon-color {
        background-color: #222;
        color: #fff;
      }

      .content-box:hover .icon-black {
        background-color: #17a697;
        color: #fff;
      }

      /* Icon Style 2 */
      .content-box.alt-left {
        padding-left: 65px;
        text-align: left;
        margin-bottom: 35px;
        position: relative;
      }

      .content-box.alt-right {
        padding-right: 65px;
        text-align: right;
        margin-bottom: 35px;
        position: relative;
      }



      .alt-icon-top, .alt-icon-left, .alt-icon-right {
        color: #222;
        display: inline-block !important;
        font-size: 35px;
        line-height: 1;
        transition: all 0.3s ease-in-out 0s;
      }

      .alt-icon-top {
        margin-bottom: 25px;
        text-align: center;
      }

      .alt-icon-sm-top, .alt-icon-sm-left, .alt-icon-sm-right {
        color: #222;
        display: inline-block !important;
        font-size: 25px;
        line-height: 1;
        transition: all 0.3s ease-in-out 0s;
      }

      .alt-icon-sm-top {
        margin-bottom: 20px;
        text-align: center;
      }


      /* Featured Box */

      .features-block-link {
        margin-right: 30px;
      }

      .features-block-link-icon {
        border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        height: 40px;
        width: 40px;
        text-align: center;
        line-height: 38px;
        border: 1px solid #ebebeb;
        margin-right: 12px;
        vertical-align: middle;
      }

      /*------------------------------------------------------------------*/
      /* Blog (Blog box, Blog page) */
      /*------------------------------------------------------------------*/
      .blog-post {
        display: inline-block;
        width: 100%;
      }

      .blog-post .post-media {
        margin-bottom: 25px;
        overflow: hidden;
        position: relative;
      }

      .blog-post .post-media img {
        width: 100%;
      }

      .post-entry {
        margin-bottom: 25px;
      }

      .blog-post .post-tag {
      }

      .blog-post .post-tag span {
        display: inline-block;
        background: #f0f0f0;
        /*color:#222;*/
        padding: 5px 10px;
      }

      .blog-post .post-meta {
        color: #999;
        font-size: 13px;
        text-transform: uppercase;
        margin-bottom: 10px;
      }

      .blog-post .post-meta span {
        margin-right: 3px;
      }

      .blog-post blockquote {
        background-color: #f7f7f7;
        border-left: medium none;
        color: inherit;
        font-size: 17px;
        font-weight: 300;
        margin: 0;
        padding: 25px;
        margin-bottom: 15px;
      }

      .blog-post blockquote::before {
        content: "";
        font-family: FontAwesome;
        font-size: 12px;
        padding-right: 7px;
      }

      .blog-post blockquote::after {
        content: "";
        font-family: FontAwesome;
        font-size: 12px;
        padding-left: 7px;
      }

      .blog-post ul {
        margin-bottom: 15px;
      }

      /* Blog Single ------------------------------ */
      #blog-single .post-header {
        margin-bottom: 25px;
      }

      .post-author-image {
        float: left;
        height: 84px;
        margin-right: 15px;
        width: 84px;
      }

      .post-author-image img {
        width: 100%;
      }

      .post-author-panel {
      }

      .post-author-hadding {
        padding: 8px 20px;
        display: block;
        background: #eee;
      }

      .post-author-hadding a {
        color: #17a697;
      }

      .post-author-body {
        padding: 20px;
        border: 1px solid #eee;
        display: table;
      }

      .post-author-body p {
        margin-bottom: 0px;
      }

      .post-author-hadding h1,
      .post-author-hadding h2,
      .post-author-hadding h3,
      .post-author-hadding h4,
      .post-author-hadding h5,
      .post-author-hadding h6 {
        margin-bottom: 0;
      }

      #blog-single .blog-post hr {
        margin-top: 30px !important;
        margin-bottom: 30px !important;
      }

      .blog-post .post-share {
        display: block;
        font-size: 16px;
        display: block;
      }

      .blog-post .post-share span {
        text-align: right;
        font-weight: 600;
        display: inline-block;
        color: #222;
      }

      .post-share .post-share-social {
        padding: 0;
        margin: 0;
        list-style: none;
        text-align: right;
        float: right;
        display: inline-block;
      }

      .post-share .post-share-social a {
        display: inline-block;
        margin-left: 10px;
        margin-right: 10px;
        font-size: 18px;
      }



    }
    .myDropdown:hover ~ ul.sub-dropdown{ display: block; }
    ul.sub-dropdown:hover{display: block;}
  }
  .slide {
    background: {
      position: center;
      size: cover;
    }
    //transition: all 0.1s ease;
    /*height: 700px;*/
    height: 100vh;

    /*&:before {*/
    /*background-color: rgba(#000, .2);*/
    /*content: '';*/
    /*height: 100%;*/
    /*left: 0;*/
    /*position: absolute;*/
    /*top: 0;*/
    /*width: 100%;*/
    /*}*/

    &--1 {
      background-image: url('../../static/img/full/back21.jpg');
    }

    &--2 {
      background-image: url('../../static/img/full/back31.jpg');
    }

    &--3 {
      background-image: url('../../static/img/full/back41.jpg');
    }
  }

</style>
<style lang="scss">

  #page-wraper{
    #intro {
      .VueCarousel{
        .VueCarousel-pagination{
          position: absolute;
          bottom: 20px;
        }
      }
    }
    .VueCarousel{
      .VueCarousel-pagination{
        .VueCarousel-dot--active, .VueCarousel-dot:hover{
          padding: 7px !important;
          .VueCarousel-dot-inner{
            width: 15px !important;
            height: 15px !important;
            background: none !important;
            border: 1px solid white;
          }
        }
      }
    }

    .navbar-prepare{
      background-color: rgba(255, 255, 255, 0.95);
      border-bottom: 1px solid #f0f0f0;
      .navbar-brand {
        margin-top: 0 !important;
        margin-left: 0 !important;
        img {
        width: 100px !important;}
      }
      .nav-item > a, .nav-item > a.dropdown-toggle span{
        color: rgba(34,34,34,0.60) !important;
      }
    }
    .navbar{
      .navbar-brand {
        transition: all 0.4s ease;
        margin-top: 10px;
        margin-left: 30px;
        img {
          transition: all 0.7s ease;
          width: 160px;
        }
      }
      .nav-item > a, .nav-item > a.dropdown-toggle span{
        padding: 0px 15px;
        text-transform: uppercase;
        color: #F5833F;
        font-weight: 400;
      }
      a:focus{
        color: #F5833F !important;
      }
    }

    #social_section {
      img {
        width: 166px;
        height: 98px;
      }
    }

    @media (max-width: 767px) {
      .navbar-prepare {
        background: #ff8201e3;
        border-bottom: 1px solid #d26b00;
        .navbar-collapse {
          background: none;
        }
      }
      .navbar-collapse {
        background: rgba(0, 0, 0, 0.79);
        border-radius: 0.5em;
        padding: 10px;

        li {
          padding: 10px 0px;
          .dropdown-menu {
            background: none;
            border: none;
            box-shadow: none;
            a {
              border: none;
              color: #f0803d;
              padding-left: 3em;
            }
            .dropdown-item:focus, .dropdown-item:hover{
              background: #ec803f;
              border-radius: 0.5em;
              color: white;
              font-weight: 500;
            }
          }
          span{
            padding: 0 !important;
          }
          &:not(.dropdown):hover {
            background: #ec803f;
            border-radius: 0.5em;
            a {
              color: white;
              font-weight: 500;
            }
          }
        }
      }
    }
  }

  .vue-notification {
    border-radius: 0.55rem;
    border-left: none;
    box-shadow: 1px 1px 3px #3e3e3e;

    .notification-title{
      font-size: 1.1em;
    }
    .notification-content{
      font-size: 1.1em;
    }
  }
  .progress-line, .progress-line:before, .progress-line:after {
    height: 3px;
    width: 100%;
    margin: 0;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;

  }
  .progress-line {
    background-color: #ef7b1f;
    display: -webkit-flex;
    display: flex;
  }
  .progress-line:before {
    background-color: #21a8d8;
    content: '';
    -webkit-animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  @-webkit-keyframes running-progress {
    0% { margin-left: 0px; margin-right: 100%; }
    50% { margin-left: 25%; margin-right: 0%; }
    100% { margin-left: 100%; margin-right: 0; }
  }
  @keyframes running-progress {
    0% { margin-left: 0px; margin-right: 100%; }
    50% { margin-left: 25%; margin-right: 0%; }
    100% { margin-left: 100%; margin-right: 0; }
  }

</style>
