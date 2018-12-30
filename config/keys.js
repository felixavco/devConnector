const dbUser = 'favelar';
const dbPwd = 'Gr33n1989';

module.exports = {
  mongoURI: `mongodb://${dbUser}:${dbPwd}@sandbox-shard-00-00-khjkq.mongodb.net:27017,sandbox-shard-00-01-khjkq.mongodb.net:27017,sandbox-shard-00-02-khjkq.mongodb.net:27017/devconnector?ssl=true&replicaSet=SandBox-shard-0&authSource=admin&retryWrites=true`,
  secret: 'secret'
}