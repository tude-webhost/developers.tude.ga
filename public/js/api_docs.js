

let app;
app = new Vue({
    el: '#app',
    data: {


        foldStatus: {},

        tags: [
            {
                name: 'base',
                desc: 'Base API',
                items: [
                    {
                        path: '/ping',
                        desc: 'Ping the api',
                        details: 'Usualy fired once on application start to check if the connection is running and to get information about latency, etc.',
                        method: 'get',
                        produces: 'application/json',
                        response: '%pong',
                        codes: {
                            "200": 'Okay'
                        }
                    },
                ]
            },
            {
                name: 'oauth',
                desc: 'Tude Identity Provider',
                items: [
                    {
                        path: '/oauth/authorize',
                        desc: 'Usual Oauth2 Workflow',
                        details: 'A more detailed description here',
                        method: 'get',
                        produces: 'application/json',
                        parameters: [
                            {
                                name: 'client_id',
                                type: 'integer',
                                desc: 'The applications id',
                                in: 'query',
                                required: true
                            },
                            {
                                name: 'redirect_uri',
                                type: 'string:url',
                                desc: 'The redirect url',
                                in: 'query',
                                required: true
                            },
                            {
                                name: 'response_type',
                                type: 'string',
                                desc: 'one of: [ code ]',
                                in: 'query',
                                required: true
                            },
                            {
                                name: 'scope',
                                type: 'string',
                                desc: 'Specify the level of access',
                                in: 'query',
                                required: true
                            }
                        ],
                        response: 'HTML Login Page',
                        codes: {
                            "200": 'Okay'
                        }
                    },
                    {
                        path: '/oauth/token',
                        desc: 'TODO',
                        details: 'A more detailed description here',
                        method: 'get',
                        produces: 'application/json',
                        parameters: [
                        ],
                        response: 'HTML Login Page',
                        codes: {
                            "200": 'Okay'
                        }
                    }
                ]
            },
            {
                name: 'users',
                desc: 'Tude User Database',
                items: [
                    {
                        path: '/users',
                        desc: 'Create a new User',
                        details: 'A more detailed description here',
                        method: 'post',
                        permission: 1,
                        produces: 'application/json',
                        parameters: [
                            {
                                name: 'name',
                                type: 'string',
                                desc: 'name',
                                in: 'body',
                                required: true
                            }
                        ],
                        response: '%user',
                        codes: {
                            "200": 'Okay'
                        }
                    },
                    {
                        path: '/users',
                        desc: 'Delete a User',
                        details: 'A more detailed description here',
                        method: 'delete',
                        permission: 4,
                        produces: 'application/json',
                        parameters: [
                            {
                                name: 'name',
                                type: 'string',
                                desc: 'name',
                                in: 'body',
                                required: true
                            }
                        ],
                        response: '%generic_success',
                        codes: {
                            "200": 'Okay'
                        }
                    }
                ]
            },
            {
                name: 'club',
                desc: 'Tude Club Database',
                items: [
                    {
                        path: '/club/leaderboard',
                        desc: 'Get the leaderboard',
                        details: 'A more detailed description here',
                        method: 'get',
                        permission: 1,
                        produces: 'application/json',
                        parameters: [
                            {
                                name: 'page',
                                type: 'integer',
                                desc: 'Request a different page',
                                in: 'query',
                                required: false
                            },
                            {
                                name: 'entries',
                                type: 'integer',
                                desc: 'Entries per page. Default is 25. Maximum is 100',
                                in: 'query',
                                required: false
                            },
                            {
                                name: 'type',
                                type: 'string',
                                desc: 'Either total, monthly or both. Choose one of the first two for using different pages.',
                                in: 'query',
                                required: false
                            },
                        ],
                        response: '%leaderboard',
                        codes: {
                            "200": 'Okay'
                        }
                    },
                    {
                        path: '/club/leaderboard',
                        desc: 'Update the leaderboard',
                        details: 'A more detailed description here',
                        method: 'post',
                        permission: 3,
                        produces: 'application/json',
                        parameters: [
                            {
                                name: 'resetMonthly',
                                type: 'boolean',
                                desc: 'To reset the monthly leaderboard',
                                in: 'body',
                                required: false
                            }
                        ],
                        response: '%generic_success',
                        codes: {
                            "200": 'Okay'
                        }
                    },
                    {
                        path: '/club/memes',
                        desc: 'Get generic statistics about the meme database',
                        details: 'A more detailed description here',
                        method: 'get',
                        permission: 1,
                        produces: 'application/json',
                        parameters: [
                        ],
                        response: 'TODO',
                        codes: {
                            "200": 'Okay'
                        }
                    },
                    {
                        path: '/club/memes',
                        desc: 'Add a meme to the meme database',
                        details: 'A more detailed description here',
                        method: 'post',
                        permission: 3,
                        produces: 'application/json',
                        parameters: [
                            {
                                name: 'author',
                                type: 'integer',
                                desc: 'The author\'s userid',
                                in: 'body',
                                required: true
                            },
                            {
                                name: 'image',
                                type: 'string',
                                desc: 'The image url',
                                in: 'body',
                                required: true
                            },
                            {
                                name: 'title',
                                type: 'string',
                                desc: 'The image title',
                                in: 'body',
                                required: false
                            },
                            {
                                name: 'finder',
                                type: 'string',
                                desc: 'Unique id for finding the image\'s source',
                                in: 'body',
                                required: false
                            }
                        ],
                        response: '%meme',
                        codes: {
                            "200": 'Okay'
                        }
                    },
                    {
                        path: '/club/memes/{id}',
                        desc: 'Get detailed information about a certain meme',
                        details: 'A more detailed description here',
                        method: 'get',
                        permission: 1,
                        produces: 'application/json',
                        parameters: [
                        ],
                        response: '%meme',
                        codes: {
                            "200": 'Okay'
                        }
                    },
                    {
                        path: '/club/memes/{id}',
                        desc: 'Edit an existing meme',
                        details: 'A more detailed description here',
                        method: 'post',
                        permission: 3,
                        produces: 'application/json',
                        parameters: [
                            {
                                name: 'image',
                                type: 'string',
                                desc: 'The image url',
                                in: 'body',
                                required: false
                            },
                            {
                                name: 'title',
                                type: 'string',
                                desc: 'The image title',
                                in: 'body',
                                required: false
                            },
                            {
                                name: 'finder',
                                type: 'string',
                                desc: 'Unique id for finding the image\'s source',
                                in: 'body',
                                required: false
                            },
                            {
                                name: 'rating',
                                type: 'integer',
                                desc: 'The image\'s rating',
                                in: 'body',
                                required: false
                            },
                            {
                                name: 'saves',
                                type: 'integer',
                                desc: 'The amount this image has been saved',
                                in: 'body',
                                required: false
                            }
                        ],
                        response: '%meme',
                        codes: {
                            "200": 'Okay'
                        }
                    },
                    {
                        path: '/club/badges',
                        desc: 'Get all badges',
                        details: 'Returns an array of all available badges',
                        method: 'get',
                        permission: 1,
                        produces: 'application/json',
                        parameters: [
                        ],
                        response: '%badges',
                        codes: {
                            "200": 'Okay'
                        }
                    },
                    {
                        path: '/club/badges/{id}',
                        desc: 'Get a certain badges',
                        details: 'Since badges don\'t really change, it is prefered to load all badges in bulk using the endpoint above and store a local copy instead of requesting the data over and over again',
                        method: 'get',
                        permission: 1,
                        produces: 'application/json',
                        parameters: [
                        ],
                        response: '%badge',
                        codes: {
                            "200": 'Okay'
                        }
                    },
                ]
            }
        ],

        objects: {
pong:
`{
    "permission": 0,
    "serverStatus": 200,
    "problems": [ ]
}`,
user:
`{
    "name": "string",
    "id": 0
}`,
generic_success:
`{ "success": "true" }`,
leaderboard:
`{
    "alltime": [
        {
            "level": 22,
            "name": "Maanex",
            "pointsThisMonth": 7838,
            "id": 42,
            "points": 27960
        }
    ],
    "month": [
        {
            "level": 26,
            "name": "Bastian",
            "pointsThisMonth": 8750,
            "id": 21559110749,
            "points": 39700
        }
    ],
    "season": 14
}`,
meme:
`{
    "image": "",
    "saves": 0,
    "author": 0,
    "rating": 0,
    "id": 0,
    "title": "",
    "finder": ""
}`,
badges:
`[
    {
        "appearance": [
            {
                "name": "Turtle Of The Month",
                "icon": "https://cdn.discordapp.com/attachments/391709565520969729/488605988593860608/badge_totm_all.png",
                "from": 0
            },
            {
                "name": "'Turtle Of The Month' in bronze",
                "icon": "https://cdn.discordapp.com/attachments/391709565520969729/487539925458354185/badge_totm_bronze.png",
                "from": 1
            }
        ],
        "id": 1,
        "keyword": "totm",
        "desc": "%sx Turtle Of The Month",
        "info": "This badge is awarded each month to the user who won the 'Turtle Of The Month' competition!"
    }
]`,
badge:
`{
    "appearance": [
        {
            "name": "",
            "icon": "",
            "from": 0
        }
    ],
    "id": 0,
    "keyword": "",
    "desc": "",
    "info": ""
}`,
        }
    },
    methods: {
        varOrRender: function(obj) {
            if (obj.split('')[0] == '%') return this.objects[obj.substring(1)];
            return obj;
        }
    },
    updated: codeFormatter,
    mounted: codeFormatter
});

function codeFormatter() {    
    this.$nextTick(function () {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    });
}