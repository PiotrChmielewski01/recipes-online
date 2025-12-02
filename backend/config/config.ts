

export const config = {
    salt: process.env.SALT || 'cHaNgEMe!234%',
    jwt: process.env.JWT_SECRET || 'cHaNgEMe!234%',
    jwtExpiresIn: '1h',
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
}
