/* globals Meteor, Template, Mongo, Paste ,CodeMirror, _ */

Paste = new Mongo.Collection('paste')

if (Meteor.isClient) {

  Template.code.helpers({
    editorOptions: function () {
      let p = Paste.find({}).fetch()[0]
      let isOwner = false
      if (!Meteor.loggingIn && Meteor.sandstormUser()) {
        isOwner = Meteor.sandstormUser().permissions.indexOf('owner') >= -1
      }
      const obj = {
        lineNumbers: true,
        mode: p ? p.language : 'python',
        readOnly: !isOwner
      }
      return obj
    }
  })

  Template.pasteOutput.helpers({
    creatorOf: function (paste) {
      return paste.creator || '...'
    },
    showCode: function (paste, loggingIn) {
      return paste && !loggingIn
    },
    languages: function () {
      const languages = _.map(CodeMirror.modes, function (value, key) {
        return key
      })
      return languages
    },
    selectedLanguage: function (selected, language) {
      return selected === language
    },
    paste: function () {
      let p = Paste.find({}).fetch()[0]
      return p
    }
  })
  Template.pasteOutput.events({
    'submit .new-paste': function (e) {
      e.preventDefault()

      const text = e.target.pasteArea.value
      const language = e.target.language.value

      let p = Paste.find({}).fetch()[0]

      Paste.update({_id: p._id}, {
        paste: text,
        language: language,
        creator: Meteor.sandstormUser().preferredHandle
      })
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Paste.find({}).fetch().length === 0) {
      Paste.insert({
        paste: ''
      })
    }
  })
}
