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

// @TODO spell check
// @TODO: Remove extra commas (everywhere)

module.exports = [
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
    script: md(`
      Hi everyone!

      My name is Parsha

      I'm going to talk about CSS and JavaScript
    `),
  }),

  el(Slide, {
    children: md(`
      ## Parsha Pourkhomami

      @parshap
      https://github.com/parshap
      https://twitter.com/parshap
    `),
    script: md(`
      First let me tell you a tiny bit about myself.

      I'm a computer scientist and software engineer.

      I work at a tiny company called *aboutLife*, where we're trying to make
      it easier to get long-term financial advice.

      I've been hacking on websites and writing JavaScript and CSS since the
      mid '90s.

      And I'm passionate about enabling other developers and making their lives easier.

      So I like working on tooling, libraries, and general patterns.

      You can find me on GitHub and Twitter and various other places under the handle *parshap*.
    `),
  }),


  // @TODO Big
  el(Slide, {
    children: md(`
      ## Ideas, Not Code
    `),
    script: md(`
      Before I start, I want to warn you. This talk is about ideas, not code.

      Even though I'm going to be showing a lot of code, I'm not neccesarily saying it's a good idea or if it will even work.

      My goal here is to get you guys thinking. I want to hear your thoughts. So if you think something is awesome and could solve your problems, or you think I'm crazy, come find me and tell me!
    `),
  }),

  // @TODO big type
  el(Slide, {
    children: md(`
      ## CSS is Great
    `),
    script: md(`
      Before we talk about JavaScript, let's talk about CSS.
      CSS enables us to take website that looks like this.
    `),
  }),

  el(Slide, {
    children: el("img", {
      style: imgStyle,
      src: "/images/virginamerica-nocss.png",
    }),
    script: md(`
      This is Virgin America's website without any CSS.

      Something that's not very friendly or visually appealing
    `),
  }),

  el(Slide, {
    children: el("img", {
      style: imgStyle,
      src: "/images/virginamerica-css.png",
    }),
    script: md(`
      And turn it into this!

      CSS even makes Craigslist look better. Going from this.
    `),
  }),

  el(Slide, {
    children: el("img", {
      style: imgStyle,
      src: "/images/craigslist-nocss.png",
    }),
    script: md(`
      To this.
    `),
  }),

  el(Slide, {
    children: el("img", {
      style: imgStyle,
      src: "/images/craigslist-css.png",
    }),
    script: md(`
      And I thought Craigslist didn't even use css!
    `),
  }),

  el(Slide, {
    children: null,
    script: md(`
      ~ *BLANK* ~

      Aside from enabling rich user interfaces, CSS also lets us create cool
      animations and other visual affects.
    `),
  }),

  el(Slide, {
    children: el("div", {
      dangerouslySetInnerHTML: {
        __html: fs.readFileSync(__dirname + "/twitter-failwhale.html"),
      },
    }),
    script: md(`
      Like this Twitter Fail Whale.

      Which uses clever combinations of CSS properties to create various shapes
      and keyframe animations to animate them.
    `),
  }),

  el(Slide, {
    children: el("div", {
      dangerouslySetInnerHTML: {
        __html: fs.readFileSync(__dirname + "/space-animation.html"),
      },
    }),
    script: md(`
      And this cool animation — whatever it is.

      This animation utilizes the GPU to composite several layers together and
      rotate them on top of eachother.
    `),
  }),

  // @TODO
  el(Slide, {
    children: md(`
      ## CSS vs OpenGL
    `),
    script: md(`
      It's great because, as developers, we're able to take advantage of
      advanced graphics rendering techniques by writing just a few lines of
      high-level declarattive code.

      Instead of low-level procedural code like this.
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
    // @TODO Fragments
    children: md(`
      ## But CSS Has Limitations

      * No constants or variables
      * No way to extend the language
      * Bad dependency management
      * No code sharing or reuse
      * No interopability with JS

      Sometimes limitations are good. Sometimes not.
    `),
    script: md(`
      But CSS does have its fair share of issues and limitations.

      * There's no way to define constants
      * There's no way to extend the language with our own logic and functions
      * There's basically no module system or dependency management — all we have is the \`@import\` statement which has restricting performance characteristics
      * There's no unit of code reuse or meta programming
      * And there's no interopability between CSS and the rest of our front-end code

      Sure, sometimes these limitations are okay and they can even force us to
      write straight-forward easy to understand code.

      But in large apps, these limitations often lead us to copy-and-pasted and
      hard-to-maintain code.
    `),
  }),

  // @TODO Improve styling - word cloud
  el(Slide, {
    children: md(`
      ## But Preprocessors!

      LESS, Stylus, Sass, SCSS, Rework, DtCSS, Switch CSS, Compass, CSS-Crush, Clay, Myth, Resin, Styl
    `),
    script: md(`
      We've been able to work around a lot of these issues by creating new
      languages we call CSS preprocessors.
    `),
  }),

  el(Slide, {
    children: md(`
      ## But Preprocessors Are Weird…

      * Ambiguous syntax
      * Non-standard semantics
      * *Almost* a real language, but not quite
    `),
    script: md(`
      But preprocessors are weird.

      They often have ambiguous syntax and non-standard semantics.

      They give us features that look and smell like things we're used to,
      like functions, but then their behavior is different in unexpected ways.

      Let me show a couple of examples of what I mean.
    `),
  }),

  el(Slide, {
    children: [
      md(`
        ## Stylus
      `),
      el(TwoColumns, {
        left: [
          md(`
            ### Source

            \`\`\`stylus
            form
              color #ccc
              .field input
              .field textarea
                font Comic Sans
            \`\`\`
          `),
        ],
        // @TODO Fragment
        right: [
          md(`
            ### Compiled

            \`\`\`css
            form {
                color: #ccc;
            }
            form .field input,
            form .field textarea {
                font: Comic Sans;
            }
            \`\`\`
          `),
        ],
      }),
    ],
    script: md(`
      Let's take a look at Stylus first.

      For those of you who are not familiar with Stylus, it has very terse
      syntax, getting rid of things like curly braces and semicolons and uses
      indentation to determine what block you're in.

      And here's the compiled output.

      We get pretty much what we expected - a form selector with color, and
      font on inputs and textareas.

      But what would happen if we accidentally swapped two lines with each
      other.
    `),
  }),

  el(Slide, {
    children: [
      md(`
        ## Stylus: Ambiguous Syntax
      `),
      el(TwoColumns, {
        left: [
          md(`
            ### Source

            \`\`\`stylus
            form
              .field input
              color #ccc
              .field textarea
                font Comic Sans
            \`\`\`
          `),
        ],
        // @TODO Fragment
        right: [
          md(`
            ### Compiled

            \`\`\`css
            form .field input,
            form color #ccc,
            form .field textarea {
                font: Comic Sans;
            }
            \`\`\`
          `),
        ],
      }),
    ],
    script: md(`
      I don't know if you guys saw what happened, let me do it again.

      The line with the color property declaration got swapped with the input
      selector below it.

      Well this no longer makes sense. What do you guys think will happen?
      Hopefully we get a compile-time error about this.

      Nope. Stylus gets a bit confused and instead thinks the color declaration
      is a selector. The output is still valid CSS, so there's no error.

      Hopefully the developer catches this, but it's going to take some effort
      to debug.
    `),
  }),

  el(Slide, {
    children: null,
    script: md(`
      ~ * TRANSITION * ~

      Alright… that was weird… but ok. Let's look at LESS.
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
    script: md(`
      LESS gives us a way to import dependencies.
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
    script: md(`
      Actually, less gives us 8 ways to import dependencies.

      Each way with its own different semantics.

      Actually… some of them have the same semantics as others under certain
      conditions, like depending on the file extension.

      Basically you end up having to look at the docs every time you need to do
      this.
    `),
  }),

  el(Slide, {
    children: null,
    script: md(`
      ~ * TRANSITION * ~

      Alright… let's move on.
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
    script: md(`
      LESS lets us do basic arithmetic.

      Here we see 10px - 2px is 8px. Great.
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
    script: md(`
      But you better be careful with spaces, beacuse adding or removing a space
      might change the result. That's right — whitespace sensitive math.
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
    script: md(`
      And be careful with adding parenthesis too, because that will change the
      behavior too.
    `),
  }),

  el(Slide, {
    children: null,
    script: md(`
      ~ * TRANSITION * ~

      Aright. So you just need to be *real* careful when doing arithmetic.

      What else can LESS do?
    `),
  }),

  el(Slide, {
    children: md(`
      ## LESS: Unit Conversion

      \`\`\`less
      body {
        font-size: 10cm - 1cm;  /* 9cm */
        font-size: 10cm - 10mm; /* 9cm */
      }
      \`\`\`
    `),
    script: md(`
      LESS has this awesome feature. It can automatically convert units for us.

      \`10cm - 1cm\` is \`9cm\`.

      And if we switch up the units,
      \`10cm\` - \`10mm\` is still \`9cm\`. Same values, different units. Both
      still equal to 9cm. Makes sense.

      Let's see this in action with division!
    `),
  }),

  el(Slide, {
    children: md(`
      ## LESS: Unit Conversion

      \`\`\`less
      body {
        font-size: 10cm - 1cm;  /* 9cm */
        font-size: 10cm - 10mm; /* 9cm */
        font-size: 10cm / 1cm;  /* 10cm */
      }
      \`\`\`
    `),
    script: md(`
      When we have the same units, \`10cm / 1cm\`, things work as you'd expect. We
      get \`10cm\`.
    `),
  }),

  el(Slide, {
    children: md(`
      ## LESS: Unit Conversion

      \`\`\`less
      body {
        font-size: 10cm - 1cm;  /* 9cm */
        font-size: 10cm - 10mm; /* 9cm */
        font-size: 10cm / 1cm;  /* 10cm */
        font-size: 10cm / 10mm; /* 1cm */
      }
      \`\`\`
    `),
    script: md(`
      But be careful, because if you mix units when you're doing division, you're gonna have a bad
      time. Unit conversions silently fail with division.

      When we do \`10cm / 10mm\`, LESS ignores the unit on the second number and
      gives us the unexpected result: 10cm.
    `),
  }),

  el(Slide, {
    children: null,
    script: md(`
      ~ * TRANSITION * ~

      Alright. Let's look at variables.
    `),
  }),

  // @TODO Fragments
  el(Slide, {
    children: [
      el("h2", {
        children: "Variable Values",
      }),
      el(TwoColumns, {
        left: [
          md(`
            ### SCSS

            \`\`\`css
            $headingColor: red;
            h2 {
              color: $headingColor;
            }
            $headingColor: white;
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
        right: [
          md(`
            ### LESS

            \`\`\`css
            @headingColor: red;
            h2 {
              color: @headingColor;
            }
            @headingColor: white;
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
      }),
    ],
    script: md(`
      First let's look at how Sass handles variables.

      We have a variable, \`headingColor\` that's used to declare the color in
      h2 elements. But the variable is assigned a value twice. Once before we
      use it, and once after we use it.

      Is it clear what the compiled result is going to be?

      With Sass, we get the value from the first asignment.

      Now let's look at LESS. We have the same thing, a variable that gets
      assigned a value twice, and we're using it once in between the two
      assignments.

      What do you think the result is going to be?

      Well, it's the opposite as Sass. LESS uses the last value assigned to a
      variable, regardless of where you're using it.
    `),
  }),

  el(Slide, {
    children: null,
    script: md(`
      ~ * TRANSITION * ~

      Okie doke. Let's look at scoping.
    `),
  }),

  // @TODO
  // Show nasty trap if you don't expect this
  // "Most programmers don't expect this because they come from others langauges where this doesnt' happen"
  el(Slide, {
    children: md(`
      ## Variable Scoping
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

      Syntax, scoping, types, compilers, error handling. These are all
      complicated things.

      It's understandable that these preprocessor languages have gotten
      some of these things wrong.
    `),
  }),

  el(Slide, {
    children: null,
    script: md(`
      ~ * TRANSITION * ~

      Alright. So CSS is cool. But it has some issues.

      Preprocessors solve some of these issues, but have problems of their own.

      Is there a better way?
    `),
  }),

  // @TODO Big type - heading/subheading?
  el(Slide, {
    children: md(`
      ## JS CSS

      Can JS do CSS better?
    `),
    script: md(`
      Could we use JavaScript to write CSS in a better way?

      Well, let's take a look at what using JavaScript to write CSS might
      look like. Let's express a CSS rule in JavaScript.
    `),
  }),

  // @TODO Fragments
  el(Slide, {
    children: [
      md(`
        ## CSS
      `),
      el(TwoColumns, {
        left: md(`
          ## CSS

          \`\`\`css
          /* styles.css */
            .button {
              color: red;
            }
          \`\`\`
        `),
        right: md(`
          ## JS

          \`\`\`js
          var styles = {
            ".button": {
              color: "red",
            }
          };
          \`\`\`
        `),
      }),
    ],
    script: md(`
      Let's start with this rule. Here it is in CSS. A red button.

      Alright, now let's convert it to JavaScript.

      There. It's actually not too different. We basically add some quotes,
      swap the semicolon for a comma, and we've got valid JavaScript!

      Alright, so that's a pretty basic rule. What if we wanted to style the
      hover state of our button?
    `),
  }),

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
      Here's what a pseudo selector could look like.

      Not much different from CSS or one of our preprocessors.
    `),
  }),

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
      We could also nest child selectors in a similar fashion.

      Nothing too surprising here I hope.
    `),
  }),

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
      Here's adding a media query.
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
      Sometimes in CSS we want to define a property more than once. We do this
      to provide fallacks for browsers that don't support something.

      In JS we'll use arrays to define more than one value for a property.
    `),
  }),

  el(Slide, {
    children: null,
    script: md(`
      ~ * TRANSITION * ~

      So we've got rules with selectors, pseudo selectors, child selectors, any kind of selector really.
      And we've got property fallbacks, media queries, and all kinds of at-rules.

      Well… that's essentially all of CSS.
    `),
  }),

  el(Slide, {
    children: md(`
      # Yes!

      We can *express* CSS using JS.
    `),
    script: md(`
      So it's safe to say, we *can* express it all using JavaScript.

      And it's simple too! We're just using literal expressions —
      essentially json.
    `),
  }),

  el(Slide, {
    children: md(`
      ## How to Use in Browser

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
      But, so far, we've only seen how to to *express* CSS using JavaScript.

      We've got these Plain Old JavaScript Objects containing CSS rules and
      whatnot, but how do we actually use this to style elements in a browser?
    `),
  }),

  el(Slide, {
    children: md(`
      ## How to Use in Browser

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

      Now we can use this function to generate actual CSS for the browser to use.
    `),
  }),

  // @TODO fragments?
  el(Slide, {
    children: md(`
      # Yes!

      We can *express* CSS using JS.

      We can *use* CSS using JS.

      But *why*?
    `),
    script: md(`
      So yes! We can *express* CSS using JavaScript.

      And we can *use* it to actually style elements in the browser.

      But would we actually want to do this? Are there advantages?
    `),
  }),

  el(Slide, {
    children: md(`
      ## *Why* JS CSS?

      * Constants and variables
      * Extend the language (functions)
      * Code sharing / reuse
      * Module and dependency management
      * Interoperability
    `),
    script: md(`
      To start with, remember the issues and limitations of CSS that I talked about earlier? The reasons in which we've invented new languages?

      Well JavaScript addresses these issues for us automatically.

      Let me show you what I mean.
    `),
  }),

  // @TODO Fragments?
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

      LESS and Sass both give us this ability, but they have their own unique
      and weird semantics.
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
      JavaScript has variables builtin! And with sane understandable semantics.

      We can use them to define our constants in one place.
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
      * JavaScript also has arithmetic built in!
      * \`10 - 2 px\` is \`8px\`.
      * But best of all, unlike *some* css preprocessors, it doesn't matter how many spaces or parenthesis you use.
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
          margin: ((((10 - 2)))) + "px" // 8px
        },
      };
      \`\`\`
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
          margin: ((((10 - 2)))) + "px" // 8px
          margin: ((((((((((10 - 2)))))))))) + "px" // 8px
        },
      };
      \`\`\`
    `),
    script: md(`
      It's all the same… just as God intended math to be.
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

  // @TODO Fragments
  // @TODO Add comments later?
  el(Slide, {
    children: md(`
      ## Share Constants

      \`\`\`css
      /* styles.css */
      .button {
        color: red; /* KEEP SYNC WITH app.js */
      }
      \`\`\`

      \`\`\`js
      /* app.js */
      var canvas = document.querySelector("canvas");
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "red"; /* KEEP SYNC WITH styles.css */
      ctx.fillText("Hello!", 0, 0);
      \`\`\`
    `),
    script: md(`
      * With CSS we have no way of sharing values between CSS and our front-end
        code.
      * For example, at the top, we have some CSS code that defines a color.
      * Then, we have some JavaScript code that draws to a canvas.
      * We want the canvas drawing to match the color we have in CSS.
      * You guys have probably run into something like this before. You end up having to leave these nasty comments letting other developers know they need to update both places when one changes.
    `),
  }),

  el(Slide, {
    children: md(`
      ## Share Constants

      \`\`\`js
      /* styles */
      var buttonColor = "red";

      var style = {
        ".button": {
          color: buttonColor,
        }
      }

      /* app */
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
      Of course we don't need everything to be in a single file.

      We can use modules to to organize our styles and import dependencies.

      And it's just JavaScript,
      so we can import constants, functions, or anything else!
    `),
  }),

  // @TODO "NPM!" -- big font?
  el(Slide, {
    children: md(`
      ## npm!

      * Best. Package. Manager.
      * 150,000+ modules
      * Reusable style modules
      * Utility modules
    `),
    script: md(`
      * And speaking of modules, we can take advantage of npm!
      * Not only do we have access to the 150,000+ modules
      * We can also use npm to publish reusable style modules.

      Imagine having an ecosystem of reusable styles for things like buttons
      and tables and other common interface elements.

      Or utility modules that help build styles

      For example a module that takes a
      background color and automatically generate a foreground color with
      good contrast. (*Spoiler*: There's already a module for that.)
    `),
  }),

  // @TODO "that *should* be up to you to decide"
  // @TODO Merge with conclusion?
  el(Slide, {
    children: md(`
      ## JS CSS

      Use a full programming language to build your styles.

      * 150,000 modules at your disposable? Yes!
      * Want to use \`Math.random()\` or \`Date.now()\`? You can!
      * Asynchronous logic to build styles? Ok…

      *Warning: With great power comes with great responsibility.*
    `),
    script: md(`
      I've shown the advantages of using JavaScript to write CSS.



      I've shown that, yes, you *can* use JavaScript to write CSS, and that
      there's advantages in doing so.

      By using a turing-complete programming language to build styles,
      we're not limited by what our css preprocessor has implemented and
      can instead use the full power of JavaScript to implement the logic
      we need.

      Of course with great power comes great responsibility. Maybe it's not a
      good idea to do a network request to build your styles — but that should
      be up to you to decide.

      ----

      We don't need to reinvent variables, functions, scoping, or anything
      else.

      JavaScript has all of these things just waiting to be used.

      Use the power of JavaScript.

      Thanks everyone!
    `),
  }),

  el(Slide, {
    children: md(`
      ## What Else Can We Do?
    `),
    script: md(`
      If we have our styles in JavaScript, what else does that enable?

      There's a couple of things that are worth thinking about.
    `),
  }),

  el(Slide, {
    children: md(`
      ## Warning: Mad Science
    `),
    script: md(`
      And, consider the following highly experimental thinking. I don't know if any of this is a good idea, or if it will even work. So think about it, and give me your feedback.

      Again, I don't know if any of this is a good idea or if it will even work, so think about it and give me your feedback!
    `),
  }),

  el(Slide, {
    children: md(`
      ## Runtime CSS
    `),
    script: md(`
      One thing we could do, is generate CSS at runtime in the browser.

      So say our CSS is defined in JavaScript like I've been talking about, and we use that JavaScript to generate CSS source for the browser to use.

      There's two approaches to get that css source to the browser. One would be to generate our css source statically on the server, and send css files to the browser.

      However, another approach would be to instead send the JavaScript source to the browser, and generate the CSS at runtime in the browser and inject a \`<style>\` tag with the css source into the document.
    `),
  }),

  el(Slide, {
    children: md(`
      ## Runtime CSS

      * Send JavaScript to browser instead of CSS
      * Generate CSS at runtime in browser
    `),
    script: md(`
      To recap:

      We would send JavaScript to the browser instead of CSS.

      And then we would use that JavaScript to generate our CSS.
    `),
  }),

  el(Slide, {
    children: md(`
      ## Runtime CSS: Bundling and Loading

      * Solve bundling once: For JavaScript
      * No CSS to bundle
      * On-demand loading
      * Similar to Webpack's \`css-loader\` or Browserify's \`brfs\`
    `),
    script: md(`
      So why would we do this?

      The browser is going to need just JavaScript to generate your CSS. Not any actual CSS.

      Assuming you've got a solution for bundling and loading JavaScript, say using Browserify or Webpack, you now have a solution for getting your CSS to the browser too.

      And if you've split up your JavaScript bundle to be able to load components on-demand, you will also get on-demand loading of your CSS for free!

      That's kind of neat. Webpack and Browserify have other approaches to doing similar things, but maybe this is better. And I think generating CSS in the browser let's us do other things, so bear with me.
    `),
  }),

  el(Slide, {
    children: md(`
      ## \`@supports\`
    `),
    script: md(`
      CSS has a new feature called css feature queries.

      It's kind of like media queries, but instead of testing things like the
      device width, it lets us test if the browser supports a certain css
      feature.
    `),
  }),

  // @TODO Add bullets about polyfilling
  el(Slide, {
    children: md(`
      ## \`@supports\`

      \`\`\`css
      @supports (display: flex) {
        div { display: flex; }
      }

      @supports not (display: flex) {
        div { float: left; }
      }
      \`\`\`
    `),
    script: md(`
      This example lets us use flexbox if the browser supports it, otherwise we
      use float.

      Unfortunately, many browsers don't support feature queries yet.

      Now, let's go back to generating CSS at runtime.

      By generating CSS at runtime, we're able to have information about the browser environment when we're deciding what our CSS should be.

      This means that we can polyfill the \`@supports\` rule.

      When we come across a \`@supports\` rule, we would do the feature detection in JavaScript, and then decide whether or not to include the rules based on the result.

      So with our example, when we come across those rules, we can do flexbox feature detection in JavaScript, and then determine if we should include the flex rule, or the float rule.
    `),
  }),

  el(Slide, {
    children: md(`
    `),
    script: md(`
      One of the browser's roles in CSS is using selectors to match elements in the document to apply styles to.

      What if we did this ourselves?

      This means we would iterate each CSS rule, find elements that match the selector (by using querySelectorAll), and then use \`element.style\` to apply the styles.

      Why would we do this? Again, it's about having more information.

      This time we would have information about the hierarchy of elements in the document when we're applying styles to an element. Meaning that for each element, we could see what it's parent is, how many siblings it has, what it's children are. We would know exactly where in the document's hierarchy that element is.

      This information lets us polyfill even more CSS features.

      Take \`:first-child\` and \`:last-child\` for example.

      If we know the number of siblings an element has, we can determine if it's the first child or not, and if it's the last child or not.

      That's not too useful since most browsers support \`:first-child\` and \`:last-child\`.

      But, with the same information about the document's hierarchy, we can polyfill something infinitely more useful: flexbox.
    `),
  }),

  el(Slide, {
    children: md(`
    `),
    script: md(`
      Flexbox is a css layout module that makes it easy to express all the crazy things we do with floats and tables and various layout hacks. It also enables the holy grail of css: robust vertical centering.

      If we know the flexbox styles we want to apply to an element, and we know it's parents and children and all of their styles, we *should* be able to calculate the dimensions and positions of all the elements.

      In fact, there is already an npm module that calculates the layout of a tree of flexbox nodes, we would just need to get it the right inputs at the right time.

      So I'll leave you with that. Come find me to talk about any of this, or you can tweet at me @parshap. Thanks for your time!
    `),
  }),


  // @TODO This is one of many possible ways we can write css using javascript
  // @TODO Recap: CSS has issues, preprocessors try to address issues, but have issues, i proposes we use javascript instead, wich is a robust and ubiqutous language that developer are already familiar with
  el(Slide, {
    children: md(`
      # Conclusion

      ## Use the Power of JavaScript

      *Disclaimer: With great power comes with great responsibility.*
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
