

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
                        details: 'Usually fired once on application start to check if the connection is running and to get information about latency, etc.',
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
                        desc: 'Usual Oauth2 Workflow - NOT YET IMPLEMENTED',
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
                        desc: 'TODO - NOT YET IMPLEMENTED',
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
                        permission: 3,
                        produces: 'application/json',
                        parameters: [
                            {
                                name: 'name',
                                type: 'string',
                                desc: 'User\'s name',
                                in: 'body',
                                required: true
                            },
                            {
                                name: 'type',
                                type: 'integer',
                                desc: 'Account type, default = 1',
                                in: 'body',
                                required: false
                            },
                            {
                                name: 'accounts',
                                type: 'object<accountname:id>',
                                desc: 'Valid 3rd party accounts: discord; Required if account type is higher than 1',
                                in: 'body',
                                required: false
                            },
                            {
                                name: 'email',
                                type: 'string:email',
                                desc: 'User\'s email; Required if account type is 1',
                                in: 'body',
                                required: false
                            },
                            {
                                name: 'password',
                                type: 'string',
                                desc: 'The user\'s password, not encrypted, proper encryption will be performed automatically',
                                in: 'body',
                                required: false
                            }
                        ],
                        response: '%user',
                        codes: {
                            "200": 'Okay',
                            "400": 'Bad Request. missing required parameters',
                            "401": 'Access denied. not authorized'
                        }
                    },
                    {
                        path: '/users',
                        desc: 'Delete a User - NOT YET IMPLEMENTED',
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
                    },
                    {
                        path: '/users/{userid}',
                        desc: 'Get all accessable information about a user',
                        details: 'The amount of information received might vary depending on the api-key\'s permission level and the requested user\'s privacy settings.',
                        method: 'get',
                        permission: 1,
                        produces: 'application/json',
                        parameters: [ ],
                        response: '%user',
                        codes: {
                            "200": 'Okay',
                            "400": 'Bad request. invalid userid',
                            "401": 'Access denied. not authorized',
                            "404": 'Not found. no user by that id found',
                            "502": 'Bad gateway. try again later'
                        }
                    },
                    {
                        path: '/users/find?{platform}={uuid}',
                        desc: 'Searches for a user by provided linked account.',
                        details: 'Valid link types: discord. Example: /users/find?discord=12345678',
                        method: 'get',
                        permission: 3,
                        produces: 'application/json',
                        parameters: [ ],
                        response: '%user',
                        codes: {
                            "200": 'Okay',
                            "400": 'Bad request. no search query defined',
                            "401": 'Access denied. not authorized',
                            "404": 'Not found. no user by that query found',
                            "502": 'Bad gateway. try again later'
                        }
                    },
                    {
                        path: '/users/{userid}',
                        desc: 'Update accessable user details - NOT YET IMPLEMENTED',
                        details: 'Depending on the api\'s access level, some values might not be changeable',
                        method: 'put',
                        permission: 1,
                        produces: 'application/json',
                        parameters: [
                            {
                                name: 'type',
                                type: 'integer',
                                desc: 'Account Type, only upgradeable.',
                                in: 'body',
                                required: false
                            },
                            {
                                name: 'name',
                                type: 'string',
                                desc: 'User\'s name',
                                in: 'body',
                                required: false
                            },
                            {
                                name: 'tag',
                                type: 'integer',
                                desc: 'User\'s tag; Must be between 0 - 9999; Use -1 to auto-reset',
                                in: 'body',
                                required: false
                            }
                        ],
                        response: '%generic_success',
                        codes: {
                            "200": 'Okay',
                            "400": 'Bad request. invalid userid',
                            "401": 'Access denied. not authorized',
                            "404": 'Not found. no user by that id found',
                            "502": 'Bad gateway. try again later'
                        }
                    },
                    {
                        path: '/users/find?{platform}={uuid}',
                        desc: 'Update accessable user details - NOT YET IMPLEMENTED',
                        details: 'Depending on the api\'s access level, some values might not be changeable',
                        method: 'put',
                        permission: 1,
                        produces: 'application/json',
                        parameters: [
                            {
                                name: 'type',
                                type: 'integer',
                                desc: 'Account Type, only upgradeable.',
                                in: 'body',
                                required: false
                            },
                            {
                                name: 'name',
                                type: 'string',
                                desc: 'User\'s name',
                                in: 'body',
                                required: false
                            },
                            {
                                name: 'tag',
                                type: 'integer',
                                desc: 'User\'s tag; Must be between 0 - 9999; Use -1 to auto-reset',
                                in: 'body',
                                required: false
                            }
                        ],
                        response: '%generic_success',
                        codes: {
                            "200": 'Okay',
                            "400": 'Bad request. invalid userid',
                            "401": 'Access denied. not authorized',
                            "404": 'Not found. no user by that id found',
                            "502": 'Bad gateway. try again later'
                        }
                    }
                ]
            },
            {
                name: 'club',
                desc: 'Tude Club Database',
                items: [
                    {
                        path: '/club/users/{userid}',
                        desc: 'Get the Tude Club user profile',
                        details: 'A more detailed description here',
                        method: 'get',
                        permission: 1,
                        produces: 'application/json',
                        parameters: [ ],
                        response: '%clubuser',
                        codes: {
                            "200": 'Okay',
                            "400": 'Bad request. invalid userid',
                            "401": 'Access denied. not authorized',
                            "404": 'Not found. no user by that id found',
                            "502": 'Bad gateway. try again later'
                        }
                    },
                    {
                        path: '/club/users/find?{platform}={uuid}',
                        desc: 'Get the Tude Club user profile',
                        details: 'A more detailed description here',
                        method: 'get',
                        permission: 3,
                        produces: 'application/json',
                        parameters: [ ],
                        response: '%clubuser',
                        codes: {
                            "200": 'Okay',
                            "400": 'Bad request. invalid userid',
                            "401": 'Access denied. not authorized',
                            "404": 'Not found. no user by that id found',
                            "502": 'Bad gateway. try again later'
                        }
                    },
                    {
                        path: '/club/users/{userid}',
                        desc: 'Update the Tude Club user profile',
                        details: 'A more detailed description here',
                        method: 'put',
                        permission: 1,
                        produces: 'application/json',
                        parameters: [
                            {
                                name: 'points',
                                type: 'integer',
                                desc: 'Set points; Use { add: 0 } or { remove: 0 } to add / remove points; Changing points will affect statistics',
                                in: 'body',
                                required: false
                            },
                            {
                                name: 'cookies',
                                type: 'integer',
                                desc: 'Set cookies; Use { add: 0 } or { remove: 0 } to add / remove cookies; Changing cookies will affect statistics',
                                in: 'body',
                                required: false
                            },
                            {
                                name: 'gems',
                                type: 'integer',
                                desc: 'Set gems; Use { add: 0 } or { remove: 0 } to add / remove gems; Changing gems will affect statistics',
                                in: 'body',
                                required: false
                            },
                            {
                                name: 'profile',
                                type: 'object',
                                desc: 'Update the user\'s profile. Possible settings: disp_badge',
                                in: 'body',
                                required: false
                            },
                            {
                                name: 'badges',
                                type: 'object',
                                desc: 'Update the user\'s badges. Use badgeids as keys and new amount as values. You may use { add: 0 } or { remove: 0 }',
                                in: 'body',
                                required: false
                            }
                        ],
                        response: '%generic_success',
                        codes: {
                            "200": 'Okay',
                            "400": 'Bad request. invalid userid',
                            "401": 'Access denied. not authorized',
                            "404": 'Not found. no user by that id found',
                            "410": 'Gone. action not performable. response most likely contains a message object and / or problemid',
                            "502": 'Bad gateway. try again later'
                        }
                    },
                    {
                        path: '/club/users/find?{platform}={uuid}',
                        desc: 'Update the Tude Club user profile',
                        details: 'A more detailed description here',
                        method: 'put',
                        permission: 3,
                        produces: 'application/json',
                        parameters: [
                            {
                                name: 'points',
                                type: 'integer',
                                desc: 'Set points; Use { add: 0 } or { remove: 0 } to add / remove points; Changing points will affect statistics',
                                in: 'body',
                                required: false
                            },
                            {
                                name: 'cookies',
                                type: 'integer',
                                desc: 'Set cookies; Use { add: 0 } or { remove: 0 } to add / remove cookies; Changing cookies will affect statistics',
                                in: 'body',
                                required: false
                            },
                            {
                                name: 'gems',
                                type: 'integer',
                                desc: 'Set gems; Use { add: 0 } or { remove: 0 } to add / remove gems; Changing gems will affect statistics',
                                in: 'body',
                                required: false
                            },
                            {
                                name: 'profile',
                                type: 'object',
                                desc: 'Update the user\'s profile. Possible settings: disp_badge',
                                in: 'body',
                                required: false
                            },
                            {
                                name: 'badges',
                                type: 'object',
                                desc: 'Update the user\'s badges. Use badgeids as keys and new amount as values. You may use { add: 0 } or { remove: 0 }',
                                in: 'body',
                                required: false
                            }
                        ],
                        response: '%generic_success',
                        codes: {
                            "200": 'Okay',
                            "400": 'Bad request. invalid userid',
                            "401": 'Access denied. not authorized',
                            "404": 'Not found. no user by that id found',
                            "410": 'Gone. action not performable. response most likely contains a message object and / or problemid',
                            "502": 'Bad gateway. try again later'
                        }
                    },
                    {
                        path: '/club/users/{userid}',
                        desc: 'Perform actions on the user',
                        details: 'A more detailed description here',
                        method: 'post',
                        permission: 3,
                        produces: 'application/json',
                        parameters: [
                            {
                                name: 'actions',
                                type: 'array',
                                desc: 'A list of all the actions. Each action is represented as a JSON object with it\'s id as a string and depending on the action additional data. Example: { id: "claim_daily_reward" }',
                                in: 'body',
                                required: false
                            }
                        ],
                        response: '%generic_success',
                        codes: {
                            "200": 'Okay',
                            "400": 'Bad request. invalid userid',
                            "401": 'Access denied. not authorized',
                            "404": 'Not found. no user by that id found',
                            "502": 'Bad gateway. try again later'
                        }
                    },
                    {
                        path: '/club/users/find?{platform}={uuid}',
                        desc: 'Perform actions on the user',
                        details: 'A more detailed description here',
                        method: 'post',
                        permission: 3,
                        produces: 'application/json',
                        parameters: [
                            {
                                name: 'actions',
                                type: 'array',
                                desc: 'A list of all the actions. Each action is represented as a JSON object with it\'s id as a string and depending on the action additional data. Example: { id: "claim_daily_reward" }',
                                in: 'body',
                                required: false
                            }
                        ],
                        response: '%generic_success',
                        codes: {
                            "200": 'Okay',
                            "400": 'Bad request. invalid userid',
                            "401": 'Access denied. not authorized',
                            "404": 'Not found. no user by that id found',
                            "502": 'Bad gateway. try again later'
                        }
                    },
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
                                desc: 'Entries per page. Default is 10. Maximum is 30',
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
                        desc: 'Perform actions on the leaderboard',
                        details: 'A more detailed description here',
                        method: 'post',
                        permission: 4,
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
                        desc: 'Get generic statistics about the meme database - NOT YET IMPLEMENTED',
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
                        desc: 'Add a meme to the meme database - NOT YET IMPLEMENTED',
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
                        desc: 'Edit an existing meme - NOT YET IMPLEMENTED',
                        details: 'A more detailed description here',
                        method: 'put',
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
                ]
            }
        ],

        objects: {
pong:
`{
    "access": 0,
    "serverStatus": 200,
    "problems": [ ]
}`,
user:
`{
    "id": 0,
    "type": 1,
    "name": "string",
    "tag": 0,
    "accounts": {
        "discord": "123456"
    }
}`,
generic_success:
`{ success: true }`,
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
    "season": 14,
    "updated": 1442342142112
}`,
meme:
`{
    "image": "",
    "saves": 0,
    "author": 0,
    "rating": 0,
    "id": 0,
    "caption": "",
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
clubuser:
`
{
    "id": 0,
    "points": 0,
    "points_month": 0,
    "cookies": 0,
    "gems": 0,
    "badges": {
        "1": 1,
    },
    "profile": {
        "disp_badge": 1
    },
    "level": 0,
    "level_progress": 0.09508196721311475,
    "user": {
        "id": 0,
        "type": 1,
        "name": "string",
        "tag": 0,
        "accounts": {
            "discord": "0"
        }
    }
}
`
        }
    },
    methods: {
        varOrRender: function(obj) {
            if (obj.split('')[0] == '%') return this.objects[obj.substring(1)];
            return obj;
        }
    },
    // updated: codeFormatter,
    mounted: codeFormatter
});

function codeFormatter() {    
    this.$nextTick(function () {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    });
}