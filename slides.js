"use strict";

var React = require("react");
var el = React.createElement;
var marked = require("marked");
var stripIndent = require("strip-indent");
var xtend = require("xtend");
var fs = require("fs");

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
  propTypes: {
    title: React.PropTypes.node,
    children: React.PropTypes.node,
    notes: React.PropTypes.node,
    style: React.PropTypes.object,
  },

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
        this.props.notes && el("aside", {
          className: "notes",
          children: el("div", {
            style: {
              "font-size": "85%",
            },
            children: this.props.notes,
          }),
        }),
      ],
    });
  },
});

var ScreenSlide = React.createClass({
  statics: {
    hideInPrint: true,
  },

  render: function() {
    return el(Slide, this.props);
  },
});

// An empty slide used to pause for transition purposes
var TransitionSlide = React.createClass({
  propTypes: {
    title: React.PropTypes.node,
    children: React.PropTypes.node,
    notes: React.PropTypes.node,
    script: React.PropTypes.node,
    style: React.PropTypes.object,
  },

  statics: {
    hideInPrint: true,
  },

  render: function() {
    return el(ScreenSlide, {
      title: null,
      children: null,
      style: null,
      script: this.props.script,
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

var VerticalCenter = React.createClass({
  render: function() {
    return el("div", {
      style: {
        "display": "flex",
        "height": "100%",
        "align-items": "center",
      },
      children: el("div", {
        style: {
          width: "100%",
        },
        children: this.props.children,
      }),
    });
  },
});

var BigHeading = React.createClass({
  render: function() {
    return el(VerticalCenter, {
      children: [
        el("h1", {
          style: {
            "text-align": "center",
          },
          children: this.props.heading
        }),
        this.props.subHeading && el("h2", {
          style: {
            "text-align": "center",
          },
          children: this.props.subHeading
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
    notes: md(`
      * https://twitter.com/parshap
      * https://github.com/parshap
      * parshap@gmail.com
    `),
    script: md(`
      Hi everyone!

      My name is Parsha

      I'm going to talk about mixing JavaScript and CSS
    `),
  }),

  el(Slide, {
    children: el(BigHeading, {
      heading: "Ideas, Not Code",
    }),
    notes: md(`
      Not proposing any production-ready code, just ideas to think about.

      Give me your feedback.
    `),
    script: md(`
      Before I start, I want to warn you. This talk is about ideas, not code.

      Even though I'm going to be showing a lot of code, I'm not neccesarily saying it's a good idea or if it will even work.

      My goal here is to get you guys thinking. I want to hear your thoughts. So if you think something is awesome and could solve your problems, or you think I'm crazy, come find me and tell me!
    `),
  }),

  el(Slide, {
    children: el(BigHeading, {
      heading: "CSS",
    }),
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
    notes: md(`
      CSS enables rich interfaces for websites.

      This is virginamerica.com *without* css.
    `),
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
    notes: md(`
      virginamerica.com *with* css
    `),
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
    notes: md(`
      craigslist.com *without* css
    `),
    script: md(`
      To this.
    `),
  }),

  el(Slide, {
    children: el("img", {
      style: imgStyle,
      src: "/images/craigslist-css.png",
    }),
    notes: md(`
      craigslist.com *with* css

      *(craigslist uses css?)*
    `),
    script: md(`
      And I thought Craigslist didn't even use css!
    `),
  }),

  el(TransitionSlide, {
    script: md(`
      ~ *BLANK* ~

      Aside from enabling rich user interfaces, CSS also lets us create cool
      animations and other visual affects.
    `),
  }),

  el(Slide, {
    children: el("div", {
      className: "dn--print",
      dangerouslySetInnerHTML: {
        __html: fs.readFileSync(__dirname + "/space-animation.html"),
      },
    }),
    notes: md(`
      CSS also enables animations and other visual effects.
    `),
    script: md(`
      Like whatever this thing is.

      This animation utilizes the GPU to composite several layers together and
      rotate them on top of eachother.

      We're able to take advantage of advanced graphics rendering techniques
      by writing just a few lines of high-level declarattive code.
    `),
  }),

  el(Slide, {
    children: el(VerticalCenter, {
      children: el("img", {
        style: imgStyle,
        src: "/images/css-is-awesome.jpg",
      }),
    }),
    script: md(`
      So yeah, CSS is pretty awesome.
    `),
  }),

  el(Slide, {
    children: md(`
      ## But CSS Has Limitations

      * No constants or variables
      * No way to extend the language
      * Bad dependency management
      * No code sharing or reuse
      * No interoperability with JS

      Sometimes limitations are good. Sometimes not.
    `),
    notes: md(`
      Limitations can be good and force us to write easy to understand code.

      Limitations can also encourage copy-and-pasted and hard-to-maintain code.

      Depends on the app.
    `),
    script: md(`
      But CSS does have its fair share of issues and limitations.

      * There's no way to define constants
      * There's no way to extend the language with our own logic and functions
      * There's basically no module system or dependency management — all we have is the \`@import\` statement which has restricting performance characteristics
      * There's no unit of code reuse or meta programming
      * And there's no interoperability between CSS and the rest of our front-end code

      Sure, sometimes these limitations are okay and they can even force us to
      write straight-forward easy to understand code.

      But in large apps, these limitations often lead us to copy-and-pasted and
      hard-to-maintain code.
    `),
  }),

  el(Slide, {
    children: [
      md(`
        ## But Preprocessors!
      `),
      el(TwoColumns, {
        left: [
          md(`
            * LESS
            * Stylus
            * Sass
            * DtCSS
            * Switch CSS
            * Compass
            * CSS-Crush
          `),
        ],
        right: [
          md(`
            * SCSS
            * Rework
            * Clay
            * Myth
            * Resin
            * Styl
          `),
        ],
      }),
    ],
    notes: md(`
      Work around CSS limitations with preprocessors.
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

  el(ScreenSlide, {
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
              color #ccc
              .field input
              .field textarea
                font Comic Sans
            \`\`\`
          `),
        ],
        right: null,
      }),
    ],
    script: md(`
      Let's take a look at Stylus first.

      For those of you who are not familiar with Stylus, it has very terse
      syntax, getting rid of things like curly braces and semicolons and uses
      indentation to determine what block you're in.

      Take a look at this example. Here's the compiled output.
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
              color #ccc
              .field input
              .field textarea
                font Comic Sans
            \`\`\`
          `),
        ],
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
    notes: md(`
      Stylus syntax is terse, but ambiguous
    `),
    script: md(`
      We get pretty much what we expected - a form selector with color, and
      font on inputs and textareas.

      But what would happen if we accidentally swapped two lines with each
      other.
    `),
  }),

  el(ScreenSlide, {
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
              color #ccc
              .field input
              .field textarea
                font Comic Sans
            \`\`\`
          `),
        ],
        right: null,
      }),
    ],
  }),

  el(ScreenSlide, {
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
        right: null,
      }),
    ],
    script: md(`
      I don't know if you guys saw what happened, let me do it again.

      The first two lines are swapping.

      Well this no longer makes sense. What do you guys think will happen?
      Hopefully we get a compile-time error about this.
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
    notes: md(`
      Two lines are accidentally swapped.

      Stylus thinks color declaration is a selector. Output is valid CSS, there
      is no error.
    `),
    script: md(`
      Nope. Stylus gets a bit confused and instead thinks the color declaration
      is a selector. The output is still valid CSS, so there's no error.

      Hopefully the developer catches this, but it's going to take some effort
      to debug.
    `),
  }),

  el(TransitionSlide, {
    children: null,
    script: md(`
      ~ * TRANSITION * ~

      Alright… that was weird… but ok. Let's look at LESS.
    `),
  }),


  el(ScreenSlide, {
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
    notes: md(`
      LESS has 8 ways to import dependencies.
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

  el(TransitionSlide, {
    children: null,
    script: md(`
      ~ * TRANSITION * ~

      Alright. Let's look at variables.
    `),
  }),

  el(ScreenSlide, {
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
        right: null,
      }),
    ],
    script: md(`
      First let's look at how Sass handles variables.

      We have a variable, \`headingColor\` that's used to declare the color in
      h2 elements. But the variable is assigned a value twice. Once before we
      use it, and once after we use it.

      With Sass, we get the value from the first asignment.
    `),
  }),

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
    notes: md(`
      Nuanced preprocessor language semantics.
    `),
    script: md(`
      Now let's look at LESS. We have the same thing, a variable that gets
      assigned a value twice, and we're using it once in between the two
      assignments.

      Well, it's the opposite as Sass. LESS uses the last value assigned to a
      variable, regardless of where you're using it.
    `),
  }),


  el(ScreenSlide, {
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

  el(ScreenSlide, {
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

  el(ScreenSlide, {
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
    notes: md(`
      Whitespace and parenthesis can change meaning of expression
    `),
    script: md(`
      And be careful with adding parenthesis too, because that will change the
      behavior too.
    `),
  }),

  el(TransitionSlide, {
    children: null,
    script: md(`
      ~ * TRANSITION * ~

      Aright. So you just need to be *real* careful when doing arithmetic.

      What else can LESS do?
    `),
  }),

  el(ScreenSlide, {
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

  el(ScreenSlide, {
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
    notes: md(`
      Unit conversion works for *some* operators, not \`/\`.
    `),
    script: md(`
      But be careful, because if you mix units when you're doing division, you're gonna have a bad
      time. Unit conversions silently fail with division.

      When we do \`10cm / 10mm\`, LESS ignores the unit on the second number and
      gives us the unexpected result: 10cm.
    `),
  }),

  /*
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
 */

  el(Slide, {
    children: el(BigHeading, {
      heading: "Language Design is Hard",
    }),
    notes: md(`
      Getting programming languages right is hard.
    `),
    script: md(`
      Getting programming languages right is hard.

      Syntax, scoping, types, compilers, error handling. These are all
      complicated things.

      It's understandable that these preprocessor languages have gotten
      some of these things wrong.
    `),
  }),

  el(TransitionSlide, {
    children: null,
    script: md(`
      ~ * TRANSITION * ~

      Alright. So CSS is cool. But it has some issues.

      Preprocessors solve some of these issues, but have problems of their own.

      Is there a better way?
    `),
  }),

  el(Slide, {
    children: el(BigHeading, {
      heading: "JS CSS",
      subHeading: "Can JS do CSS better?",
    }),
    script: md(`
      Could we use JavaScript to write CSS in a better way?

      Well, let's take a look at what using JavaScript to write CSS might
      look like. Let's express a CSS rule in JavaScript.
    `),
  }),

  el(ScreenSlide, {
    children: [
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
        right: null,
      }),
    ],
    script: md(`
      Let's start with this rule. Here it is in CSS. A red button.

      Alright, now let's convert it to JavaScript.
    `),
  }),

  el(Slide, {
    children: [
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
    notes: md(`
      Simple CSS rule expressed in JavaScript.
    `),
    script: md(`
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
    notes: md(`
      Sometimes you need multiple declarations of the same property for e.g.,
      fallback values for unsupported features.
    `),
    script: md(`
      Sometimes in CSS we want to define a property more than once. We do this
      to provide fallbacks for browsers that don't support something.

      In JS we'll use arrays to define more than one value for a property.
    `),
  }),

  el(Slide, {
    children: md(`
      ## at-rules

      \`\`\`js

      var styles = {
        "@charset": "UTF-8",
        "@keyframes fade": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "@font-face": {
          "font-family": "MyFont",
          src: "url('myfont.woff') format('woff')",
        },
      };
      \`\`\`
    `),
    script: md(`
      CSS has a bunch of other \"at-rules\", and yeah, we can express them all
      in JavaScript.
    `),
  }),

  el(Slide, {
    children: md(`
      ## CSS in JS

       * Rules
       * Selectors
       * Property fallbacks
       * Media queries
       * Other \`@\` rules
    `),
    notes: md(`
      *Expressing* CSS in JavaScript is possible.
    `),
    script: md(`
      So we've got rules with selectors, pseudo selectors, child selectors, any kind of selector really.
      And we've got property fallbacks, media queries, and all kinds of at-rules.

      Well… that's essentially all of CSS.

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
    notes: md(`
      But how do we *use* styles expressed as JavaScript objects to style
      elements in a browser?
    `),
    script: md(`
      But, so far, we've only seen how to *express* CSS using JavaScript.

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
    notes: md(`
      A \`toCSS()\` function that "compiles" the JavaScript objects to a CSS
      source string.

      Then this CSS source can be given to the browser.
    `),
    script: md(`
      All we really need is a function that takes one of these style objects
      and returns a CSS source string.

      Now we can use this function to generate actual CSS for the browser to use.
    `),
  }),

  el(ScreenSlide, {
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
      ## Why JS CSS?

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

  el(ScreenSlide, {
    children: md(`
      ## Variables

      ### CSS

      \`\`\`text
      nope
      \`\`\`
    `),
    script: md(`
      CSS has no way to define and reuse variables.
    `),
  }),

  el(ScreenSlide, {
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
    notes: md(`
      CSS has no variables.

      LESS and Sass give us variables in own unique ways.
    `),
    script: md(`
      LESS and Sass both give us this ability, but they have their own unique
      semantics and scoping rules.
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
    notes: md(`
      JavaScript has variables built-in! And with semantics we know and
      understand.
    `),
    script: md(`
      JavaScript has variables built-in! And with semantics we know.

      We can use them to define our constants in one place.
    `),
  }),

  el(ScreenSlide, {
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

  el(ScreenSlide, {
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

  el(ScreenSlide, {
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

  el(ScreenSlide, {
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
    notes: md(`
      JavaScript syntax is not comma-sensitive or parenthesis-sensitive, unlike
      some preprocessors.
    `),
    script: md(`
      It all comes out to 8px.
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
    notes: md(`
      CSS has no ways to extend language with our own logic.

      Preprocessors provide built-in functions.

      Don't allow to define own logic.
    `),
    script: md(`
      In CSS, we have no way to extend the language with our own logic.

      Say we wanted to mix two colors together.

      In CSS, we have to manually precompute the result and hard code it into
      our source.

      Preprocessors like LESS improve the situation by giving a set of built-in
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
    notes: md(`
      CSS in JavaScript enables use of arbitrary functions
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
    notes: md(`
      Don't have to write own functions, can use modules.
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
      var style = {
        ".button": createButtonStyles("red"),
        ".secondary-button": createButtonStyles("#12c012"),
      }

      function createButtonStyles(baseColor) {
        return {
          color: baseColor,
          ":hover": {
            color: mix(baseColor, "#000"),
          },
        };
      }
      \`\`\`
    `),
    notes: md(`
      Not limited to just functions that manipulate colors or operate
      on single values.

      Can use functions to generate style declarations.
    `),
    script: md(`
      And we're not limited to just functions that manipulate colors or operate
      on single values.

      In JavaScript, a functions are the basic unit of code reuse.

      We can use functions to generate entire sets of style declarations.

      Here we are using a function that takes in a base color and generates
      styles for a button based on that color.

      We get the same sort of code reuse as what some preprocessors call
      "mixins", except with sane semantics.
    `),
  }),

  el(ScreenSlide, {
    children: md(`
      ## Share Constants

      \`\`\`css
      /* styles.css */
      .button {
        color: red;
      }
      \`\`\`
    `),
    script: md(`
      * With CSS we have no way of sharing values between CSS and our front-end
        code.
      * For example, at the top, we have some CSS code that defines a color.
    `),
  }),

  el(ScreenSlide, {
    children: md(`
      ## Share Constants

      \`\`\`css
      /* styles.css */
      .button {
        color: red;
      }
      \`\`\`

      \`\`\`js




      /* app.js */
      var canvas = document.querySelector("canvas");
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "red";
      ctx.fillText("Hello!", 0, 0);
      \`\`\`
    `),
    script: md(`
      * Then, we have some JavaScript code that draws to a canvas.
      * We want the canvas drawing to match the color we have in CSS.
    `),
  }),

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
    notes: md(`
      Manually keep values in sync between CSS and JS.
    `),
    script: md(`
      * You guys have probably run into something like this before. You end up having to leave these comments letting other developers know they need to update both places when one changes.
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
    notes: md(`
      JavaScript variables can be defined once and shared.
    `),
    script: md(`
      But if our styles are in JavaScript, and our canvas code is also in
      JavaScript, it's trivial to share values between the two.
    `),
  }),

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
    notes: md(`
      Use JS module system to organize styles and dependencies.
    `),
    script: md(`
      Of course we don't need everything to be in a single file.

      We can use modules to to organize our styles and import dependencies.

      And it's just JavaScript,
      so we can import constants, functions, or anything else!
    `),
  }),

  el(Slide, {
    children: md(`
      # npm!

      * Best. Package. Manager.
      * 150,000+ modules
      * Reusable style modules
      * Utility modules
    `),
    notes: md(`
      Can use modules from npm.

      Reusable styles as modules.

      Utility modules: e.g., given a background color, generate foreground
      color with good contrast.
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
      good contrast.
    `),
  }),

  el(Slide, {
    children: md(`
      ## JS CSS

      Use a full programming language to build your styles.

      * 150,000 modules at your disposable? Yes!
      * Want to use \`Math.random()\` or \`Date.now()\`? You can!
      * Asynchronous logic to build styles? Ok…

      *With great power comes great responsibility.*
    `),
    notes: md(`
      Use the power of a turing-complete language.

      Requires caution.
    `),
    script: md(`
      I've shown that there *are* advantages of using JavaScript to write CSS.

      By using a turing-complete programming language to build styles,
      we're not limited by what our css preprocessor has implemented and
      can instead use the full power of JavaScript to implement the logic
      we need.

      We don't need to reinvent variables, functions, scoping, or anything
      else.

      JavaScript has all of these things just waiting to be used.

      Of course with great power comes great responsibility. Maybe it's not a
      good idea to do a network request to build your styles — but that should
      be up to you to decide.
    `),
  }),

  el(TransitionSlide, {
    children: null,
    script: md(`
      ~ * TRANSITION * ~

      So we've successfully used JavaScript to write CSS.

      How else can we mix JS and CSS?
    `),
  }),

  el(Slide, {
    children: el(BigHeading, {
      heading: "Warning",
      subHeading: "Mad Science",
    }),
    notes: md(`
      *Warning: Experimental thinking.*

      How else can we mix JavaScript and CSS?
    `),
    script: md(`
      Let me pause to say, you should consider the following experimental thinking.

      I don't know if any of this is a good idea, or if it will even work.

      So think about it, and give me your feedback.

      So how else can we mix JavaScript and CSS?
    `),
  }),

  el(Slide, {
    children: el(BigHeading, {
      heading: "Take Over the Browser",
      subHeading: "Use JavaScript to Apply Styles",
    }),
    notes: md(`
      Use JavaScript to *implement* CSS.

      Take over browser's role of parsing css and applying styles to elements.
    `),
    script: md(`
      We can use JavaScript to apply styles in the browser.

      What I mean by this is taking over the browser's role of parsing css and
      applying styles to elements.

      I know this sounds crazy, but bear with me for a second and let's see
      what we can do with this.
    `),
  }),

  el(ScreenSlide, {
    children: md(`
      ## Prerequisite: CSS AST
    `),
    script: md(`
      First, writing CSS in JavaScript, like I've been talking about, is not a
      prerequisite to doing this. You could just use regular old CSS.

      What we do need is a CSS abstract syntax tree, or AST.

      What I mean by this is we need to be able to take a css source string,
      and be able to inspect it and understand exactly what's going on in there.
    `),
  }),

  el(Slide, {
    children: md(`
      ## Prerequisite: CSS AST

      \`\`\`js
      > var parse = require("css-parse")
      > parse(".button { color: red }")

      { rules:
         [ { type: 'rule',
             selectors: [ '.button' ],
             declarations:
              [ { type: 'declaration',
                  property: 'color',
                  value: 'red' } ] } ] }
      \`\`\`
    `),
    notes: md(`
      CSS in JavaScript is not a prerequisite. Just need a way to parse css.
    `),
    script: md(`
      Of course, there's an npm module for that.

      Here, we're parsing a simple css rule, and the result allows us to
      understand exactly what is being defined in the css.

      We have access to the selector, and know exactly what properties are
      being set and what the values are.
    `),
  }),

  el(Slide, {
    children: md(`
      ## Prerequisite: CSS AST

      \`\`\`js
      > var stringify = require("css-stringify")
      > stringify({
          rules: [ {
           type: 'rule',
           selectors: [ '.button' ],
           declarations:
            [ { type: 'declaration',
                property: 'color',
                value: 'red' } ] } ]
      })

      ".button { color: red }"
      \`\`\`
    `),
    notes: md(`
      Of course, if we can parse css source code we can also turn it back into
      css source code.
    `),
    script: md(`
      And of course, we can do the inverse and take an AST to generate a CSS
      source string.

      So what does this enable us to do?
    `),
  }),

  /*
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
 */

  el(ScreenSlide, {
    children: md(`
      ## @supports
    `),
    script: md(`
      CSS has a new feature called css feature queries.

      It's kind of like media queries, but instead of testing things like the
      device width, it lets us test if the device supports a certain css
      feature.
    `),
  }),

  el(Slide, {
    children: md(`
      ## @supports

      \`\`\`css
      @supports (display: flex) {
        div { display: flex; }
      }

      @supports not (display: flex) {
        div { float: left; }
      }
      \`\`\`
    `),
    notes: md(`
      CSS feature detection.

      Many browsers have not implement \`@supports\`.
    `),
    script: md(`
      This example lets us use flexbox if the browser supports it, otherwise we
      use float.

      Unfortunately, many browsers don't support feature queries yet.
    `),
  }),

  el(Slide, {
    children: md(`
      ## @supports

      1. Get information about browser environment
      2. Use information to transform CSS AST
      3. Feed new CSS back into browser
    `),
    notes: md(`
      Implement \'@supports\' at runtime in the browser.
    `),
    script: md(`
      * If executing JS in browser
      * Have access to information about browser environment
      * Like whether or not it supports a certain CSS feature

      And we can access to our CSS AST like I showed.

      We can use that information about the browser and transform our CSS AST to a new one.

      Then we can take the new CSS AST, and put it back into the browser by injecting a
      \`<style>\` tag into the document.

      This means we can take CSS, and create new CSS based on the browser that we're in.
    `),
  }),

  el(ScreenSlide, {
    children: md(`
      ## @supports

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
      We can use this technique to polyfill CSS feature queries.

      We would walk the CSS AST.

      When we come across a \`@supports\` rule, we would do the feature
      detection in JavaScript, and then generate a new CSS AST either including
      or excluding the nested rule depending on the result of the feature detection.

      Now we have feature queries in every browser.
    `),
  }),

  el(TransitionSlide, {
    children: null,
    script: md(`
      What else can we do?
    `),
  }),

  el(Slide, {
    children: [
      md(`
        ## Take Over the Browser
      `),
      el(TwoColumns, {
        left: md(`
          ### CSS

          \`\`\`css
          div span {
            color: red;
          }
          \`\`\`
        `),
        right: md(`
          ### HTML

          \`\`\`html
          <div>
            <span>Hello!</span>
          </div>
          \`\`\`
        `),
      }),
    ],
    notes: md(`
      Browser matches selectors to elements and applies styles.

      Can sidestep the browser and implement this too.
    `),
    script: md(`
      One of the browser's jobs with CSS is to take selectors and figure out which elements match. Then styles are applied to matched elements.

      In this example, when the browser comes across our css rule, it knows to
      match it to the span that is a descendent of a div, and apply the
      color red to it.

      Another way we can take over the browser is doing matching and applying of styles ourselves.
    `),
  }),

  el(ScreenSlide, {
    children: md(`
        ## Take Over the Browser

        \`\`\`js
        rules.forEach(function(rule) {
          var elements = document.querySelectorAll(rule.selector);
        });
        \`\`\`
    `),
    script: md(`
      This means for each css rule, we would find all of the elements that match the rule's selector.
    `),
  }),

  el(ScreenSlide, {
    children: md(`
        ## Take Over the Browser

        \`\`\`js
        rules.forEach(function(rule) {
          var elements = document.querySelectorAll(rule.selector);

          elements.forEach(function(element) {
            element.style = rule.style;
          });
        });
        \`\`\`
    `),
    notes: md(`
      Have context of element's position in document when applying styles.

      Can check parent, children, etc.

      This information enables implementing more CSS features.
    `),
    script: md(`
      Then for each matched element, we would apply the rule's styles to the element.

      Why would we do this? Again, it's about having information.

      This time we would have information about the hierarchy of elements in the document when we're applying styles to an element. Meaning that for each element, we could see what it's parent is, how many siblings it has, and what it's children are. We would know exactly where in the document's hierarchy that element is.

      This information lets us polyfill even more CSS features.
    `),
  }),

  el(ScreenSlide, {
    children: md(`
      ## :first-child :last-child

      \`\`\`html
      <div>
        <div></div> <!-- first-child -->
        <div></div>
        <div></div>
        <div></div> <!-- last-child -->
      </div>
      \`\`\`
    `),
    script: md(`
      Take \`:first-child\` and \`:last-child\` for example.

      If we know about the siblings of an element, we can determine if it's the first child or not, and if it's the last child or not.

      This means would able to implement \`:first-child\` and \`:last-child\` ourselves.
    `),
  }),

  el(Slide, {
    children: md(`
      ## :first-child :last-child

      \`\`\`html
      <div>
        <div></div> <!-- first-child -->
        <div></div>
        <div></div>
        <div></div> <!-- last-child -->
      </div>
      \`\`\`

      \`\`\`js

      elements.forEach(function(element) {
        if (isFirstChild(element.parentNode, element)) {
          element.style = rule.style;
        }
      });
      \`\`\`
    `),
    notes: md(`
      Implement \`:last-child\` selector for IE8.
    `),
    script: md(`
      When we're iterating through elements, we can use information about the element's position in the document to determine if it should get our first-child or last-child styles.

      That's not too useful though since most browsers support \`:first-child\` and \`:last-child\` natively.

      But, with the same kind of information about the document's hierarchy, maybe we can polyfill something more useful.
    `),
  }),

  el(ScreenSlide, {
    children: [
      md(`
        ## Flexbox Polyfill
      `),
    ],
    script: md(`
      Flexbox is a css layout feature that makes it easy to express all the crazy things we do with floats and tables and various other layout hacks.

      If we know the flexbox styles we want to apply to an element, and we know its parents and its children and all of their styles, we are able to calculate the dimensions and position of the element.
    `),
  }),

  el(Slide, {
    children: [
      md(`
        ## Flexbox Polyfill
      `),
      el(TwoColumns, {
        left: md(`
          ### CSS

          \`\`\`css
          .container {
            display: flex;
          }

          .column {
            flex: 1;
          }
          \`\`\`
        `),
        right: md(`
          ### HTML

          \`\`\`html
          <div class="container">
            <div class="column"></div>
            <div class="column"></div>
          </div>
          \`\`\`
        `),
      }),
    ],
    notes: md(`
      Flexbox enables simple layouts.

      This example will have a container with two side-by-side columns inside
      of it, each with equal with.

      Algorithms can calculate this layout.
    `),
    script: md(`
      This example has a flex container with two children, each with an equal grow factor of \`1\`.

      This means that we'll have a container with two side-by-side columns inside of it, each with equal width.

      I was able to determine that by just looking at our CSS rules and the structure of our document.

      There's already a module on npm that performs this kind of flexbox calculations for us.
    `),
  }),

  el(Slide, {
    children: md(`
      ## css-layout

      \`\`\`js
      var doc = {
        style: { display: "flex", width: 1000, height: 1000 },
        children: [
          { style: { flex: 1 } },
          { style: { flex: 1 } },
        ],
      };
      \`\`\`
    `),
    notes: md(`
      Describe the structure of elements and their styles.
    `),
    script: md(`
      If we can describe our document, creating a representation of our
      document hierarchy and the style we want each element to have.

      Then we could use the css-layout module to calculate the layout of our
      modules.
    `),
  }),

  el(Slide, {
    children: md(`
      ## css-layout

      \`\`\`js
      > var layout = require("css-layout");
      > layout(doc)
      { width: 1000,
        height: 1000,
        top: 0,
        left: 0,
        children: 
         [ { width: 500,
             height: 1000,
             top: 0,
             left: 0 },
           { width: 500,
             height: 1000,
             top: 0,
             left: 500 } ] }
      \`\`\`
    `),
    notes: md(`
      Calculate the size and position of elements.
    `),
    script: md(`
      So if we pass the right information to css-layout, it can calculate the
      exact dimensions and positions of each element for us.

      We could use this to implement a runtime flexbox polyfill.
    `),
  }),

  el(ScreenSlide, {
    children: null,
    script: md(`
      ~ * TRANSITION * ~

      That's awesome.

      I think we're in a really exciting place right now.

      The JS module ecosystem is implementing some great things right now.

      And I think it's going to be really interesting to see what we can do
      with them.
    `),
  }),

  el(Slide, {
    children: [
      el(BigHeading, {
        heading: "Conclusion",
        subHeading: [
          "JS + CSS",
          el("br"),
          "Implement the Browser in the Browser",
        ],
      }),
      el("p", {
        style: {
          color: solarized.cyan,
          "text-align": "center",
          "font-size": "120%",
        },
        children: "@parshap",
      }),
    ],
    notes: md(`
      Thanks for reading — send feedback to [@parshap][tw]!

      [tw]: https://twitter.com/parshap
    `),
    script: md(`
      I hope I've shown you some interesting ways to mix JavaScript and CSS.

      And essentially reimplement the browser in the browser.

      Come find me to talk about any of this.

      Or you can tweet me @parshap.

      Thanks for your time!
    `),
  }),

  el(Slide, {
    children: md(`
      ## Links

      * [jss](https://github.com/jsstyles/jss)
      * [js2css](https://github.com/sjurba/js2css)
      * [css-layout](https://github.com/facebook/css-layout)
      * [React: CSS in JS](http://blog.vjeux.com/2014/javascript/react-css-in-js-nationjs.html)
      * [React: classstyle](https://github.com/syranide/react/tree/classstyle)
      * [React: jsxstyle](https://github.com/petehunt/jsxstyle)
      * [React: react-inline](https://github.com/martinandert/react-inline)
      * [React: react-style](https://github.com/js-next/react-style)
    `),
  }),
];


module.exports = module.exports.filter(function(slide) {
  return slide.type.hideInPrint !== true;
});

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
    title: "Interoperability",
    children: md(`
      No interoperability with JavaScript

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
    title: "Interoperability",
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
