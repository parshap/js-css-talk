"use strict";

var React = require("react");
var el = React.createElement;
var marked = require("marked");
var stripIndent = require("strip-indent");
var xtend = require("xtend");
var fs = require("fs");
var xtend = require("xtend");

var imgStyle = {
  display: "block",
  "max-width": "100%",
  border: "none",
  margin: "0 auto",
  background: "none",
  "box-shadow": "none",
};

var solarized = {
  base03:    "#002b36",
  base02:    "#073642",
  base01:    "#586e75",
  base00:    "#657b83",
  base0:     "#839496",
  base1:     "#93a1a1",
  base2:     "#eee8d5",
  base3:     "#fdf6e3",
  yellow:    "#b58900",
  orange:    "#cb4b16",
  red:       "#dc322f",
  magenta:   "#d33682",
  violet:    "#6c71c4",
  blue:      "#268bd2",
  cyan:      "#2aa198",
  green:     "#859900",
};

var Slide = React.createClass({
  render: function() {
    return el("section", {
      style: xtend({
        width: "100%",
        height: "100%",
        "text-align": "left",
        "box-sizing": "border-box",
      }, this.props.style),
      children: [
        this.props.title && el("h2", {
          children: this.props.title,
        }),
        this.props.children,
        this.props.script && el("aside", {
          className: "notes",
          children: this.props.script,
        }),
      ],
    });
  },
});

var TwoColumns = React.createClass({
  render: function() {
    return el("div", {
      className: "clearfix",
      children: [
        el("div", {
          style: {
            float: "left",
            width: "45%",
          },
          children: this.props.left,
        }),
        el("div", {
          style: {
            float: "right",
            width: "45%",
          },
          children: this.props.right,
        }),
      ],
    });
  },
});

// A template string tag function to compile markdown
function md(str) {
  return el("div", {
    dangerouslySetInnerHTML: {
      __html: marked(stripIndent(str)),
    },
  });
}

