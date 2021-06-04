import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
    */

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    * {
        box-sizing: border-box;
    }
    a {
        color: inherit;
        text-decoration: none;
    }

    strong{
     font-weight:bold;
    }

    body {
        font-family: "Lato";
    }
    .Overlay{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255,255,255,.9);
        display: flex;
        justify-content:center;
        align-items:center;
    }
    .Modal {
        outline: none;
        position: static;
        width: 597px;
        height: 262px;
        border-radius: 50px;
        background-color: #333;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
    }
    @media(max-width: 611px){
        .Modal {
            width: 100vw;
            height: 100vh;
            border-radius: 0;
        }
    }



    .ModalLink {
        outline: none;
        position: static;
        width: 60%;
        height: 90%;
        border-radius: 20px;
        background-color: #333;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        @media(max-width: 611px){
            width: 100vw;
            height: 100vh;
        }
    }

    .OverlayLink{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255,255,255,.9);
        display: flex;
        justify-content:center;
        align-items:center;
        z-index:150;
    }


    .MapOverlay{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255,255,255,.9);
        display: flex;
        justify-content:center;
        align-items:center;
        z-index: 150;
    }
    .MapModal {
        outline: none;
        position: static;
        width: 790px;
        height: 350px;
        border-radius: 20px;
        background-color: #333;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
    }
`;

export default GlobalStyles;