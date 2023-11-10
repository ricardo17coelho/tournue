<template>
  <v-container class="fill-height" :fluid="true">
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" align="center">
        <v-card max-width="500" class="text-start">
          <v-card-title>
            <h1 class="mx-auto mb-4 text-4xl font-bold">Tournue</h1>
          </v-card-title>
          <v-card-text>
            <router-view />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