module.exports = [
  // Cover slide does not use Slide component
  el(Slide, {
    style: {
      "text-align": "center",
    },
    children: el("div", {
      style: {
        display: "inline-block",
        "text-align": "left",
      },
      children: [
        el("h1", {
          style: {
            "letter-spacing": "0.15em",
            "margin-right": "-0.15em",
            "margin-bottom": "1em",
            "lineHeight": "1",
          },
          children: [
            el("span", {
              style: {
                color: solarized.yellow,
                "margin-right": "0.3em",
              },
              children: "JS",
            }),
            " ",
            el("span", {
              style: {
                color: solarized.blue,
              },
              children: "CSS",
            }),
          ],
        }),
        el("h6", {
          style: {
            color: solarized.base00,
            "lineHeight": "1",
          },
          children: [
            "May 27",
            el("sup", {
              children: "th",
            }),
            ", JS Conf US 2015",
          ],
        }),
        el("p", {
          style: {
            "lineHeight": "1",
            color: solarized.base0,
            "margin-bottom": "0.25em",
          },
          children: [
            "Parsha",
            el("br"),
            "Pourkhomami",
          ]
        }),
        el("p", {
          style: {
            color: solarized.cyan,
          },
          children: "@parshap",
        }),
      ],
    }),
  }),

  el(Slide, {
    children: md(`
      ## CSS is Awesome
    `),
    script: md(`
      Before we talk about JavaScript, let's talk about CSS.
    `),
  }),

  el(Slide, {
    children: el("img", {
      style: imgStyle,
      src: "/images/virginamerica-nocss.png",
    }),
    script: md(`
      CSS also lets us take websites from looking like this.
    `),
  }),

  el(Slide, {
    children: el("img", {
      style: imgStyle,
      src: "/images/virginamerica-css.png",
    }),
    script: md(`
      To this.
    `),
  }),

  el(Slide, {
    children: el("img", {
      style: imgStyle,
      src: "/images/craigslist-nocss.png",
    }),
    script: md(`
      It even makes Craigslist look better.
    `),
  }),

  el(Slide, {
    children: el("img", {
      style: imgStyle,
      src: "/images/craigslist-css.png",
    }),
    script: md(`
      And I didn't even think Craigslist used css.
    `),
  }),

  el(Slide, {
    children: el("div", {
      dangerouslySetInnerHTML: {
        __html: fs.readFileSync(__dirname + "/twitter-failwhale.html"),
      },
    }),
    script: md(`
      CSS lets us create cool animations like this Twitter Fail Whale
    `),
  }),

  el(Slide, {
    children: el("div", {
      dangerouslySetInnerHTML: {
        __html: fs.readFileSync(__dirname + "/space-animation.html"),
      },
    }),
    script: md(`
      And whatever this thing is.

      Using just CSS.
    `),
  }),

  el(Slide, {
    children: el("img", {
      style: xtend(imgStyle, {
        "margin-top": "100px",
      }),
      src: "/images/css-is-awesome.jpg",
    }),
    script: md(`
      So yeah, CSS is preetty awesome.
    `),
  }),

  el(Slide, {
    // @TODO Negate list
    // @TODO Maybe fragments
    // @TODO Better descriptions
    children: md(`
      ## But CSS Has Issues

      Missing features…

      * Variables & functions
      * Dependency management
      * Code sharing / reuse
      * Interoperability
    `),
    script: md(`
      But CSS does have some issues.

      It's missing some important features:

      * Being able to extend the language with variables & functions
      * No dependency management
      * No unit of code reuse
    `),
  }),

  // @TODO List doesn't show
  el(Slide, {
    children: md(`
      ## But Preprocessors!

      LESS, Stylus, Sass, SCSS, Rework, DtCSS, Switch CSS, Compass, CSS-Crush, Clay, Myth, Resin, Styl
    `),
    script: md(`
      We've solved a lot of these issues by inventing new
      languages we call CSS preprocessors.
    `),
  }),

  // @TODO No "full-on"
  // @TODO Separate slide for each bullet list?
  // @TODO Refer to upcoming slides
  // Transition: "Let's look at some examples of what I mean""
  el(Slide, {
    children: md(`
      ## But Preprocessors Are Weird…

      * Almost full-on languages, but not quite
      * Special syntax
      * Not thought-out semantics
    `),
  }),

  // @TODO Explain code more
  // @TODO Fragment compiled output
  // "For people who are not familiar with stylus, it has very terse syntax and lets you nest selectors using indentation"
  // @TODO Explain output
  el(Slide, {
    children: el("div", {
      className: "clearfix",
      children: [
        el("h2", {
          children: "Stylus: Ambiguities",
        }),
        el(TwoColumns, {
          left: [
            md(`
              ### Stylus

              \`\`\`stylus
              .unicorn-form
                color #bad
                fieldset input
                textarea
                  font Comic Sans
              \`\`\`
            `),
          ],
          right: [
            md(`
              ### Compiled

              \`\`\`css
              .unicorn-form {
                color: #bad;
              }
              .unicorn-form input,
              .unicorn-form textarea {
                font: Comic Sans;
              }
              \`\`\`
            `),
          ],
        }),
      ],
    }),
  }),

  el(Slide, {
    children: el("div", {
      className: "clearfix",
      children: [
        el("h2", {
          children: "Stylus Ambiguities",
        }),
        el(TwoColumns, {
          left: [
            md(`
              ### Stylus

              \`\`\`stylus
              .unicorn-form
                fieldset input
                color #bad
                textarea
                  font Comic Sans
              \`\`\`
            `),
          ],
        }),
      ],
    }),
  }),

  // @TODO Point out invalid css
  // output is not expected, no error
  el(Slide, {
    children: el("div", {
      className: "clearfix",
      children: [
        el("h2", {
          children: "Stylus: Ambiguities",
        }),
        el(TwoColumns, {
          left: [
            md(`
              ### Stylus

              \`\`\`stylus
              .unicorn-form
                fieldset input
                color #bad
                textarea
                  font Comic Sans
              \`\`\`
            `),
          ],
          right: [
            md(`
              ### Compiled

              \`\`\`css
              .unicorn-form {
                fieldset: input;
                color: #bad;
              }
              .unicorn-form textarea {
                font: Comic Sans;
              }
              \`\`\`
            `),
          ],
        }),
      ],
    }),
    script: md(`
      ...

      What was previously a selector is now treated as a property
      declaration.
    `),
  }),

  // @TODO Transition: Let's look at LESS
  el(Slide, {
    children: md(`
      ## LESS: Dependencies

      \`\`\`less
      @import "foo.less";
      \`\`\`
    `),
  }),

  // @TODO Why are there 8? Why is this bad?
  el(Slide, {
    children: md(`
      ## LESS: Dependencies

      \`\`\`less
      @import "foo.less";
      @import (once) "foo.less";
      @import (inline) "foo.less";
      @import (css) "foo.less";
      @import (less) "foo.less";
      @import (multiple) "foo.less";
      @import (reference) "foo.less";
      @import (optional) "foo.less";
      \`\`\`
    `),
  }),

  el(Slide, {
    children: md(`
      ## LESS: Arithmetic

      \`\`\`less
      .button {
        margin: 10px - 2px;  /* margin: 8px */
      }
      \`\`\`
    `),
  }),

  el(Slide, {
    children: md(`
      ## LESS: Arithmetic

      \`\`\`less
      .button {
        margin: 10px - 2px;  /* margin: 8px */
        margin: 10px -2px;   /* margin: 10px -2px */
      }
      \`\`\`
    `),
  }),

  el(Slide, {
    children: md(`
      ## LESS: Arithmetic

      \`\`\`less
      .button {
        margin: 10px - 2px;  /* margin: 8px */
        margin: 10px -2px;   /* margin: 10px -2px */
        margin: (10px -2px); /* Error */
      }
      \`\`\`
    `),
  }),

  // @TODO Intro: "LESS has an awesome feature... it works... it works... it breaks"
  // "LESS: Unit Conversion"
  // "Even though the units are different, The values are the same, so you should expect the same result"
  // "Let's try the same thing with division"
  // "When we have the same units, things work as expected"
  // "BUT... when we change the units, everything breaks"
  el(Slide, {
    children: md(`
      ## LESS: Unit Conversion

      \`\`\`less
      body {
        font-size: 10cm - 2cm;  /* 8cm */
      }
      \`\`\`
    `),
  }),

  el(Slide, {
    children: md(`
      ## LESS: Unit Conversion

      \`\`\`less
      body {
        font-size: 10cm - 2cm;  /* 8cm */
        font-size: 10cm - 20mm; /* 8cm */
      }
      \`\`\`
    `),
  }),

  el(Slide, {
    children: md(`
      ## LESS: Unit Conversion

      \`\`\`less
      body {
        font-size: 10cm - 2cm;  /* 8cm */
        font-size: 10cm - 20mm; /* 8cm */
        font-size: 10cm / 2cm;  /* 5cm */
      }
      \`\`\`
    `),
  }),

  el(Slide, {
    children: md(`
      ## LESS: Unit Conversion

      \`\`\`less
      body {
        font-size: 10cm - 2cm;  /* 8cm */
        font-size: 10cm - 20mm; /* 8cm */
        font-size: 10cm / 2cm;  /* 5cm */
        font-size: 10cm / 20mm; /* 0.5cm */
      }
      \`\`\`
    `),
  }),

  // @TODO Explain code blocks one by one
  // @TODO swap less/scss
  el(Slide, {
    children: [
      el("h2", {
        children: "Nuanced Semantics",
      }),
      el(TwoColumns, {
        left: [
          md(`
            ### LESS

            \`\`\`css
            @my-color: red;
            h2 {
              color: @my-color;
            }
            @my-color: white;
            \`\`\`

            ---

            #### Compiled

            \`\`\`css
            h2 {
              color: white;
            }
            \`\`\`
          `),
        ],
        right: [
          md(`
            ### SCSS

            \`\`\`css
            $my-color: red;
            h2 {
              color: $my-color;
            }
            $my-color: white;
            \`\`\`

            ---

            #### Compiled

            \`\`\`css
            h2 {
              color: red;
            }
            \`\`\`
          `),
        ],
      }),
    ],
  }),

  // @TODO
  // Show nasty trap if you don't expect this
  // "Most programmers don't expect this because they come from others langauges where this doesnt' happen"
  el(Slide, {
    children: md(`
      ## LESS Variable Scoping
    `),
    script: md(`
    `),
  }),

  // @TODO: Big type
  el(Slide, {
    children: md(`
      ## Language Design is Hard
    `),
    script: md(`
      Getting programming languages right is hard.

      Syntax, scoping, types, error handling. These are all complicated things.

      It's understandable that these preprocessor languages have gotten
      some of these things wrong.
    `),
  }),

  // @TODO This and next slide confusing
  // @TODO Big type - heading/subheading?
  // @TODO Combine? "Can we express css using js? Will it be better?"
  el(Slide, {
    children: md(`
      ## JS CSS

      Can JavaScript do better?
    `),
    script: md(`
      Can we do better using JavaScript?
    `),
  }),

  el(Slide, {
    children: md(`
      ## JS CSS

      Can we express CSS using JavaScript?
    `),
    script: md(`
      Well before we decide if it's better, is it even possible to express CSS
      using JavaScript?

      Let's take a look at what CSS in JavaScript might look like.
    `),
  }),

  // @TODO Side-by-side
  // @TODO Maybe explain: "add some quotations, etc"
  el(Slide, {
    children: md(`
      ## CSS

      \`\`\`css
      /* styles.css */
        .button {
          color: red;
        }
      \`\`\`
    `),
    script: md(`
      What would it look like if we define this CSS in JavaScript?
    `),
  }),

  el(Slide, {
    children: md(`
      ## JS

      \`\`\`js
      var styles = {
        ".button": {
          color: "red",
        },
      }
      \`\`\`
    `),
    script: md(`
      It's actually not too different.
    `),
  }),

  // @TODO: "Let's see what a pseudo selector looks like"
  // @TODO Heading, explain, code example
  el(Slide, {
    children: md(`
      ## Pseudo Selectors

      \`\`\`js
      var styles = {
        ".button": {
          color: "red",

          ":hover": {
            color: "blue",
          },
        },
      }
      \`\`\`
    `),
    script: md(`
    `),
  }),

  // @TODO: Intro
  // @TODO: Remove extra commas (everywhere)
  el(Slide, {
    children: md(`
      ## Child & Descendant Selectors

      \`\`\`js
      var styles = {
        ".button": {
          color: "red",

          "> .icon": {
            "font-size": "120%",
          },

          "span": {
            color: "black",
          },
        },
      }
      \`\`\`
    `),
    script: md(`
    `),
  }),

  // @TODO put @media above .button
  el(Slide, {
    children: md(`
      ## Media Queries

      \`\`\`js
      var styles = {
        ".button": {
          color: "red",

          "@media (min-width: 320px)": {
            "font-size": "1.2em",
          },
        },
      }
      \`\`\`
    `),
    script: md(`
    `),
  }),

  // @TODO Explain why fallbacks, js doesn't allow same key more than once
  el(Slide, {
    children: md(`
      ## Property Fallbacks

      \`\`\`js
      var styles = {
        ".button": {
          background: [
            "green",
            "linear-gradient(to bottom, green, red)",
          ],
        },
      }
      \`\`\`
    `),
    script: md(`
    `),
  }),

  el(Slide, {
    children: md(`
      ## JS CSS

      Can we express CSS using JavaScript?

      # Yes!

      JavaScript can do anything!
    `),
    script: md(`
      So, yes! We *can* use JavaScript to express CSS rules using just literal
      expressions — essentially json.
    `),
  }),

  // @TODO: Refer to code - "Here we have a styles object for button styles"
  el(Slide, {
    children: md(`
      ## How?

      \`\`\`js
      > styles
      {
        ".button": {
          color: "red",
          // ...
        }
      }
      \`\`\`
    `),
    script: md(`
      I've shown how to use JavaScript to express CSS rules — but all we have
      are these JavaScript objects that represent CSS.

      How do we actually use this to style elements in a browser?
    `),
  }),

  el(Slide, {
    children: md(`
      ## How?

      \`\`\`js
      > toCSS(styles)
      ".button {
        color: red,
        // ...
      }"
      \`\`\`
    `),
    script: md(`
      All we really need is a function that takes one of these style objects
      and returns a CSS source string.

      Now we can use this function to generate CSS for the browser to use.
    `),
  }),

  // @TODO solves -> addresses
  el(Slide, {
    children: md(`
      ## Why?

      We *can* write CSS in JavaScript. But why?

      * Variables & functions
      * Dependency management
      * Code sharing / reuse
      * Interoperability
      * The reasons we've invented new languages

      ... JavaScript addresses these for us.
    `),
    script: md(`
      Ok. So we *can* write CSS in JavaScript. But why would we do this?

      Well the limitations of CSS I talked about earlier, the reasons
      we've had to invent new languages, JavaScript already solves for us.
    `),
  }),

  el(Slide, {
    children: md(`
      ## Arithmetic

      \`\`\`js
      var styles = {
        ".button": {
          margin: 10 - 2 + "px" // 8px
        },
      };
      \`\`\`
    `),
    script: md(`
      For example, let's look at arithmetic in JavaScript.

      And it doesn't matter how many spaces *or* parenthesis you use.

      Even if you use a lot of parenthesis.
    `),
  }),

  el(Slide, {
    children: md(`
      ## Arithmetic

      \`\`\`js
      var styles = {
        ".button": {
          margin: 10 - 2 + "px" // 8px
          margin: 10 -2 + "px" // 8px
        },
      };
      \`\`\`
    `),
    script: md(`
      JavaScript has arithmetic.

      And it doesn't matter how many spaces *or* parenthesis you use.

      Even if you use a lot of parenthesis.
    `),
  }),

  el(Slide, {
    children: md(`
      ## Arithmetic

      \`\`\`js
      var styles = {
        ".button": {
          margin: 10 - 2 + "px" // 8px
          margin: 10 -2 + "px" // 8px
          margin: (10 - 2) + "px" // 8px
        },
      };
      \`\`\`
    `),
    script: md(`
      JavaScript has arithmetic.

      And it doesn't matter how many spaces *or* parenthesis you use.

      Even if you use a lot of parenthesis.
    `),
  }),

  el(Slide, {
    children: md(`
      ## Arithmetic

      \`\`\`js
      var styles = {
        ".button": {
          margin: 10 - 2 + "px" // 8px
          margin: 10 -2 + "px" // 8px
          margin: (10 - 2) + "px" // 8px
          margin: (((((((10 - 2))))))) + "px" // 8px
        },
      };
      \`\`\`
    `),
    script: md(`
      JavaScript has arithmetic.

      And it doesn't matter how many spaces *or* parenthesis you use.

      Even if you use a lot of parenthesis.
    `),
  }),

  // @TODO: Emphasize that "unique" is a jab
  // @TODO: unique -> wierd? (or other negative word)
  el(Slide, {
    children: md(`
      ## Variables

      ### CSS

      \`\`\`text
      nope
      \`\`\`

      ### LESS

      \`\`\`less
      @buttonColor: red;
      \`\`\`

      ### SCSS

      \`\`\`less
      $buttonColor: red;
      \`\`\`
    `),
    script: md(`
      CSS has no way to define and reuse variables.

      LESS and Sass both give us this ability in their own way and unique
      scoping rules.
    `),
  }),

  el(Slide, {
    children: md(`
      ## Variables

      \`\`\`js
      var buttonColor = "red";

      var style = {
        ".button": {
          color: buttonColor,
        }
      }
      \`\`\`
    `),
    script: md(`
      JavaScript has variables! And with thought out scoping.

      We can use them to define our constants in one place.
    `),
  }),

  // @TODO Intro before slide content
  // @TODO: Simplify code or reveal piece by piece
  // "YOu guys have probably run into this before, you this color you need to keep in sync with your front end code and you wind of having to leave tehse nasty commments around letting other developers know they need to update javascript when they change the css.
  el(Slide, {
    children: md(`
      ## Share Constants

      \`\`\`css
      /* button.css */
      .button {
        color: red; /* KEEP SYNC WITH app.js */
      }
      \`\`\`

      \`\`\`js
      /* app.js */
      var canvas = document.querySelector("canvas");
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "red"; /* KEEP SYNC WITH button.css */
      ctx.fillText("Hello!", 0, 0);
      \`\`\`
    `),
    script: md(`
      With CSS we have no way of sharing values between CSS and our front-end
      code.

      Say for example we wanted to draw something to a canvas in the same color
      as our buttons.

      We would have to define our button color in two places and make sure
      that we keep them in sync with each other any time the color changes.
    `),
  }),

  el(Slide, {
    children: md(`
      ## Share Constants

      \`\`\`js
      var buttonColor = "red";

      var style = {
        ".button": {
          color: buttonColor,
        }
      }

      var canvas = document.querySelector("canvas");
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = buttonColor;
      ctx.fillText("Hello!", 0, 0);
      \`\`\`
    `),
    script: md(`
      But if our styles are in JavaScript, and our canvas code is also in
      JavaScript, it's trivial to share variables between the two.
    `),
  }),

  // @TODO: "Unlike preprocessor sthat limit what you can import"
  el(Slide, {
    children: md(`
      ## Dependencies

      \`\`\`js
      /* colors.js */
      module.exports = {
        primary: "red",
        secondary: "#12c012",
      };
      \`\`\`

      ---

      \`\`\`js
      var colors = require("./colors");

      var style = {
        ".button": {
          color: colors.primary,
        },
      };
      \`\`\`
    `),
    script: md(`
      And of course we don't need everything to be in a single file.

      We can use modules to to organize our styles and import dependencies.

      And we're not limited by what we can import like preprocessors. It's just JavaScript,
      so we can import constants, functions, or entire sets of styles.
    `),
  }),

  el(Slide, {
    children: md(`
      ## Functions

      ### CSS

      \`\`\`css
      .button {
        /* Mix red and green */
        color: #840;
      }
      \`\`\`

      ### LESS

      \`\`\`css
      .button {
        color: mix(red, green);
      }
      \`\`\`
    `),
    script: md(`
      In CSS, we have no way to extend the language with our own logic.

      Say we wanted to mix two colors together.

      In CSS, we have to manually precompute the result and hard code it into
      our source.

      Preprocessors like LESS improve the situation by giving a set of builtin
      functions to do some basic things.

      But still don't allow us to define our own logic.
    `),
  }),

  el(Slide, {
    children: md(`
      ## Functions

      ### JS CSS

      \`\`\`js
      function mix(color1, color2) {
        // ...
      }

      var style = {
        ".button": {
          color: mix("red", "green"),
        }
      }
      \`\`\`
    `),
    script: md(`
      With JavaScript, we can define arbitrary functions and use them in our
      styles.

      Here we create a function that mixes two colors together.

      We can share them with the rest of our front-end logic too.
    `),
  }),

  el(Slide, {
    children: md(`
      ## Code Reuse

      \`\`\`js
      function createButtonStyles(baseColor) {
        return {
          color: baseColor,
          ":hover": {
            color: mix(baseColor, "#000"),
          },
        };
      }

      var style = {
        ".button": createButtonStyles("red"),
        ".secondary-button": createButtonStyles("#12c012"),
      }
      \`\`\`
    `),
    script: md(`
      And we're not limited to just functions that manipulate colors or operate
      on single values.

      In JavaScript, a functions are the basic unit of code reuse.

      We can use functions to generate entire sets of style declarations.

      Here we are using a function that takes in a base color and generates
      styles for a button based on that color.

      We get the same sort of code reuse as what some preprocessors call
      "mixins", except with sane scoping semantics.
    `),
  }),

  el(Slide, {
    children: md(`
      ## Tiny Modules!

      \`\`\`js
      var color = require("color");

      var style = {
        ".button": {
          color: color("red").mix("green"),
        }
      };
      \`\`\`
    `),
    script: md(`
      Of course, we
      don't have to always write our own functions, we can take advantage of
      the JavaScript ecosystem and use modules to do the work for us.

      Here we're using the *color* module from npm to mix red and green.
    `),
  }),

  // @TODO "NPM!" -- big font?
  el(Slide, {
    children: md(`
      ## npm

      Reusable style modules
    `),
    script: md(`
      We can also use npm to publish reusable style modules.

      Imagine having an ecosystem of reusable styles for things like buttons
      and tables and other common interface elements.

      All you'd have to do to use them in your codebase is "npm install" and
      "require" it.
    `),
  }),

  // @TODO "that *should* be up to you to decide"
  el(Slide, {
    children: md(`
      ## Full Programming Language

      Use a full programming language to build your styles.

      * 150,000 modules at your disposable? Yes!
      * Want to use \`Math.random()\` or \`Date.now()\`? You can!
      * Asynchronous logic to build styles? Ok…

      *Warning: With great power comes with great responsibility.*
    `),
    script: md(`
      I've shown that, yes, you *can* use JavaScript to write CSS, and that
      there's maybe some advantages in doing so.

      By using a turing-complete programming language to build styles,
      we're not limited by what our css preprocessor has implemented and
      can instead use the full power of JavaScript to implement whatever logic
      we need.

      Of course with great power comes great responsibility. Maybe it's not a
      good idea to do a network request to build your styles — but you have the
      ability to decide that on your own.
    `),
  }),

  // @TODO This is one of many possible ways we can write css using javascript
  // @TODO Recap: CSS has issues, preprocessors try to address issues, but have issues, i proposes we use javascript instead, wich is a robust and ubiqutous language that developer are already familiar with
  el(Slide, {
    children: md(`
      # Conclusion

      ## Use the Power of JavaScript
    `),
    script: md(`
      We don't need to reinvent variables, functions, scoping, or anything
      else.

      JavaScript has all of these things just waiting to be used.

      Use the power of JavaScript.

      Thanks everyone!
    `),
  }),
];

