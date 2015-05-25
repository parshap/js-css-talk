"use strict";

var React = require("react");
var el = React.createElement;
var marked = require("marked");
var stripIndent = require("strip-indent");
var xtend = require("xtend");

var mn = {
  margin: "0",
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
      What?

      ## Write CSS using JavaScript

      A strategy for styling **reusable interface components**

      ... using JavaScript

      Take advantage of JavaScript tooling and best practices

      Which turn out to be helpful for writing **modular** and
      **reusable** styles.
    `),
    script: md(`
    `),
  }),

  el(Slide, {
    children: md(`
      JavaScript Components

      Works best with components *defined in JavaScript*

      \`\`\`js
      function createButton() {
        return $("<div>")
          .attr("class", "button")
          .append($("<span>").text("Click me"))
          .append($("<i>").attr("class", "icon"))
      }
      \`\`\`
    `),
    script: md(`
      While not a strict requirements I think this is some words
      that's menu you're using JavaScript find your components
    `),
  }),

  el(Slide, {
    children: md(`
      ## JavaScript Components

      * React / JSX
      * hyperscript
      * mercury
      * new-element
      * jQuery
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
      * Language Extension
    `),
    script: md(`
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
