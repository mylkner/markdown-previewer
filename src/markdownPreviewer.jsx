import { useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";

const MarkdownPreviewer = () => {
    marked.use({
        async: false,
        breaks: true,
        extensions: null,
        gfm: true,
        hooks: null,
        pedantic: false,
        silent: false,
        tokenizer: null,
        walkTokens: null,
    });

    const defaultMarkdown = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
    }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
    - Some are bulleted.
        - With different indentation levels.
            - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`;

    const [text, setText] = useState(defaultMarkdown);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const markup = () => {
        const clean = DOMPurify.sanitize(marked.parse(text));
        return { __html: clean };
    };

    return (
        <div className="container">
            <div className="edit">
                <span className="titleSpan E">
                    <p className="titleE">Editor</p>
                </span>
                <textarea
                    name="editor"
                    id="editor"
                    cols="60"
                    rows="20"
                    value={text}
                    onChange={handleChange}
                ></textarea>
            </div>

            <div className="prev">
                <span
                    className="titleSpan"
                    style={{ backgroundColor: "green" }}
                >
                    <p className="titleP">Previewer</p>
                </span>
                <div id="preview" dangerouslySetInnerHTML={markup()}></div>
            </div>
        </div>
    );
};

export default MarkdownPreviewer;