[
  el(Slide, {
    children: md(`
      ## Linters
    `),
    script: md(`
    `),
  }),

  el(Slide, {
    children: md(`
      ## UglifyJS
    `),
    script: md(`
    `),
  }),

  el(Slide, {
    children: md(`
      ## Another Way?

      \`\`\`html
      <button>Click me</button>
      \`\`\`

      \`\`\`js
      {
        ".button": {
          color: "red",
        }
      }
      \`\`\`

      Our CSS is in JavaScript. The browser runtime and the dom are in
      JavaScript…

      Is there another way?

      Maybe.

      More on this later…
    `),
    script: md(`
    `),
  }),

  el(Slide, {
    children: md(`
      Why?

      ## CSS Has Problems

      * Global Namespace
      * Cascading
      * Specificity
      * Bundling
      * Encapsulation
      * Interoperability
      * Dead Code Elimination
      * Implicit Interfaces
      * Dependencies
      * Loading
      * Lguage Extension
    `),
    script: md(`
      CSS operates on a global namespace, so we have to worry 
      everything to avoid naming conflicts. This is an even bigger
      issue for library authors who have to worry about their code
      coexisting with others.

      interop example: background based on time of day



      Why would we write CSS using JavaScript?

      CSS has some issues.

      I'll highlight few of them.
    `),
  }),

  el(Slide, {
    title: "Cascading & Specificity",
    children: md(`
      * Confusing behavior
      * Order matters
      * Fight against code

      \`\`\`css
      .container > h2 {
        font-family: Lato;
        color: #43110;
      }
      \`\`\`
    `),
    script: md(`
    `),
  }),

  el(Slide, {
    title: "Cascading & Specificity",
    children: md(`
      * Confusing behavior
      * Order matters
      * Fight against code

      \`\`\`css
      .special-heading {
        font-family: Impact;
        text-transform: uppercase;
      }
      \`\`\`

      \`\`\`html
      <div class="container">
        <h2 class="special-heading">
          Special Heading!
        </h2>
      </div>
      \`\`\`
    `),
    script: md(`
    `),
  }),

  el(Slide, {
    title: "Cascading & Specificity",
    children: md(`
      * Confusing behavior
      * Order matters
      * Fight against code

      \`\`\`css
      .special-heading,
      .container .special-heading {
        font-family: Impact;
        text-transform: uppercase;
      }
      \`\`\`
    `),
    script: md(`
    `),
  }),

  el(Slide, {
    title: "Interopability",
    children: md(`
      No interopability with JavaScript

      \`app.css\`

      \`\`\`css
      .brand-color {
        color: #bada55;
      }
      \`\`\`

      \`app.js\`

      \`\`\`js
      var canvas = document.querySelector("canvas");
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "#bada55";
      ctx.fillText("Hey there", 0, 0);
      \`\`\`

    `),
    script: md(`
    `),
  }),

  el(Slide, {
    title: "Language Extension",
    children: md(`
      No ability to extend the language.

      \`\`\`css
      .brand-color {
        color: #bada55;
        border-color: darken(#bada55, 0.1);
      }
      \`\`\`
    `),
    script: md(`
    `),
  }),

  el(Slide, {
    children: md(`
      ## How?

      CSS:

      \`\`\`css
      .button {
        color: red;
      }
      \`\`\`

    `),
    script: md(`
    `),
  }),

  el(Slide, {
    children: md(`
      ## How?

      JS:

      \`\`\`js
      var button = {
        color: "red",
      };
      \`\`\`
    `),
    script: md(`
    `),
  }),


  el(Slide, {
    children: md(`
      ## How?

      JS:

      \`\`\`js
      var button = {
        color: "red",

        ":hover": {
          color: "pink",
        },

        "@media (min-width: 320px)": {
          "font-size": "1.2em",
        },
      };
      \`\`\`

    `),
    script: md(`
    `),
  }),

  el(Slide, {
    children: md(`
      ## Call-site

      \`\`\`js
      var sheet = createSheet();

      var button = {
        color: "red",
      };

      function createButton() {
        return $("<div>")
          .attr("class", sheet.className(button));
      }
      \`\`\`
    `),
    script: md(`
    `),
  }),

  el(Slide, {
    children: md(`
      ## Call-site

      \`\`\`text
      > console.log(sheet.className(button));
      "a"

      > console.log(sheet.toString());
      ".a {
        color: red
      }"
      \`\`\`
    `),
  }),

  // 0:30
  el(Slide, {
    title: "No Global Namespace",
    children: md(`
      * Local JavaScript Variables

        \`\`\`javascript
        var buttonStyle = {
          color: "red",
        };
        \`\`\`
    `),
    script: md(`
      We refer to styles using local JavaScript variables, so we
      don't have to worry about naming conflicts in a global
      namespace.

      Because this variable is local to our current scope, we can
      gaurantee that no one else is using this style.
    `),
  }),

  el(Slide, {
    title: "Removing Unused Styles",
    children: md(`
      \`\`\`js
      var buttonStyle = {
        color: "red",
      };

      module.exports = function createButton() {
        return $("<div>")
          .attr("class", className({
            color: "pink",
          }));
      }
      \`\`\`

      Just like any other unused JavaScript code
    `),
    script: md(`
      If styles are just JavaScript variables, we can find and remove
      unused styles like we do with any other JavaScript code.

      Here we can see the \`buttonStyle\` variable isn't actually used
      anywhere, we could remove it.
    `),
  }),

  el(Slide, {
    title: "Removing Unused Styles",
    children: md(`
      \`\`\`js
      var buttonStyle = {
        color: "red",
      };

      module.exports = function createButton() {
        return $("<div>")
          .attr("class", className({
            color: "pink",
          }));
      }
      \`\`\`

      ### Linters can help

      \`\`\`text
      Line 1: 'buttonStyle' is defined but never used.
      \`\`\`
    `),
    script: md(`
      We, of course, have static analysis tooling that helps us with this.
      Linters like *eslint* can automatically find unused variables for
      us.
    `),
  }),

  el(Slide, {
    title: "Removing Unused Code",
    children: md(`
      ### Static Analysis

      Find unused style modules

      \`\`\`js
      // styles/button.js
      module.exports = {
        color: "red",
      };
      \`\`\`

      \`\`\`js
      // components/button.js
      var buttonStyles = require("../styles/button");
      module.exports = function createButton() {
        return $("<div />")
          .text("Click me!")
          .attr("class", className(buttonStyles));
      };
      \`\`\`

      \`\`\`
      $ search-requires -m styles/button.js
      components/button-styles.js
      \`\`\`
    `),
    scripts: md(`
      And if we're using *style modules*, we can use something like
      search-requires to find where exactly we're using that code from.

      Here we have the button component module that is requiring the
      button styles module. The search-requires command line tool can help
      us unravel this dependency graph and find unused code in large
      codebases.
    `),
  }),

  el(Slide, {
    title: "Dead Code Elimination",
    children: md(`
      **UglifyJS** can find and remove dead code

      \`\`\`js
      var styles = {
        color: "red",
      };

      if (false) {
        styles = {
          color: "pink";
        };
      }

      createButton(styles);
      \`\`\`
    `),
    script: md(`
      Furthermore, we can use minification tools like *UglifyJS* to
      automatically remove dead code.
    `),
  }),

  el(Slide, {
    title: "Dependencies",
    children: md(`
      ### Style Modules

      \`\`\`js
      // button-styles.js
      module.exports = {
        color: "red",
      };
      \`\`\`

      \`\`\`js
      // button.js
      var buttonStyles = require("../styles/button");
      module.exports = function createButton() {
        return $("<div />")
          .text("Click me!")
          .attr("class", className(buttonStyles));
      };
      \`\`\`
    `),
    script: md(`
      To share styles between components, we can use modules.

      Here we have the button.js module that requires the button-styles.js
      module.

      Using the module system to be explicit about our style dependencies lets
      us use tools like Browserify and Webpack to bundle styles right
      alongside our component code.

      Now when we asynchronously load JavaScript components on demand, we
      no longer have to make sure the right css file is also loaded and in
      the right order. We get them automatically.
    `),
  }),

  el(Slide, {
    title: "Interopability",
    children: md(`
      No language barrier

      \`\`\`js
      var buttonStyle = {
        color: "red",
      };
      d3.path()
        .color(buttonStyle.color);
      \`\`\`
    `),
    script: md(`
      There is no language barrier, so we're able to use values from
      styles directly in our JavaScript code.
    `),
  }),

  el(Slide, {
    title: "Cascading and Specificity",
    children: md(`
      \`\`\`js
      var xtend = require("xtend");

      var baseButtonStyle = {
        padding: "1em",
        color: "red",
      };
      var largeButtonStyle = xtend(baseButtonStyle, {
        padding: "2em",
      });

      $("<div />")
        .text("Click me!")
        .attr("class", className(largeButtonStyle));
      \`\`\`
    `),
    script: md(`
      Because we define single style objects at a time, we can avoid
      cascading and specificity altogether.

      We have the power of JavaScript to be explicit about the exact
      behavior we want.
    `),
  }),

  el(Slide, {
    title: "Language Extensions",
    children: md(`
      Functions!

      \`\`\`js
        var color = require("color");
        var buttonStyle = {
          color: "red",
          ":hover": {
            color: color.darken("red", 0.1),
          },
        };
      \`\`\`
    `),
    script: md(`
      Again, because we have the power of a full programming language, we
      can use arbitrary functions to generate the styles we want.
    `),
  }),

  el(Slide, {
    title: "Encapsulation",
    children: md(`
      \`\`\`js
      function createPurchaseButton() {
        return $("<div />")
          .text("Purchase!")
          .attr("class", "purchase-button")
          .html(
            $("<i />").attr("class", "icon")
          );
      }
      \`\`\`

      Want this button to look consistent everywhere.
    `),
    script: md(`
      Here we have a function that creates a *purchase button*. This is an
      important visual in our app and we want to make sure that it looks the
      same everywhere in our app.
    `),
  }),

  el(Slide, {
    title: "Encapsulation",
    children: md(`
      \`\`\`js
      function createPurchaseButton() {
        return $("<div />")
          .text("Purchase!")
          .attr("class", "purchase-button")
          .html(
            $("<i />").attr("class", "icon")
          );
      }
      \`\`\`

      \`\`\`css
      .my-special-component .purchase-button .icon {
        font-size: 50%;
      }
      \`\`\`

      * CSS allows modification of arbitrary nodes.
      * Probably not a problem for documents and small apps
      * Large apps and teams want to be more explicit
    `),
    script: md(`
      Here we have a function that creates a *purchase button*. This is an
      important visual in our app and we want to make sure that it looks the
      same everywhere.

      But CSS selectors function in a global namespace, so you're able to
      target any arbitrary dom node.

      We have no control over the internals of our components getting
      styled in unexpected ways.

      Here we have someone that decided they want their purchase button to
      have a smaller icon.

      We can use naming conventions (like BEM) and documentation to
      discourage this, but we don't have a real way to prevent it.

      When you think about the original use case of the web: documents,
      this isn't a big deal, and maybe even considered a feature.

      But in large apps with lots of people working on them, we want
      to really think about our visuals and create explicit interfaces to
      modify them.

      So now if we want to refactor the internals of this component, we
      have to inspect all call sites to make sure they don't break.

      Now when we go to change the implementation of our purchase button,
      it's not clear what we need to continue supporting. If the
      font-based icon gets changed to an image icon, the resize is going
      to break. We have to inspect all call sites to see how the component is
      getting modified.

      This forces us to think about the different ways a visual can be
      used and results in more consistent looking interfaces.
    `),
  }),

  el(Slide, {
    title: "Encapsulation",
    children: md(`
      \`\`\`js
      var xtend = require("xtend");
      function createPurchaseButton(opts) {
        var buttonStyles = {
          // ...
          ".icon": xtend({
            // ...
          }, opts.iconStyle),
        };
        return $("<div />")
          .text("Purchase!")
          .attr("class", className(buttonStyles))
          .html(
            $("<i />").attr("class", "icon")
          );
      }
      \`\`\`

      \`\`\`js
        createPurchaseButtion({
          iconStyles: {
            "font-size": "50%",
          },
        });
      \`\`\`

      Similar functionality: allow call site to modify icon styles.
    `),
    script: md(`
      Here we are achieving the same functionality as before, allowing the
      icon styles to be modified arbitrarily by the call site.
    `),
  }),

  el(Slide, {
    title: "Encapsulation",
    children: md(`
      \`\`\`js
      var xtend = require("xtend");
      function createPurchaseButton(opts) {
        var buttonStyles = {
          // ...
          ".icon": {
            // ...
            color: opts.iconColor || "#bada55",
          },
        };
        return $("<div />")
          .text("Purchase!")
          .attr("class", className(buttonStyles))
          .html(
            $("<i />").attr("class", "icon")
          );
      }
      \`\`\`

      \`\`\`js
        createPurchaseButtion({
          iconColor: "blue",
        });
      \`\`\`

      Create an explicit interface
    `),
    script: md(`
      Here we've created an explicit interface for modifying the button
      styles in a way we support.
    `),
  }),

  el(Slide, {
    title: "Colocating",
    children: md(`
      * DOM structure and styles are inherently coupled
      * If both defined with JavaScript, they can live in same file
      * Easier to reason about why something looks a certain
    `),
    script: md(`
      If we use JavaScript to define our dom structure, and JavaScript to
      define our styles, then they can both live in the same file.

      DOM structure and styles are inherently coupled, having them
      together helps reason about why something looks a certain way on the
      screen.

      We don't need to rely on naming conventions to find the right css
      file.
    `),
  }),

  el(Slide, {
    title: "Compression",
    children: md(`
      \`\`\`js
        var buttonStyles1 = {
          padding: "1em",
          border: "none",
          color: "blue",
        };

        var buttonStyles2 = {
          padding: "1em",
          border: "none",
          color: "red",
        };

        $("<div />")
          .attr("class", className(buttonStyles1));

        $("<div />")
          .attr("class", className(buttonStyles2));
      \`\`\`

      \`\`\`html
        <div class="buttonStyles1" />
        <div class="buttonStyles2" />
      \`\`\

      \`\`\`css
        .buttonStyles1 {
          padding: 1em;
          border: none;
          color: blue;
        }

        .buttonStyles2 {
          padding: 1em;
          border: none;
          color: red;
        }
      \`\`\`

      \`\`\`html
        <div class="a b" />
        <div class="a c" />
      \`\`\

      \`\`\`css
        .a {
          padding: 1em;
          border: none;
        }

        .b {
          color: blue;
        }

        .c {
          color: red;
        }
      \`\`\`
    `),
    script: md(`
      Since we're generating class names and css, we can optimize for
      payload size.

      We can factor out common styles into separate classes and minify
      class names.

      We can also optimize to get the most out of gzip by putting
      repeating symbols closer together.
    `),
  }),

  el(Slide, {
    title: [
      "Best of All:",
      el("br"),
      "Easier to Make Changes",
    ],
    children: md(`
      ### Explicit Dependencies

      Change dom without worrying about unknown selectors breaking.

      ### Local Scope

      Change styles without worrying about unknown elements breaking.

      ### Explicit Interfaces

      Refactor internals without worrying about call sites breaking.
    `),
    script: md(`
      Ok! My last point and what I think is the most important advantage
      of writing styles this way.

      It becomes easier to make changes.

      You can change dom structure without worrying about a selector in
      some unknown file breaking.

      You can change styles without worrying about it affecting elements
      on some unknown page.

      You can define explicit interfaces, so you can later refactor
      internals without worrying about every call site and implicit
      dependencies.
    `),
  }),
];
