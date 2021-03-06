/**
 * MathJax math renderer plugin JSX component.
 * @module view/plugin/katex
 */
const { Component, Fragment } = require('inferno');
const { cacheComponent } = require('../../util/cache');

/**
 * MathJax math renderer plugin JSX component.
 *
 * @see https://www.mathjax.org/
 * @example
 * <Mathjax jsUrl="/path/to/mathjax.js" />
 */
class Mathjax extends Component {
    render() {
        const { jsUrl } = this.props;

        const js = `window.addEventListener("load", function () {
            MathJax.Hub.Config({
                'HTML-CSS': {
                    matchFontHeight: false
                },
                SVG: {
                    matchFontHeight: false
                },
                CommonHTML: {
                    matchFontHeight: false
                },
                tex2jax: {
                    inlineMath: [
                        ['$','$'],
                        ['\\\\(','\\\\)']
                    ]
                }
            });
        });`;

        return <Fragment>
            <script src={jsUrl} defer={true}></script>
            <script dangerouslySetInnerHTML={{ __html: js }}></script>
        </Fragment>;
    }
}

/**
 * Cacheable Mathjax math renderer plugin JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <Mathjax.Cacheable
 *     head={true}
 *     helper={{ cdn: function() {...} }} />
 */
Mathjax.Cacheable = cacheComponent(Mathjax, 'plugin.mathjax', props => {
    const { head, helper } = props;
    if (head) {
        return null;
    }
    return {
        jsUrl: helper.cdn('mathjax', '2.7.5', 'unpacked/MathJax.js?config=TeX-MML-AM_CHTML')
    };
});

module.exports = Mathjax;
