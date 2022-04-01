const fs = require('fs')
const path = require('path')

const authenticate = ({ npmEmail, npmPassword, npmRegistry, npmUsername }) => {
  const buffer = Buffer.from(npmPassword)
  const token = buffer.toString('base64')
  const config = [
    `//${npmRegistry.split('://')[1]}:email=${npmEmail}`,
    `//${npmRegistry.split('://')[1]}:_password=${token}`,
    `//${npmRegistry.split('://')[1]}:username=${npmUsername}`,
    `//${npmRegistry.split('://')[1]}:always-auth=true`,
  ].join('\n')

  fs.writeFileSync(path.resolve(__dirname, '../.npmrc'), config)
}

authenticate({
  npmEmail: process.env.NPM_EMAIL,
  npmPassword: process.env.NPM_PASSWORD,
  npmRegistry: process.env.NPM_REGISTRY,
  npmUsername: process.env.NPM_USERNAME,
})
