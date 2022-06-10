// read in env settings
const yargs = require('yargs');
const fetch = require('./fetch');
const auth = require('./auth');
exports.Home =  function (req, res) { res.send('Hello World! :)')};

exports.getUser = async function (req, res) {
            try {
                // here we get an access token
                const authResponse = await auth.getToken(auth.tokenRequest);
                // call the web API with the access token
                const users = await fetch.callApi(process.env.GRAPH_ENDPOINT+'/v1.0/users', authResponse.accessToken)
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
        const groups = await fetch.callApi(process.env.GRAPH_ENDPOINT+'/v1.0/groups' , authResponse.accessToken)
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
    console.log(req.body.Test);
    res.json({"status":"Done!"});
    
}