import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  ${'' /* Import Fonts */}
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,300&family=Rubik:wght@400;500;600;700&display=swap');

  ${'' /* Define CSS Variables */}
    :root {
    /* Color Mode (hue, sat, lightness) */
    --primary-color: #2c3e50;
    --title-color: #ffffff; 
    --text-color: #ffffff; 
    --body-color: #f2f2f2; 
    --container-color: #ffffff; 

    /* Font Sizes */
    --body-font: 'Rubik', sans-serif;
    --h1-font-size: 2.25rem;
    --h2-font-size: 1.5rem;
    --h3-font-size: 1.2rem;
    --normal-font-size: 1rem;
    --small-font-size: 0.875rem;
    --smaller-font-size: 0.8rem;

    /* Font Weights */
    --font-medium: 500;
    --font-semibold: 600;
    --font-bold: 700;

    /* Box Shadow */
    --shadow: 0px 5px 20px 0px rgb(69 68 100 / 10%);

    /* Border Radius */
    --border-radius: 20px;
}

  /* Responsive Typography */
@media screen and (max-width: 1024px) {
    :root {
    --h1-font-size: 1.75rem;
    --h2-font-size: 1.25rem;
    --h3-font-size: 1rem;
    --normal-font-size: 0.93rem;
    --small-font-size: 0.81rem;
    --smaller-font-size: 0.74rem;
    }
}

  /* Global Styles */
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
}

html,
body,
div,
input,
button,
select,
option,
h1,
h2,
h3,
h4,
h5,
h6,
p,
text,
textarea {
    font-family: 'Poppins', 'Rubik', sans-serif;
}

html,
body {
    max-width: 100vw;
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
}

  /* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
    display: block;
}

ol,
ul {
    list-style: none;
}

blockquote,
q {
    quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
    content: '';
    content: none;
}
`;

export default GlobalStyles;
