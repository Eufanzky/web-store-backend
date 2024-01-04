const bcrypt = require('bcrypt');

async function verifyPassword () {
    const myPassword = 'admin 123 .202'
    const hash = '$2b$10$5uFRP6TvUunm3ValE/nxSe2Tp2X4TGUZM0vfSxKpx0i3Bt5VQ83se';
    const isMatch = await bcrypt.compare(myPassword, hash)
    console.log(isMatch);
}
verifyPassword();