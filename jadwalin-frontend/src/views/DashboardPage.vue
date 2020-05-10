<template>
  <v-content>
    <base-appbar></base-appbar>
    <v-container class="my-5">
      <v-row wrap class="mb-3">
        <v-col cols="2">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn small text color="deep-purple accent-4" v-on="on" @click="sortBy('title')">
                <v-icon left small>mdi-note</v-icon>
                <span class="caption text-lowercase hidden-xs-only">By homework name</span>
              </v-btn>
            </template>
            <span>Sort homeworks by name</span>
          </v-tooltip>
        </v-col>
        <v-col cols="2">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn small text color="deep-purple accent-4" v-on="on" @click="sortBy('course')">
                <v-icon left small>mdi-folder</v-icon>
                <span class="caption text-lowercase hidden-xs-only">By course name</span>
              </v-btn>
            </template>
            <span>Sort homeworks by course</span>
          </v-tooltip>
        </v-col>
        <v-col cols="2">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn small text color="deep-purple accent-4" v-on="on" @click="sortBy('dueDate')">
                <v-icon left small>mdi-calendar-today</v-icon>
                <span class="caption text-lowercase hidden-xs-only">By due time</span>
              </v-btn>
            </template>
            <span>Sort homeworks by due date</span>
          </v-tooltip>
        </v-col>
        <v-col cols="2">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                small
                text
                color="deep-purple accent-4"
                v-on="on"
                @click="sortBy('difficulty')">
                <v-icon left small>mdi-memory</v-icon>
                <span class="caption text-lowercase hidden-xs-only">By difficulty</span>
              </v-btn>
            </template>
            <span>Sort homeworks by difficulty</span>
          </v-tooltip>
        </v-col>
        <v-col cols="2">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                small
                text
                color="deep-purple accent-4"
                v-on="on"
                @click="sortBy('status')">
                <v-icon left small>mdi-flag</v-icon>
                <span class="caption text-lowercase hidden-xs-only">By status</span>
              </v-btn>
            </template>
            <span>Sort homeworks by status</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <v-card class="text-capitalize" flat>
        <v-row wrap class="pa-3 homework" v-for="(homework, index) in homeworks" :key="index">
          <v-col cols="12" md="2">
            <div class="caption grey--text">Homework Title</div>
            <div>{{ homework.title }}</div>
          </v-col>
          <v-col cols="12" md="2">
            <div class="caption grey--text">Course</div>
            <div>{{ homework.course }}</div>
          </v-col>
          <v-col cols="3" md="2">
            <div class="caption grey--text">Due By</div>
            <div>{{ homework.dueDate }}</div>
          </v-col>
          <v-col cols="3" md="2">
            <div class="caption grey--text">Difficulty</div>
            <div>{{ homework.difficulty }}</div>
          </v-col>
          <v-col cols="3" md="2">
            <div class="right">
              <v-chip
                small
                class="white--text caption my-2"
                :color="getColor(homework.status)"
              >
                {{ homework.status }}
              </v-chip>
            </div>
          </v-col>
          <v-col cols="2">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  small
                  text
                  color="deep-purple accent-4"
                  v-on="on"
                  @click="markAsDone(homework.id)"
                >
                  <v-icon left small>mdi-check</v-icon>
                </v-btn>
              </template>
              <span>Done</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  small
                  text
                  color="deep-purple accent-4"
                  v-on="on"
                  @click="deleteHomework(homework.id)"
                >
                  <v-icon left small>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Delete</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card>
      <v-row
        justify="end"
      >
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" class="mx-2" fab dark large color="deep-purple accent-4">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Add Homework</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Title"
                      required
                      v-model="input.title"
                      color="deep-purple accent-4"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Course"
                      required
                      v-model="input.course"
                      color="deep-purple accent-4"
                  ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="true"
                      transition="scale-transition"
                      offset-y
                      color="deep-purple accent-4"
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="dateFormatted"
                          label="Date"
                          hint="MM/DD/YYYY format"
                          persistent-hint
                          color="deep-purple accent-4"
                          @blur="date = parseDate(dateFormatted)"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        color="deep-purple accent-4"
                        v-model="input.dueDate"
                        no-title
                        @input="menu1 = false"
                        ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      :items="['easy', 'medium', 'hard']"
                      label="Difficulty"
                      v-model="input.difficulty"
                      color="deep-purple accent-4"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="deep-purple accent-4"
                text
                @click="dialog = false"
              >Close</v-btn>
              <v-btn
                depressed
                dark
                @click="saveHomework"
                color="deep-purple accent-4"
              >Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import format from 'date-fns/format';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Swal from 'sweetalert2';
