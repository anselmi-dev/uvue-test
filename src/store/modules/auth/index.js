import gigs from './gigs.js';
import user from './user.js';
import teacher from './teacher.js';
import axios from 'axios';

import subject from './subject.js';
import userCard from './userCard.js';
import review from './review.js';
import commends from './commends.js';
import classes from './classes.js';
import classesTeacher from './classesTeacher.js';


export const auth = {
  namespaced: true,
  state: {
    user: null,
    ...user.state,
    ...teacher.state,
    ...gigs.state,
    ...subject.state,
    ...userCard.state,
    ...review.state,
    ...commends.state,
    ...classes.state,
    ...classesTeacher.state,
  },
  getters: {
    ...user.getters,
    ...teacher.getters,
    ...gigs.getters,
    ...subject.getters,
    ...userCard.getters,
    ...review.getters,
    ...commends.getters,
    ...classes.getters,
    ...classesTeacher.getters,
  },
  actions: {
    ...user.actions,
    ...teacher.actions,
    ...gigs.actions,
    ...subject.actions,
    ...userCard.actions,
    ...review.actions,
    ...commends.actions,
    ...classes.actions,
    ...classesTeacher.actions,
  },
  mutations: {
    ...user.mutations,
    ...teacher.mutations,
    ...gigs.mutations,
    ...subject.mutations,
    ...userCard.mutations,
    ...review.mutations,
    ...commends.mutations,
    ...classes.mutations,
    ...classesTeacher.mutations,
  },
}
