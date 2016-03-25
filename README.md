# Sandbin

A super simple code paste bin app to be run on Sandstorm

Uses codemirror as code parser and syntax highlighter.

*Known bug:*
* Updating the language doesn't update the highlighting until page refresh. This is because the codemirror library isn't fully reactive. There's probably some way around this.

# To develop it

```
git clone git@github.com/simonv3/sandbin
cd sandbin
meteor
```

This will start a local version of sandbin on your computer at localhost:3000