import moment from 'moment';
import BaseAppbar from '@/components/BaseComponents/BaseAppbar.vue';

export default {
  components: {
    BaseAppbar,
  },
  data(vm) {
    return {
      homeworks: [],
      dialog: false,
      due: '',
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      input: {
        course: '',
        title: '',
        difficulty: '',
        dueDate: '',
      },
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.input.dueDate);
    },
  },
  watch: {
    /* eslint-disable*/
    date(val) {
      this.dateFormatted = this.formatDate(this.input.dueDate);
    },
  },
  mounted() {
    axios.defaults.headers.common.Authorization = `Bearer ${this.$store.getters.token}`;
    this.getAllHomeworks();
    this.$nextTick(() => {
      this.getAllHomeworks();
    })
  },
  methods: {
    async saveHomework() {
      try {
        const token = jwt.decode(this.$store.getters.token);
        const userID = token.userToken.id;

        const result = await axios.post('https://jadwalin-backend.herokuapp.com/homework/add', {
          course: this.input.course,
          title: this.input.title,
          difficulty: this.input.difficulty,
          due_date: this.input.dueDate,
          user_id: userID,
        });
        this.dialog = false;
        Swal.fire(
          'Sukses',
          'Homework added',
          'success'
        )
        // this.$forceUpdate();
        this.$router.go();
      } catch(err) {
        console.log(err)
      }
    },
    async getAllHomeworks() {
     try {
        const token = jwt.decode(this.$store.getters.token);
        const userID = token.userToken.id;
        const result = await axios.get(`https://jadwalin-backend.herokuapp.com/homework/get/${userID}`);

        const homeworks = result.data.homework;
        this.homeworks = homeworks.map((homework) => {
          return {
            id: homework._id,
            title: homework.title,
            course: homework.course,
            dueDate: moment().format(homework.due_date, 'MMM DD, YYYY'),
            difficulty: homework.difficulty,
            status: homework.status,
          }
        })
      } catch(err) {
        console.log(err)
      }
    },
    async markAsDone(id) {
      try {
        const result = await axios.put(`https://jadwalin-backend.herokuapp.com/homework/done/${id}`)
        console.log(result);
        // this.$forceUpdate();
        this.$router.go();
      } catch(err) {
        console.log(err);
      }
    },
    async deleteHomework(id) {
      try {
        const result = await axios.delete(`https://jadwalin-backend.herokuapp.com/homework/delete/${id}`)
        console.log(result)
        // this.$forceUpdate();
        this.$router.go();
      } catch(err) {
        console.log(err)
      }
    },
    getColor(color) {
      switch (color) {
        case 'done':
          return '#3CD1C2';
        case 'ongoing':
          return 'orange';
        case 'overdue':
          return 'tomato';
        default:
          return '';
      }
    },
    formatDateDue(date) {
      return date ? format(date, 'MMM d, yyyy') : '';
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
    sortBy(prop) {
      this.homeworks.sort((a, b) => a[prop] < b[prop] ? -1 : 1);
    },
  },
};
</script>

<style>
  .homework.complete {
    border-left: 4px solid #3CD1C2
  }
  .homework.ongoing {
    border-left: 4px solid orange
  }
  .homework.overdue {
    border-left: 4px solid tomato
  }
</style>
