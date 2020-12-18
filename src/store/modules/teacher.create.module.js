localStorage.setItem('teacher.create', JSON.stringify({ steps: [], components: [] }));
const initialState = { steps: [], components: [] };

export const teacherCreate = {
  state: initialState,
  namespaced: true,
  getters: {
    steps: state => {
      return state.steps
    },
    count: state => {
      return state.components.length
    },
    components: state => {
      return state.components
    }
  },
  actions: {
    initial({ commit }) {
      localStorage.removeItem('teacher.create');
      localStorage.setItem('teacher.create', JSON.stringify(initialState));
      commit('initial')
    },
    clearSteps({ commit }) {
      localStorage.removeItem('teacher.create')
      commit('clearSteps')
    },
    pushStep({ commit }, step) {
      const storageTeacher = JSON.parse(localStorage.getItem('teacher.create'))
      storageTeacher.steps.push(step)
      localStorage.setItem('teacher.create', JSON.stringify(storageTeacher))
      commit('setTeacherCreate', storageTeacher)
    },

    pushComponents({ commit }, component) {
      const storageTeacher = JSON.parse(localStorage.getItem('teacher.create'))
      storageTeacher.components.push(component)
      localStorage.setItem('teacher.create', JSON.stringify(storageTeacher))
      commit('setTeacherCreate', storageTeacher)
    },
    setInput({ commit }, teacherCreate) {
      let jsonTeacher = JSON.stringify(teacherCreate)
      localStorage.setItem('teacher.create', jsonTeacher)
      commit('setTeacherCreate', jsonTeacher)
    },
    getInput({ commit }, step) {
      const storageTeacher = JSON.parse(localStorage.getItem('teacher.create'))
      return storageTeacher.steps[step]
    },
    setStep({ commit }, step) {
      const storageTeacher = JSON.parse(localStorage.getItem('teacher.create'))
      storageTeacher.steps[step.position] = step.value
      localStorage.setItem('teacher.create', JSON.stringify(storageTeacher))
      commit('setTeacherCreate', storageTeacher)
    },
    updateStep({ commit }, step) {
      const storageTeacher = JSON.parse(localStorage.getItem('teacher.create'))
      storageTeacher.steps[step.position] = step.value
      localStorage.setItem('teacher.create', JSON.stringify(storageTeacher))
    }
  },
  mutations: {
    initial(state) {
      state.steps = [];
      state.components = [];
    },
    clearSteps(state) {
      localStorage.removeItem('teacher.create');
      state.steps = [];
      state.components = [];
    },
    setTeacherCreate(state, jsonTeacher) {
      state.steps = jsonTeacher.steps;
      state.components = jsonTeacher.components;
    }
  }
}
