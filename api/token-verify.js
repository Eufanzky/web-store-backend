const jwt = require('jsonwebtoken');
const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcwNDU1OTAyNX0.3XR_0CfhHQLM843Nr3dAXCrirxtE4tvZnVpn1By8jKY'
function verifyToken(token, secret) {
    return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);

console.log(payload);