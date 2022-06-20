const isomorphicFetch = require('isomorphic-fetch'); // or import the fetch polyfill you installed
const Microsoft = require('@microsoft/microsoft-graph-client');
const yargs = require('yargs');
const fetch = require('./fetch');
const auth = require('./auth');
exports.Home =  function (req, res) { res.send('Hello World! :)')};

exports.getUser = async function (req, res) {
            try {
                // here we get an access token
                const authResponse = await auth.getToken(auth.tokenRequest);
                // call the web API with the access token
                const users = await fetch.getCall(process.env.GRAPH_ENDPOINT+'/v1.0/users', authResponse.accessToken)
                .then(function(Userdata){
                    res.json(Userdata);
                    });
            }catch (err){
                res.json(err)
            }
};
exports.getGroups = async function (req, res) {
    try {
        // here we get an access token
        const authResponse = await auth.getToken(auth.tokenRequest);

        // call the web API with the access token
        const groups = await fetch.getCall(process.env.GRAPH_ENDPOINT+'/v1.0/groups' , authResponse.accessToken)
        .then(function(Groupsdata){
            res.json(Groupsdata);
            });

        // display result
    } catch (error) {
        res.json(res)
    }
};

exports.createFolder = async function (req,res){
    const authResponse = await auth.getToken(auth.tokenRequest);
    const reqBody= "Hello world"
    const chats = await fetch.PostCall(process.env.GRAPH_ENDPOINT+`/v1.0/teams/42459f77-0d9d-40c6-893a-e2d37d7f59b8/channels/19:N-3p36WVSVkaFQjeYKIbLihUF3l4094pvMj-95924p81@thread.tacv2/messages` , authResponse.accessToken, reqBody)        
    .then(function(Chatsdata){
        res.json(Chatsdata);
        });
    console.log(req.body.Test);  
}
exports.getChats = async function (req,res){
    try{  
    // here we get an access token
        var id = req.params.id
        const authResponse = await auth.getToken(auth.tokenRequest);

        // call the web API with the access token
        const chats = await fetch.getCall(process.env.GRAPH_ENDPOINT+`/v1.0/chats/${id}` , authResponse.accessToken)
        .then(function(Chatsdata){
            res.json(Chatsdata);
            });

        // display result
    } catch (error) {
        res.json(res)
    }
};
        
exports.getMailFolders = async function (req,res){
        try{  
        // here we get an access token
            var id = req.params.id
            const authResponse = await auth.getToken(auth.tokenRequest);
    
            // call the web API with the access token
            const chats = await fetch.getCall(process.env.GRAPH_ENDPOINT+`/v1.0/users/${id}/mailFolders` , authResponse.accessToken)
            .then(function(mailsdata){
                res.json(mailsdata);
                });
    
            // display result
        } catch (error) {
            res.json(res)
        }
            
    };
exports.send= async function (req,res){
    const authResponse = await auth.getToken(auth.tokenRequest);
    const mail = {
        subject: "Microsoft Graph JavaScript Sample",
        toRecipients: [
            {
                emailAddress: {
                    address: "example@example.com",
                },
            },
        ],
        body: {
            content: "<h1>MicrosoftGraph JavaScript Sample</h1>Check out https://github.com/microsoftgraph/msgraph-sdk-javascript",
            contentType: "html",
        },
    };
    try {
        let response = await fetch.PostCall(process.env.GRAPH_ENDPOINT+"/v1.0/9d6e5ef1-7704-49b0-9410-b7dbe458af83/sendMail",authResponse.accessToken,{ message: mail });
        console.log(response);
    } catch (error) {
        throw error;
    }
};