const state = {
  articleLabel: [],
  topicLabel: []
}

const mutations = {
  SET_ARTICLE: (state, labels) => {
    state.articleLabel = labels
  },
  SET_TOPIC: (state, labels) => {
    state.topicLabel = labels
  }
}

const actions = {
  saveArticleLabel({ commit }, labels) {
    commit('SET_ARTICLE', labels)
  },
  saveTopicLabel({ commit }, labels) {
    commit('SET_TOPIC', labels)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

