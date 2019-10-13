


window._header = [
    {
        'name': 'About',
        'url': 'about',
        'elements': [
        ]
    },
    {
        'name': 'API',
        'url': 'api',
        'elements': [
            { name: 'Documentation', url: '/docs' },
            { name: 'All Games', url: './games' }
        ]
    },
    {
        'name': 'More',
        'url': 'more',
        'elements': [
            { name: 'About', url: './about' },
            { name: 'Tude Bot', url: './tudebot' },
            { name: 'Contact', url: 'mailto:tudeteam@gmail.com' },
            { name: 'Legal', url: './legal' },
            { name: 'Even More', url: './more' }
        ]
    }
]



Vue.component('gheader', {
    props: [ 'pagename', 'color' ],
    template: `
        <header>
            <div id="header-content">
                <div id="header-name">
                    <a href="/" id="header-name-portal">Tude Portal</a>
                    <div id="header-name-page" v-if="pagename" :style="'--ccolor:'+color" v-html="pagename"></div>
                </div>
                <div id="header-nav-desktop">
                    <a class="nav-button" href="/api/swagger">API</a>
                    <a class="nav-button" href="/about">About</a>
                </div>
                <div id="header-nav-mobile">
                    <!--a href="#" ><i class="fas fa-bars"></i></a-->
                </div>
            </div>
        </header>
    `
});

Vue.component('gfooter', {
    props: [ ],
    template: `
        <footer>
            <div id="footer-content">
                <div class="footer-column">
                    <h3>Tude Portal</h3>
                    <p>Copyright &copy; 2019 Tude</p>
                    <p>All rights reserved.</p>
                    <a href="https://maanex.tk/?utm_source=tudeportal&utm_medium=footer&utm_campaign=credits">Website by Maanex</a>
                </div>
                <div class="footer-column">
                    <h3>Support</h3>
                    <a href="/faq">FAQ</a>
                    <a href="https://support.tude.ga/">Support Center</a>
                </div>
                <div class="footer-column">
                    <h3>Legal</h3>
                    <a href="https://tude.ga/legal/terms">Terms</a>
                    <a href="https://tude.ga/legal/privacy">Privacy</a>
                    <a href="mailto:tudeteam@gmail.com">Send an Email</a>
                </div>
                <div class="footer-column">
                    <h3>More</h3>
                    <a href="https://tude.ga/club">Tude Club</a>
                    <a href="https://tude.ga/games">Tude Games</a>
                </div>
            </div>
        </footer>
    `
});



Vue.component('dist', {
    props: [ 'height' ],
    template: '<div :style="`height:${height}`"></div>'
});