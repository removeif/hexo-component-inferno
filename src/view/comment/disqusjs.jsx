/**
 * DisqusJS comment JSX component.
 * @module view/comment/disqusjs
 */
const { Component, Fragment } = require('inferno');
const { cacheComponent } = require('../../util/cache');

/**
 * DisqusJS comment JSX component.
 *
 * @see https://github.com/SukkaW/DisqusJS
 * @example
 * <DisqusJs
 *     shortname="******"
 *     apiKey="******"
 *     api="******"
 *     admin="******"
 *     adminLabel={false}
 *     nesting={4}
 *     disqusId="******"
 *     path="/path/to/page"
 *     permalink="/page/permanent/path"
 *     pageTitle="******"
 *     siteTitle="******"
 *     jsUrl="/path/to/disqus.js"
 *     cssUrl="/path/to/disqusjs.css" />
 */
class DisqusJs extends Component {
    render() {
        const {
            shortname,
            apiKey,
            api,
            admin,
            adminLabel = false,
            nesting = 4,
            disqusId,
            path,
            permalink,
            pageTitle,
            siteTitle,
            jsUrl,
            cssUrl
        } = this.props;
        if (!shortname) {
            return <div class="notification is-danger">
                You forgot to set the <code>shortname</code> or <code>api_key</code> for Disqus.
                Please set it in <code>_config.yml</code>.
            </div>;
        }
        const js = `new DisqusJS({
            shortname: '${shortname}',
            apikey: '${JSON.stringify(apiKey)}',
            siteName: '${siteTitle}',
            identifier: '${disqusId || path}',
            url: '${permalink || path}',
            title: '${pageTitle}',
            api: '${api}',
            admin: '${admin}',
            adminLabel: '${adminLabel}',
            nesting: ${nesting}
        });`;
        return <Fragment>
            <link rel="stylesheet" href={cssUrl} />
            <div id="disqus_thread">
                <noscript>Please enable JavaScript to view the <a href="//disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
            </div>
            <script src={jsUrl}></script>
            <script dangerouslySetInnerHTML={{ __html: js }}></script>
        </Fragment>;
    }
}

/**
 * Cacheable DisqusJS comment JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <DisqusJs.Cacheable
 *     comment={{
 *         shortname: '******',
 *         api_key: '******',
 *         api: '******',
 *         admin: '******',
 *         admin_label: false,
 *         nesting: 4
 *     }}
 *     page={{
 *         path: '/path/to/page',
 *         disqusId: '******',
 *         permalink: '******'
 *         title: '******'
 *     }}
 *     config={{ title: '******' }}
 *     helper={{ cdn: function() { ... } }} />
 */
DisqusJs.Cacheable = cacheComponent(DisqusJs, 'comment.disqusjs', props => {
    const { config, page, helper, comment } = props;

    return {
        path: page.path,
        shortname: comment.shortname,
        apiKey: comment.api_key,
        api: comment.api,
        admin: comment.admin,
        adminLabel: comment.admin_label,
        nesting: comment.nesting,
        disqusId: page.disqusId,
        permalink: page.permalink,
        pageTitle: page.title,
        siteTitle: config.title,
        jsUrl: helper.cdn('disqusjs', '1.2.5', 'dist/disqus.js'),
        cssUrl: helper.cdn('disqusjs', '1.2.5', 'dist/disqusjs.css')
    };
});

module.exports = DisqusJs;
